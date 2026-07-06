(function () {
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  var checks = {
    '/digital-health-readiness-assessment/': ['What is the hidden risk if one readiness dimension scores below 40?', 'A high average score may hide a critical weakness that can derail funding, pilot or scale decisions.'],
    '/decision-journal/': ['Why should leaders document transformation decisions?', 'Because assumptions, risks and decision logic are often forgotten later unless they are captured as governance memory.'],
    '/implementation-playbook/': ['What is the purpose of the first 30 days?', 'Align sponsor, workflow, owners, KPIs, risks and governance before execution accelerates.'],
    '/benefits-realization-tracker/': ['Why does go-live not prove success?', 'A system can launch and still fail to create measurable adoption, operational, quality or financial value.'],
    '/medicine-support-hub/': ['What makes Medicine Support Hub stronger as proof now?', 'It is GitHub-integrated, Vercel-hosted and Supabase-backed, while still keeping claims bounded.'],
    '/proof-room/': ['Why does a Proof Room increase trust?', 'It separates verified evidence from ambition and keeps claims reviewable.']
  };

  ready(function () {
    var data = checks[location.pathname];
    if (!data || document.querySelector('.knowledge-check')) return;

    var style = document.createElement('style');
    style.textContent = '.knowledge-check{margin:22px auto;border:1px solid var(--line);border-radius:20px;background:var(--card);padding:18px;box-shadow:var(--shadow)}.knowledge-check h3{margin-top:0}.knowledge-check .answer{display:none;margin-top:12px;border:1px solid var(--line);border-radius:14px;background:var(--soft);padding:14px}.knowledge-check.revealed .answer{display:block}.knowledge-check button{margin-top:10px}@media print{.knowledge-check{break-inside:avoid}.knowledge-check .answer{display:block!important}}';
    document.head.appendChild(style);

    var section = document.createElement('section');
    section.className = 'knowledge-check wrap';
    section.innerHTML = '<div class="eyebrow">Knowledge check</div><h3>' + data[0] + '</h3><button class="btn teal" type="button">Reveal answer</button><div class="answer"><strong>Answer:</strong> ' + data[1] + '</div>';

    var main = document.querySelector('main');
    if (!main) return;
    main.appendChild(section);

    section.querySelector('button').addEventListener('click', function () {
      section.classList.add('revealed');
      this.textContent = 'Answer revealed';
      this.disabled = true;
      try {
        var key = 'mina_knowledge_checks_v1';
        var state = JSON.parse(localStorage.getItem(key) || '{}');
        state[location.pathname] = true;
        localStorage.setItem(key, JSON.stringify(state));
      } catch (e) {}
      if (typeof window.gtag === 'function') window.gtag('event', 'knowledge_check_revealed', { path: location.pathname });
    });
  });
})();