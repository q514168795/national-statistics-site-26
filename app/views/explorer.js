// SPDX-License-Identifier: MIT
// Interactive Series Explorer & CSV Export view: search, domain filters, sorting, pinning, and RFC-4180 CSV download.

import { renderSparkline } from '../charts.js';
import { SERIES_CATALOG } from '../data.js';
import {
  buildSeriesCsv,
  escapeHtml,
  setState,
  togglePinnedSeries,
  triggerCsvDownload,
} from '../state.js';

export const EXPLORER_DOMAINS = [
  'All',
  'Macroeconomics',
  'Prices & Trade',
  'Labour Market',
  'Demographics',
  'Regional Accounts',
  'Environment & Energy',
];

export function filterAndSortSeries(state) {
  const q = (state.explorerQuery || '').trim().toLowerCase();
  const domain = state.explorerDomain || 'All';
  const filtered = SERIES_CATALOG.filter((row) => {
    if (domain !== 'All' && row.domain !== domain) return false;
    if (!q) return true;
    return (
      row.code.toLowerCase().includes(q) ||
      row.title.toLowerCase().includes(q) ||
      row.domain.toLowerCase().includes(q) ||
      row.source.toLowerCase().includes(q)
    );
  });

  const dir = state.explorerSortDir === 'desc' ? -1 : 1;
  const key = state.explorerSort || 'featured';
  if (key === 'featured') {
    const pinnedSet = new Set(state.pinnedCodes);
    return [...filtered].sort((a, b) => {
      const ap = pinnedSet.has(a.code) ? 0 : 1;
      const bp = pinnedSet.has(b.code) ? 0 : 1;
      if (ap !== bp) return ap - bp;
      return SERIES_CATALOG.indexOf(a) - SERIES_CATALOG.indexOf(b);
    });
  }
  return [...filtered].sort((a, b) => {
    if (key === 'numeric') return (a.numeric - b.numeric) * dir;
    return String(a[key] || '').localeCompare(String(b[key] || '')) * dir;
  });
}

