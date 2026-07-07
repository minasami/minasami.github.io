(function(){
  const KEY='healthcareDecisionBrief';
  const FIELD_IDS=['initiative','decision','sponsor','date','situation','risk','evidence'];
  function readBrief(){
    try{return JSON.parse(localStorage.getItem(KEY)||'null');}catch(e){return null;}
  }
  function esc(value){
    return String(value||'Not specified').replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c];});
  }
  function hydrateForm(){
    const brief=readBrief();
    if(!brief)return;
    FIELD_IDS.forEach(function(id){
      const field=document.getElementById(id);
      if(field && brief[id] && !field.value)field.value=brief[id];
    });
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
  function onReady(){hydrateForm();renderBriefContext();}
  window.readHealthcareDecisionBrief=readBrief;
  window.saveHealthcareDecisionBrief=function(brief){
    try{localStorage.setItem(KEY,JSON.stringify(Object.assign({savedAt:new Date().toISOString()},brief||{})));}catch(e){}
  };
  window.clearHealthcareDecisionBrief=function(){
    try{localStorage.removeItem(KEY);}catch(e){}
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',onReady);else onReady();
})();
