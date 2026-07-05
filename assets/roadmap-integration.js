(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function addRoadmapLink() {
    document.querySelectorAll('nav .navlinks').forEach(function (nav) {
      if (nav.querySelector('a[href="/platform-roadmap/"]')) return;
      const link = document.createElement('a');
      link.href = '/platform-roadmap/';
      link.textContent = 'Roadmap';
      nav.appendChild(link);
    });
  }

  function addRoadmapDockLink() {
    const panel = document.querySelector('.growth-dock__panel');
    if (!panel || panel.querySelector('a[href="/platform-roadmap/"]')) return;
    const link = document.createElement('a');
    link.href = '/platform-roadmap/';
    link.textContent = 'Platform roadmap';
    panel.insertBefore(link, panel.children[1] || null);
  }

  function trackRoadmapClicks() {
    document.addEventListener('click', function (event) {
      const link = event.target.closest('a[href="/platform-roadmap/"]');
      if (!link || typeof window.gtag !== 'function') return;
      window.gtag('event', 'roadmap_link_click', {
        source_path: location.pathname,
        link_text: (link.textContent || '').trim().slice(0, 80)
      });
    });
  }

  ready(function () {
    addRoadmapLink();
    window.setTimeout(addRoadmapDockLink, 300);
    trackRoadmapClicks();
  });
})();