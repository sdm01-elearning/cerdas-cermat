# 🏆 Cerdas Cermat — SD Muhammadiyah 01 Kukusan

Bank soal dan materi latihan **Cerdas Cermat** tingkat Sekolah Dasar untuk  
**SD Muhammadiyah 01 Kukusan**, Kukusan, Depok.

🔗 **Live:** https://sdm01-elearning.github.io/cerdas-cermat

---

## Kategori Soal

| # | Kategori | Isi |
|---|---|---|
| 🇮🇩 | **Indonesia & Umum** | Sejarah, geografi, kewarganegaraan, pengetahuan umum dunia |
| 🔬 | **Pengetahuan Sains** | IPA, fisika dasar, biologi, kimia, teknologi |
| 🔢 | **Pengetahuan Matematika** | Aritmatika, geometri, aljabar dasar, statistika |

- Setiap paket berisi **40 soal** berbentuk **isian / jawaban singkat**
- Sekitar **10% soal** (4 dari 40) disajikan dalam **Bahasa Inggris**
- Timer per soal: **10 detik** (umum/sains) · **15–30 detik** (matematika)

---

## Latihan Mandiri (belajar sendiri, tanpa didampingi)

Berbeda dari mode-mode di atas yang dirancang untuk dijawab **lisan bersama-sama**
(guru membaca soal, tim menjawab, guru menekan Spasi), `latihan-mandiri.html`
dirancang untuk **belajar sendiri** di rumah/perangkat pribadi:

- Soal **pilihan ganda** (4 opsi) — 3 opsi pengecoh dibangkitkan otomatis dari
  jawaban soal lain di pool yang sama (lihat komentar `buildOpsi()` di file
  tersebut untuk detail & batasannya)
- **20 soal/sesi**, diacak dari pool 1000 soal Latihan Tahap 3 (6 mata pelajaran)
- **15 detik/soal**, jawaban langsung diperiksa benar/salah + pembahasan tampil seketika
- Wajib pilih nama peserta dulu (3 peserta tetap, didaftar langsung di file)
- Hasil setiap sesi (skor, rincian per soal) otomatis tersimpan ke riwayat dan
  bisa dilihat di `latihan-mandiri-riwayat.html`
- **Riwayat bersifat permanen** — sengaja tidak ada tombol/fungsi hapus di mana
  pun. Catatan: karena situs ini statis (tanpa server/database), riwayat
  tersimpan di `localStorage` browser yang dipakai, jadi tidak otomatis
  tersinkron lintas perangkat dan tidak sepenuhnya kebal dari penghapusan data
  browser di level sistem — hanya tidak bisa dihapus **lewat aplikasi ini**.

## Cara Penggunaan

### Untuk Guru (Mode Presentasi)
1. Buka URL di atas melalui browser, tampilkan di **infokus / proyektor**
2. Pilih kategori → pilih paket soal
3. Gunakan shortcut keyboard:

| Tombol | Fungsi |
|---|---|
| `Spasi` | Tampilkan jawaban / lanjut ke soal berikutnya |
| `→` | Soal berikutnya (setelah jawaban ditampilkan) |
| `F` | Toggle layar penuh |

### Alur Sesi Latihan
```
Guru buka paket soal → Baca soal bersama → Siswa menjawab (timer) →
Guru tekan Spasi → Jawaban + pembahasan muncul → Diskusi singkat →
Spasi lagi → Soal berikutnya
```

---

## Struktur Repositori

```
cerdas-cermat/
├── index.html                        ← Halaman utama / hub
├── assets/
│   ├── css/style.css                 ← Stylesheet bersama
│   └── js/quiz-engine.js             ← Engine soal slideshow
│
├── indonesia-umum/
│   ├── index.html                    ← Hub kategori
│   ├── materi/index.html             ← Daftar materi pembelajaran
│   └── soal/
│       ├── index.html                ← Daftar paket soal
│       ├── paket-01.html             ← Halaman quiz paket 01
│       └── data/paket-01.json        ← Data soal (JSON)
│
├── sains/                            ← Struktur sama dengan indonesia-umum
└── matematika/                       ← Struktur sama dengan indonesia-umum
```

---

## Format Data Soal (JSON)

File JSON di `[kategori]/soal/data/paket-XX.json`:

```json
{
  "meta": {
    "paket": "01",
    "kategori_label": "Pengetahuan Indonesia & Umum",
    "total_soal": 40,
    "versi": "1.0.0"
  },
  "soal": [
    {
      "id": 1,
      "teks": "Apa nama ibukota Indonesia?",
      "bahasa": "id",
      "jawaban": "Jakarta",
      "alternatif_jawaban": [],
      "pembahasan": "Jakarta adalah ibukota NKRI sejak 1945. Indonesia kini sedang membangun ibukota baru bernama Nusantara di Kalimantan Timur.",
      "topik": "Geografi Indonesia",
      "level": "mudah",
      "waktu": 10
    }
  ]
}
```

### Keterangan Field

| Field | Tipe | Keterangan |
|---|---|---|
| `teks` | string | Teks pertanyaan |
| `bahasa` | `"id"` / `"en"` | Bahasa soal — 10% harus `"en"` (= 4 soal per paket 40) |
| `jawaban` | string | Jawaban utama acuan |
| `alternatif_jawaban` | array | Jawaban lain yang juga diterima |
| `pembahasan` | string | Penjelasan detail jawaban |
| `topik` | string | Sub-topik soal |
| `level` | `"mudah"` / `"sedang"` / `"sulit"` | Tingkat kesulitan |
| `waktu` | number | Waktu dalam detik (10 untuk umum/sains, 15–30 untuk matematika) |

---

## Menambah Soal / Paket Baru

### Menambah soal ke paket yang ada
Edit file JSON di `[kategori]/soal/data/paket-XX.json`, tambahkan objek ke array `soal[]`.  
Pastikan ~10% soal menggunakan `"bahasa": "en"`.

### Membuat paket baru
1. Duplikat `paket-01.html` → `paket-02.html`
2. Ubah baris `dataUrl` di dalamnya: `dataUrl: 'data/paket-02.json'`
3. Buat file `data/paket-02.json` dengan struktur yang sama
4. Tambahkan link paket baru di `soal/index.html`

### Membuat materi baru
Tambahkan file HTML di folder `[kategori]/materi/` dan daftarkan di `materi/index.html`.

---

## Deployment (GitHub Pages)

Repository ini menggunakan **GitHub Pages** dari branch `main`.  
Setiap push ke `main` otomatis ter-deploy.

> ⚠️ **Penting:** Halaman soal menggunakan `fetch()` untuk memuat data JSON.  
> Tidak bisa dibuka langsung dari file lokal (`file://`) — harus via HTTP.  
> Gunakan GitHub Pages, atau jalankan server lokal: `python3 -m http.server`

---

## Kontribusi

Guru dan kontributor SDM 01 Kukusan dapat berkontribusi dengan:
- Menambahkan soal ke paket yang ada
- Membuat paket soal baru
- Membuat halaman materi pembelajaran

Ikuti format JSON di atas dan sertakan **pembahasan yang jelas** untuk setiap soal.

---

© SD Muhammadiyah 01 Kukusan · Kukusan, Depok · Untuk keperluan pendidikan internal
