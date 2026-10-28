(() => {
  const root = document.documentElement;
  function apply(theme) {
    root.dataset.theme = theme;
    const dark = theme === 'dark';
    document.querySelector('meta[name="theme-color"]').content = dark ? '#1c1418' : '#591c30';
    const button = document.getElementById('theme-toggle');
    if (button) {
      button.setAttribute('aria-pressed', String(dark));
      button.setAttribute('aria-label', dark ? 'Activer le mode clair' : 'Activer le mode sombre');
      button.title = dark ? 'Mode clair' : 'Mode sombre';
    }
  }
  apply('light');
  document.addEventListener('DOMContentLoaded', () => {
    apply(root.dataset.theme);
    document.getElementById('theme-toggle').addEventListener('click', () => {
      apply(root.dataset.theme === 'dark' ? 'light' : 'dark');
    });
  });
})();
