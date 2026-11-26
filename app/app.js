// SPDX-License-Identifier: MIT
// StatAtlas application shell: route table, dynamic stylesheet loader, and lazy view dispatcher.

import { BUREAU_META, reconcileNationalStats } from './data.js';
import { escapeHtml, getState, parseHashRoute, setState, subscribeState } from './state.js';

export const ROUTES = [
  { id: 'overview', label: 'Overview', short: 'Overview' },
  { id: 'economy', label: 'Economy & Prices', short: 'Economy' },
  { id: 'demographics', label: 'Demographics', short: 'Population' },
  { id: 'regions', label: 'Regions', short: 'Regions' },
  { id: 'explorer', label: 'Data Explorer', short: 'Explorer' },
  { id: 'methodology', label: 'Methodology', short: 'Methods' },
];

export const VALID_ROUTE_IDS = ROUTES.map((r) => r.id);

export function mountStylesheet(href = '/style.css') {
  if (document.querySelector('link[data-statatlas-css]')) return Promise.resolve();
  return new Promise((resolve) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.dataset.statatlasCss = '1';
    link.addEventListener('load', () => resolve(), { once: true });
    link.addEventListener('error', () => resolve(), { once: true });
    document.head.append(link);
  });
}

export function loadViewModule(route) {
  switch (route) {
    case 'economy':
      return import('./views/economy.js');
    case 'demographics':
      return import('./views/demographics.js');
    case 'regions':
      return import('./views/regions.js');
    case 'explorer':
      return import('./views/explorer.js');
    case 'methodology':
      return import('./views/methodology.js');
    case 'overview':
    default:
      return import('./views/overview.js');
  }
}

export function navigateTo(route, query = '') {
  const target = VALID_ROUTE_IDS.includes(route) ? route : 'overview';
  const nextHash = `#/${target}${query ? `?${query}` : ''}`;
  if (location.hash !== nextHash) {
    location.hash = nextHash;
  } else {
    setState({ route: target });
  }
}

function renderShellMarkup(activeRoute) {
  const check = reconcileNationalStats();
  const navLinks = ROUTES.map((r) => {
    const active = r.id === activeRoute ? 'is-active' : '';
    const aria = r.id === activeRoute ? ' aria-current="page"' : '';
    return `<a class="nav-link ${active}" href="#/${r.id}"${aria}>${escapeHtml(r.label)}</a>`;
  }).join('');

  return `<div class="app-shell">
    <header class="topbar">
      <div class="topbar-inner">
        <a class="brand" href="#/overview" aria-label="StatAtlas Home">
          <span class="brand-mark" aria-hidden="true">M</span>
          <span class="brand-text">
            <strong class="brand-title">${escapeHtml(BUREAU_META.brand)}</strong>
            <span class="brand-sub">${escapeHtml(BUREAU_META.bureau)}</span>
          </span>
        </a>
        <nav class="main-nav" aria-label="Primary statistics sections">${navLinks}</nav>
        <div class="topbar-meta">
          <span class="pill-badge">${escapeHtml(BUREAU_META.edition)}</span>
        </div>
      </div>
    </header>
    <main id="view-root" class="main-container" tabindex="-1"></main>
    <footer class="site-footer">
      <div class="footer-inner">
        <div>
          <strong>${escapeHtml(BUREAU_META.bureau)} (${escapeHtml(BUREAU_META.acronym)})</strong> · ${escapeHtml(BUREAU_META.country)} · ${escapeHtml(BUREAU_META.standards)}
        </div>
        <div class="footer-right">
          <span>Accounts audit: ${check.reconciled ? 'Reconciled (0 residual)' : 'Check pending'}</span>
          <span>·</span>
          <a href="#/methodology">Methodology &amp; Calendar</a>
          <span>·</span>
          <a href="#/explorer">CSV Data Explorer</a>
        </div>
      </div>
    </footer>
  </div>`;
}

let activeRenderToken = 0;

export async function renderActiveRoute() {
  const token = ++activeRenderToken;
  const state = getState();
  const root = document.getElementById('app-root');
  if (!root) return;

  const existingNav = root.querySelectorAll('.nav-link');
  if (existingNav.length === 0) {
    root.innerHTML = renderShellMarkup(state.route);
  } else {
    existingNav.forEach((el) => {
      const isMatch = el.getAttribute('href') === `#/${state.route}`;
      el.classList.toggle('is-active', isMatch);
      if (isMatch) el.setAttribute('aria-current', 'page');
      else el.removeAttribute('aria-current');
    });
  }

  const viewMod = await loadViewModule(state.route);
  if (token !== activeRenderToken) return;

  const container = document.getElementById('view-root');
  if (!container) return;
  container.innerHTML = viewMod.renderView(state);
  if (typeof viewMod.bindView === 'function') {
    viewMod.bindView(container, state);
  }
  document.body.dataset.routeReady = state.route;
}

function syncFromHash() {
  const { route, params } = parseHashRoute(location.hash, VALID_ROUTE_IDS);
  const patch = { route };
  if (params.get('tab')) patch.economyTab = params.get('tab');
  if (params.get('domain')) patch.explorerDomain = params.get('domain');
  if (params.get('metric')) patch.regionMetric = params.get('metric');
  if (params.get('q') !== null) patch.explorerQuery = params.get('q');
  setState(patch);
}

export async function bootstrapApp() {
  document.title = `${BUREAU_META.brand} · ${BUREAU_META.bureau}`;
  await mountStylesheet('/style.css');
  let appRoot = document.getElementById('app-root');
  if (!appRoot) {
    appRoot = document.createElement('div');
    appRoot.id = 'app-root';
    document.body.append(appRoot);
  }
  subscribeState(() => {
    renderActiveRoute();
  });
  window.addEventListener('hashchange', syncFromHash);
  syncFromHash();
}

bootstrapApp();
