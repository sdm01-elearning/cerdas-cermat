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

## [AR-003] — v1.2.0 · Soal Campuran

**Tanggal:** 2026-06-14
**Cakupan:** `soal-campuran.html` (baru), `index.html` (dimodifikasi)

### Perubahan
- Mode quiz baru: 30 soal acak dari tiga pool sekaligus (10 per kategori)
- Merger script berjalan sebelum quiz-engine.js dimuat (inject dinamis)
- Blob URL dipakai sebagai jembatan antara merger script dan quiz-engine

### Risiko Regresi

| Area | Risiko | Mitigasi |
|---|---|---|
| Path pool.json | Jika folder kategori diubah namanya, fetch akan gagal | Jangan ubah nama folder `indonesia-umum/`, `sains/`, `matematika/` |
| Blob URL & file:// | Blob URL tidak bisa di-fetch dari `file://` | Selalu akses via GitHub Pages atau `python3 -m http.server` |
| quiz-engine.js inject dinamis | Script diinjeksi setelah Blob siap — jika ada race condition di browser lama | Test di Chrome/Firefox terbaru; IE tidak didukung |
| KaTeX render timing | MutationObserver harus terpasang sebelum quiz-engine menulis DOM | KaTeX observer dipasang saat `DOMContentLoaded`, sebelum quiz-engine inject |
| `shuffle: false` di QUIZ_CONFIG | Jika diubah `true`, quiz-engine akan stratified-sample ulang dari 30 soal (bukan masalah, tapi komposisi per-kategori tidak lagi terjamin) | Biarkan `shuffle: false` di `soal-campuran.html` — acak sudah dilakukan di merger script |

### Checklist Validasi

- [ ] Buka `soal-campuran.html` via GitHub Pages atau lokal HTTP server
- [ ] Verifikasi loading spinner muncul selama fetch pool
- [ ] Pastikan tepat 30 soal muncul (header: "30 soal acak")
- [ ] Pastikan ada soal dari ketiga kategori (cek topik di badge)
- [ ] Pastikan soal Matematika dengan LaTeX ter-render dengan benar
- [ ] Tombol "← Kembali" mengarah ke `index.html` root ✓
- [ ] Test keyboard: Spasi, →, F (fullscreen)
- [ ] Buka ulang beberapa kali — pastikan komposisi soal berbeda setiap sesi

---

## [AR-004] — v1.4.0 · Latihan Tahap 3 (Batch 1)

**Tanggal:** 2026-07-15
**Cakupan:** `latihan-tahap3.html` (baru), `latihan-tahap3/soal/data/pool.json` (baru),
`index.html` (dimodifikasi)

### Perubahan
- Halaman & pool baru untuk Latihan Tahap 3, pola identik dengan Tahap 1/2.
- Skema mapel berubah: **Pendidikan Pancasila kini mapel mandiri**, terpisah dari
  IPS (sebelumnya digabung sebagai "IPS & Pendidikan Pancasila" di Tahap 2).
  Total mapel di pool Tahap 3: Matematika, Bahasa Indonesia, IPS, Pendidikan
  Pancasila, IPA, Bahasa Inggris (6 mapel).
- Kebijakan baru: field `jawaban` **wajib singkat** (kata/angka/frasa pendek).
  Ini bukan perubahan struktur JSON (field tetap sama), melainkan perubahan
  kebijakan pengisian konten untuk mencegah repeat masalah "jawaban terlalu
  panjang" yang dikeluhkan pada sebagian soal Tahap 2.

### Risiko Regresi

