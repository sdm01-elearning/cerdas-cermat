# ANTIREGRESI — Cerdas Cermat SDM 01 Kukusan

Dokumen ini mencatat risiko regresi dan langkah pencegahannya untuk setiap perubahan besar.  
Diperbarui setiap kali ada perubahan yang berpotensi merusak fungsi yang sudah berjalan.

---

## [AR-001] — v1.0.0 · Inisialisasi Proyek

**Tanggal:** 2025-06-08  
**Versi:** 1.0.0  
**Cakupan:** Semua file baru — tidak ada regresi dari versi sebelumnya.

### Komponen Baru yang Dibuat

| File | Fungsi | Risiko Ke Depan |
|---|---|---|
| `assets/js/quiz-engine.js` | Engine soal (fetch JSON, timer, reveal) | Perubahan struktur JSON akan break engine |
| `assets/css/style.css` | Semua style (landing + quiz) | Perubahan class `.qe-*` harus sinkron dengan engine |
| `*/soal/data/paket-*.json` | Data soal | Field wajib: `teks`, `jawaban`, `pembahasan`, `waktu`, `bahasa` |

### Ketergantungan Kritis

```
paket-XX.html
  └── memuat quiz-engine.js
        └── fetch() → data/paket-XX.json
              └── field wajib: soal[].teks, .jawaban, .pembahasan, .waktu, .bahasa
```

### Checklist Validasi Saat Menambah Paket Baru

- [ ] File JSON valid (tidak ada syntax error — cek di jsonlint.com)
- [ ] Semua soal memiliki field: `id`, `teks`, `jawaban`, `pembahasan`, `waktu`, `bahasa`
- [ ] Proporsi soal bahasa Inggris ~10% (`"bahasa": "en"`)
- [ ] `paket-XX.html` sudah menunjuk ke `dataUrl` yang benar
- [ ] Link paket baru sudah ditambahkan di `soal/index.html`
- [ ] Buka halaman quiz di browser dan tes minimal 3 soal pertama

---

## [AR-002] — v1.1.0 · Hub Materi + Logo + Slideshow Perdana

**Tanggal:** 2025-06-09
**Cakupan:** `index.html`, `indonesia-umum/index.html`, `indonesia-umum/materi/index.html`, `indonesia-umum/materi/pahlawan-nasional.html`, `assets/img/logo-sdm01.svg`

### Perubahan
- Logo sekolah ditambahkan ke landing page
- `indonesia-umum/index.html` dirancang ulang sebagai hub dua-bagian (materi + soal)
- Hub materi dengan 12 kartu topik
- Slideshow materi pertama: Pahlawan Nasional (12 slide)

### Risiko Regresi

| Area | Risiko | Mitigasi |
|---|---|---|
| Logo SVG | File besar (880KB), potensi lambat di koneksi lemah | Pertimbangkan kompresi/optimasi SVG ke depan |
| Link materi di hub | Kartu "Segera Hadir" mengarah ke `materi/index.html`, bukan halaman topik | Saat materi baru tersedia, ubah `href` DAN `available: True` di hub |
| Slideshow navigasi | Tombol Next/Prev disable di ujung — tidak ada infinite loop | Pastikan `TOTAL = 12` di JS selalu sinkron dengan jumlah `<div class="slide">` |
| Path relatif asset | Slideshow di `materi/` menggunakan `../../assets/` — salah jika dipindah | Jangan pindahkan file materi ke subfolder lain tanpa update path |

### Checklist Validasi Saat Menambah Materi Baru

- [ ] Buat file HTML di `[kategori]/materi/[slug].html` (duplikat `pahlawan-nasional.html`)
- [ ] Update `available: True` di hub `materi/index.html` (ubah `avail=False` → `True` di Python, atau edit HTML langsung)
- [ ] Update `indonesia-umum/index.html` — ubah `avail` di fungsi `make_materi_card` untuk slug tersebut
- [ ] Pastikan link CTA di akhir slideshow mengarah ke paket soal yang relevan
- [ ] Test buka di browser: navigasi ← →, fullscreen, mobile swipe
- [ ] Pastikan `TOTAL = N` di JS sesuai jumlah `<div class="slide">` aktual

---

## Panduan Pengisian ANTIREGRESI ke Depan

Setiap kali membuat perubahan besar, tambahkan section baru:

```markdown
## [AR-XXX] — vX.Y.Z · Judul Perubahan

**Tanggal:** YYYY-MM-DD
**Cakupan:** File yang diubah

### Perubahan
- Deskripsi perubahan

### Risiko Regresi
| Area | Risiko | Mitigasi |
|---|---|---|
| ... | ... | ... |

### Checklist Validasi
- [ ] ...
```
