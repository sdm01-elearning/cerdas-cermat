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
