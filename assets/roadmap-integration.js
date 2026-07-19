(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  const usefulLinks = [
    ['/executive-digital-health-tour/', 'Executive Tour'],
    ['/medicine-support-hub/', 'Medicine Support Hub'],
    ['/proof-review-trail/', 'Proof Trail']
  ];

  function addRoadmapLink() {
    document.querySelectorAll('nav .navlinks').forEach(function (nav) {
      if (!nav.querySelector('a[href="/platform-roadmap/"]')) {
        const link = document.createElement('a');
        link.href = '/platform-roadmap/';
        link.textContent = 'Roadmap';
        nav.appendChild(link);
      }
      usefulLinks.forEach(function (item) {
        if (nav.querySelector('a[href="' + item[0] + '"]')) return;
        const link = document.createElement('a');
        link.href = item[0];
        link.textContent = item[1];
        nav.appendChild(link);
      });
    });
  }

  function addRoadmapDockLink() {
    const panel = document.querySelector('.growth-dock__panel');
    if (!panel) return;
    if (!panel.querySelector('a[href="/platform-roadmap/"]')) {
      const link = document.createElement('a');
      link.href = '/platform-roadmap/';
      link.textContent = 'Platform roadmap';
      panel.insertBefore(link, panel.children[1] || null);
    }
    usefulLinks.forEach(function (item) {
      if (panel.querySelector('a[href="' + item[0] + '"]')) return;
      const link = document.createElement('a');
      link.href = item[0];
      link.textContent = item[1];
      panel.appendChild(link);
    });
  }

  function addUsefulStartStrip() {
    if (location.pathname !== '/' || document.querySelector('.useful-start-strip')) return;
    const target = document.querySelector('#impact');
    if (!target || !target.parentNode) return;
    const section = document.createElement('section');
    section.className = 'impact-strip useful-start-strip';
    section.setAttribute('aria-label', 'Useful starting paths');
    section.innerHTML = '<div class="wrap"><div class="impact-grid"><a class="impact-item" href="/executive-digital-health-tour/"><span class="impact-value">Executives</span><span class="impact-label">Start with the 10-minute review tour</span></a><a class="impact-item" href="/medicine-support-hub/"><span class="impact-value">Product proof</span><span class="impact-label">Inspect Medicine Support Hub</span></a><a class="impact-item" href="/proof-review-trail/"><span class="impact-value">Evidence</span><span class="impact-label">Follow the proof review trail</span></a></div></div>';
    target.parentNode.insertBefore(section, target.nextSibling);
  }

  function trackRoadmapClicks() {
    document.addEventListener('click', function (event) {
      const link = event.target.closest('a[href="/platform-roadmap/"], a[href="/executive-digital-health-tour/"], a[href="/medicine-support-hub/"], a[href="/proof-review-trail/"]');
      if (!link || typeof window.gtag !== 'function') return;
      window.gtag('event', 'useful_path_click', {
        source_path: location.pathname,
        link_url: link.getAttribute('href'),
        link_text: (link.textContent || '').trim().slice(0, 80)
      });
    });
  }

  ready(function () {
    addRoadmapLink();
    addUsefulStartStrip();
    window.setTimeout(addRoadmapDockLink, 300);
    trackRoadmapClicks();
  });
})();