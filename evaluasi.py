"""Evaluasi akurasi chatbot tanpa memanggil Gemini. Jalankan: venv/bin/python evaluasi.py"""
import re
import pandas as pd
from sklearn.metrics import accuracy_score, precision_recall_fscore_support
from sklearn.model_selection import GroupKFold

import server
from setup_database import bangun, baca, cari_daftar_tempat

server.tanya_gemini = lambda pertanyaan, konteks: "GEMINI"  # uji offline: dihitung salah, karena jawaban Gemini tidak bisa dinilai di sini

# Cetak dan kembalikan akurasi, precision, recall, dan F1 (rata-rata macro) satu pengujian.
def laporan(judul, y_true, y_pred):
    p, r, f1, _ = precision_recall_fscore_support(y_true, y_pred, average="macro", zero_division=0)
    print(f"\n== {judul} (n={len(y_true)}) ==")
    print(f"Akurasi {accuracy_score(y_true, y_pred):.2%} | Precision {p:.2%} | Recall {r:.2%} | F1 {f1:.2%} (macro)")
    return {"Pengujian": judul, "Jumlah Data": len(y_true), "Akurasi": accuracy_score(y_true, y_pred),
            "Precision (macro)": p, "Recall (macro)": r, "F1 Score (macro)": f1}

# Ganti database yang dipakai server (untuk menguji dengan database fold tertentu).
def pakai(db):
    server.db = db
    server.IDX_SAPAAN = [i for i, m in enumerate(db["maksud"]) if m == "sapaan"]

# Kirim satu pesan ke fungsi chat server dan ambil teks jawabannya.
def tanya(pesan):
    return server.chat(server.ChatRequest(message=pesan))["answer"]

# Siapkan data lengkap, label jawaban, serta pembagian pertanyaan wisata dan sapaan.
rows = baca()
TEMPAT = cari_daftar_tempat(rows)  # dari data lengkap: satu fold bisa kehilangan semua jawaban Lokasi suatu tempat
penuh = bangun(rows)
# label benar sebuah pertanyaan wisata = tempat|maksud; jawaban yang dikembalikan dipetakan balik ke labelnya
label_jawaban = {j: f"{t}|{m}" for j, t, m in zip(penuh["jawaban"], penuh["tempat"], penuh["maksud"])}
wisata = [k for k, m in enumerate(penuh["maksud"]) if m != "sapaan"]
sapa = [k for k, m in enumerate(penuh["maksud"]) if m == "sapaan"]

# 1. Frasa baru: kalimat uji tidak ada di database (5-fold; "Mohon info, X" dan "X" selalu di fold yang sama)
inti = [re.sub(r"^((eh nanya dong|mohon info|eh), )+", "", penuh["pertanyaan"][k].lower()) for k in wisata]
y_true, y_pred, mentah1 = [], [], []
for fold, (latih, uji) in enumerate(GroupKFold(5).split(wisata, groups=inti), 1):  # pyrefly: ignore[bad-argument-type]  stub sklearn salah, list diterima
    pakai(bangun([rows[k] for k in sapa] + [rows[wisata[i]] for i in latih], TEMPAT))
    for i in uji:
        q, a = penuh["pertanyaan"][wisata[i]], penuh["jawaban"][wisata[i]]
        j = tanya(q)
        y_true.append(label_jawaban[a]); y_pred.append(label_jawaban.get(j, "gemini"))
        mentah1.append({"Fold": fold, "Pertanyaan": q, "Label Benar": y_true[-1], "Label Prediksi": y_pred[-1],
                        "Jawaban Diharapkan": a, "Jawaban Chatbot": j, "Benar": y_true[-1] == y_pred[-1]})
skor1 = laporan("1. Frasa baru, label tempat|maksud (5-fold)", y_true, y_pred)

# 2. Routing server.chat: sapaan dijawab database, pertanyaan wisata/kuliner tidak boleh dijawab sapaan
pakai(penuh)
SAPA = {penuh["jawaban"][i] for i in sapa}
s = pd.read_excel("List pembuka, pertanyaan dan penutup.xlsx", sheet_name=None)
uji = [(t, "wisata") for t in s["Sheet2"]["Variasi Pertanyaan / Ucapan User (Natural)"]]
uji += [(t, "sapaan" if k.strip() in ("Opening", "Closing") else "wisata")  # campuran "Opening / Kuliner" = tetap pertanyaan
        for t, k in zip(s["Sheet4"]["Variasi Teks User (Gaya Gen Z, Slang & Chatting Natural)"], s["Sheet4"]["Jenis Intent"])]
# tempat yang tidak ada di database tetap pertanyaan wisata (dulu dijawab "terima kasih kembali")
uji += [(t, "wisata") for t in ("pantai nussy", "apa itu pantai nussy", "pantai nussy itu dimana", "info pantai nussy dong",
                                 "pulau seram bagus ga", "ada benteng lain di ambon?", "danau rana gimana kak")
        # tombol saran di chat (script.js), dulu dijawab "Hai juga! Mau tanya soal tempat..."
        + ("Kuliner wajib", "Kuliner wajib dicoba", "Hidden gems Maluku", "Hidden gems Ambon", "Cari hidden gem",
           "Rekomendasi pantai", "95 Wisata di Ambon", "Tempat aesthetic", "Buat itinerary", "Estimasi budget",
           "Kuliner terdekat", "Event budaya", "Tanya destinasi lain", "Sewa motor bandara", "Info QRIS dan cash")]
