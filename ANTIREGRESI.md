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

## [AR-006] — v1.6.0 · Latihan Tahap 3 (Batch 3)

**Tanggal:** 2026-07-16
**Cakupan:** `latihan-tahap3/soal/data/pool.json` (ditambah), `index.html`
(label pool diperbarui)

### Perubahan
- +96 soal baru (id 207–302), total pool 302 soal.
- Menambah kedalaman ke-2/ke-3 di seluruh topik non-Inggris, dan kedalaman
  ke-2 (rata-rata 3 soal/subtopik) untuk seluruh 26 subtopik Bahasa Inggris.
- Skrip generator kini menambahkan **pengecekan duplikat teks soal** di
  seluruh pool gabungan, tidak hanya batch berjalan — mendeteksi bila suatu
  saat ada soal yang tidak sengaja ditulis ulang persis sama.

### Risiko Regresi

| Area | Risiko | Mitigasi |
|---|---|---|
| Kontinuitas id | Batch 3 harus lanjut dari id 206 | Divalidasi otomatis, id 207–302 unik & berurutan |
| Kemiripan soal antar batch | Beberapa topik kini punya 3+ soal — risiko soal terasa mirip meski faktanya berbeda (mis. beberapa soal UUD 1945 tentang pasal berbeda-beda) | Ditinjau manual saat penyusunan agar tiap soal menanyakan fakta/pasal/aspek yang benar-benar berbeda, bukan variasi angka dari soal yang sama |
| Duplikat teks soal | Dengan pool yang makin besar, risiko menulis ulang pertanyaan yang sama persis meningkat | Ditambahkan validasi otomatis (`teks_list` dicek duplikat) — lolos untuk batch 1-3 |
| Label pool di `index.html` | Bisa tertinggal menunjukkan angka lama | Diperbarui ke "Pool: 302 soal" pada rilis ini |

### Checklist Validasi

- [ ] Reload `latihan-tahap3.html`, cek soal-soal baru (mis. tentang Ngaben,
      W.R. Supratman, Papua New Guinea) bisa muncul dalam sesi acak
- [ ] Cek badge kartu di `index.html` menampilkan "Pool: 302 soal"
- [ ] Spot-check beberapa soal Matematika baru secara manual (skala peta,
      rasio total, keliling) — pastikan perhitungan pembahasan benar
- [ ] Pastikan tidak ada `id` atau `teks` duplikat setelah batch 1+2+3
      digabung (sudah divalidasi otomatis oleh skrip, disarankan spot-check
      ulang oleh guru pendamping)

---

## [AR-007] — v1.7.0 · Sampling Per-Mapel untuk Latihan Tahap 3 (Perubahan Engine Bersama)

**Tanggal:** 2026-07-16
**Cakupan:** `assets/js/quiz-engine.js` (dipakai bersama semua halaman quiz),
`latihan-tahap3.html` (mengaktifkan opsi baru)

**⚠️ Ini satu-satunya AR sejauh ini yang menyentuh file bersama
(`quiz-engine.js`) — dampaknya berpotensi lintas halaman, jadi ditinjau
lebih ketat dari AR sebelumnya.**

### Perubahan
- Menambahkan fungsi `stratifiedSampleByMapel()` dan opsi
  `QUIZ_CONFIG.stratifyBy` (`'bahasa'` default / `'mapel'`).
- Hanya `latihan-tahap3.html` yang diubah untuk memakai `stratifyBy: 'mapel'`.
  `latihan-tahap1.html`, `latihan-tahap2.html`, dan halaman Soal Campuran
  **tidak disentuh sama sekali** — tetap memakai `stratifiedSample()` lama
  secara default karena tidak men-set `stratifyBy`.

### Mengapa Aman (Non-Regresi)
1. Fungsi lama `stratifiedSample()` tidak diubah satu baris pun (lihat diff
   di commit ini) — hanya ditambah pengecekan `cfg.stratifyBy === 'mapel'`
   sebagai percabangan baru sebelum jatuh ke fungsi lama sebagai default.
