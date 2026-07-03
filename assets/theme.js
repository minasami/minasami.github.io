(function () {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    root.dataset.theme = savedTheme;
  }

  window.toggleTheme = function () {
    const current = root.dataset.theme || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('theme', next);
  };
})();
