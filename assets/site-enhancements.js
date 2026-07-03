(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function markExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(function (link) {
      try {
        const url = new URL(link.href, location.href);
        if (url.origin !== location.origin) {
          link.target = link.target || '_blank';
          const rel = new Set((link.rel || '').split(/\s+/).filter(Boolean));
          rel.add('noopener');
          rel.add('noreferrer');
          link.rel = Array.from(rel).join(' ');
        }
      } catch (_) {}
    });
  }

  function markCurrentNavigation() {
    const path = location.pathname.replace(/index\.html$/, '');
    document.querySelectorAll('nav a[href]').forEach(function (link) {
      const target = new URL(link.href, location.href).pathname.replace(/index\.html$/, '');
      if ((path === '/' && target === '/') || (path !== '/' && target !== '/' && path.startsWith(target))) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  function captureCampaign() {
    const params = new URLSearchParams(location.search);
    const campaign = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].reduce(function (data, key) {
      if (params.get(key)) data[key] = params.get(key);
      return data;
    }, {});
    if (Object.keys(campaign).length) sessionStorage.setItem('mina_campaign', JSON.stringify(campaign));
  }

  function trackConversions() {
    document.addEventListener('click', function (event) {
      const link = event.target.closest('a[href]');
      if (!link || typeof window.gtag !== 'function') return;
      const href = link.getAttribute('href') || '';
      let action = '';
      if (href.startsWith('mailto:')) action = 'email';
      else if (href.includes('wa.me')) action = 'whatsapp';
      else if (href.includes('linkedin.com')) action = 'linkedin';
      else if (href.includes('resume') || href.includes('cv')) action = 'resume';
      else if (href.includes('medicine-support-hub')) action = 'case_study';
      else if (href.includes('digital-health-project-management')) action = 'authority_page';
      if (!action) return;
      window.gtag('event', 'career_brand_conversion', {
        conversion_action: action,
        link_text: (link.textContent || '').trim().slice(0, 80),
        page_path: location.pathname
      });
    });
  }

  function addReadingProgress() {
    if (document.querySelector('.reading-progress')) return;
    const bar = document.createElement('div');
    bar.className = 'reading-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.prepend(bar);
    let ticking = false;
    function update() {
      const max = document.documentElement.scrollHeight - innerHeight;
      const progress = max > 0 ? Math.min(1, scrollY / max) : 0;
      bar.style.transform = 'scaleX(' + progress + ')';
      ticking = false;
    }
    addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  function addBackToTop() {
    if (document.querySelector('.back-to-top')) return;
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.type = 'button';
    button.setAttribute('aria-label', 'Back to top');
    button.textContent = '↑';
    button.addEventListener('click', function () { scrollTo({ top: 0, behavior: 'smooth' }); });
    document.body.appendChild(button);
    function update() { button.classList.toggle('visible', scrollY > 700); }
    addEventListener('scroll', update, { passive: true });
    update();
  }

  function keyboardAccess() {
    document.addEventListener('keydown', function (event) {
      if (event.key === '/' && !/input|textarea|select/i.test(document.activeElement.tagName)) {
        const input = document.querySelector('#recruiter-question, #question');
        const panel = document.querySelector('.recruiter-assistant__panel');
        if (panel && !panel.classList.contains('open')) document.querySelector('.recruiter-assistant__toggle')?.click();
        if (input) { event.preventDefault(); input.focus(); }
      }
    });
  }

  function improveImages() {
    document.querySelectorAll('img').forEach(function (img) {
      if (!img.hasAttribute('loading') && !img.closest('header')) img.loading = 'lazy';
      if (!img.hasAttribute('decoding')) img.decoding = 'async';
    });
  }

  ready(function () {
    markExternalLinks();
    markCurrentNavigation();
    captureCampaign();
    trackConversions();
    addReadingProgress();
    addBackToTop();
    keyboardAccess();
    improveImages();
  });
})();