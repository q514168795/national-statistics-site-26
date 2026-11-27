// SPDX-License-Identifier: MIT
let currentModule = null;
export async function navigate() {
  const hash = location.hash.replace('#/', '') || 'overview';
  const map = {
    'overview': () => import('./views/overview.js'),
    'economy': () => import('./views/economy.js'),
    'cantons': () => import('./views/cantons.js')
  };
  const loader = map[hash] || map['overview'];
  currentModule = await loader();
  refresh();
  document.querySelectorAll('.nav-link').forEach(l => {
    const target = l.getAttribute('href').replace('#/', '') || 'overview';
    l.classList.toggle('active', target === hash);
  });
}
export function refresh() {
  if (currentModule) {
    document.getElementById('root').innerHTML = currentModule.render();
    currentModule.mount?.();
  }
}
export function init() {
  if (!document.querySelector('link[rel=stylesheet]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/style.css';
    document.head.appendChild(link);
  }
  document.body.innerHTML = `
    <header>
      <div class="logo">
        <svg width="24" height="24" viewBox="0 0 100 100"><rect width="100" height="100" fill="#e3000f" rx="8"/><path d="M40 20 h20 v20 h20 v20 h-20 v20 h-20 v-20 h-20 v-20 h20 z" fill="#fff"/></svg>
        SwissStat
      </div>
      <nav>
        <a href="#/" class="nav-link">Overview</a>
        <a href="#/economy" class="nav-link">Economy</a>
        <a href="#/cantons" class="nav-link">Cantons</a>
      </nav>
    </header>
    <main id="root"></main>
  `;
  window.addEventListener('hashchange', navigate);
  navigate();
}
init();
