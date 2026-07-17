# CHANGELOG

Semua perubahan signifikan pada proyek ini didokumentasikan di file ini.  
Format mengikuti [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.11.0] — 2026-07-17

### Ditambahkan
- `latihan-tahap3/soal/data/pool.json` — **Batch 7, +96 soal baru (id 591–686),
  total pool sekarang 686 soal.**
  - Matematika +18 (126 total) — pola bertambah 3, segi-n, segitiga sama
    sisi & siku-siku, kuintal, persen, KPK/FPB baru, rasio siswa & resep,
    rata-rata & modus dari survei.
  - Bahasa Indonesia +12 (90 total) — majas sarkasme & pleonasme, kata
    ulang berimbuhan "buah-buahan", makna kias "mahkota keluarga",
    peribahasa "pungguk merindukan bulan", kalimat aktif, tanda koma,
    pola pengembangan sebab-akibat.
  - IPS +16 (112 total) — Kolintang, Kujang, Medan, Ujung Kulon, Batavia,
    Alfonso de Albuquerque, pertambangan, pasar, WIT, angin muson,
    Perang Jawa, tanam paksa Van den Bosch, Kilimanjaro, Eurasia, Sutan
    Syahrir, sidang pertama PPKI.
  - Pendidikan Pancasila +8 (68 total) — pita Bhinneka Tunggal Ika pada
    Garuda, arah kepala Garuda, Pasal 26, konvensi ketatanegaraan, vihara,
    struktur wilayah administratif, gubernur.
  - IPA +16 (112 total) — PLTN, sumber energi tak terbarukan, gelombang
    seismik, neraca, habitat, pemakan bangkai, panca indra, vegetatif
    buatan (cangkok), pengomposan, rotasi tanaman, tata surya.
  - Bahasa Inggris +26 (178 total) — kedalaman ke-6 untuk seluruh 26
    subtopik (mis. Berlin, Panama Canal, James Watt, Lombok, xylophone,
    tadpole, DIY, CEO, golf, Goldilocks).

### Perubahan
- `index.html` — label jumlah soal pada kartu "Latihan Tahap 3" diperbarui
  menjadi **"Pool: 686 soal"**.

### Validasi (otomatis via skrip generator + simulasi)
- id 1–686 berurutan dan unik; 96 `jawaban` baru ≤ 6 kata; tidak ada teks
  soal duplikat persis di seluruh 686 soal.
- Simulasi ulang 5.000 sesi acak 30 soal terhadap pool 686 soal — tetap
  tepat 5 soal/mapel/sesi untuk keenam mapel.

### Catatan Penyusun
- Batch ini dibuat atas permintaan eksplisit setelah penyusun merekomendasikan
  jeda untuk uji coba lapangan pada rilis 1.10.0. Direkomendasikan kembali:
  sebelum menambah batch 8, sebaiknya pool sebesar ini (686 soal) diuji
  coba dengan siswa terlebih dahulu untuk memastikan kualitas soal tetap
  terjaga, bukan hanya kuantitas yang bertambah.

---

## [1.10.0] — 2026-07-17

### Ditambahkan
- `latihan-tahap3/soal/data/pool.json` — **Batch 6, +96 soal baru (id 495–590),
  total pool sekarang 590 soal.**
  - Matematika +18 (108 total) — pembagian besar, pola Fibonacci, lingkaran,
    layang-layang, satuan rim/ml, KPK/FPB baru, rasio umur & harga, diagram
    garis.
  - Bahasa Indonesia +12 (78 total) — majas onomatope & retoris, awalan
    pe-/me-, makna kias "berat", penyempitan makna, kalimat transitif,
    paragraf perbandingan & penutup.
  - IPS +16 (96 total) — Sasando, Sekaten, Surabaya Kota Pahlawan, kopi
    Gayo, benteng Portugis di Ternate, pembubaran VOC 1799, PBB (pajak),
    Danau Toba, Puncak Jaya, I Gusti Ngurah Rai, Puputan, alamat
    Pegangsaan Timur No. 56.
  - Pendidikan Pancasila +8 (60 total) — **melengkapi lambang seluruh 5
    sila Pancasila** (rantai untuk sila ke-2, melengkapi bintang/pohon
    beringin/kepala banteng/padi-kapas dari batch sebelumnya), trias
    politica, masa jabatan presiden.
  - IPA +16 (96 total) — energi kimia pada makanan, seismograf, gelombang
    elektromagnetik, pelumas, kompas, herbivora, arteri, sel darah merah,
    tunas pisang, metamorfosis tidak sempurna, pemanasan global, hutan
    lindung, Sirius, kerak bumi.
  - Bahasa Inggris +26 (152 total) — kedalaman ke-5 untuk seluruh 26
    subtopik (mis. Canberra, Neptune, Colosseum, Lake Toba, trumpet,
    chick, ID, futsal, Ugly Duckling, heart).

