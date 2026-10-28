(() => {
  const root = document.documentElement;
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  let saved;
  try { saved = localStorage.getItem('bibina-theme'); } catch {}
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
  apply(saved === 'dark' || saved === 'light' ? saved : preference.matches ? 'dark' : 'light');
  preference.addEventListener('change', event => { if (!saved) apply(event.matches ? 'dark' : 'light'); });
  document.addEventListener('DOMContentLoaded', () => {
    apply(root.dataset.theme);
    document.getElementById('theme-toggle').addEventListener('click', () => {
      saved = root.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(saved);
      try { localStorage.setItem('bibina-theme', saved); } catch {}
    });
  });
})();
