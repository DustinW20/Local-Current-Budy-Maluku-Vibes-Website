import os
import pickle
import re
import time
import numpy as np
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from pydantic import BaseModel
from sklearn.metrics.pairwise import cosine_similarity
from setup_database import samarkan

# Server chatbot FastAPI: jawab dari database TF-IDF/pengklasifikasi lebih dulu, Gemini hanya bila database tidak yakin.
load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env"))
# API key Gemini dibaca dari file .env di folder ini: GOOGLE_API_KEY=isi_key_baru
API_KEY = os.getenv("GOOGLE_API_KEY")
MODEL = "gemini-3.5-flash"  # 3.8/3.7-flash sedang padat: 110-130 detik per jawaban, ini ~5 detik
THRESHOLD = 0.7  # sapaan 3-4 kata; "Siapa presiden pertama Indonesia?" vs "kamu siapa" sudah 0.5
THRESHOLD_DB = 0.95  # char n-gram: "Benteng Rotterdam" vs "Benteng Amsterdam" sudah 0.91, di bawah ini Gemini yang memilah
THRESHOLD_SAPAAN = 0.35  # sapaan/penutup pendek, skornya wajar lebih rendah
YAKIN = 0.0  # skor LinearSVC: di atas 0 = pengklasifikasi memilih maksud itu, di bawahnya ragu dan diserahkan ke Gemini
YAKIN_SAPAAN = 0.5  # penutup panjang asli >= 0.83, pertanyaan kuliner/umum (tidak ada kelasnya) <= 0.37
# kata pada nama tempat yang juga kata umum, tidak dipakai untuk mengenali tempat ("tempat santai", "dari kota")
KATA_UMUM = {"pantai", "benteng", "pulau", "ambon", "desa", "wisata", "air", "gua", "bukit", "monumen", "museum", "tebing",
             "terjun", "panas", "batu", "tanjung", "masjid", "tua", "dunia", "pemandian", "santai", "kota", "pintu"}
# jenis tempat: pesan yang menyebutnya ("pantai nussy") pertanyaan wisata, walau nama tempatnya tidak ada di database
JENIS_TEMPAT = {"pantai", "benteng", "pulau", "desa", "gua", "goa", "bukit", "monumen", "museum", "tebing", "terjun",
                "pemandian", "tanjung", "masjid", "gereja", "danau", "telaga", "taman", "pasar", "wisata", "event", "budaya"}
# kata sapaan yang tidak ada di daftar pembuka, dipetakan ke kata yang ada
ALIAS = {"hei": "hai", "hey": "hai", "woy": "halo", "permisi": "halo", "dadah": "bye", "dah": "bye", "thx": "thanks"}
MAAF = ("Maaf, saya kurang paham pertanyaan itu. Coba ulangi pertanyaannya atau "
        "ganti dengan pertanyaan lain seputar wisata Ambon dan Maluku ya.")
LIMIT = ("Maaf, layanan AI Gemini sedang mencapai batas penggunaan (limit), jadi pertanyaan ini belum bisa dijawab. "
         "Silakan coba lagi beberapa menit lagi, atau tanyakan hal lain seputar wisata Ambon yang ada di database kami.")

# Klien Gemini (None bila API key kosong) dan database hasil setup_database.py.
client = genai.Client(api_key=API_KEY) if API_KEY else None
with open("database_wisata_ambon.pkl", "rb") as f:
    db = pickle.load(f)
# Indeks baris database yang berisi sapaan/penutup, untuk pencarian sapaan yang lebih cepat.
IDX_SAPAAN = [i for i, m in enumerate(db["maksud"]) if m == "sapaan"]

# Aplikasi web; CORS dibuka agar index.html (dibuka dari file/port lain) boleh memanggil /chat.
app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# Bentuk body request /chat: {"message": "..."}.
class ChatRequest(BaseModel):
    message: str

# Tanya Gemini dengan konteks dari database; balas MAAF bila di luar topik wisata Ambon/Maluku.
def tanya_gemini(pertanyaan, konteks):
    prompt = ("Kamu asisten informasi wisata, kuliner, dan budaya Kota Ambon dan Maluku. "
              "Sapaan atau perkenalan diri (mis. \"nama saya Budi\") balas dengan ramah dan sebut namanya. "
              "Jika pertanyaan TIDAK berkaitan dengan topik itu, balas hanya dengan: DILUAR_KONTEKS. "
              "Berikut data dari database kami; pakai hanya jika benar-benar membahas hal yang ditanyakan, abaikan jika tidak:\n"
              f"{konteks}\n\nJika tempat yang ditanyakan tidak kamu kenal pasti, katakan terus terang dan jangan mengarang. Jawab ringkas dan jelas (maksimal 3 kalimat): {pertanyaan}")
    if client is None:
        raise RuntimeError("GOOGLE_API_KEY belum diisi di .env")
    teks = ""
    for percobaan in range(2):  # Gemini kadang 503 sesaat, coba sekali lagi
        try:
            teks = (client.models.generate_content(model=MODEL, contents=prompt).text or "").strip()
            break
        except Exception as e:
            if percobaan or getattr(e, "code", None) == 429:  # kena limit: mencoba ulang 1.5 detik kemudian tetap kena limit
                raise
            time.sleep(1.5)
    return teks if teks and "DILUAR_KONTEKS" not in teks else MAAF

