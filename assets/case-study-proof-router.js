(function () {
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function showHere() {
    return location.pathname === '/medicine-support-hub/' || location.pathname === '/employee-support-program/';
  }

  ready(function () {
    if (!showHere() || document.querySelector('.case-proof-router')) return;
    var main = document.querySelector('main');
    if (!main) return;

    var style = document.createElement('style');
    style.textContent = '.case-proof-router{padding:20px 0;border-bottom:1px solid var(--line);background:var(--soft)}.case-proof-router .box{border:1px solid var(--line);border-radius:16px;background:var(--card);padding:18px;box-shadow:var(--shadow)}.case-proof-router a{font-weight:900;margin-right:14px}';
    document.head.appendChild(style);

    var section = document.createElement('section');
    section.className = 'case-proof-router';
    section.innerHTML = '<div class="wrap"><div class="box"><strong>Evaluate this case study through the proof framework.</strong><p><a href="/case-study-proof-system/">Proof framework</a><a href="/proof-room/">Proof Room</a><a href="/claims-registry/">Claims Registry</a></p></div></div>';
    main.insertBefore(section, main.firstChild);
  });
})();