### Perubahan
- `index.html` — label jumlah soal pada kartu "Latihan Tahap 3" diperbarui
  menjadi **"Pool: 590 soal"**.

### Validasi (otomatis via skrip generator + simulasi)
- id 1–590 berurutan dan unik; 96 `jawaban` baru ≤ 6 kata; tidak ada teks
  soal duplikat persis di seluruh 590 soal.
- **Baru di batch ini:** skrip generator menambahkan pengecekan informasional
  pasangan (topik, jawaban) yang berulang — bukan untuk memblokir (banyak
  kebetulan wajar, mis. beberapa soal luas berbeda sama-sama menghasilkan
  40 cm²), tetapi sebagai sinyal tambahan bagi penyusun untuk meninjau
  manual apakah ada soal yang secara substansi terlalu mirip.
- Simulasi ulang 5.000 sesi acak 30 soal terhadap pool 590 soal — tetap
  tepat 5 soal/mapel/sesi untuk keenam mapel.

### Diketahui / Direncanakan
- Pool sudah sangat besar (590 soal). Disarankan sebelum batch 7,
  dilakukan uji coba lapangan (latihan sungguhan dengan siswa) untuk
  mengevaluasi apakah kedalaman saat ini sudah memadai, atau apakah ada
  soal yang perlu direvisi berdasarkan pengalaman langsung.

---

## [1.9.0] — 2026-07-17

### Ditambahkan
- `latihan-tahap3/soal/data/pool.json` — **Batch 5, +96 soal baru (id 399–494),
  total pool sekarang 494 soal.**
  - Matematika +18 (90 total) — pola ganjil/genap, sudut lancip, keliling
    lingkaran, ton, pembulatan desimal, KPK/FPB baru, skala denah,
    perbandingan campuran, diagram batang, tabel frekuensi.
  - Bahasa Indonesia +12 (66 total) — majas antitesis & paradoks, imbuhan
    gabungan me-...-kan, dwilingga salin suara, idiom "tangan kanan" &
    "naik daun", kalimat langsung & pasif, paragraf persuasi & eksposisi.
  - IPS +16 (80 total) — rumah Joglo, tari Jaipong, Pekalongan Kota Batik,
    Bali Pulau Dewata, EIC Inggris, semboyan 3G, koperasi, Garis Wallace,
    Pangeran Antasari, Teuku Umar, naskah klad proklamasi.
  - Pendidikan Pancasila +8 (52 total) — Piagam Jakarta, julukan Penggali
    Pancasila, Pasal 27, jumlah alinea Pembukaan, 6 agama resmi, Garuda
    Pancasila sebagai lambang negara, TNI-Polri.
  - IPA +16 (80 total) — energi gerak & PLTB, amplitudo, gaung, gaya otot,
    komunitas, parasitisme, tulang rusuk, umbi lapis, metamorfosis
    sempurna, infiltrasi, pestisida, Venus.
  - Bahasa Inggris +26 (126 total) — kedalaman ke-4 untuk seluruh 26
    subtopik, termasuk **melengkapi seluruh 5 samudra dunia** (Pacific,
    Atlantic, Indian, Arctic, Southern Ocean).

### Perubahan
- `index.html` — label jumlah soal pada kartu "Latihan Tahap 3" diperbarui
  menjadi **"Pool: 494 soal"**.

### Validasi (otomatis via skrip generator + simulasi)
- id 1–494 berurutan dan unik; 96 `jawaban` baru ≤ 6 kata; tidak ada teks
  soal duplikat persis di seluruh 494 soal.
