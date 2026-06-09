# CHANGELOG

Semua perubahan signifikan pada proyek ini didokumentasikan di file ini.  
Format mengikuti [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

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

### Direncanakan
- Penambahan soal hingga 40 per paket untuk semua kategori
- Paket soal 02, 03, dst.
- Halaman materi pembelajaran berbasis slideshow
- Tambahan kategori bila diperlukan
