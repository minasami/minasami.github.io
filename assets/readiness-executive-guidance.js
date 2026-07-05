(function () {
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  var cards = [
    ['Executive sponsorship', 'Why this matters', 'Major decisions need one accountable sponsor.', 'Common pattern', 'Support exists, but authority is unclear.', 'What good looks like', 'One sponsor owns outcomes and escalation.', ['Who has final decision authority?', 'Who owns benefits after go-live?']],
    ['Workflow truth', 'Why this matters', 'Technology amplifies unclear work instead of fixing it.', 'Common pattern', 'The official process is mapped, but exceptions are ignored.', 'What good looks like', 'Real work, exceptions and handoffs are visible.', ['Where does real work differ from the official process?', 'Which exceptions must be designed for?']],
    ['Data ownership', 'Why this matters', 'Executives cannot govern what they cannot trust.', 'Common pattern', 'Dashboards are built before definitions and owners are agreed.', 'What good looks like', 'Definitions, owners and reporting rules are documented.', ['Who owns data quality?', 'Which reports drive decisions?']],
    ['Clinical and operational ownership', 'Why this matters', 'Digital health must fit clinical and operational reality.', 'Common pattern', 'Users are consulted late, after key decisions are already made.', 'What good looks like', 'Clinical, operational and technical owners share decisions.', ['Who approves the future workflow?', 'Who owns operational escalation?']],
    ['Adoption risk', 'Why this matters', 'Go-live does not equal adoption.', 'Common pattern', 'Training is treated as the whole adoption plan.', 'What good looks like', 'User groups have role-specific support and behavior-change plans.', ['Which users are most likely to bypass the system?', 'What old behavior must stop?']],
    ['Governance gates', 'Why this matters', 'Weak initiatives should not move forward just because activity is happening.', 'Common pattern', 'Projects move from pilot to scale without clear readiness evidence.', 'What good looks like', 'Funding, pilot, go-live and scale gates are explicit.', ['What evidence is required before pilot?', 'What would stop scale?']],
    ['Outcome measurement', 'Why this matters', 'A system can launch and still fail to create value.', 'Common pattern', 'Teams measure delivery but not benefits.', 'What good looks like', 'Baseline measures and post-launch indicators are defined early.', ['What baseline proves improvement?', 'Who owns benefits realization?']]
  ];

  ready(function () {
    var root = document.querySelector('[data-readiness-assessment]');
    if (!root || document.querySelector('.readiness-exec-guidance')) return;
    var style = document.createElement('style');
    style.textContent = '.readiness-exec-guidance{margin-top:18px;border:1px solid var(--line);border-radius:18px;padding:18px;background:var(--card);box-shadow:var(--shadow)}.exec-guidance-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.exec-guidance-card{border:1px solid var(--line);border-radius:16px;padding:14px;background:var(--soft)}.exec-guidance-card h4{margin:0 0 8px}.exec-guidance-card strong{display:block;color:var(--blue);margin-top:10px}.exec-guidance-card p{margin:4px 0}.exec-guidance-card ul{margin:6px 0 0;padding-left:18px}@media(max-width:850px){.exec-guidance-grid{grid-template-columns:1fr}}@media print{.readiness-exec-guidance{break-inside:avoid;box-shadow:none!important;background:#fff!important}.exec-guidance-grid{grid-template-columns:1fr}}';
    document.head.appendChild(style);
    var panel = document.createElement('div');
    panel.className = 'readiness-exec-guidance';
    panel.innerHTML = '<h3>Executive guidance by dimension</h3><p class="muted">Use these prompts to turn assessment results into a steering-committee conversation.</p><div class="exec-guidance-grid"></div>';
    var grid = panel.querySelector('.exec-guidance-grid');
    cards.forEach(function (c) {
      var li = c[7].map(function (q) { return '<li>' + q + '</li>'; }).join('');
      var article = document.createElement('article');
      article.className = 'exec-guidance-card';
      article.innerHTML = '<h4>' + c[0] + '</h4><strong>' + c[1] + '</strong><p>' + c[2] + '</p><strong>' + c[3] + '</strong><p>' + c[4] + '</p><strong>' + c[5] + '</strong><p>' + c[6] + '</p><strong>Questions executives should ask</strong><ul>' + li + '</ul>';
      grid.appendChild(article);
    });
    var result = root.querySelector('.readiness-result');
    if (result) result.appendChild(panel);
  });
})();