export function renderExplorerPanel(state, options = {}) {
  const compact = Boolean(options.compact);
  const rows = filterAndSortSeries(state);
  const shownRows = compact ? rows.slice(0, 4) : rows;
  const pinnedItems = SERIES_CATALOG.filter((s) => state.pinnedCodes.includes(s.code));

  const domainPills = EXPLORER_DOMAINS.map((d) => `
    <button type="button" class="chip-btn ${state.explorerDomain === d ? 'is-active' : ''}" data-exp-domain="${escapeHtml(d)}">${escapeHtml(d)}</button>
  `).join('');

  const pinnedBar = pinnedItems.length > 0
    ? `<div class="pinned-bar">
        <span class="mini-label">Pinned (${pinnedItems.length}/4):</span>
        ${pinnedItems.map((p) => `<span class="pin-pill"><strong>${escapeHtml(p.short || p.code)}</strong> <span class="muted-code">${escapeHtml(p.code)}</span> ${escapeHtml(p.value)} <button type="button" class="pin-x" data-toggle-pin="${escapeHtml(p.code)}" aria-label="Unpin ${escapeHtml(p.code)}">×</button></span>`).join('')}
      </div>`
    : '';

  const sortArrow = (col) => (state.explorerSort === col ? (state.explorerSortDir === 'desc' ? ' ▼' : ' ▲') : '');

  const trs = shownRows.map((row) => {
    const pinned = state.pinnedCodes.includes(row.code);
    const toneCls = row.tone === 'positive' ? 'text-pos' : row.tone === 'warning' ? 'text-neg' : '';
    return `<tr>
      <td><button type="button" class="pin-btn ${pinned ? 'is-pinned' : ''}" data-toggle-pin="${escapeHtml(row.code)}" title="Pin for comparison">${pinned ? '★' : '☆'}</button></td>
      <td class="code-cell">${escapeHtml(row.code)}</td>
      <td class="strong-cell">${escapeHtml(row.title)}</td>
      <td><span class="tag-chip">${escapeHtml(row.domain)}</span></td>
      <td class="num strong-cell">${escapeHtml(row.value)}</td>
      <td class="num ${toneCls}">${escapeHtml(row.change)}</td>
      <td class="spark-cell">${renderSparkline(row.spark, row.tone, 64, 20)}</td>
      <td class="source-cell">${escapeHtml(row.source)}</td>
    </tr>`;
  }).join('');

  const emptyRow = shownRows.length === 0
    ? `<tr><td colspan="8" class="empty-cell">No indicators match "${escapeHtml(state.explorerQuery)}". Clear the search or domain filter.</td></tr>`
    : '';

  const exportBanner = state.lastExportMessage
    ? `<div class="export-banner" role="status">${escapeHtml(state.lastExportMessage)}</div>`
    : '';

  const countNote = rows.length === SERIES_CATALOG.length
    ? `Showing ${shownRows.length} of ${SERIES_CATALOG.length} official series`
    : `Showing ${shownRows.length} of ${rows.length} matched (${SERIES_CATALOG.length} total)`;

  return `<article class="card explorer-card">
    <div class="card-head">
      <div>
        <h2>${compact ? 'Interactive Indicator Explorer &amp; CSV Export' : 'National Statistical Series Explorer'}</h2>
        <p class="card-sub">${countNote} · Pinned flagship series listed first · Every figure cites MNSB source &amp; year</p>
      </div>
      <div class="head-controls">
        ${compact ? '<a class="btn btn-secondary btn-sm" href="#/explorer">Full 24-Series Catalogue →</a>' : ''}
        <button type="button" class="btn btn-primary btn-sm" data-export-csv="1">Export ${rows.length} Rows CSV</button>
      </div>
    </div>
    <div class="toolbar">
      <input type="search" class="search-input" data-exp-search="1" value="${escapeHtml(state.explorerQuery)}" placeholder="Search code, indicator, or MNSB source (e.g. CPI, GDP, Trade)..." aria-label="Search indicators"/>
      <div class="chip-row" role="group" aria-label="Filter by statistical domain">${domainPills}</div>
    </div>
    ${pinnedBar}
    ${exportBanner}
    <div class="table-wrap">
      <table class="data-table compact-table">
        <thead>
          <tr>
            <th>Pin</th>
            <th><button type="button" class="sort-btn" data-exp-sort="code">Code${sortArrow('code')}</button></th>
            <th><button type="button" class="sort-btn" data-exp-sort="title">Indicator${sortArrow('title')}</button></th>
            <th>Domain</th>
            <th class="num"><button type="button" class="sort-btn" data-exp-sort="numeric">Latest${sortArrow('numeric')}</button></th>
            <th class="num">Change</th>
            <th class="spark-pad">5-Pd Trend</th>
            <th>Source &amp; Period</th>
          </tr>
        </thead>
        <tbody>${trs}${emptyRow}</tbody>
      </table>
    </div>
  </article>`;
}

export function bindExplorerPanel(container, state) {
  const input = container.querySelector('[data-exp-search]');
  if (input) {
    input.addEventListener('input', (e) => {
      const pos = e.target.selectionStart ?? e.target.value.length;
      setState({ explorerQuery: e.target.value });
      requestAnimationFrame(() => {
        const nextInput = document.querySelector('[data-exp-search]');
        if (nextInput) {
          nextInput.focus();
          nextInput.setSelectionRange(pos, pos);
        }
      });
    });
  }
  container.querySelectorAll('[data-exp-domain]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setState({ explorerDomain: btn.dataset.expDomain });
    });
  });
  container.querySelectorAll('[data-exp-sort]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const nextKey = btn.dataset.expSort;
      const nextDir = state.explorerSort === nextKey && state.explorerSortDir === 'asc' ? 'desc' : 'asc';
      setState({ explorerSort: nextKey, explorerSortDir: nextDir });
    });
  });
  container.querySelectorAll('[data-toggle-pin]').forEach((btn) => {
    btn.addEventListener('click', () => {
      togglePinnedSeries(btn.dataset.togglePin);
    });
  });
  const exportBtn = container.querySelector('[data-export-csv]');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const rows = filterAndSortSeries(state);
      const csv = buildSeriesCsv(rows);
      triggerCsvDownload('meridian-mnsb-statistics-2026.csv', csv, rows.length);
    });
  }
}

export function renderView(state) {
  return `<section class="page-head">
    <div>
      <div class="eyebrow">Open Data Catalogue · Offline RFC-4180 CSV Export</div>
      <h1>Data Explorer &amp; Series Catalogue</h1>
    </div>
    <a class="btn btn-secondary" href="#/methodology">Methodology &amp; Definitions</a>
  </section>
  ${renderExplorerPanel(state, { compact: false })}`;
}

export function bindView(container, state) {
  bindExplorerPanel(container, state);
}