2. `stratifiedSampleByMapel()` adalah fungsi baru yang berdiri sendiri,
   tidak memanggil atau memodifikasi `stratifiedSample()`.
3. Halaman manapun yang tidak menambahkan `stratifyBy: 'mapel'` di
   `QUIZ_CONFIG`-nya otomatis memakai jalur kode lama — termasuk paket
   materi (`cerdas-cermat/*/soal/paket-XX.json`) dan hub yang mungkin
   memakai `quiz-engine.js` yang sama.

### Risiko Regresi

| Area | Risiko | Mitigasi |
|---|---|---|
| Pool dengan mapel timpang jauh | Jika suatu saat ada mapel dengan pool sangat kecil (mis. < 5 soal saat target 5/sesi), `stratifiedSampleByMapel` akan otomatis mengisi kekurangan dari mapel lain (lihat blok "isi kekurangan" di kode) — sesi tetap 30 soal, tapi proporsi mapel itu turun di bawah target untuk sesi tersebut | Sudah ditangani di kode; divalidasi lewat simulasi 5.000 sesi (semua sesi tetap tepat 30 soal) |
| Halaman lain yang lupa/sengaja tidak set `stratifyBy` | Tetap pakai default `'bahasa'` — TIDAK otomatis ikut merata per mapel | Ini disengaja (backward compatible); jika suatu saat Tahap 1/2 ingin perilaku sama, harus ditambahkan eksplisit `stratifyBy: 'mapel'` di HTML masing-masing, bukan mengubah default global |
| `_lainnya` fallback key | Jika ada soal tanpa field `mapel` terisi, otomatis masuk grup `_lainnya` dan tetap dapat alokasi rata seperti mapel lain | Tidak relevan untuk pool saat ini (semua soal Tahap 1/2/3 sudah punya `mapel` terisi), dicatat untuk jaga-jaga |

### Checklist Validasi

- [ ] Buka `latihan-tahap3.html`, jalankan beberapa sesi berturut-turut,
      hitung manual badge topik → pastikan tiap mapel muncul ~5x per 30 soal
- [ ] Buka `latihan-tahap1.html` dan `latihan-tahap2.html`, pastikan
      perilaku tidak berubah (soal EN tetap ~10%, seperti sebelumnya)
- [ ] Jika ada halaman lain yang memakai `quiz-engine.js` (mis. paket materi
      per topik), pastikan tetap berjalan normal tanpa error JS di console

---

## [AR-008] — v1.8.0 · Latihan Tahap 3 (Batch 4)

**Tanggal:** 2026-07-17
**Cakupan:** `latihan-tahap3/soal/data/pool.json` (ditambah), `index.html`
(label pool diperbarui)

### Perubahan
- +96 soal baru (id 303–398), total pool 398 soal.
- Kedalaman topik non-Inggris kini rata-rata 6-12 soal/topik; Bahasa
  Inggris rata-rata ~4 soal/subtopik (26 subtopik x ~4).

### Risiko Regresi

| Area | Risiko | Mitigasi |
|---|---|---|
| Kontinuitas id | Batch 4 harus lanjut dari id 302 | Divalidasi otomatis, id 303–398 unik & berurutan |
| Interaksi dengan `stratifyBy: 'mapel'` (AR-007) | Pool yang makin besar & timpang antar mapel (Bahasa Inggris 100 vs Pendidikan Pancasila 44) berpotensi mengubah perilaku sampling | Disimulasikan ulang 5.000 sesi pada pool 398 soal — hasil tetap tepat 5 soal/mapel/sesi, tidak terpengaruh ukuran pool per mapel karena `stratifiedSampleByMapel` mengambil sampel acak dari tiap grup terlepas dari ukuran totalnya |
| Soal dengan konten sensitif/berubah cepat | Ada godaan menambahkan soal tentang topik yang sedang berkembang (mis. status Ibu Kota Nusantara) — berisiko keliru karena bisa berubah setelah cutoff pengetahuan | Sengaja dihindari pada batch ini; topik NKRI diarahkan ke fakta yang stabil (pemilihan presiden langsung, otonomi daerah) |
| Label pool di `index.html` | Bisa tertinggal menunjukkan angka lama | Diperbarui ke "Pool: 398 soal" pada rilis ini |

