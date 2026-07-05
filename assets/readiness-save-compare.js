(function () {
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  var key = 'mina_readiness_assessments_v1';

  function getSaved() {
    try { return JSON.parse(localStorage.getItem(key) || '[]'); }
    catch (e) { return []; }
  }

  function setSaved(items) {
    localStorage.setItem(key, JSON.stringify(items.slice(-8)));
  }

  function currentAssessment(root) {
    var rows = Array.prototype.slice.call(root.querySelectorAll('input[type="range"]')).map(function (slider) {
      return {
        key: slider.getAttribute('data-dimension'),
        label: slider.getAttribute('data-label'),
        value: Number(slider.value)
      };
    });
    var scoreEl = document.getElementById('readiness-score');
    var tierEl = document.getElementById('readiness-tier');
    var score = Number((scoreEl && scoreEl.textContent || '0').replace('%', '')) || 0;
    return {
      date: new Date().toISOString(),
      score: score,
      tier: tierEl ? tierEl.textContent : '',
      dimensions: rows
    };
  }

  function labelDate(value) {
    try { return new Date(value).toLocaleString(); }
    catch (e) { return value; }
  }

  function renderList(panel) {
    var saved = getSaved();
    var list = panel.querySelector('#saved-assessment-list');
    if (!list) return;
    if (!saved.length) {
      list.innerHTML = '<p class="muted">No saved assessments yet. Save a baseline, improve the initiative, then compare later.</p>';
      return;
    }
    list.innerHTML = saved.slice().reverse().map(function (item, index) {
      return '<div class="saved-assessment"><strong>' + item.score + '% — ' + item.tier + '</strong><span>' + labelDate(item.date) + '</span></div>';
    }).join('');
  }

  function renderComparison(panel) {
    var saved = getSaved();
    var compare = panel.querySelector('#assessment-comparison');
    if (!compare) return;
    if (saved.length < 2) {
      compare.innerHTML = '<p class="muted">Save at least two assessments to compare progress.</p>';
      return;
    }
    var first = saved[0];
    var last = saved[saved.length - 1];
    var delta = last.score - first.score;
    var direction = delta > 0 ? 'improved' : delta < 0 ? 'declined' : 'remained flat';
    compare.innerHTML = '<h4>Baseline vs latest</h4><p><strong>Baseline:</strong> ' + first.score + '% — ' + first.tier + '</p><p><strong>Latest:</strong> ' + last.score + '% — ' + last.tier + '</p><p><strong>Change:</strong> ' + (delta > 0 ? '+' : '') + delta + ' points. Readiness has ' + direction + '.</p>';
  }

  ready(function () {
    var root = document.querySelector('[data-readiness-assessment]');
    if (!root || document.querySelector('.readiness-save-compare')) return;

    var style = document.createElement('style');
    style.textContent = '.readiness-save-compare{margin-top:18px;border:1px solid var(--line);border-radius:18px;padding:18px;background:var(--card);box-shadow:var(--shadow)}.saved-assessment{display:grid;grid-template-columns:1fr auto;gap:12px;border-bottom:1px solid var(--line);padding:10px 0}.saved-assessment:last-child{border-bottom:0}.saved-assessment span{color:var(--muted);font-size:.9rem}.readiness-save-compare .actions{margin-top:14px}@media(max-width:720px){.saved-assessment{grid-template-columns:1fr}}@media print{.readiness-save-compare{display:none!important}}';
    document.head.appendChild(style);

    var result = root.querySelector('.readiness-result');
    if (!result) return;
    var panel = document.createElement('div');
    panel.className = 'readiness-save-compare';
    panel.innerHTML = '<h3>Save and compare assessments</h3><p class="muted">Save this result locally in your browser to compare readiness before and after governance, workflow or adoption improvements.</p><div class="actions"><button class="btn teal" type="button" id="save-assessment">Save current assessment</button><button class="btn ghost" type="button" id="clear-assessments">Clear saved assessments</button></div><div id="assessment-comparison"></div><div id="saved-assessment-list"></div>';
    result.appendChild(panel);

    panel.querySelector('#save-assessment').addEventListener('click', function () {
      var saved = getSaved();
      saved.push(currentAssessment(root));
      setSaved(saved);
      renderList(panel);
      renderComparison(panel);
      if (typeof window.gtag === 'function') window.gtag('event', 'readiness_assessment_saved');
    });

    panel.querySelector('#clear-assessments').addEventListener('click', function () {
      localStorage.removeItem(key);
      renderList(panel);
      renderComparison(panel);
    });

    renderList(panel);
    renderComparison(panel);
  });
})();