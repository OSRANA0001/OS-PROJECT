(function () {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const root = document.documentElement;
  const THEME_KEY = 'jm_theme_v2';

 
  (function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) {
    root.setAttribute('data-theme', saved);
  } else {
   
    root.setAttribute('data-theme', 'light');
  }
  updateThemeButtons();
})();


  function updateThemeButtons() {
    const isDark = root.getAttribute('data-theme') === 'dark';
    $$('#theme-toggle').forEach(btn => {
      btn.textContent = isDark ? '☀️' : '🌙';
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }


  document.addEventListener('click', (e) => {
    const t = e.target.closest('#theme-toggle');
    if (!t) return;
    ripple(e);
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem(THEME_KEY, next);
    updateThemeButtons();
  });

  
  (function markActiveNav() {
    const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    $$('a[data-nav]').forEach(a => {
      const href = (a.getAttribute('href') || '').toLowerCase();
      if (href === current || (href === '' && current === 'index.html')) a.classList.add('is-active');
    });
  })();

  
  document.addEventListener('click', (e) => {
    const el = e.target.closest('.ripple');
    if (!el) return;
    createRipple(el, e);
  }, { passive: true });

  function createRipple(el, e) {
   
    el.querySelectorAll('.wave').forEach(n => n.remove());
    const rect = el.getBoundingClientRect();
    const wave = document.createElement('span');
    wave.className = 'wave';
    const x = (e.touches?.[0]?.clientX ?? e.clientX) - rect.left;
    const y = (e.touches?.[0]?.clientY ?? e.clientY) - rect.top;
    const size = Math.max(rect.width, rect.height) * 1.2;
    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;
    wave.style.width = wave.style.height = `${size}px`;
    el.appendChild(wave);
    setTimeout(() => wave.remove(), 700);
  }

 
(function faqSetup() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const btn = item.querySelector('.faq-q');
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      items.forEach(i => i.classList.remove('active'));
      
      if (!isActive) item.classList.add('active');
    });
  });
})();


 
  (function connectSetup() {
    $$('#connect-btn').forEach(c => {
      c.addEventListener('click', (e) => {
        createRipple(c, e);
        setTimeout(() => window.open('https://www.linkedin.com/in/o-s-rana', '_blank'), 140);
      });
    });
  })();

 
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-file]');
    if (!el) return;
    createRipple(el, e);
    const file = el.getAttribute('data-file');
    if (!file) return;
    triggerDownload(file);
  }, { passive: true });

  function triggerDownload(filePath) {
    try {
      const a = document.createElement('a');
      a.href = encodeURI(filePath);
      a.download = filePath.split('/').pop();
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error('Download error', err);
      alert('Could not start download. Try running the site from a local server.');
    }
  }

  
  (function footerReveal() {
    const d = document.getElementById('footer-disclaimer');
    if (!d) return;
    const onScroll = () => {
      const r = d.getBoundingClientRect();
      if (r.top < window.innerHeight - 60) {
        d.classList.add('revealed');
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();

})();
