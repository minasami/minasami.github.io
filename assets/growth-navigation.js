(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  const growthLinks = [
    ['/site-growth-control-center/', 'Growth Center'],
    ['/career-intelligence-dashboard/', 'Career Intelligence'],
    ['/outreach-command-system/', 'Outreach'],
    ['/linkedin-content-engine/', 'LinkedIn Engine'],
    ['/quality-trust-audit/', 'Quality Audit'],
    ['/share/', 'Share']
  ];

  function addGrowthNavigation() {
    document.querySelectorAll('nav .navlinks').forEach(function (nav) {
      growthLinks.forEach(function (item) {
        const href = item[0], label = item[1];
        if (nav.querySelector('a[href="' + href + '"]')) return;
        const link = document.createElement('a');
        link.href = href;
        link.textContent = label;
        nav.appendChild(link);
      });
    });
  }

  function addGrowthDock() {
    if (document.querySelector('.growth-dock')) return;
    const excluded = ['/privacy/', '/accessibility/'];
    if (excluded.indexOf(location.pathname) !== -1) return;

    const dock = document.createElement('aside');
    dock.className = 'growth-dock';
    dock.setAttribute('aria-label', 'Growth navigation');
    dock.innerHTML = '<button class="growth-dock__toggle" type="button" aria-expanded="false">Growth</button><div class="growth-dock__panel"><strong>Career growth system</strong><a href="/site-growth-control-center/">Weekly growth rhythm</a><a href="/career-intelligence-dashboard/">Opportunity routing</a><a href="/outreach-command-system/">Direct outreach</a><a href="/linkedin-content-engine/">LinkedIn content</a><a href="/quality-trust-audit/">Quality and trust audit</a><a href="/share/">Share assets</a></div>';
    document.body.appendChild(dock);

    const toggle = dock.querySelector('.growth-dock__toggle');
    const panel = dock.querySelector('.growth-dock__panel');
    toggle.addEventListener('click', function () {
      const open = panel.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      if (typeof window.gtag === 'function') window.gtag('event', 'growth_dock_toggle', { open: open, page_location: location.href });
    });
  }

  function addStyles() {
    if (document.getElementById('growth-navigation-styles')) return;
    const style = document.createElement('style');
    style.id = 'growth-navigation-styles';
    style.textContent = '.growth-dock{position:fixed;left:18px;bottom:18px;z-index:9997;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.growth-dock__toggle{border:0;border-radius:999px;background:#1463ff;color:#fff;padding:11px 15px;font-weight:900;cursor:pointer;box-shadow:0 12px 28px rgba(15,23,42,.22)}.growth-dock__panel{display:none;position:absolute;left:0;bottom:48px;width:250px;border:1px solid rgba(100,116,139,.25);border-radius:18px;background:var(--card,#fff);color:var(--ink,#172033);box-shadow:0 24px 70px rgba(15,23,42,.22);padding:14px}.growth-dock__panel.open{display:grid;gap:8px}.growth-dock__panel strong{font-size:.9rem}.growth-dock__panel a{font-size:.86rem;font-weight:800;text-decoration:none}.growth-dock__panel a:hover{text-decoration:underline}@media(max-width:720px){.growth-dock{left:12px;bottom:82px}.growth-dock__panel{width:min(250px,calc(100vw - 28px))}}';
    document.head.appendChild(style);
  }

  function trackGrowthClicks() {
    document.addEventListener('click', function (event) {
      const link = event.target.closest('a[href]');
      if (!link || typeof window.gtag !== 'function') return;
      const href = link.getAttribute('href') || '';
      if (!growthLinks.some(function (item) { return href.indexOf(item[0]) !== -1; })) return;
      window.gtag('event', 'growth_navigation_click', {
        target_path: href,
        source_path: location.pathname,
        link_text: (link.textContent || '').trim().slice(0, 80)
      });
    });
  }

  ready(function () {
    addStyles();
    addGrowthNavigation();
    addGrowthDock();
    trackGrowthClicks();
  });
})();