### Checklist Validasi

- [ ] Reload `latihan-tahap3.html`, cek soal-soal baru bisa muncul dalam
      sesi acak dan tetap 5 soal/mapel per sesi
- [ ] Cek badge kartu di `index.html` menampilkan "Pool: 398 soal"
- [ ] Spot-check soal Matematika baru (pembagian pecahan, luas segitiga,
      kecepatan-jarak) — pastikan perhitungan pembahasan benar
- [ ] Pastikan tidak ada `id`/`teks` duplikat setelah batch 1-4 digabung

---

## [AR-009] — v1.9.0 · Latihan Tahap 3 (Batch 5)

**Tanggal:** 2026-07-17
**Cakupan:** `latihan-tahap3/soal/data/pool.json` (ditambah), `index.html`
(label pool diperbarui)

### Perubahan
- +96 soal baru (id 399–494), total pool 494 soal.
- Bahasa Inggris kini melengkapi seluruh 5 samudra dunia sebagai satu
  sub-tema penuh di bawah subtopik Oceans.

### Risiko Regresi

| Area | Risiko | Mitigasi |
|---|---|---|
| Kontinuitas id | Batch 5 harus lanjut dari id 398 | Divalidasi otomatis, id 399–494 unik & berurutan |
| Ukuran pool Bahasa Inggris makin dominan (126 dari 494, ~25%) | Berpotensi mengubah *rasa* proporsi pool meski sampling per sesi tetap merata | Tidak berdampak pada sesi latihan (tetap 5/mapel berkat `stratifyBy: 'mapel'`); dicatat sebagai pertimbangan bila batch depan ingin menyeimbangkan ukuran pool antar mapel demi kerapian data, bukan demi fungsi |
| Fakta yang berpotensi sensitif/berubah (mis. jumlah pulau Indonesia, provinsi) | Angka seperti "17.000 pulau" bisa sedikit bervariasi tergantung sumber/metode hitung | Dipilih angka yang umum dan stabil digunakan dalam materi pendidikan SD, bukan angka presisi yang mudah diperdebatkan |
| Label pool di `index.html` | Bisa tertinggal menunjukkan angka lama | Diperbarui ke "Pool: 494 soal" pada rilis ini |

### Checklist Validasi

- [ ] Reload `latihan-tahap3.html`, cek soal-soal baru bisa muncul dan tetap
      5 soal/mapel per sesi
- [ ] Cek badge kartu di `index.html` menampilkan "Pool: 494 soal"
- [ ] Spot-check soal IPS baru yang menyangkut sejarah (EIC, Garis Wallace,
      naskah klad) — pastikan istilah tidak membingungkan untuk siswa SD
- [ ] Pastikan tidak ada `id`/`teks` duplikat setelah batch 1-5 digabung

---

## [AR-010] — v1.10.0 · Latihan Tahap 3 (Batch 6)

**Tanggal:** 2026-07-17
**Cakupan:** `latihan-tahap3/soal/data/pool.json` (ditambah), `index.html`
(label pool diperbarui)

### Perubahan
- +96 soal baru (id 495–590), total pool 590 soal.
- Lambang seluruh 5 sila Pancasila kini lengkap tersebar di pool (bintang,
  rantai, pohon beringin, kepala banteng, padi & kapas).
- Skrip generator mendapat pengecekan baru: pasangan (topik, jawaban) yang
  berulang dilaporkan sebagai info (bukan blocker) untuk membantu tinjauan
  manual.

### Risiko Regresi

