# CHANGELOG

Semua perubahan signifikan pada proyek ini didokumentasikan di file ini.  
Format mengikuti [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.3.0] — 2026-06-23

### Ditambahkan
- `latihan-tahap2.html` — halaman quiz Latihan Tahap 2, struktur identik dengan
  `latihan-tahap1.html` (loader fetch pool → inject quiz-engine via QUIZ_CONFIG,
  shuffle, 30 soal/sesi, dukungan KaTeX untuk soal Matematika).
- `latihan-tahap2/soal/data/pool.json` — **Batch 1/10, 100 soal** sesuai kisi-kisi
  Ujian Tahap 2 Liga Bintang Juara (5 mata pelajaran):
  - IPS & Pendidikan Pancasila — 17 soal (10 topik: jenis peta, SDA, kerajaan
    Hindu-Buddha, kerajaan Islam, keragaman budaya, kearifan lokal, usaha
    ekonomi, posisi strategis Indonesia, Pancasila, hak/kewajiban/norma)
  - IPA — 35 soal (23 topik: energi & perubahannya, gaya, magnet, cahaya/optik,
    bunyi, materi & wujud zat, kalor, tumbuhan, hewan, keanekaragaman hayati,
    pelestarian SDA, daur air, pencemaran, atmosfer, ekosistem, tubuh manusia,
    pertumbuhan & perkembangan)
  - Matematika — 15 soal (7 topik: keliling, luas, debit/waktu/volume, proporsi,
    perbandingan senilai, skala, kecepatan)
  - Bahasa Indonesia — 15 soal (9 topik: konjungsi, majas, tanda baca, kalimat
    efektif, kata berimbuhan, SPOK, huruf kapital, makna kata, singkatan/akronim)
  - Bahasa Inggris — 18 soal, seluruhnya `"bahasa": "en"` (11 topik: at school,
    my house, transportation, food and drink, jobs, clothes, family tree,
    animals, days/months/dates, seasons/weather, shop and shopping)
- `index.html` — card baru **"Latihan Tahap 2"** ditambahkan ke `bottom-row`
  (diubah jadi `bottom-row-3`, 3 kolom: Soal Campuran, Latihan Tahap 1,
  Latihan Tahap 2). Style baru `.cat-latihan2` (gradasi ungu, aksen kuning).

### Mekanisme Teknis
- Mengikuti pola yang sama dengan `latihan-tahap1`: satu pool gabungan per
  tahap (bukan dipisah per mata pelajaran), field `mapel` pada setiap soal
  dipakai quiz-engine untuk badge kategori.
- `id` soal pada pool berurutan 1–100, unik, dan akan dilanjutkan
  (101, 102, …) saat batch 2 ditambahkan agar tidak collision.

### Direncanakan
- Batch 2–10 pool Tahap 2 (menyusul, target akhir 1000 soal seperti Tahap 1).
- Audit ulang distribusi level kesulitan (mudah/sedang/sulit) setelah seluruh
  batch terkumpul.

---

### Diperbaiki
- `assets/css/style.css` — tambah class `.cat-campuran` yang proper.
  Sebelumnya card Soal Campuran memakai inline style sehingga child selector
  `.cat-meta span` tidak ter-override (badge tampil putih dengan teks tidak
  terbaca di atas latar gelap). Class CSS baru mencakup semua child override:
  `.cat-title`, `.cat-desc`, `.cat-meta`, `.cat-meta span`, `.cat-cta`.
- `index.html` — card Soal Campuran dipindah ke dalam `categories-grid` dengan
  `grid-column: 1 / -1` (bentang penuh sejajar 3 card kategori). Semua inline
  style dihapus, diganti class `cat-campuran`.

---

## [1.2.0] — 2026-06-14

### Ditambahkan
- `soal-campuran.html` — halaman quiz mode campuran baru di root repo.
  Menarik 10 soal dari masing-masing pool (Indonesia & Umum, Sains, Matematika)
  secara paralel (Promise.all), menggabungkan, mengacak, lalu menyuntikkan
  ke quiz-engine via Blob URL. Total: 30 soal per sesi.
- `index.html` — card "Soal Campuran" ditambahkan sebagai entry point ke mode campuran.

### Mekanisme Teknis Soal Campuran
- Setiap kategori: 1 soal EN + 9 soal ID (stratified sampling ~10% EN)
- Total: 3 soal EN + 27 soal ID = 30 soal per sesi
- Sampling dilakukan di sisi klien setiap sesi → komposisi selalu berbeda
- KaTeX diikutsertakan karena soal Matematika ada dalam campuran
- Back button quiz-engine otomatis mengarah ke `index.html` (root) ✓

---

## [1.1.2] — *(tidak terdokumentasi saat itu)*

### Ditambahkan — Halaman Materi Matematika
`matematika/materi/index.html` + 11 halaman materi topik:

| File | Topik |
|---|---|
| `aljabar-pola.html` | Aljabar & Pola Bilangan |
| `bangun-ruang.html` | Bangun Ruang |
| `bilangan-bulat.html` | Bilangan Bulat |
| `fpb-kpk.html` | FPB & KPK |
| `geometri-datar.html` | Geometri Datar |
| `pecahan-desimal.html` | Pecahan & Desimal |
| `pengukuran-satuan.html` | Pengukuran & Satuan |
| `perpangkatan-akar.html` | Perpangkatan & Akar |
| `persen-perbandingan.html` | Persen & Perbandingan |
| `soal-cerita-penalaran.html` | Soal Cerita & Penalaran |
| `statistika-data.html` | Statistika & Data |

