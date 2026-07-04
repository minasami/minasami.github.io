(function () {
  'use strict';
  const dimensions = [
    ['workflow', 'Workflow clarity', 'The project has mapped the real workflow, including exceptions, handoffs and ownership.'],
    ['ownership', 'Executive and clinical ownership', 'The project has clear executive, clinical, operational and technical owners.'],
    ['data', 'Data readiness', 'Required data, privacy, quality and reporting needs are defined before build or purchase.'],
    ['adoption', 'Adoption and change management', 'Users know what will change, what they will stop doing and how they will be supported.'],
    ['risk', 'Risk and governance', 'Risks, decisions, escalations, stage gates and change control are visible and governed.'],
    ['value', 'Outcome measurement', 'The project has baseline measures and post-launch value indicators beyond go-live.']
  ];

  function level(score) {
    if (score >= 85) return ['Scale-ready', 'Strong foundation. Focus on sustainment, benefits review and careful scaling.'];
    if (score >= 65) return ['Promising but incomplete', 'Good direction, but leadership should close weak dimensions before full rollout.'];
    if (score >= 40) return ['High execution risk', 'Do not rush go-live. The project needs workflow, ownership and adoption repair.'];
    return ['Not ready', 'The project is likely to become another unused system unless the operating model is redesigned.'];
  }

  function render() {
    const root = document.querySelector('[data-readiness-assessment]');
    if (!root) return;
    root.innerHTML = '<div class="readiness-grid">' + dimensions.map(function (d) {
      return '<label class="readiness-item"><span><strong>' + d[1] + '</strong><small>' + d[2] + '</small></span><input type="range" min="0" max="100" value="50" data-dimension="' + d[0] + '"><output>50</output></label>';
    }).join('') + '</div><div class="readiness-result card"><div class="metric" id="readiness-score">50%</div><h3 id="readiness-tier">High execution risk</h3><p id="readiness-message">Adjust the sliders to diagnose digital-health readiness.</p><div class="actions"><a class="btn teal" href="mailto:jesussavedmina@gmail.com?subject=Digital%20Health%20Readiness%20Discussion">Discuss this assessment</a><a class="btn ghost" href="/ceo-digital-health-advisory/">CEO advisory</a></div></div>';
    const sliders = root.querySelectorAll('input[type="range"]');
    function update() {
      let total = 0;
      sliders.forEach(function (slider) { total += Number(slider.value); slider.nextElementSibling.value = slider.value; });
      const score = Math.round(total / sliders.length);
      const verdict = level(score);
      root.querySelector('#readiness-score').textContent = score + '%';
      root.querySelector('#readiness-tier').textContent = verdict[0];
      root.querySelector('#readiness-message').textContent = verdict[1];
      if (typeof window.gtag === 'function') window.gtag('event', 'readiness_assessment_update', { readiness_score: score });
    }
    sliders.forEach(function (slider) { slider.addEventListener('input', update); });
    update();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render); else render();
})();