- Simulasi ulang 5.000 sesi acak 30 soal terhadap pool 494 soal — tetap
  tepat 5 soal/mapel/sesi untuk keenam mapel.

---

## [1.8.0] — 2026-07-17

### Ditambahkan
- `latihan-tahap3/soal/data/pool.json` — **Batch 4, +96 soal baru (id 303–398),
  total pool sekarang 398 soal.**
  - Matematika +18 (72 total) — pembagian pecahan, pecahan senilai, luas
    segitiga, trapesium, satuan lusin/minggu, KPK/FPB baru, kecepatan-jarak,
    modus & median data genap.
  - Bahasa Indonesia +12 (54 total) — majas sinekdoke & alegori, kata ulang
    dwilingga, sisipan/infiks, generalisasi makna, kalimat berita & tunggal,
    paragraf argumentasi & narasi.
  - IPS +16 (64 total) — rumah Tongkonan, lagu Yamko Rambe Yamko, Bogor
    "Kota Hujan", Perjanjian Tordesillas, Sultan Ageng Tirtayasa, Sultan
    Agung menyerang Batavia, pengibar bendera pusaka.
  - Pendidikan Pancasila +8 (44 total) — bunyi sila kedua, BPUPKI, Pasal 24
    UUD 1945, rentang tahun amandemen, otonomi daerah, pemilihan presiden
    langsung.
  - IPA +16 (64 total) — panel surya, Hertz, gaya gesek udara, satuan
    Newton, omnivora, mutualisme, otot tak sadar, pupil, tumbuhan paku,
    iritabilitas, 3R, revolusi bumi.
  - Bahasa Inggris +26 (100 total) — kedalaman ke-3 untuk seluruh 26
    subtopik (mis. London, Saturn, Gutenberg, Statue of Liberty, flute,
    lamb, PIN, badminton, Little Red Riding Hood, dst).

### Perubahan
- `index.html` — label jumlah soal pada kartu "Latihan Tahap 3" diperbarui
  menjadi **"Pool: 398 soal"**.

### Validasi (otomatis via skrip generator + simulasi)
- id 1–398 berurutan dan unik; 96 `jawaban` baru ≤ 6 kata; tidak ada teks
  soal duplikat persis di seluruh 398 soal.
- Simulasi ulang 5.000 sesi acak 30 soal (dengan `stratifyBy: 'mapel'` dari
  v1.7.0) terhadap pool 398 soal — hasil tetap **tepat 5 soal/mapel/sesi**
  untuk keenam mapel, konsisten dengan hasil di pool 302 soal.

### Diketahui / Direncanakan
- Pool Bahasa Inggris (100 soal / 26 subtopik) kini proporsinya paling
  besar di antara mapel lain — tidak masalah untuk pengambilan sampel
  (tetap 5/sesi berkat `stratifyBy: 'mapel'`), namun dicatat untuk
  perhatian jika suatu saat ingin menyeimbangkan ukuran pool antar mapel.
- Total pool 398 soal sudah cukup besar untuk latihan rutin; batch
  berikutnya (bila dibutuhkan) disarankan fokus menambah variasi bentuk
  soal (bukan hanya menambah jumlah) atau membuat mode latihan per-mapel.

---

## [1.7.0] — 2026-07-16

### Ditambahkan
- `assets/js/quiz-engine.js` — fungsi baru `stratifiedSampleByMapel()` dan
  opsi konfigurasi baru **`QUIZ_CONFIG.stratifyBy`** (`'bahasa'` default,
  atau `'mapel'`).
  - `'bahasa'` (default, tidak berubah) — perilaku lama: jamin ~10% soal
    `bahasa: "en"` per sesi. Dipakai otomatis oleh semua halaman yang tidak
    men-set `stratifyBy` secara eksplisit (Latihan Tahap 1, Tahap 2, Soal
    Campuran) — **tidak ada perubahan perilaku untuk halaman-halaman ini.**
  - `'mapel'` (baru) — bagi rata jumlah soal ke tiap nilai `mapel` yang ada
    di pool (mis. 30 soal ÷ 6 mapel = 5 soal/mapel setiap sesi).