### Ditambahkan — Halaman Materi Sains
`sains/materi/index.html` + 8 halaman materi topik:

| File | Topik |
|---|---|
| `biologi-hewan.html` | Biologi Hewan |
| `biologi-tumbuhan.html` | Biologi Tumbuhan |
| `bumi-atmosfer.html` | Bumi & Atmosfer |
| `fisika-dasar.html` | Fisika Dasar |
| `kimia-dasar.html` | Kimia Dasar |
| `tata-surya.html` | Tata Surya |
| `teknologi-sains.html` | Teknologi & Sains |
| `tubuh-manusia.html` | Tubuh Manusia |

---

## [1.1.1] — *(tidak terdokumentasi saat itu)*

### Ditambahkan — Halaman Materi Indonesia & Umum (pelengkap)
11 halaman materi topik tersisa (selain `pahlawan-nasional.html` yang sudah ada di v1.1.0):

| File | Topik |
|---|---|
| `kemerdekaan-indonesia.html` | Kemerdekaan Indonesia |
| `pancasila-uud1945.html` | Pancasila & UUD 1945 |
| `lambang-simbol-negara.html` | Lambang & Simbol Negara |
| `geografi-indonesia.html` | Geografi Indonesia |
| `kebudayaan-nusantara.html` | Kebudayaan Nusantara |
| `pemerintahan-indonesia.html` | Pemerintahan Indonesia |
| `flora-fauna-indonesia.html` | Flora & Fauna Indonesia |
| `negara-ibukota-dunia.html` | Negara & Ibu Kota Dunia |
| `organisasi-internasional.html` | Organisasi Internasional |
| `penemuan-penemu-dunia.html` | Penemuan & Penemu Dunia |
| `hari-hari-penting.html` | Hari-Hari Penting |

---

## [1.1.0] — 2025-06-09

### Ditambahkan
- `assets/img/logo-sdm01.svg` — logo sekolah SDM 01 Kukusan
- `index.html` — logo sekolah ditampilkan di header landing page
- `indonesia-umum/index.html` — **hub komprehensif** dirancang ulang total:
  - Bagian 1: 12 topik materi dalam grid kartu (tersedia / segera hadir)
  - Bagian 2: 10 container paket soal latihan
  - Quick-nav anchor (#materi / #soal)
- `indonesia-umum/materi/index.html` — hub materi dengan 12 kartu topik berwarna,
  progress bar ketersediaan, badge status setiap topik
- `indonesia-umum/materi/pahlawan-nasional.html` — **slideshow materi pertama** (12 slide):
  - Slide penuh layar, proyektor-friendly (tema merah-putih)
  - Navigasi keyboard ← → dan sentuh (swipe)
  - Konten: Ki Hajar Dewantara, R.A. Kartini, Pangeran Diponegoro,
    Jenderal Sudirman, Cut Nyak Dien, Sultan Hasanuddin,
    Tuanku Imam Bonjol, Pattimura + tokoh lainnya
  - Slide rangkuman tabel + tombol CTA ke soal latihan

### Daftar 12 Topik Materi Indonesia & Umum
| # | Slug | Status |
|---|---|---|
| 1 | kemerdekaan-indonesia | Segera Hadir |
| 2 | pahlawan-nasional | ✅ Tersedia |
| 3 | pancasila-uud1945 | Segera Hadir |
| 4 | lambang-simbol-negara | Segera Hadir |
| 5 | geografi-indonesia | Segera Hadir |
| 6 | kebudayaan-nusantara | Segera Hadir |
| 7 | pemerintahan-indonesia | Segera Hadir |
| 8 | flora-fauna-indonesia | Segera Hadir |
| 9 | negara-ibukota-dunia | Segera Hadir |
| 10 | organisasi-internasional | Segera Hadir |
| 11 | penemuan-penemu | Segera Hadir |
| 12 | hari-penting | Segera Hadir |

---

## [1.0.0] — 2025-06-08

### Ditambahkan
- Struktur repositori awal: tiga kategori (Indonesia & Umum, Sains, Matematika)
- `index.html` — halaman utama / hub kategori
- `assets/css/style.css` — stylesheet bersama (landing, category, quiz engine)
- `assets/js/quiz-engine.js` — engine soal slideshow dengan timer countdown SVG
  - Tampilan slideshow per soal, proyektor-friendly
  - Timer countdown visual (lingkaran SVG, warna berubah hijau→oranye→merah)
  - Reveal jawaban + pembahasan detail
  - Keyboard shortcut: Spasi, →, F (fullscreen)
  - Badge soal Bahasa Inggris 🇬🇧
- Halaman kategori masing-masing (`indonesia-umum/`, `sains/`, `matematika/`)
  - `index.html` — hub kategori
  - `materi/index.html` — placeholder materi (segera hadir)
  - `soal/index.html` — daftar paket soal
  - `soal/paket-01.html` — halaman quiz paket perdana
  - `soal/data/paket-01.json` — 10 soal contoh per kategori (target: 40 soal)

---

## [Unreleased]

### Status Saat Ini
Semua halaman materi ketiga kategori sudah tersedia (lihat v1.1.1 dan v1.1.2).
Pool soal masing-masing kategori berjumlah 300 soal (90% ID / 10% EN).

### Direncanakan
- Paket soal 02, 03, dst. untuk masing-masing kategori (berbasis pool yang sudah ada)
- Perbaikan teks `soal/index.html` di ketiga kategori (masih tertulis "40 soal / paket")
- Penghapusan `paket-01.json` lama yang sudah tidak dipakai (diganti pool.json)
