(function(){
  const KEY='healthcareDecisionBrief';
  function readBrief(){
    try{return JSON.parse(localStorage.getItem(KEY)||'null');}catch(e){return null;}
  }
  function esc(value){
    return String(value||'Not specified').replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c];});
  }
  function renderBriefContext(){
    const target=document.querySelector('[data-decision-brief-context]');
    if(!target)return;
    const brief=readBrief();
    if(!brief){
      target.innerHTML='<article class="card"><h3>No decision brief loaded yet</h3><p class="muted">Create a two-minute Decision Brief first, then return here to connect the assessment to a real leadership decision.</p><p><a class="btn primary" href="/decision-navigator/#decision-brief">Create Decision Brief</a></p></article>';
      return;
    }
    target.innerHTML='<article class="card"><h3>Decision brief loaded</h3><p><strong>Initiative:</strong> '+esc(brief.initiative)+'</p><p><strong>Decision needed:</strong> '+esc(brief.decision)+'</p><p><strong>Sponsor:</strong> '+esc(brief.sponsor)+'</p><p><strong>Main risk:</strong> '+esc(brief.risk)+'</p><p class="muted">Use this context while scoring readiness. The assessment should test whether this decision is supported by workflow truth, ownership, data, adoption controls, governance and measurable value.</p><p><a class="btn ghost" href="/decision-navigator/#decision-brief">Edit Decision Brief</a></p></article>';
  }
  window.saveHealthcareDecisionBrief=function(brief){
    try{localStorage.setItem(KEY,JSON.stringify(Object.assign({savedAt:new Date().toISOString()},brief||{})));}catch(e){}
  };
  document.addEventListener('DOMContentLoaded',renderBriefContext);
})();
