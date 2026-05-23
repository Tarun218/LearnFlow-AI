/** Inline script to prevent theme flash — keep in sync with ThemeProvider */
export const themeInitScript = `
(function() {
  try {
    var k = 'learnflow-theme';
    var t = localStorage.getItem(k);
    var dark = t === 'dark' || (t !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {}
})();
`;
