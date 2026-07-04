(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function dedupeNavigation() {
    document.querySelectorAll('nav .navlinks').forEach(function (nav) {
      const seen = new Set();
      nav.querySelectorAll('a[href]').forEach(function (link) {
        const key = link.getAttribute('href') + '|' + (link.textContent || '').trim().toLowerCase();
        if (seen.has(key)) link.remove();
        else seen.add(key);
      });
    });
  }

  function addCommandCenterLink() {
    document.querySelectorAll('nav .navlinks').forEach(function (nav) {
      if (nav.querySelector('a[href="/digital-health-command-center/"]')) return;
      const link = document.createElement('a');
      link.href = '/digital-health-command-center/';
      link.textContent = 'Command Center';
      nav.prepend(link);
    });
  }

  function addHomepageGateway() {
    if (location.pathname !== '/' && location.pathname !== '/index.html') return;
    if (document.querySelector('.experience-gateway')) return;
    const main = document.querySelector('main');
    if (!main) return;
    const section = document.createElement('section');
    section.className = 'experience-gateway';
    section.innerHTML = '<div class="wrap"><div class="eyebrow">Start here</div><h2>Choose the fastest path through the digital-health experience</h2><p class="lead">For executives, recruiters, PMO leaders and healthcare teams, the Command Center routes you to the right proof, method, insight, tool or contact path.</p><div class="grid"><a class="card span3" href="/digital-health-command-center/"><h3>Command Center</h3><p class="muted">Start by goal or role.</p></a><a class="card span3" href="/resource-library/"><h3>Resource Library</h3><p class="muted">Browse everything by audience.</p></a><a class="card span3" href="/digital-health-readiness-assessment/"><h3>Readiness Tool</h3><p class="muted">Score a project.</p></a><a class="card span3" href="/ceo-digital-health-advisory/"><h3>CEO Advisory</h3><p class="muted">Invite Mina to discuss transformation.</p></a></div></div>';
    main.insertBefore(section, main.firstElementChild);
  }

  function trackGatewayClicks() {
    document.addEventListener('click', function (event) {
      const link = event.target.closest('a[href]');
      if (!link || typeof window.gtag !== 'function') return;
      const href = link.getAttribute('href') || '';
      if (!href.includes('digital-health-command-center') && !href.includes('resource-library') && !href.includes('digital-health-readiness-assessment')) return;
      window.gtag('event', 'experience_router_click', {
        target_path: href,
        source_path: location.pathname,
        link_text: (link.textContent || '').trim().slice(0, 80)
      });
    });
  }

  ready(function () {
    dedupeNavigation();
    addCommandCenterLink();
    addHomepageGateway();
    trackGatewayClicks();
  });
})();