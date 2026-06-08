/**
 * quiz-engine.js — Engine Soal Slideshow
 * Cerdas Cermat SD Muhammadiyah 01 Kukusan
 * https://github.com/sdm01-elearning/cerdas-cermat
 *
 * Setup di halaman paket soal:
 *   <div id="quiz-root"></div>
 *   <script>
 *     window.QUIZ_CONFIG = { dataUrl: 'data/paket-01.json' };
 *   </script>
 *   <script src="../../assets/js/quiz-engine.js"></script>
 *
 * Shortcut keyboard:
 *   Spasi  → Tampilkan jawaban / lanjut ke soal berikutnya
 *   →      → Soal berikutnya (setelah jawaban ditampilkan)
 *   F      → Toggle layar penuh
 */

(function () {
  'use strict';

  /** Keliling lingkaran timer: 2π × r=45 ≈ 282.743 */
  const CIRC = 282.743;

  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }

  async function init() {
    const cfg  = window.QUIZ_CONFIG || {};
    const root = document.getElementById('quiz-root');
    if (!root) { console.error('[QuizEngine] #quiz-root tidak ditemukan.'); return; }

    /* ── Loading state ── */
    root.innerHTML = `
      <div class="qe-loading">
        <div class="qe-spinner"></div>
        <p>Memuat soal…</p>
      </div>`;

    /* ── Fetch data ── */
    let data;
    try {
      const r = await fetch(cfg.dataUrl || 'data/paket-01.json');
      if (!r.ok) throw new Error('HTTP ' + r.status);
      data = await r.json();
    } catch (e) {
      root.innerHTML = `
        <div class="qe-error">
          <div class="qe-error-icon">⚠️</div>
          <h2>Gagal Memuat Soal</h2>
          <p>${e.message}</p>
          <p class="qe-error-hint">
            Pastikan halaman diakses melalui server HTTP
            (GitHub Pages atau <code>python3 -m http.server</code>),
            bukan langsung dari file lokal (<code>file://</code>).
          </p>
          <a href="index.html" class="qe-btn qe-btn-back">← Kembali</a>
        </div>`;
      return;
    }

    const list = data.soal || [];
    if (!list.length) {
      root.innerHTML = `
        <div class="qe-error">
          <p>Tidak ada soal ditemukan dalam file ini.</p>
          <a href="index.html" class="qe-btn qe-btn-back">← Kembali</a>
        </div>`;
      return;
    }

    /* ── State ── */
    let idx       = 0;
    let timerIv   = null;
    let timeLeft  = 0;
    let totalTime = 0;
    let revealed  = false;

    /* ── Render shell ── */
    const meta = data.meta || {};
    root.innerHTML = `
<div class="qe-wrap" id="qe-wrap">

  <header class="qe-header">
    <div class="qe-hd-left">
      <a href="index.html" class="qe-back-btn" title="Kembali ke daftar soal">←</a>
      <div class="qe-hd-info">
        <span class="qe-hd-kategori">${meta.kategori_label || 'Cerdas Cermat'}</span>
        <span class="qe-hd-paket">Paket ${meta.paket || '01'}</span>
      </div>
    </div>
    <div class="qe-hd-center">
      <span id="qe-prog-txt" class="qe-prog-txt">Soal 1 dari ${list.length}</span>
      <div class="qe-prog-bg"><div id="qe-prog-bar" class="qe-prog-bar"></div></div>
    </div>
    <div class="qe-hd-right">
      <button id="qe-fs-btn" class="qe-fs-btn" title="Layar penuh (F)">⛶</button>
    </div>
  </header>

  <main class="qe-main">
    <div class="qe-soal-top">
      <span class="qe-soal-num" id="qe-num">1</span>
      <span class="qe-badge-en" id="qe-en-badge" style="display:none">🇬🇧 English</span>
      <span class="qe-badge-topik" id="qe-topik-badge" style="display:none"></span>
    </div>

    <div class="qe-teks" id="qe-teks"></div>

    <div class="qe-timer-wrap" id="qe-timer-wrap">
      <svg viewBox="0 0 100 100" class="qe-timer-svg">
        <circle class="qe-t-track" cx="50" cy="50" r="45"/>
        <circle class="qe-t-ring" id="qe-t-ring" cx="50" cy="50" r="45"
          stroke-dasharray="282.743"
          stroke-dashoffset="0"/>
      </svg>
      <span class="qe-timer-num" id="qe-t-num">—</span>
    </div>

    <div class="qe-ans-area" id="qe-ans-area">
      <div class="qe-jawaban">
        <div class="qe-ans-lbl">✅ Jawaban</div>
        <div class="qe-ans-val" id="qe-jawaban"></div>
      </div>
      <div class="qe-pembahasan">
        <div class="qe-pem-lbl">📖 Pembahasan</div>
        <div class="qe-pem-val" id="qe-pembahasan"></div>
      </div>
    </div>
  </main>

  <footer class="qe-footer">
    <div class="qe-hint">
      <kbd>Spasi</kbd> tampilkan/lanjut &nbsp;·&nbsp;
      <kbd>→</kbd> soal berikutnya &nbsp;·&nbsp;
      <kbd>F</kbd> layar penuh
    </div>
    <div class="qe-btn-row">
      <button id="qe-reveal-btn" class="qe-btn qe-btn-reveal">Tampilkan Jawaban</button>
      <button id="qe-next-btn"   class="qe-btn qe-btn-next"   style="display:none">Soal Berikutnya →</button>
      <button id="qe-done-btn"   class="qe-btn qe-btn-done"   style="display:none">✓ Selesai</button>
    </div>
  </footer>

</div>`;

    /* ═══════════════════════════════
       Functions
    ═══════════════════════════════ */

    function showSoal(i) {
      revealed = false;
      const s      = list[i];
      const isLast = (i === list.length - 1);

      /* Progress bar */
      const pct = ((i + 1) / list.length * 100).toFixed(1);
      qs('#qe-prog-txt').textContent = `Soal ${i + 1} dari ${list.length}`;
      qs('#qe-prog-bar').style.width = pct + '%';

      /* Badges */
      qs('#qe-num').textContent = i + 1;
      const enBadge  = qs('#qe-en-badge');
      const topBadge = qs('#qe-topik-badge');
      enBadge.style.display  = s.bahasa === 'en' ? 'inline-flex' : 'none';
      topBadge.textContent   = s.topik || '';
      topBadge.style.display = s.topik ? 'inline-flex' : 'none';

      /* Question text */
      const tEl = qs('#qe-teks');
      tEl.textContent = s.teks;
      tEl.lang        = s.bahasa === 'en' ? 'en' : 'id';

      /* Hide answer, show timer */
      qs('#qe-ans-area').classList.remove('qe-ans-visible');
      qs('#qe-timer-wrap').style.display = 'flex';
      qs('#qe-t-num').classList.remove('qe-urgent');

      /* Buttons */
      qs('#qe-reveal-btn').style.display = 'inline-flex';
      qs('#qe-next-btn').style.display   = 'none';
      qs('#qe-done-btn').style.display   = 'none';

      /* Remove revealed state */
      qs('#qe-wrap').classList.remove('qe-revealed');

      /* Slide-in animation */
      tEl.classList.remove('qe-slide-in');
      void tEl.offsetWidth; /* force reflow */
      tEl.classList.add('qe-slide-in');

      startTimer(s.waktu || 10);
    }

    function startTimer(sec) {
      clearInterval(timerIv);
      timeLeft = totalTime = sec;

      const ring = qs('#qe-t-ring');
      const num  = qs('#qe-t-num');

      function tick() {
        num.textContent = timeLeft;
        const frac = timeLeft / totalTime;

        /* Ring offset: 0 = full, CIRC = empty */
        ring.style.strokeDashoffset = (CIRC * (1 - frac)).toFixed(3);

        /* Color transition */
        if      (frac > 0.6) ring.style.stroke = 'var(--timer-green)';
        else if (frac > 0.3) ring.style.stroke = 'var(--timer-orange)';
        else                 ring.style.stroke = 'var(--timer-red)';

        if (timeLeft <= 3) num.classList.add('qe-urgent');

        if (timeLeft <= 0) {
          clearInterval(timerIv);
          reveal(); /* auto-reveal when time is up */
          return;
        }
        timeLeft--;
      }

      tick();
      timerIv = setInterval(tick, 1000);
    }

    function reveal() {
      if (revealed) return;
      revealed = true;
      clearInterval(timerIv);

      const s      = list[idx];
      const isLast = (idx === list.length - 1);

      /* Populate answer */
      qs('#qe-jawaban').textContent    = s.jawaban;
      qs('#qe-pembahasan').textContent = s.pembahasan;

      /* Show answer, hide timer */
      qs('#qe-ans-area').classList.add('qe-ans-visible');
      qs('#qe-timer-wrap').style.display = 'none';
      qs('#qe-t-num').classList.remove('qe-urgent');

      /* Buttons */
      qs('#qe-reveal-btn').style.display = 'none';
      qs('#qe-next-btn').style.display   = isLast ? 'none'        : 'inline-flex';
      qs('#qe-done-btn').style.display   = isLast ? 'inline-flex' : 'none';

      /* Revealed state (dims question text) */
      qs('#qe-wrap').classList.add('qe-revealed');
    }

    function next() {
      if (idx < list.length - 1) { idx++; showSoal(idx); }
    }

    /* ═══════════════════════════════
       Event listeners
    ═══════════════════════════════ */

    qs('#qe-reveal-btn').addEventListener('click', reveal);
    qs('#qe-next-btn').addEventListener('click', next);
    qs('#qe-done-btn').addEventListener('click', () => {
      window.location.href = 'index.html';
    });
    qs('#qe-fs-btn').addEventListener('click', toggleFS);

    document.addEventListener('keydown', e => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (!revealed) {
          reveal();
        } else {
          if (qs('#qe-next-btn').style.display !== 'none') next();
          else if (qs('#qe-done-btn').style.display !== 'none')
            window.location.href = 'index.html';
        }
      }

      if (e.code === 'ArrowRight' && revealed) {
        if (qs('#qe-next-btn').style.display !== 'none') next();
      }

      if (e.code === 'KeyF') toggleFS();
    });

    function toggleFS() {
      if (!document.fullscreenElement)
        document.documentElement.requestFullscreen().catch(() => {});
      else
        document.exitFullscreen();
    }

    /* ── Start ── */
    showSoal(0);
  }

  /* Bootstrap after DOM ready */
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', init);
  else
    init();

})();
