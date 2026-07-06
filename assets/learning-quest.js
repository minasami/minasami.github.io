(function () {
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  var key = 'mina_learning_quest_v1';
  var quests = [
    ['assess', 'Run the Readiness Assessment', '/digital-health-readiness-assessment/', 'Diagnose whether an initiative is ready to fund, pilot, scale, repair or redesign.'],
    ['journal', 'Open the Decision Journal', '/decision-journal/', 'Capture why a transformation decision was made.'],
    ['playbook', 'Study the 90-day Playbook', '/implementation-playbook/', 'Turn the decision into staged execution.'],
    ['benefits', 'Review the Benefits Tracker', '/benefits-realization-tracker/', 'Learn how to prove value after go-live.'],
    ['proof', 'Visit the Proof Room', '/proof-room/', 'Check evidence and claim boundaries.'],
    ['msh', 'Explore Medicine Support Hub', '/medicine-support-hub/', 'See a real digital-health platform case study.'],
    ['gallery', 'Inspect the Evidence Gallery', '/medicine-support-hub-evidence-gallery/', 'Review safe product evidence from Medicine Support Hub screenshots.'],
    ['techproof', 'Open the Technical Proof Checkpoint', '/technical-proof-checkpoint/', 'Connect live app, GitHub, Vercel, Supabase and proof boundaries.'],
    ['trail', 'Follow the Proof Review Trail', '/proof-review-trail/', 'Review the full evidence path in the right order.']
  ];

  function state() {
    try { return JSON.parse(localStorage.getItem(key) || '{}'); }
    catch (e) { return {}; }
  }

  function save(s) { localStorage.setItem(key, JSON.stringify(s)); }

  function markCurrent() {
    var s = state();
    var path = location.pathname;
    quests.forEach(function (q) {
      if (path === q[2]) s[q[0]] = true;
    });
    save(s);
    return s;
  }

  function pct(s) {
    var done = quests.filter(function (q) { return s[q[0]]; }).length;
    return [done, Math.round((done / quests.length) * 100)];
  }

  function badge(done) {
    if (done >= 9) return 'Proof Trail Master';
    if (done >= 8) return 'Technical Evidence Strategist';
    if (done >= 7) return 'Evidence Strategist';
    if (done >= 6) return 'Transformation Strategist';
    if (done >= 4) return 'Governance Builder';
    if (done >= 2) return 'Readiness Explorer';
    return 'Digital Health Learner';
  }

  ready(function () {
    if (document.querySelector('.learning-quest')) return;
    var s = markCurrent();
    var progress = pct(s);
    var panel = document.createElement('aside');
    panel.className = 'learning-quest';
    panel.innerHTML = '<button class="quest-toggle" type="button" aria-expanded="false">🎯 Learning Quest <span>' + progress[1] + '%</span></button><div class="quest-panel" hidden><h3>Healthcare Transformation Quest</h3><p>Complete the learning path and unlock your current badge.</p><div class="quest-progress"><span style="width:' + progress[1] + '%"></span></div><strong class="quest-badge">Badge: ' + badge(progress[0]) + '</strong><div class="quest-list"></div><p class="quest-note">Progress is stored only in this browser.</p></div>';
    document.body.appendChild(panel);

    var list = panel.querySelector('.quest-list');
    quests.forEach(function (q) {
      var done = !!s[q[0]];
      var item = document.createElement('a');
      item.href = q[2];
      item.className = done ? 'quest-item done' : 'quest-item';
      item.innerHTML = '<span>' + (done ? '✓' : '○') + '</span><strong>' + q[1] + '</strong><small>' + q[3] + '</small>';
      list.appendChild(item);
    });

    panel.querySelector('.quest-toggle').addEventListener('click', function () {
      var content = panel.querySelector('.quest-panel');
      var hidden = content.hasAttribute('hidden');
      if (hidden) content.removeAttribute('hidden'); else content.setAttribute('hidden', '');
      this.setAttribute('aria-expanded', hidden ? 'true' : 'false');
      if (typeof window.gtag === 'function') window.gtag('event', 'learning_quest_toggle', { open: hidden });
    });

    var style = document.createElement('style');
    style.textContent = '.learning-quest{position:fixed;right:18px;bottom:18px;z-index:70;max-width:360px;font-family:inherit}.quest-toggle{border:0;border-radius:999px;background:#071f36;color:white;padding:12px 16px;font-weight:900;box-shadow:0 18px 44px rgba(7,31,54,.22);cursor:pointer}.quest-toggle span{background:#1bc1cf;color:#071f36;border-radius:999px;padding:3px 8px;margin-left:8px}.quest-panel{margin-top:10px;border:1px solid var(--line);border-radius:20px;background:var(--card);padding:18px;box-shadow:var(--shadow)}.quest-panel h3{margin:0 0 6px}.quest-progress{height:10px;border-radius:999px;background:var(--soft);overflow:hidden;margin:10px 0}.quest-progress span{display:block;height:100%;background:linear-gradient(90deg,#1463ff,#1bc1cf)}.quest-badge{display:block;margin:8px 0;color:var(--blue)}.quest-list{display:grid;gap:8px;margin-top:10px}.quest-item{display:grid;grid-template-columns:24px 1fr;gap:4px 8px;border:1px solid var(--line);border-radius:14px;padding:10px;text-decoration:none;background:var(--soft);color:inherit}.quest-item small{grid-column:2;color:var(--muted);line-height:1.35}.quest-item.done{background:#ecfeff}.quest-note{font-size:.85rem;color:var(--muted);margin-bottom:0}@media(max-width:720px){.learning-quest{left:12px;right:12px;bottom:12px;max-width:none}.quest-toggle{width:100%}}@media print{.learning-quest{display:none!important}}';
    document.head.appendChild(style);
  });
})();