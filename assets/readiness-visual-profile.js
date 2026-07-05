(function () {
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function () {
    var root = document.querySelector('[data-readiness-assessment]');
    if (!root || document.querySelector('.readiness-visual-profile')) return;

    var style = document.createElement('style');
    style.textContent = '.readiness-visual-profile{margin-top:18px;border:1px solid var(--line);border-radius:18px;padding:18px;background:var(--card);box-shadow:var(--shadow)}.visual-row{display:grid;grid-template-columns:190px 1fr 52px;gap:12px;align-items:center;margin:10px 0}.visual-bar{height:12px;background:var(--soft);border-radius:999px;overflow:hidden}.visual-fill{display:block;height:100%;width:0;background:linear-gradient(90deg,#1463ff,#1bc1cf)}.visual-row strong{font-size:.9rem}.visual-row span:last-child{font-weight:900;color:#0f766e}@media(max-width:720px){.visual-row{grid-template-columns:1fr}}';
    document.head.appendChild(style);

    var panel = document.createElement('div');
    panel.className = 'readiness-visual-profile';
    panel.innerHTML = '<h3>Readiness visual profile</h3><p class="muted">Quick view of strengths and weak foundations.</p><div id="visual-profile-rows"></div>';
    var result = root.querySelector('.readiness-result');
    if (result) result.appendChild(panel);

    function update() {
      var rows = Array.prototype.slice.call(root.querySelectorAll('input[type="range"]')).map(function (slider) {
        var label = slider.getAttribute('data-label');
        var value = Number(slider.value);
        return '<div class="visual-row"><strong>' + label + '</strong><div class="visual-bar"><span class="visual-fill" style="width:' + value + '%"></span></div><span>' + value + '</span></div>';
      }).join('');
      var target = document.getElementById('visual-profile-rows');
      if (target) target.innerHTML = rows;
    }

    root.addEventListener('input', update);
    update();
  });
})();