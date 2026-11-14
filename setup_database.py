import re
import pandas as pd
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import make_pipeline, make_union
from sklearn.svm import LinearSVC

# Membangun database_wisata_ambon.pkl dari file Excel: vektor TF-IDF pertanyaan + pengklasifikasi maksud.
DATASET = 'Dataset_Wisata_Ambon_1000plus.xlsx'
SAPAAN = 'List pembuka, pertanyaan dan penutup.xlsx'
SAPAAN_TAMBAHAN = 'Sapaan_Tambahan.xlsx'  # variasi pembuka (ID OPX-)
SAPAAN_SLANG = 'Sapaan_Slang.xlsx'  # 500 sapaan sintetis formal/kasual/slang (ID OPS-/CLS-)

def baca():
    """Baca semua sumber ke format seragam: (id, pertanyaan, jawaban, maksud). Maksud = Sub-Kategori atau 'sapaan'."""
    rows = []
    for sheet, kolom in (('Pertanyaan Formal', 'Pertanyaan (Formal)'), ('Pertanyaan Unformal', 'Pertanyaan (Kasual/Unformal)')):
        df = pd.read_excel(DATASET, sheet_name=sheet).dropna(subset=[kolom, 'Jawaban Bot'])
        rows += list(zip(df['ID_Chat'], df[kolom], df['Jawaban Bot'], df['Sub-Kategori']))
    for berkas in (SAPAAN_TAMBAHAN, SAPAAN_SLANG):
        df = pd.read_excel(berkas).dropna(subset=['Respon Chatbot (Rencana)'])
        rows += [(*r, 'sapaan') for r in zip(df['ID_Chat'], df['Variasi Pertanyaan / Ucapan User (Natural)'], df['Respon Chatbot (Rencana)'])]
    # Sheet1 = pembuka, Sheet3 = penutup; Sheet2 & Sheet4 tidak punya jawaban (dipakai untuk uji)
    for sheet in ('Sheet1', 'Sheet3'):
        df = pd.read_excel(SAPAAN, sheet_name=sheet).dropna(subset=['Respon Chatbot (Rencana)'])
        rows += [(*r, 'sapaan') for r in zip(df['ID_Chat'], df['Variasi Pertanyaan / Ucapan User (Natural)'], df['Respon Chatbot (Rencana)'])]
    return [tuple(map(str, r)) for r in rows]

def samarkan(teks, daftar_tempat):
    """Nama tempat diganti kata 'tempat' agar pengklasifikasi belajar maksud pertanyaan, bukan nama tempatnya."""
    return re.sub('|'.join(re.escape(t.lower()) for t in daftar_tempat), ' tempat ', teks.lower())

def cari_daftar_tempat(rows):
    """Nama tempat diambil dari jawaban Lokasi: "Letak Pantai Natsepa berada ..."; terpanjang dulu."""
    return sorted({m.group(1) for r in rows if (m := re.match(r'Letak (.+?) berada', r[2]))}, key=lambda t: (-len(t), t))  # nama sepanjang sama: urut abjad, bukan urutan set yang acak

# Ubah baris data menjadi database: kenali tempat tiap pertanyaan, buat vektor TF-IDF, dan latih pengklasifikasi maksud.
def bangun(rows, daftar_tempat=None):
    id_chat_db, pertanyaan_db, jawaban_db, maksud_db = (list(c) for c in zip(*rows))
    daftar_tempat = daftar_tempat or cari_daftar_tempat(rows)
    tempat_db = [next((t for t in daftar_tempat if t.lower() in p.lower()), None) for p in pertanyaan_db]
    assert all(t for t, m in zip(tempat_db, maksud_db) if m != 'sapaan'), "ada pertanyaan wisata tanpa nama tempat yang dikenal"

    # TF-IDF per potongan huruf: tahan salah ketik, singkatan, dan bahasa gaul
    vectorizer = TfidfVectorizer(analyzer='char_wb', ngram_range=(2, 5), lowercase=True, sublinear_tf=True)
    matriks_tfidf_db = vectorizer.fit_transform(pertanyaan_db)
    # pengklasifikasi maksud (14 Sub-Kategori + sapaan): huruf + kata, nama tempat disamarkan
    klasifikasi = make_pipeline(make_union(TfidfVectorizer(analyzer='char_wb', ngram_range=(2, 5), sublinear_tf=True),
                                           TfidfVectorizer(sublinear_tf=True)), LinearSVC(random_state=0))  # random_state: skor evaluasi sama setiap run
    klasifikasi.fit([samarkan(p, daftar_tempat) for p in pertanyaan_db], maksud_db)
    return {
        'vectorizer': vectorizer,
        'matriks_tfidf': matriks_tfidf_db,
        'id_chat': id_chat_db,
        'pertanyaan': pertanyaan_db,
        'jawaban': jawaban_db,
        'maksud': maksud_db,
        'tempat': tempat_db,
        'daftar_tempat': daftar_tempat,
        'klasifikasi': klasifikasi,
    }

# Dijalankan langsung: baca Excel, bangun database, simpan ke file .pkl yang dipakai server.py.
if __name__ == '__main__':
    print("Memulai proses pembuatan database...")
    try:
        rows = baca()
    except FileNotFoundError as e:
        print(f"Error: file tidak ditemukan: {e.filename}")
        exit()
    print(f"Memproses {len(rows)} pertanyaan menjadi vektor TF-IDF dan pengklasifikasi maksud...")
    with open('database_wisata_ambon.pkl', 'wb') as f:
        pickle.dump(bangun(rows), f)
    print("\nSUKSES! File 'database_wisata_ambon.pkl' berhasil dibuat.")