# Cari nama tempat wisata yang disebut dalam pesan; None bila tidak ada.
def cari_tempat(kata):
    """Nama lengkap dulu ("pantai natsepa"), lalu kata khasnya saja ("natsepa")."""
    teks = " ".join(kata)
    for t in db["daftar_tempat"]:
        nama = re.findall(r"\w+", t.lower())
        if " ".join(nama) in teks or (set(nama) - KATA_UMUM) & set(kata):
            return t
    return None

# Cari sapaan di database yang paling mirip dengan teks; kembalikan jawabannya dan skor kemiripannya.
def sapaan_terdekat(teks):
    s_sapa = cosine_similarity(db["vectorizer"].transform([teks]), db["matriks_tfidf"][IDX_SAPAAN])[0]
    j = int(np.argmax(s_sapa))
    return db["jawaban"][IDX_SAPAAN[j]], float(s_sapa[j])

# Endpoint utama chat. Urutan: pesan kosong -> sapaan pendek -> sapaan panjang -> pertanyaan sangat mirip -> tempat+maksud -> Gemini.
@app.post("/chat")
def chat(body: ChatRequest):
    pesan = body.message.strip()[:1000]
    kata = [ALIAS.get(k) or k for k in re.findall(r"\w+", pesan.lower())]  # tanda baca diabaikan: "halo!!" = "halo"
    if not kata:  # kosong/hanya simbol/emoji: tidak ada yang bisa dicari, jangan habiskan kuota Gemini
        return {"answer": MAAF, "source": "maaf", "score": 0.0}
    # pesan pendek = sapaan/penutup: cari hanya di daftar pembuka, tanpa Gemini
    if len(kata) <= 4 and not JENIS_TEMPAT & set(kata):
        jawaban, s = sapaan_terdekat(" ".join(kata))
        if s >= (THRESHOLD_SAPAAN if len(kata) <= 2 else THRESHOLD):  # 3-4 kata rawan bentrok dengan pertanyaan wisata
            return {"answer": jawaban, "source": "database", "score": s}
    tempat = cari_tempat(kata)
    nilai = db["klasifikasi"].decision_function([samarkan(pesan, db["daftar_tempat"])])[0]
    maksud, yakin = db["klasifikasi"].classes_[int(np.argmax(nilai))], float(np.max(nilai))
    # sapaan/penutup panjang ("sip makasih ya bot, ngebantu bgt"): selama tidak menyebut tempat wisata;
    # pesan <= 4 kata sudah dinilai di atas, jangan ke sini ("Kuliner wajib" dulu dijawab "Halo! Selamat datang")
    if len(kata) > 4 and maksud == "sapaan" and tempat is None and not JENIS_TEMPAT & set(kata) and yakin >= YAKIN_SAPAAN:
        jawaban, s = sapaan_terdekat(" ".join(kata))
        return {"answer": jawaban, "source": "database", "score": s}
    skor = cosine_similarity(db["vectorizer"].transform([pesan]), db["matriks_tfidf"])[0]
    i = int(np.argmax(skor))
    if skor[i] >= THRESHOLD_DB:
        return {"answer": db["jawaban"][i], "source": "database", "score": float(skor[i])}
    # tempat + maksud dikenali: ambil jawaban dari baris database dengan tempat dan maksud yang sama
    kandidat = [k for k, (t, m) in enumerate(zip(db["tempat"], db["maksud"])) if tempat and t == tempat and m == maksud]
    kandidat.sort(key=lambda k: -skor[k])
    if kandidat and yakin >= YAKIN:
        return {"answer": db["jawaban"][kandidat[0]], "source": "database", "score": float(skor[kandidat[0]])}
    teratas = list(dict.fromkeys(kandidat[:2] + list(np.argsort(skor)[-3:][::-1])))  # tanpa duplikat
    konteks = "\n".join(f"- T: {db['pertanyaan'][k]} J: {db['jawaban'][k]}" for k in teratas)
    try:
        jawaban = tanya_gemini(pesan, konteks)
        return {"answer": jawaban, "source": "maaf" if jawaban == MAAF else "gemini", "score": float(skor[i])}
    except Exception as e:  # key kosong/limit/jaringan: tetap beri jawaban sopan
        print("Gemini error:", repr(e))
        if getattr(e, "code", None) == 429:  # RESOURCE_EXHAUSTED: kuota per menit/harian Gemini habis
            return {"answer": LIMIT, "source": "limit", "score": float(skor[i])}
        return {"answer": MAAF, "source": "maaf", "score": float(skor[i])}
