(function () {
  window.showPanel = function (id, button) {
    document.querySelectorAll('.panel').forEach(function (x) {
      x.classList.remove('active');
    });
    document.querySelectorAll('.tab').forEach(function (x) {
      x.classList.remove('active');
      x.setAttribute('aria-selected', 'false');
    });
    const targetPanel = document.getElementById(id);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }
    if (button) {
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
    }
  };

  window.generateCV = function (title, panel) {
    document.querySelectorAll('.panel').forEach(function (x) {
      x.classList.remove('active');
    });
    const targetPanel = document.getElementById(panel);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }
    const original = document.title;
    document.title = 'Mina Samy Tawfik Saad — ' + title + ' CV';
    setTimeout(function () {
      window.print();
      document.title = original;
    }, 180);
  };
})();