| Area | Risiko | Mitigasi |
|---|---|---|
| Kontinuitas id | Batch 6 harus lanjut dari id 494 | Divalidasi otomatis, id 495–590 unik & berurutan |
| Pool sangat besar (590 soal) | Semakin besar pool, semakin sulit meninjau manual satu per satu; risiko soal dengan kualitas/akurasi lebih rendah meningkat seiring skala | Setiap fakta baru tetap ditulis dan diverifikasi manual terhadap pengetahuan umum sebelum dimasukkan ke skrip; pengecekan pasangan topik+jawaban membantu menandai soal yang perlu ditinjau ulang |
| Kelelahan pola soal (fatigue) | Beberapa topik kini punya 10-15+ soal — berpotensi soal terasa "template" meski faktanya berbeda | Belum ada mitigasi otomatis; disarankan uji coba lapangan sebelum batch 7 untuk masukan langsung dari guru/siswa |
| Label pool di `index.html` | Bisa tertinggal menunjukkan angka lama | Diperbarui ke "Pool: 590 soal" pada rilis ini |

### Checklist Validasi

- [ ] Reload `latihan-tahap3.html`, cek soal-soal baru bisa muncul dan tetap
      5 soal/mapel per sesi
- [ ] Cek badge kartu di `index.html` menampilkan "Pool: 590 soal"
- [ ] **Disarankan:** lakukan sesi latihan sungguhan dengan siswa sebelum
      menambah batch berikutnya, kumpulkan catatan soal mana yang perlu
      direvisi (ambigu, terlalu sulit/mudah, atau jawabannya membingungkan)

---

## [AR-011] — v1.11.0 · Latihan Tahap 3 (Batch 7)

**Tanggal:** 2026-07-17
**Cakupan:** `latihan-tahap3/soal/data/pool.json` (ditambah), `index.html`
(label pool diperbarui)

### Perubahan
- +96 soal baru (id 591–686), total pool 686 soal.

### Risiko Regresi

| Area | Risiko | Mitigasi |
|---|---|---|
| Kontinuitas id | Batch 7 harus lanjut dari id 590 | Divalidasi otomatis, id 591–686 unik & berurutan |
| Skala pool sangat besar (686 soal) | Semakin sulit ditinjau manual menyeluruh; beberapa fakta yang lebih niche (mis. Van den Bosch, Sutan Syahrir, konvensi ketatanegaraan) berpotensi terlalu detail untuk sebagian siswa SD | Tingkat kesulitan (`level`) sudah ditandai "sulit" untuk fakta-fakta ini agar host/guru bisa menyesuaikan; disarankan tinjauan guru sebelum tayang untuk menyaring soal yang dirasa terlalu berat |
| Label pool di `index.html` | Bisa tertinggal menunjukkan angka lama | Diperbarui ke "Pool: 686 soal" pada rilis ini |

### Checklist Validasi

- [ ] Reload `latihan-tahap3.html`, cek soal-soal baru bisa muncul dan tetap
      5 soal/mapel per sesi
- [ ] Cek badge kartu di `index.html` menampilkan "Pool: 686 soal"
- [ ] **Sangat disarankan:** sebelum batch 8, uji pool 686 soal ini dengan
      sesi latihan nyata bersama siswa dan guru pendamping. Tandai soal yang
      terasa ambigu/terlalu sulit agar bisa direvisi, bukan sekadar ditambah
      terus dari sisi kuantitas.

---

## [AR-012] — v1.12.0 · Latihan Tahap 3 (Batch 8)

**Tanggal:** 2026-07-17
**Cakupan:** `latihan-tahap3/soal/data/pool.json` (ditambah), `index.html`
(label pool diperbarui)

### Perubahan
- +96 soal baru (id 687–782), total pool 782 soal. Menuju target 1000
  soal (10 batch) sesuai kesepakatan dengan penyusun materi.

### Risiko Regresi

| Area | Risiko | Mitigasi |
|---|---|---|
| Kontinuitas id | Batch 8 harus lanjut dari id 686 | Divalidasi otomatis, id 687–782 unik & berurutan |
| Rencana batch 10 tidak seragam (122 soal, bukan 96) | Skrip generator batch 10 nanti perlu penyesuaian jumlah soal per mapel agar totalnya tetap genap 1000 dan proporsional | Dicatat di sini sebagai pengingat eksplisit sebelum batch 10 disusun |
| Label pool di `index.html` | Bisa tertinggal menunjukkan angka lama | Diperbarui ke "Pool: 782 soal" pada rilis ini |