### Perubahan
- `latihan-tahap3.html` — `QUIZ_CONFIG` kini menambahkan
  `stratifyBy: 'mapel'`. Latihan Tahap 3 memperlakukan Bahasa Inggris
  sebagai mapel sejajar (bukan sisipan ~10%), sehingga tiap sesi 30 soal
  kini selalu menampilkan proporsi merata dari keenam mapel: Matematika,
  Bahasa Indonesia, IPS, Pendidikan Pancasila, IPA, dan Bahasa Inggris —
  masing-masing 5 soal.

### Alasan
- Menindaklanjuti catatan "Diketahui/Direncanakan" pada rilis 1.4.0–1.6.0:
  fungsi sampling lama membatasi soal EN ke ~10% per sesi, sehingga mapel
  Bahasa Inggris (kini setara 5 mapel lain di Tahap 3) selalu under-represented
  dalam sesi acak meski proporsinya di pool (~24%) jauh lebih tinggi dari 10%.

### Validasi
- Simulasi 5.000 sesi acak 30 soal terhadap pool Tahap 3 (302 soal, 6
  mapel) mengonfirmasi setiap mapel **selalu tepat 5 soal/sesi** (min=max=5),
  tidak ada sesi dengan jumlah soal salah, dan tidak ada `id` duplikat
  dalam satu sesi.
- Diff `quiz-engine.js` terhadap versi sebelumnya bersifat murni
  penambahan (additive) — fungsi lama (`stratifiedSample`) dan jalur kode
  defaultnya tidak diubah sama sekali, sehingga Tahap 1/2/Soal Campuran
  aman dari regresi.

---

## [1.6.0] — 2026-07-16

### Ditambahkan
- `latihan-tahap3/soal/data/pool.json` — **Batch 3, +96 soal baru (id 207–302),
  total pool sekarang 302 soal.**
  - Matematika +18 (54 total) — pembagian, pengurangan pecahan, pola
    kuadrat, keliling persegi, belah ketupat, satuan windu, skala peta,
    diagram lingkaran/piktogram.
  - Bahasa Indonesia +12 (42 total) — majas litotes & repetisi, kata
    majemuk, polisemi, idiom "ringan tangan", kalimat majemuk & konjungsi,
    paragraf proses & deskripsi.
  - IPS +16 (48 total) — tari Saman, upacara Ngaben, Ferdinand Magellan,
    zona waktu Indonesia, Cut Nyak Dhien, Sisingamangaraja XII, rumah
    Laksamana Maeda, W.R. Supratman.
  - Pendidikan Pancasila +8 (36 total) — tanggal sidang BPUPKI pertama,
    Pasal 36 UUD 1945, jumlah amandemen UUD 1945, etnosentrisme vs gotong
    royong, MPR, Komisi Yudisial.
  - IPA +16 (48 total) — energi potensial, panjang gelombang, ekolokasi
    kelelawar, gaya pegas, jaring-jaring makanan, usus halus, otak kecil,
    ovovivipar, metamorfosis, reboisasi, Saturnus, rasi bintang.
  - Bahasa Inggris +26 (74 total) — kedalaman ke-2 untuk seluruh 26
    subtopik kisi-kisi (mis. Jakarta, Prambanan, Rupiah, Papua New Guinea,
    Wright Brothers, WHO, drum, grape, dst).

### Perubahan
- `index.html` — label jumlah soal pada kartu "Latihan Tahap 3" diperbarui
  menjadi **"Pool: 302 soal"**.

### Validasi (otomatis via skrip generator)
- id 1–302 berurutan dan unik.
- 96 `jawaban` soal baru divalidasi ≤ 6 kata.
- **Baru di batch ini:** validasi tambahan mengecek tidak ada teks soal
  (`teks`) yang duplikat persis di seluruh pool (1–302) — lolos, 0 duplikat.
- Cakupan subtopik Bahasa Inggris tetap 26/26 (100%), kini dengan rata-rata
  ~3 soal/subtopik.

### Diketahui / Direncanakan
- Rata-rata kedalaman per topik non-Inggris kini 4-9 soal; masih dapat terus
  bertambah di batch berikutnya sesuai kebutuhan.
- Catatan `stratifiedSample()` (proporsi EN ~10% per sesi 30 soal) dari
  batch 1 masih berlaku dan belum diubah.

---

## [1.5.0] — 2026-07-15

