/**
 * Code.gs — Backend "Riwayat Latihan Mandiri" (Cerdas Cermat SDM01KKS)
 *
 * Ini BUKAN file yang jalan di GitHub Pages. Ini kode untuk Google Apps
 * Script, ditempel di Apps Script yang terikat ke sebuah Google Sheet,
 * lalu di-deploy sebagai Web App. Setelah dapat URL Web App-nya, tempel
 * URL itu ke konstanta RIWAYAT_ENDPOINT_URL di:
 *   - latihan-mandiri.html
 *   - latihan-mandiri-riwayat.html
 *
 * Cara deploy: lihat langkah-langkah yang diberikan di chat (atau bagian
 * "Konfigurasi Backend Riwayat" di README.md repo ini).
 *
 * KENAPA HANYA doPost + doGet (tidak ada doDelete/hapus baris)?
 * Supaya "riwayat tidak dapat dihapus" benar-benar berlaku di level
 * backend, bukan cuma di level tampilan: Web App ini SENGAJA cuma bisa
 * dipakai untuk MENAMBAH baris (doPost) dan MEMBACA (doGet). Tidak ada
 * endpoint untuk mengubah atau menghapus baris yang sudah tercatat. Guru
 * masih bisa mengedit Sheet secara manual lewat Google Sheets (itu hak
 * pemilik spreadsheet), tapi siswa yang hanya mengakses situs latihan
 * tidak pernah diberi jalan untuk menghapus riwayat lewat aplikasi.
 */

var SHEET_NAME = 'Riwayat';

var HEADER = [
  'Waktu Server', 'Peserta', 'Status', 'Soal Dijawab', 'Total Soal',
  'Benar', 'Salah', 'Skor', 'Rincian (JSON)'
];

/** Menerima 1 sesi latihan (selesai ATAU berhenti di tengah) dan menambah 1 baris baru. */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getSheet_();
    sheet.appendRow([
      new Date(),                       // waktu SERVER — bukan jam perangkat siswa, jadi tak bisa dimanipulasi dari sisi klien
      String(data.peserta || ''),
      String(data.status || ''),        // 'selesai' | 'keluar_di_tengah'
      Number(data.totalDijawab || 0),
      Number(data.total || 0),
      Number(data.benar || 0),
      Number(data.salah || 0),
      Number(data.skor || 0),
      JSON.stringify(data.rincian || [])
    ]);
    return jsonResponse_({ ok: true });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Membaca riwayat. Query string opsional: ?peserta=Nama%20Lengkap
 * untuk memfilter hanya sesi milik satu peserta (dipakai oleh
 * latihan-mandiri-riwayat.html). Tanpa parameter, mengembalikan semua baris.
 */
function doGet(e) {
  var sheet = getSheet_();
  var rows = sheet.getDataRange().getValues();
  rows.shift(); // buang baris header

  var filterPeserta = e && e.parameter ? e.parameter.peserta : null;

  var hasil = rows
    .filter(function (r) { return !filterPeserta || r[1] === filterPeserta; })
    .map(function (r) {
      var rincian = [];
      try { rincian = JSON.parse(r[8]); } catch (err) { rincian = []; }
      return {
        waktu: r[0] instanceof Date ? r[0].toISOString() : String(r[0]),
        peserta: r[1], status: r[2],
        totalDijawab: r[3], total: r[4],
        benar: r[5], salah: r[6], skor: r[7],
        rincian: rincian
      };
    });

  return jsonResponse_(hasil);
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADER);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