### Checklist Validasi

- [ ] Reload `latihan-tahap3.html`, cek soal-soal baru bisa muncul dan tetap
      5 soal/mapel per sesi
- [ ] Cek badge kartu di `index.html` menampilkan "Pool: 782 soal"

---

## [AR-013] — v1.13.0 · Latihan Tahap 3 (Batch 9)

**Tanggal:** 2026-07-17
**Cakupan:** `latihan-tahap3/soal/data/pool.json` (ditambah), `index.html`
(label pool diperbarui)

### Perubahan
- +96 soal baru (id 783–878), total pool 878 soal.

### Risiko Regresi

| Area | Risiko | Mitigasi |
|---|---|---|
| Kontinuitas id | Batch 9 harus lanjut dari id 782 | Divalidasi otomatis, id 783–878 unik & berurutan |
| Batch 10 (terakhir) berukuran tidak standar (+122, bukan +96) | Skrip generator batch 10 perlu alokasi soal per mapel yang disesuaikan (bukan pola 18/12/16/8/16/26 seperti biasa) agar total genap 1000 dan proporsi mapel tetap wajar | Perlu direncanakan eksplisit saat menyusun batch 10 — lihat rencana di CHANGELOG v1.13.0 |
| Label pool di `index.html` | Bisa tertinggal menunjukkan angka lama | Diperbarui ke "Pool: 878 soal" pada rilis ini |

### Checklist Validasi

- [ ] Reload `latihan-tahap3.html`, cek soal-soal baru bisa muncul dan tetap
      5 soal/mapel per sesi
- [ ] Cek badge kartu di `index.html` menampilkan "Pool: 878 soal"

---

## [AR-014] — v2.0.0 · Latihan Tahap 3 (Batch 10 — TERAKHIR, Target 1000 Soal Tercapai)

**Tanggal:** 2026-07-17
**Cakupan:** `latihan-tahap3/soal/data/pool.json` (ditambah, target akhir
tercapai), `index.html` (label pool diperbarui)

**🎯 Ini adalah AR penutup untuk fase pembuatan soal Latihan Tahap 3.**
Pool kini genap 1000 soal, menyamai skala Latihan Tahap 1 dan Tahap 2.

### Perubahan
- +122 soal baru (id 879–1000) — alokasi disesuaikan (bukan pola +96
  standar) agar totalnya tepat 1000: Matematika +18, Bahasa Indonesia +12,
  IPS +16, Pendidikan Pancasila +8, IPA +16, Bahasa Inggris +52 (2
  soal/subtopik untuk seluruh 26 subtopik).
- Field `meta.status` ditambahkan ke `pool.json` untuk menandai bahwa
  fase pembuatan soal telah selesai.

