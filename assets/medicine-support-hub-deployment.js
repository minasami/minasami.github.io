(function () {
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function () {
    if (location.pathname !== '/medicine-support-hub/' || document.querySelector('.msh-deployment-panel')) return;
    var main = document.querySelector('main');
    if (!main) return;

    var style = document.createElement('style');
    style.textContent = '.msh-deployment-panel{padding:22px 0;border-bottom:1px solid var(--line);background:var(--soft)}.msh-deployment-panel .box{border:1px solid var(--line);border-radius:18px;background:var(--card);padding:20px;box-shadow:var(--shadow)}.msh-deployment-panel .grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:14px}.msh-deployment-panel .item{border:1px solid var(--line);border-radius:14px;padding:14px;background:#fff}.msh-deployment-panel strong{display:block;color:var(--blue)}.msh-deployment-panel a{font-weight:900}@media(max-width:900px){.msh-deployment-panel .grid{grid-template-columns:1fr}}';
    document.head.appendChild(style);

    var section = document.createElement('section');
    section.className = 'msh-deployment-panel';
    section.innerHTML = '<div class="wrap"><div class="box"><div class="eyebrow">Current deployment evidence</div><h2>GitHub-integrated, Vercel-hosted and Supabase-backed live app.</h2><p class="lead">Medicine Support Hub has strong technical delivery evidence: live production deployment at medicinesupport.app/medicines, connected GitHub repository, and Supabase database foundation.</p><div class="grid"><div class="item"><strong>Production app</strong><span>medicinesupport.app/medicines</span></div><div class="item"><strong>GitHub</strong><span>Repository: minasami/medicine-support-hub</span></div><div class="item"><strong>Supabase</strong><span>Database-backed architecture</span></div><div class="item"><strong>Proof boundary</strong><span>Do not infer clinical production use without added evidence.</span></div></div><p><a href="https://medicinesupport.app/medicines" target="_blank" rel="noopener">Open live platform (medicinesupport.app) →</a> · <a href="https://github.com/minasami/medicine-support-hub" target="_blank" rel="noopener">Open GitHub repository →</a></p></div></div>';
    main.insertBefore(section, main.firstChild);
  });
})();