(function () {
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  var baselines = {
    hospital: 68,
    pharma: 72,
    ngo: 60,
    insurance: 70,
    startup: 64,
    government: 58
  };

  var labels = {
    hospital: 'Hospital / provider',
    pharma: 'Pharma / life sciences',
    ngo: 'NGO / foundation',
    insurance: 'Health insurance / payer',
    startup: 'Digital health startup',
    government: 'Government / public sector'
  };

  ready(function () {
    var root = document.querySelector('[data-readiness-assessment]');
    if (!root || document.querySelector('.sector-benchmark')) return;

    var box = document.createElement('div');
    box.className = 'sector-benchmark card';
    box.innerHTML = '<h3>Sector context</h3><p class="muted">Select the closest sector for an expert-defined comparison. This is a guidance baseline, not a statistical market benchmark.</p><select id="sector-select"><option value="hospital">Hospital / provider</option><option value="pharma">Pharma / life sciences</option><option value="ngo">NGO / foundation</option><option value="insurance">Health insurance / payer</option><option value="startup">Digital health startup</option><option value="government">Government / public sector</option></select><p id="sector-comment" class="muted"></p>';
    root.insertBefore(box, root.firstChild);

    function score() {
      var el = document.getElementById('readiness-score');
      if (!el) return 50;
      return Number((el.textContent || '50').replace('%', '')) || 50;
    }

    function update() {
      var sector = document.getElementById('sector-select').value;
      var baseline = baselines[sector];
      var s = score();
      var delta = s - baseline;
      var direction = delta >= 8 ? 'above' : delta <= -8 ? 'below' : 'near';
      var msg = direction === 'above'
        ? 'Compared with an expert-defined baseline for ' + labels[sector] + ', this initiative appears stronger than expected. Protect that advantage with governance and benefits tracking.'
        : direction === 'below'
          ? 'Compared with an expert-defined baseline for ' + labels[sector] + ', this initiative appears below readiness expectations. Review weak dimensions before funding or scale.'
          : 'Compared with an expert-defined baseline for ' + labels[sector] + ', this initiative appears near expected readiness. The weakest dimensions should drive the next decision.';
      document.getElementById('sector-comment').textContent = msg;
    }

    document.getElementById('sector-select').addEventListener('change', update);
    root.addEventListener('input', function () { window.setTimeout(update, 0); });
    window.setTimeout(update, 100);
  });
})();