| Area | Risiko | Mitigasi |
|---|---|---|
| Nilai `mapel` baru "Pendidikan Pancasila" | Kode/filter apa pun yang mengasumsikan hanya 5 nilai mapel (seperti pool Tahap 1/2) akan melewatkan mapel ini | quiz-engine.js tidak melakukan filter per-mapel (hanya menampilkan `s.topik` sebagai badge), jadi aman untuk saat ini; tetap dicatat bila nanti dibuat fitur filter per-mapel |
| Proporsi `bahasa: "en"` | Pool Tahap 3 batch 1 punya ~20% soal EN (22/106) karena Bahasa Inggris kini mapel sejajar, bukan sisipan ~10% seperti Tahap 1/2 — namun `stratifiedSample()` di quiz-engine.js tetap memaksa ~10% EN per sesi 30 soal, sehingga proporsi tampil Bahasa Inggris bisa lebih rendah dari mapel lain saat sesi acak | Belum diubah — perlu keputusan eksplisit sebelum mengubah `stratifiedSample()` karena dipakai bersama oleh pool Tahap 1/2/Soal Campuran |
| Cakupan kisi-kisi belum 100% | Batch 1 baru mencakup topik prioritas (terutama Bahasa Inggris: 22 dari 26 subtopik kisi-kisi) | Batch 2+ akan melengkapi subtopik yang tersisa; jangan anggap batch 1 sebagai representasi lengkap kisi-kisi Tahap 3 saat menyusun latihan tatap muka |
| `id` soal | id batch 1 berurutan 1–106, unik | Batch 2 harus mulai dari id 107 agar tidak collision (ikuti pola Tahap 1/2) |
| Grid `bottom-row-4` di `index.html` | Menambah 1 kolom dari `bottom-row-3` — breakpoint responsif diperbarui (2 kolom di <1100px, 1 kolom di <600px) | Sudah ditest secara visual di lebar 1400/1000/500px (mental check); disarankan cek ulang di browser sungguhan sebelum tampil di depan siswa |

### Checklist Validasi

- [ ] Buka `latihan-tahap3.html` via GitHub Pages atau lokal HTTP server
- [ ] Pastikan 30 soal acak muncul dan badge topik tampil per soal
- [ ] Cek minimal 3 soal dari tiap mapel (Matematika, Bahasa Indonesia, IPS,
      Pendidikan Pancasila, IPA, Bahasa Inggris) — pastikan field `jawaban`
      pendek dan wajar dibacakan cepat
- [ ] Kartu "Latihan Tahap 3" tampil benar di `index.html`, warna tidak
      tabrakan dengan 3 kartu lain, responsif di layar sempit
- [ ] Link kartu mengarah ke `latihan-tahap3.html` ✓
- [ ] Test keyboard: Spasi, →, F (fullscreen)

---

## [AR-005] — v1.5.0 · Latihan Tahap 3 (Batch 2)

**Tanggal:** 2026-07-15
**Cakupan:** `latihan-tahap3/soal/data/pool.json` (ditambah, bukan diganti),
`index.html` (label pool diperbarui)

### Perubahan
- +100 soal baru (id 107–206), total pool 206 soal.
- Seluruh 26 subtopik kisi-kisi Bahasa Inggris kini tercakup 100% (batch 1
  baru 22/26).
- Tidak ada perubahan struktur field/skema JSON — murni penambahan data.

### Risiko Regresi

| Area | Risiko | Mitigasi |
|---|---|---|
| Kontinuitas id | Batch 2 harus lanjut dari id 106 (bukan mulai dari 1 lagi) agar `latihan-tahap3.html`/tools lain yang mungkin menyimpan progres per-id tidak bentrok | Divalidasi otomatis oleh skrip generator (`ids == sorted(set(ids))`), id 107–206 dikonfirmasi unik & berurutan |
| Duplikasi konten | 22 subtopik Bahasa Inggris yang sudah ada di batch 1 mendapat soal ke-2 — berisiko soal terasa mirip/repetitif jika sesi 30-soal kebetulan menarik keduanya | Soal ke-2 ditulis dengan sudut pandang/fakta berbeda dari soal batch 1 pada topik yang sama (bukan duplikat/variasi angka saja) |
| Label pool di `index.html` | Jika lupa diperbarui, akan menampilkan angka lama (106) meski pool sudah 206 | Sudah diperbarui pada rilis ini — cek ulang di rilis berikutnya bila batch 3 ditambahkan |
| Kebijakan "jawaban singkat" | Berlaku juga untuk seluruh soal baru | Divalidasi otomatis (≤6 kata) sebelum file ditulis, konsisten dengan batch 1 |

### Checklist Validasi

- [ ] Reload `latihan-tahap3.html`, pastikan soal-soal baru (mis. tentang Borobudur,
      Eiffel Tower, Snow White) bisa muncul dalam sesi acak
- [ ] Cek badge kartu di `index.html` menampilkan "Pool: 206 soal"
- [ ] Ambil sampel acak beberapa soal Bahasa Inggris — pastikan tidak ada
      subtopik yang masih kosong (26/26 subtopik kini terisi)
- [ ] Pastikan tidak ada soal dengan `id` duplikat setelah batch 1+2 digabung

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
