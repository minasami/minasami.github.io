(function () {
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  var guidance = {
    sponsor: {
      title: 'Why executive sponsorship matters',
      text: 'Digital health initiatives need someone with authority to remove blockers, align functions and make trade-off decisions. Without a real sponsor, projects drift between departments and adoption weakens.',
      good: 'A named executive sponsor owns the decision path, funding logic and escalation route.'
    },
    workflow: {
      title: 'Why workflow truth matters',
      text: 'Organizations often digitize unclear processes. Technology usually amplifies existing workflow problems rather than solving them. Exceptions, handoffs and workarounds must be visible before build or scale.',
      good: 'The current-state workflow is mapped with exceptions, bottlenecks and frontline validation.'
    },
    data: {
      title: 'Why data ownership matters',
      text: 'If definitions, owners and reporting rules are unclear, leaders may not trust the dashboard later. Data readiness is not only technical; it is operational accountability.',
      good: 'Data definitions, owners, privacy expectations and reporting responsibilities are documented.'
    },
    clinical: {
      title: 'Why clinical and operational ownership matters',
      text: 'Digital health work sits between clinical reality, operations and technology. If ownership is unclear, decisions slow down and the system may not match real care or service delivery needs.',
      good: 'Clinical, operational and technical owners are named for decisions, escalation and adoption.'
    },
    adoption: {
      title: 'Why adoption risk matters',
      text: 'Go-live does not equal adoption. Users need role-specific expectations, training, support and clear reasons to change behavior. Resistance must be planned for, not discovered late.',
      good: 'Adoption risks have named mitigation owners, training actions and user-group plans.'
    },
    governance: {
      title: 'Why governance gates matter',
      text: 'Executives need decision gates before funding, pilot, go-live and scale. Without gates, weak initiatives can keep moving until failure becomes expensive.',
      good: 'Funding assumptions, risk reviews, stage gates and change control are visible to leadership.'
    },
    value: {
      title: 'Why outcome measurement matters',
      text: 'A project can launch successfully and still fail to create value. Baselines and outcome measures protect the initiative from becoming only a technology installation.',
      good: 'Baseline measures and post-launch benefit indicators are defined before scale.'
    }
  };

  ready(function () {
    var root = document.querySelector('[data-readiness-assessment]');
    if (!root || document.querySelector('.readiness-why-panel')) return;

    var style = document.createElement('style');
    style.textContent = '.readiness-why-panel{margin-top:18px;border:1px solid var(--line);border-radius:18px;padding:18px;background:var(--card);box-shadow:var(--shadow)}.readiness-why-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.why-card{border:1px solid var(--line);border-radius:16px;padding:14px;background:var(--soft)}.why-card h4{margin:0 0 8px}.why-card p{margin:0 0 8px}.why-card small{display:block;color:var(--muted);line-height:1.45}@media(max-width:850px){.readiness-why-grid{grid-template-columns:1fr}}@media print{.readiness-why-panel{break-inside:avoid;box-shadow:none!important;background:#fff!important}.readiness-why-grid{grid-template-columns:1fr}}';
    document.head.appendChild(style);

    var panel = document.createElement('div');
    panel.className = 'readiness-why-panel';
    panel.innerHTML = '<h3>Why these dimensions matter</h3><p class="muted">The assessment is designed around failure patterns that commonly appear before digital-health projects fail after go-live.</p><div class="readiness-why-grid"></div>';

    var grid = panel.querySelector('.readiness-why-grid');
    Object.keys(guidance).forEach(function (key) {
      var item = guidance[key];
      var card = document.createElement('article');
      card.className = 'why-card';
      card.innerHTML = '<h4>' + item.title + '</h4><p>' + item.text + '</p><small><strong>What good looks like:</strong> ' + item.good + '</small>';
      grid.appendChild(card);
    });

    var result = root.querySelector('.readiness-result');
    if (result) result.appendChild(panel);
  });
})();