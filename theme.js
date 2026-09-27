/* theme.js — shared theme switcher logic */
(function () {
  const THEMES = ['light', 'dark'];
  const STORAGE_KEY = 'nik3el-theme';

  function getTheme() {
    return localStorage.getItem(STORAGE_KEY) || 'light';
  }

  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem(STORAGE_KEY, t);
    document.querySelectorAll('.theme-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.theme === t);
    });
  }

  // Apply saved theme immediately (before paint)
  setTheme(getTheme());

  // Build switcher UI
  document.addEventListener('DOMContentLoaded', function () {
    var switcher = document.createElement('div');
    switcher.className = 'theme-switcher';
    switcher.setAttribute('aria-label', 'Theme switcher');

    var icons = { light: '☀️', dark: '🌙' };

    THEMES.forEach(function (t) {
      var btn = document.createElement('button');
      btn.className = 'theme-btn';
      btn.dataset.theme = t;
      btn.setAttribute('aria-label', t + ' theme');
      btn.innerHTML = icons[t] + '<span class="tooltip-label">' + t + '</span>';
      btn.addEventListener('click', function () { setTheme(t); });
      switcher.appendChild(btn);
    });

    document.body.appendChild(switcher);
    setTheme(getTheme()); // re-apply to highlight active button
  });
})();