### Insiden yang Tertangkap Validasi (dan diperbaiki)
Draf awal batch ini sempat memuat pertanyaan "What does UNESCO stand
for?" dengan jawaban ekspansi penuh 8 kata (melanggar kebijakan jawaban
singkat ≤ 6 kata). Ini terdeteksi otomatis oleh skrip validasi generator
sebelum file final ditulis, dan diperbaiki dengan mengganti soal menjadi
pertanyaan lain (UNESCO bernaung di bawah organisasi apa → "United
Nations") yang tetap membahas topik sama namun jawabannya singkat. Ini
menjadi bukti bahwa lapisan validasi otomatis yang dibangun sejak batch 1
berhasil menangkap pelanggaran sebelum sampai ke produk akhir.

### Risiko Regresi

| Area | Risiko | Mitigasi |
|---|---|---|
| Kontinuitas id | Batch 10 harus lanjut dari id 878, dan merupakan batch terakhir (tidak ada batch 11 untuk pembuatan soal awal) | Divalidasi otomatis, id 879–1000 unik & berurutan, total tepat 1000 (assert eksplisit di skrip generator) |
| Alokasi tidak seragam (+122, bukan +96) | Risiko human error dalam menghitung alokasi per mapel agar totalnya pas 1000 | Dihitung eksplisit di kepala skrip generator (komentar alokasi) dan divalidasi dengan `assert len(combined) == 1000` yang menghentikan proses jika meleset |
| Ukuran akhir per mapel tidak seragam (92-282) | Bahasa Inggris jauh lebih besar (282) dibanding Pendidikan Pancasila (92) — bisa terkesan tidak seimbang jika dilihat sebagai proporsi pool mentah | Tidak berdampak pada pengalaman latihan karena sampling tetap 5/mapel/sesi (`stratifyBy: 'mapel'`); jika nanti dibangun mode latihan per-mapel terpisah, perlu diperhatikan bahwa "kedalaman" Bahasa Inggris lebih tinggi dari mapel lain |
| Label pool di `index.html` | Bisa tertinggal menunjukkan angka lama | Diperbarui ke "Pool: 1000 soal" pada rilis ini |

### Checklist Validasi

- [ ] Reload `latihan-tahap3.html`, cek soal-soal baru bisa muncul dan tetap
      5 soal/mapel per sesi
- [ ] Cek badge kartu di `index.html` menampilkan "Pool: 1000 soal"
- [ ] **Sangat disarankan sebelum digunakan di siaran:** lakukan minimal
      beberapa sesi uji coba lapangan dengan siswa dan guru pendamping
      untuk memvalidasi kualitas soal secara langsung, karena pool sebesar
      ini (1000 soal, dibuat dalam 10 batch berurutan tanpa jeda uji coba
      di tengah jalan) belum pernah diuji dengan pengguna sungguhan.
- [ ] Diskusikan dan rencanakan desain mode latihan per-mapel/kategori
      sebelum implementasi (lihat rencana di CHANGELOG v2.0.0)

---

## [AR-015] — v2.1.0 · Latihan per Babak (Round 1, 2, 5, 6)

**Tanggal:** 2026-07-18
**Cakupan:** `assets/js/quiz-engine.js` (ditambah, additive), `index.html`
(tautan baru), file baru: `latihan-tahap3-babak.html`,
`latihan-tahap3-babak1.html`, `latihan-tahap3-babak2.html`,
`latihan-tahap3-babak5.html`, `latihan-tahap3-babak6.html`

**⚠️ AR ini menyentuh `quiz-engine.js` (file bersama) — sama seperti
AR-007, ditinjau lebih ketat karena berdampak lintas halaman.**

### Perubahan
- Dua config baru di `quiz-engine.js`: `mapelFilter` dan `fixedWaktu`,
  keduanya opsional, default tidak aktif.
- 5 halaman HTML baru untuk latihan per-babak (lihat CHANGELOG v2.1.0
  untuk detail tiap babak).
- Babak 5 (Arena Hitung) memakai **script mandiri**, sengaja TIDAK
  memakai `quiz-engine.js`, karena model budget-waktu-bersama +
  navigasi bebasnya secara fundamental berbeda dari model linear
  per-soal milik engine utama. Ini murni keputusan desain untuk
  meminimalkan risiko regresi pada `quiz-engine.js` — bukan celah teknis.

### Mengapa Aman (Non-Regresi)
1. `mapelFilter` dan `fixedWaktu` adalah percabangan kondisional baru
   (`if (cfg.mapelFilter) {...}`, `cfg.fixedWaktu || s.waktu || 10`) —
   keduanya no-op ketika config tidak diset, yaitu kondisi seluruh
   halaman lain (`latihan-tahap1.html`, `latihan-tahap2.html`,
   `latihan-tahap3.html`, `soal-campuran.html`, dan halaman paket per
   kategori).
2. Jalur kode `stratifiedSample()` dan `stratifiedSampleByMapel()` yang
   sudah ada TIDAK diubah sama sekali — hanya menerima `basePool` (hasil
   filter, yang sama dengan `pool` asli jika tidak difilter) alih-alih
   `pool` secara langsung.
3. Babak 5 tidak menyentuh `quiz-engine.js` sama sekali, sehingga risiko
   terhadap halaman lain nol untuk fitur ini.
4. `index.html`: tautan baru diletakkan sebagai elemen terpisah di luar
   `.categories-grid`, bukan menyisipkan ke dalam kartu `<a>` manapun
   (menghindari nested `<a>` yang tidak valid secara HTML dan berisiko
   merusak markup kartu Tahap 1/2/3 yang sudah ada).

### Risiko Regresi

| Area | Risiko | Mitigasi |
|---|---|---|
| `quiz-engine.js` dipakai banyak halaman | `mapelFilter`/`fixedWaktu` salah logika bisa memengaruhi semua halaman | Diverifikasi: diff murni additive, seluruh halaman lama tidak menyetel config baru ini → behavior identik dengan sebelumnya; smoke test Playwright dijalankan pada `latihan-tahap3-babak1/2/6.html` (yang memakai config baru) tanpa ditemukan error |
| Babak 5 pakai sessionStorage | Jika sessionStorage penuh/nonaktif (mode private browsing ketat), `try/catch` mencegah error, sesi tetap jalan hanya tanpa persistensi refresh | Sudah dibungkus try/catch di kode (`loadQuestions`, penyimpanan) |
| Amplop bisa terulang isi soal antar sesi berbeda (random murni, bukan disjoint) | Soal antar amplop bisa tumpang tindih dalam satu sesi belajar (amplop 1 dan amplop 3 mungkin share 1-2 soal yang sama secara kebetulan) | Diterima sebagai batasan wajar untuk latihan (pool 1000 soal membuat overlap kecil kemungkinannya); tidak fatal karena tujuannya latihan, bukan kompetisi bernilai |
| Waktu real per-babak belum divalidasi dengan siswa sungguhan | Timer 5 detik (Babak 1 & 2) dan 90 detik (Babak 5) diambil literal dari teks kisi-kisi, belum diuji apakah pas untuk kecepatan baca/ketik siswa SD sungguhan | **Sangat disarankan diuji coba dulu dengan siswa** sebelum dipakai sebagai latihan utama menjelang tampil — waktu bisa terasa terlalu ketat/longgar di praktik nyata |
| Babak 3 & 4 tidak diimplementasikan | Guru/siswa mungkin berharap semua 6 babak tersedia | Sudah dikomunikasikan eksplisit di hub (`latihan-tahap3-babak.html`) dengan alasan jelas (berbasis fisik, bukan bank soal) — bukan bug, keterbatasan yang disengaja dan didokumentasikan |

### Checklist Validasi

- [x] Playwright smoke test: hub menampilkan 4 link aktif + 2 disabled — LOLOS
- [x] Babak 1: picker 6 mapel tampil, filter mapel bekerja (soal yang muncul
      terverifikasi dari topik Matematika saat memilih Matematika), timer
      5 detik — LOLOS
- [x] Babak 2: 24 soal, timer 5 detik — LOLOS
- [x] Babak 5: picker 5 amplop, sesi dengan timer 90 detik, 5 nav dots,
      tombol reveal/next/dot-navigation berfungsi, sessionStorage
      konsisten antar reload, amplop berbeda = soal berbeda — LOLOS
- [x] Babak 6: 15 soal — LOLOS
- [x] Tidak ada error JavaScript aplikasi di seluruh alur (Playwright,
      headless Chromium) — LOLOS
- [x] Simulasi Node.js 1000-2000 trial untuk logika sampling tiap babak
      (id unik, jumlah tepat, tidak ada kebocoran filter mapel) — LOLOS
- [ ] **Belum dilakukan** (disarankan sebelum dipakai serius): uji coba
      lapangan dengan siswa sungguhan untuk memvalidasi apakah durasi
      timer (5 detik Babak 1/2, 90 detik Babak 5) terasa pas di praktik

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