### Ditambahkan
- `latihan-tahap3/soal/data/pool.json` — **Batch 2, +100 soal baru (id 107–206),
  total pool sekarang 206 soal.** Melanjutkan urutan id dari batch 1 tanpa
  collision.
  - Matematika +18 (36 total) — kedalaman baru per topik yang sama seperti
    batch 1 (mis. perkalian pecahan, pecahan campuran, luas persegi panjang,
    jenis sudut, KPK/FPB nilai lebih besar, rata-rata & jangkauan data).
  - Bahasa Indonesia +12 (30 total) — menambah jenis majas (metafora,
    ironi), jenis kalimat (perintah, efektif), jenis paragraf (campuran),
    dan makna kata (eufemisme).
  - IPS +16 (32 total) — menambah tokoh perlawanan (Tuanku Imam Bonjol,
    Sultan Hasanuddin), peristiwa kemerdekaan (Rengasdengklok, Fatmawati),
    dan kondisi geografis (letak astronomis, iklim tropis).
  - Pendidikan Pancasila +12 (28 total) — menambah tokoh perumus (Mohammad
    Yamin, Panitia Sembilan), pasal UUD 1945 (30, 33), dan lembaga negara
    (MA, MK).
  - IPA +16 (32 total) — menambah topik gelombang longitudinal, gaya
    magnet/dinamometer, populasi, kondensasi/presipitasi, gerhana bulan.
  - Bahasa Inggris +26 (48 total) — **melengkapi seluruh 26/26 subtopik
    kisi-kisi Bahasa Inggris.** 4 subtopik yang belum tersentuh di batch 1
    kini ditambahkan: Famous Landmarks, Sightseeing/Tourist Attractions,
    Identifying Parts of Speech in a Sentence, Common Initialisms — plus 22
    subtopik lain mendapat soal kedua (soal baru, bukan duplikat) untuk
    menambah kedalaman & variasi.

### Perubahan
- `index.html` — label jumlah soal pada kartu "Latihan Tahap 3" diperbarui
  dari "Pool: 106 soal" menjadi **"Pool: 206 soal"**.

### Validasi (otomatis via skrip generator)
- id 1–206 berurutan dan unik (tidak ada collision antar batch).
- Seluruh 100 `jawaban` soal baru divalidasi ≤ 6 kata (kebijakan singkat
  tetap dipertahankan dari batch 1).
- Seluruh field wajib (`id, teks, bahasa, jawaban, alternatif_jawaban,
  pembahasan, topik, mapel, level, waktu`) lengkap pada tiap soal.
- Cakupan subtopik Bahasa Inggris dikonfirmasi 26/26 (100%) setelah batch 2
  digabungkan.

### Diketahui / Direncanakan
- Cakupan kisi-kisi non-Inggris kini rata-rata 3-6 soal/topik (masih di
  bawah target ideal untuk pool besar); batch 3+ akan terus menambah
  kedalaman serta variasi bentuk soal (bukan sekadar menambah jumlah).
- Catatan `stratifiedSample()` dari batch 1 (proporsi EN ~10% per sesi 30
  soal, sementara Bahasa Inggris kini mapel sejajar) masih berlaku dan
  belum diubah — menunggu keputusan eksplisit.

---

## [1.4.0] — 2026-07-15

### Ditambahkan
- `latihan-tahap3.html` — halaman quiz Latihan Tahap 3, struktur identik dengan
  `latihan-tahap1.html`/`latihan-tahap2.html` (loader fetch pool → inject
  quiz-engine via QUIZ_CONFIG, shuffle, 30 soal/sesi).
