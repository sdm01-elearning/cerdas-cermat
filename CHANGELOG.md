# CHANGELOG

Semua perubahan signifikan pada proyek ini didokumentasikan di file ini.  
Format mengikuti [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

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