jawab2 = [tanya(t) for t, _ in uji]
p = ["sapaan" if j in SAPA else "wisata" for j in jawab2]
skor2 = laporan("2. Routing sapaan vs wisata (Sheet2 + Sheet4, data uji)", [b for _, b in uji], p)
for (t, b), q in zip(uji, p):
    if b != q:
        print(f"  salah: [{b} -> {q}] {t}")

# 3. Data latih: setiap pertanyaan di database harus mendapat jawabannya sendiri (cek kewarasan, bukan akurasi nyata)
jawab3 = [tanya(t) for t in penuh["pertanyaan"]]
hasil = [j == a for j, a in zip(jawab3, penuh["jawaban"])]
print(f"\n== 3. Data latih (n={len(hasil)}) ==\nJawaban tepat: {sum(hasil) / len(hasil):.2%}")

# 4. Kata tidak dikenal: program tidak boleh error dan setiap input harus diarahkan ke jalur yang benar
#    maaf = ditolak langsung tanpa Gemini, sapaan = daftar sapaan, wisata = jawaban database wisata, gemini = diserahkan ke Gemini
pakai(penuh)
WISATA = {penuh["jawaban"][k] for k in wisata}
uji4 = [("", "maaf"), ("   ", "maaf"), ("!!!???", "maaf"), ("😀😀", "maaf"), ("...", "maaf"),
        ("halo", "sapaan"), ("hei", "sapaan"), ("makasih", "sapaan"), ("thx", "sapaan"), ("dadah", "sapaan"),
        ("brp tiket masuk natsepa", "wisata"), ("jam buka bentng amsterdam", "wisata"), ("HARGA TIKET NATSEPA???", "wisata"),
        ("asdfghjkl", "gemini"), ("qwerty zxcv bnm", "gemini"), ("12345", "gemini"),
        ("siapa presiden pertama indonesia", "gemini"), ("resep nasi goreng", "gemini"),  # Gemini yang menolak (DILUAR_KONTEKS)
        ("pantai nussy", "gemini"), ("<script>alert(1)</script>", "gemini"), ("a" * 3000, "gemini")]
# Tentukan jalur yang dipakai sistem dari teks jawabannya: maaf, sapaan, wisata, gemini, atau lain.
def jalur(j):
    return "maaf" if j == server.MAAF else "sapaan" if j in SAPA else "wisata" if j in WISATA else "gemini" if j == "GEMINI" else "lain"
jawab4 = []
for t, _ in uji4:
    try:
        jawab4.append(tanya(t))
    except Exception as e:  # error dihitung salah, bukan menghentikan evaluasi
        jawab4.append(f"ERROR: {e!r}")
p4 = [jalur(j) for j in jawab4]
skor4 = laporan("4. Kata tidak dikenal (typo, slang, simbol, di luar topik)", [b for _, b in uji4], p4)
for (t, b), q in zip(uji4, p4):
    if b != q:
        print(f"  salah: [{b} -> {q}] {t[:50]}")

# data mentah per pertanyaan, belum diolah
# Simpan ringkasan dan hasil per pertanyaan dari keempat pengujian ke hasil_uji_mentah.xlsx.
with pd.ExcelWriter("hasil_uji_mentah.xlsx") as w:
    # data latih tidak punya kelas, jadi hanya akurasi (jawaban sama persis)
    pd.DataFrame([skor1, skor2, {"Pengujian": "3. Data latih", "Jumlah Data": len(hasil), "Akurasi": sum(hasil) / len(hasil)}, skor4]
                 ).to_excel(w, sheet_name="Ringkasan Evaluasi", index=False)
    pd.DataFrame(mentah1).to_excel(w, sheet_name="1. Frasa Baru", index=False)
    pd.DataFrame({"Pertanyaan": [t for t, _ in uji], "Kelas Benar": [b for _, b in uji], "Kelas Prediksi": p,
                  "Jawaban Chatbot": jawab2, "Benar": [b == q for (_, b), q in zip(uji, p)]}).to_excel(w, sheet_name="2. Routing Sapaan", index=False)
    pd.DataFrame({"Pertanyaan": penuh["pertanyaan"], "Maksud": penuh["maksud"], "Jawaban Diharapkan": penuh["jawaban"],
                  "Jawaban Chatbot": jawab3, "Benar": hasil}).to_excel(w, sheet_name="3. Data Latih", index=False)
    pd.DataFrame({"Input": [t[:100] for t, _ in uji4], "Jalur Benar": [b for _, b in uji4], "Jalur Sistem": p4,
                  "Jawaban Chatbot": jawab4, "Benar": [b == q for (_, b), q in zip(uji4, p4)]}).to_excel(w, sheet_name="4. Kata Tidak Dikenal", index=False)
print("Data mentah disimpan ke hasil_uji_mentah.xlsx")