- `latihan-tahap3/soal/data/pool.json` — **Batch 1, 106 soal** sesuai
  kisi-kisi Ujian Tahap 3 Liga Bintang Juara (6 mata pelajaran terpisah):
  - Matematika — 18 soal (9 topik: bilangan cacah, pecahan, pola gambar &
    pola bilangan, bangun datar dan sudut, hubungan satuan-satuan, bilangan
    desimal, KPK dan FPB, rasio, data)
  - Bahasa Indonesia — 18 soal (6 topik: sinonim & akronim, majas, tata kata,
    makna kata, kalimat, paragraf)
  - IPS — 16 soal (8 topik: keragaman budaya, ciri khas daerah, kedatangan
    bangsa asing, aktivitas ekonomi, kondisi geografis, perlawanan terhadap
    bangsa asing, benua-benua di dunia, kemerdekaan dan peristiwa di
    sekitarnya)
  - Pendidikan Pancasila — 16 soal (4 topik: Pancasila/perumusan & lambang,
    UUD 1945/undang-undang & pasal, Bhinneka Tunggal Ika, NKRI/sistem
    pemerintahan & lembaga negara & bentuk negara)
  - IPA — 16 soal (8 topik: energi & perubahannya, gelombang, gaya,
    ekosistem, sistem tubuh manusia, ciri & reproduksi makhluk hidup,
    lingkungan hidup/daur air/pencemaran, alam semesta)
  - Bahasa Inggris — 22 soal (22 subtopik prioritas dari kisi-kisi: general
    knowledge, who am I, vocabulary, common abbreviations, sports,
    fairytales, body parts — beberapa subtopik general knowledge/vocabulary
    yang lebih jarang, mis. famous landmarks, sightseeing, parts of speech,
    initialisms, disisakan untuk batch berikutnya)
- `index.html` — card baru **"Latihan Tahap 3"** ditambahkan ke bottom row
  (diubah dari `bottom-row-3` jadi `bottom-row-4`, 4 kolom: Soal Campuran,
  Latihan Tahap 1, Latihan Tahap 2, Latihan Tahap 3). Style baru
  `.cat-latihan3` (gradasi merah, aksen kuning), responsif 2 kolom di
  <1100px dan 1 kolom di <600px.

### Perubahan Kebijakan Konten (penting)
- **Pendidikan Pancasila kini berdiri sendiri sebagai mapel terpisah**,
  tidak lagi digabung dengan IPS seperti pada Tahap 1 & 2 — mengikuti
  kisi-kisi Tahap 3 yang menampilkan 6 kotak kategori terpisah pada Round 1
  (Matematika, Bahasa Indonesia, Bahasa Inggris, IPA, IPS, Pendidikan
  Pancasila).
- **Field `jawaban` wajib singkat** (kata/angka/frasa pendek, bukan
  kalimat/paragraf) — perbaikan atas keluhan sejumlah soal Tahap 2 yang
  menuntut jawaban panjang, tidak sesuai pola cerdas cermat (jawab cepat).
  Seluruh 106 soal batch 1 divalidasi otomatis (skrip generator) agar tidak
  ada `jawaban` melebihi 6 kata.

### Mekanisme Teknis
- Mengikuti pola yang sama dengan `latihan-tahap1`/`latihan-tahap2`: satu
  pool gabungan per tahap, field `mapel` dipakai quiz-engine untuk badge
  kategori.
- `id` soal batch 1 berurutan 1–106, unik, dan akan dilanjutkan (107, 108,
  …) saat batch 2 ditambahkan agar tidak collision.
- Distribusi topik batch 1 mengikuti prinsip "topik prioritas/inti dahulu":
  setiap mapel non-Inggris mendapat soal merata per topik kisi-kisi (2–4
  soal/topik); kisi-kisi Bahasa Inggris yang jauh lebih granular (26
  subtopik) disaring ke 22 subtopik prioritas dengan 1 soal/subtopik agar
  cakupan tetap luas tanpa membuat batch 1 timpang.

### Diketahui / Direncanakan
- Batch 2+ pool Tahap 3 (menyusul) — akan melengkapi subtopik Bahasa Inggris
  yang belum tercakup serta menambah kedalaman topik lain.
- Catatan teknis untuk ditinjau: `stratifiedSample()` di `quiz-engine.js`
  memaksa proporsi soal `bahasa: "en"` ke arah ~10% dalam satu sesi 30 soal.
  Karena Bahasa Inggris kini adalah salah satu dari 6 mapel sejajar (bukan
  sekadar ~10% sisipan seperti pada Tahap 1/2), perilaku ini bisa membuat
  mapel Bahasa Inggris under-represented dibanding 5 mapel lain saat sesi
  acak. Belum diubah pada rilis ini — perlu didiskusikan sebelum diubah agar
  tidak mengganggu pool Tahap 1/2/Soal Campuran yang juga memakai fungsi
  yang sama.

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
