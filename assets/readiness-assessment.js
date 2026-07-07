(function () {
  'use strict';

  const dimensions = [
    ['sponsor', 'Executive sponsorship', 'There is a named executive sponsor with decision authority and active accountability.'],
    ['workflow', 'Workflow truth', 'The current-state workflow has been mapped with exceptions, handoffs, bottlenecks and workarounds.'],
    ['data', 'Data and reporting ownership', 'Data ownership, definitions, privacy expectations and reporting responsibilities are documented.'],
    ['clinical', 'Clinical and operational ownership', 'Clinical, operational and technical owners are named for decisions, escalation and adoption.'],
    ['adoption', 'Adoption risk control', 'Adoption risks have named mitigation owners, training actions and behavior-change expectations.'],
    ['governance', 'Governance and funding gates', 'Risks, decisions, stage gates, funding assumptions and change control are visible to leadership.'],
    ['value', 'Outcome measurement', 'Baseline measures, success indicators and post-launch benefit tracking are defined before scale.']
  ];

  function esc(value) {
    return String(value || 'Not specified').replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; });
  }

  function tier(score) {
    if (score >= 85) return ['Scale-ready', 'Ready for controlled scale', 'scale'];
    if (score >= 70) return ['Pilot-ready', 'Ready for a governed pilot', 'pilot'];
    if (score >= 50) return ['Funding-risk', 'Needs redesign before major funding', 'funding repair'];
    return ['Redesign required', 'Do not fund or scale yet', 'redesign'];
  }

  function sortedRisks(values) { return values.slice().sort(function (a, b) { return a.value - b.value; }); }

  function riskText(item) {
    const map = {
      sponsor: 'Decision authority is unclear. A project without a real sponsor can drift after early enthusiasm.',
      workflow: 'The workflow may not be true enough. Hidden exceptions can break adoption after go-live.',
      data: 'Reporting and data ownership may be weak. Leaders may not trust the numbers later.',
      clinical: 'Ownership across clinical, operational and technical teams may be incomplete.',
      adoption: 'User adoption risk may be unmanaged. Training alone will not fix behavior change.',
      governance: 'Funding, risk and decision gates may be too loose for executive confidence.',
      value: 'Benefits may be hard to prove because baseline and outcome measures are weak.'
    };
    return map[item.key] || item.label;
  }

  function priorityText(item) {
    const map = {
      sponsor: 'Name the executive sponsor and define decision rights before more delivery work.',
      workflow: 'Map the real current-state workflow with exceptions before selecting or scaling technology.',
      data: 'Document data definitions, owners, privacy expectations and reporting rules.',
      clinical: 'Confirm clinical, operational and technical decision owners.',
      adoption: 'Assign adoption-risk owners and define mitigation actions for each user group.',
      governance: 'Create stage gates for funding, pilot, go-live, scale and change control.',
      value: 'Define baseline metrics and post-launch value measures before scale.'
    };
    return map[item.key] || item.label;
  }

  function actionFor(score) {
    if (score >= 85) return 'Prepare a scale governance review: benefits tracking, operating model ownership and sustainment plan.';
    if (score >= 70) return 'Run a controlled pilot with named owners, success criteria, risk register and adoption plan.';
    if (score >= 50) return 'Pause major funding. Repair the weakest readiness areas before procurement, build or rollout.';
    return 'Redesign the operating model before funding, building or scaling the technology.';
  }

  function fundingVerdict(score, criticalCount) {
    if (criticalCount > 0 && score < 70) return 'Not ready for funding or scale. Critical weakness detected.';
    if (score >= 85 && criticalCount === 0) return 'Ready for controlled scale, with governance and benefits tracking.';
    if (score >= 70 && criticalCount === 0) return 'Ready for a governed pilot, not uncontrolled scale.';
    if (score >= 50) return 'Potentially fundable only after targeted readiness repair.';
    return 'Redesign before funding.';
  }

  function conversationQuestions(weakest) {
    const key = weakest && weakest.key;
    const common = ['What decision is leadership trying to make: fund, pilot, scale, repair or redesign?', 'Which risk would become expensive if discovered after go-live?'];
    const map = {
      sponsor: ['Who has authority to stop, fund or reshape the initiative?', 'What decisions are waiting for executive ownership?'],
      workflow: ['Where does the real workflow differ from the official process?', 'Which exception paths will break adoption if ignored?'],
      data: ['Which definitions must be agreed before reporting is trusted?', 'Who owns data quality and privacy decisions?'],
      clinical: ['Which clinical and operational leaders must approve the future-state workflow?', 'Who owns escalation when safety, service or adoption risks appear?'],
      adoption: ['Which user group is most likely to resist or bypass the new workflow?', 'Who owns adoption risk mitigation by role?'],
      governance: ['What are the stage gates for pilot, go-live and scale?', 'Which risks must be reviewed before the next funding decision?'],
      value: ['What baseline proves whether the initiative worked?', 'Which benefits will be measured after launch, not only at go-live?']
    };
    return (map[key] || []).concat(common).slice(0, 4);
  }

  function decisionBriefHtml() {
    const brief = typeof window.readHealthcareDecisionBrief === 'function' ? window.readHealthcareDecisionBrief() : null;
    if (!brief) return '';
    return '<div class="readiness-brief-decision"><h3>Decision context</h3><p><strong>Initiative:</strong> ' + esc(brief.initiative) + '</p><p><strong>Decision needed:</strong> ' + esc(brief.decision) + '</p><p><strong>Sponsor:</strong> ' + esc(brief.sponsor) + '</p><p><strong>Main risk:</strong> ' + esc(brief.risk) + '</p></div>';
  }

  function render() {
    const root = document.querySelector('[data-readiness-assessment]');
    if (!root) return;

    root.innerHTML = '<div class="readiness-grid">' + dimensions.map(function (d) {
      return '<label class="readiness-item"><span><strong>' + d[1] + '</strong><small>' + d[2] + '</small></span><input type="range" min="0" max="100" value="50" data-dimension="' + d[0] + '" data-label="' + d[1] + '"><output>50</output></label>';
    }).join('') + '</div><div class="readiness-result card"><div class="metric" id="readiness-score">50%</div><h3 id="readiness-tier">Funding-risk</h3><p id="readiness-message">Adjust the sliders to diagnose executive readiness.</p><div id="readiness-flags" class="readiness-flags"></div><div class="readiness-brief"><h3>Executive Readiness Brief</h3><div id="brief-decision-context"></div><p><strong>Current tier:</strong> <span id="brief-tier">Funding-risk</span></p><p><strong>Funding / pilot / scale verdict:</strong> <span id="brief-verdict">Potentially fundable only after targeted readiness repair.</span></p><p><strong>Top 2 risks:</strong></p><ol id="brief-risks"></ol><p><strong>Top 2 priorities:</strong></p><ol id="brief-priorities"></ol><p><strong>Recommended next action:</strong> <span id="brief-action">Repair weak readiness areas before rollout.</span></p><p><strong>Executive conversation prompts:</strong></p><ol id="brief-questions"></ol></div><div id="readiness-breakdown" class="readiness-breakdown"></div><div class="actions"><button class="btn primary" type="button" id="print-readiness-report">Print / Save PDF Report</button><a class="btn teal" href="mailto:jesussavedmina@gmail.com?subject=Request%20a%20Digital%20Health%20Readiness%20Review%20with%20Mina">Request a Digital Health Readiness Review with Mina</a><a class="btn ghost" href="/proof-room/">Proof Room</a></div></div>';

    const sliders = root.querySelectorAll('input[type="range"]');

    function update() {
      let total = 0;
      const values = [];
      sliders.forEach(function (slider) {
        const value = Number(slider.value);
        total += value;
        slider.nextElementSibling.value = slider.value;
        values.push({ key: slider.getAttribute('data-dimension'), label: slider.getAttribute('data-label'), value: value });
      });

      const score = Math.round(total / sliders.length);
      const t = tier(score);
      const weakest = sortedRisks(values);
      const critical = values.filter(function (item) { return item.value < 40; });
      const topRisks = weakest.slice(0, 2);
      const topPriorities = weakest.slice(0, 2);
      const questions = conversationQuestions(weakest[0]);

      root.querySelector('#readiness-score').textContent = score + '%';
      root.querySelector('#readiness-tier').textContent = t[0];
      root.querySelector('#readiness-message').textContent = t[1];
      root.querySelector('#brief-decision-context').innerHTML = decisionBriefHtml();
      root.querySelector('#brief-tier').textContent = t[0];
      root.querySelector('#brief-verdict').textContent = fundingVerdict(score, critical.length);
      root.querySelector('#brief-action').textContent = actionFor(score);
      root.querySelector('#brief-risks').innerHTML = topRisks.map(function (item) { return '<li>' + riskText(item) + '</li>'; }).join('');
      root.querySelector('#brief-priorities').innerHTML = topPriorities.map(function (item) { return '<li>' + priorityText(item) + '</li>'; }).join('');
      root.querySelector('#brief-questions').innerHTML = questions.map(function (q) { return '<li>' + q + '</li>'; }).join('');
      root.querySelector('#readiness-flags').innerHTML = critical.length ? '<strong>Critical weakness detected.</strong><span> One or more foundations scored below 40. Do not hide this risk in an average score.</span>' : '<span>No critical weakness below 40 detected.</span>';
      root.querySelector('#readiness-breakdown').innerHTML = '<h3>Dimension breakdown</h3>' + values.map(function (item) { return '<div class="breakdown-row"><strong>' + item.label + '</strong><span>' + item.value + '/100</span></div>'; }).join('');

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'readiness_assessment_update', { readiness_score: score, readiness_tier: t[0], critical_weakness_count: critical.length });
      }
    }

    sliders.forEach(function (slider) { slider.addEventListener('input', update); });
    root.querySelector('#print-readiness-report').addEventListener('click', function () {
      update();
      if (typeof window.gtag === 'function') window.gtag('event', 'readiness_report_print');
      window.print();
    });
    update();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render); else render();
})();
