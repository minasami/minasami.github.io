(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function isHome() {
    return location.pathname === '/' || location.pathname.endsWith('/index.html');
  }

  function track(eventName, params) {
    if (typeof window.gtag === 'function') window.gtag('event', eventName, params || {});
  }

  function addHomepageRouter() {
    if (!isHome() || document.querySelector('.homepage-priority-router')) return;
    const hero = document.querySelector('header.hero');
    const main = document.querySelector('main');
    if (!hero || !main) return;

    const panel = document.createElement('section');
    panel.className = 'homepage-priority-router';
    panel.setAttribute('aria-label', 'Choose the best route');
    panel.innerHTML = '<div class="wrap"><div class="homepage-priority-router__head"><span>Choose your route</span><strong>Send every visitor to the right proof path.</strong></div><div class="homepage-priority-router__grid"><a href="/executive-brief/" data-route="recruiter"><strong>Recruiter</strong><span>Fast fit, proof and role positioning</span></a><a href="/ceo-digital-health-advisory/" data-route="executive"><strong>CEO / Founder</strong><span>Digital-health transformation conversation</span></a><a href="/proof-room/" data-route="trust"><strong>Skeptical reviewer</strong><span>Claims, evidence and boundaries</span></a><a href="/site-growth-control-center/" data-route="growth"><strong>Mina</strong><span>Weekly growth operating rhythm</span></a></div></div>';
    main.insertBefore(panel, main.firstChild);

    panel.addEventListener('click', function (event) {
      const link = event.target.closest('a[data-route]');
      if (!link) return;
      track('homepage_priority_route_click', {
        route: link.getAttribute('data-route'),
        target_path: link.getAttribute('href')
      });
    });
  }

  function addStyles() {
    if (document.getElementById('homepage-priority-router-styles')) return;
    const style = document.createElement('style');
    style.id = 'homepage-priority-router-styles';
    style.textContent = '.homepage-priority-router{border-bottom:1px solid var(--line);background:linear-gradient(180deg,var(--soft),transparent);padding:24px 0}.homepage-priority-router__head{display:flex;align-items:end;justify-content:space-between;gap:18px;margin-bottom:14px}.homepage-priority-router__head span{font-size:.78rem;font-weight:900;text-transform:uppercase;letter-spacing:.12em;color:var(--blue)}.homepage-priority-router__head strong{font-size:1.1rem}.homepage-priority-router__grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}.homepage-priority-router__grid a{display:grid;gap:6px;border:1px solid var(--line);border-radius:16px;background:var(--card);padding:16px;text-decoration:none;box-shadow:var(--shadow)}.homepage-priority-router__grid a strong{color:var(--blue)}.homepage-priority-router__grid a span{color:var(--muted);font-size:.92rem}.homepage-priority-router__grid a:hover{transform:translateY(-2px)}@media(max-width:920px){.homepage-priority-router__head{display:block}.homepage-priority-router__grid{grid-template-columns:1fr}}';
    document.head.appendChild(style);
  }

  ready(function () {
    addStyles();
    addHomepageRouter();
  });
})();