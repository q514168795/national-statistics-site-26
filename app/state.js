// SPDX-License-Identifier: MIT
// Reactive client state, URL hash parser, localStorage persistence, and CSV exporter.

export const STORAGE_KEY = 'statatlas_mnsb_state_v1';

export const DEFAULT_STATE = {
  route: 'overview',
  horizon: '5y',
  economyTab: 'gdp',
  regionMetric: 'gdpPerCapita',
  regionSort: 'gdpPerCapita',
  regionSortDir: 'desc',
  compareA: 'NBM',
  compareB: 'VLR',
  pyramidMode: 'thousands',
  highlightCohort: '30–39',
  explorerQuery: '',
  explorerDomain: 'All',
  explorerSort: 'featured',
  explorerSortDir: 'asc',
  pinnedCodes: ['NA-GDP-01', 'PR-CPI-01', 'LB-UNP-01'],
  selectedSeriesCode: 'NA-GDP-01',
  methodologyTab: 'accounts',
  calendarFilter: 'All',
  lastExportMessage: '',
};

let currentState = loadPersistedState();
const listeners = new Set();

export function loadPersistedState() {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (!raw) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return { ...DEFAULT_STATE };
    return {
      ...DEFAULT_STATE,
      ...parsed,
      pinnedCodes: Array.isArray(parsed.pinnedCodes) ? parsed.pinnedCodes.slice(0, 4) : [...DEFAULT_STATE.pinnedCodes],
    };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export function savePersistedState(state) {
  try {
    if (typeof localStorage === 'undefined') return;
    const toStore = { ...state, lastExportMessage: '' };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  } catch {
    // Ignore storage quota or private-mode restrictions.
  }
}

export function getState() {
  return currentState;
}

export function setState(patch) {
  currentState = { ...currentState, ...patch };
  savePersistedState(currentState);
  for (const fn of listeners) fn(currentState);
}

export function subscribeState(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function parseHashRoute(hashStr, validRoutes) {
  const clean = (hashStr || '').replace(/^#\/?/, '').trim();
  const [segment, queryStr] = clean.split('?');
  const route = validRoutes.includes(segment) ? segment : 'overview';
  const params = new URLSearchParams(queryStr || '');
  return { route, params };
}

export function togglePinnedSeries(code) {
  const existing = currentState.pinnedCodes;
  if (existing.includes(code)) {
    setState({ pinnedCodes: existing.filter((c) => c !== code) });
    return;
  }
  const next = existing.length >= 4 ? [...existing.slice(1), code] : [...existing, code];
  setState({ pinnedCodes: next });
}

export function formatCsvCell(value) {
  const str = String(value ?? '');
  if (/[",\n\r]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

export function buildSeriesCsv(rows) {
  const header = ['Code', 'Indicator', 'Domain', 'Latest Value', 'Unit', 'Change', 'Period', 'Frequency', 'Official Source'];
  const lines = [header.map(formatCsvCell).join(',')];
  for (const row of rows) {
    lines.push([
      row.code,
      row.title,
      row.domain,
      row.value,
      row.unit,
      row.change,
      row.period,
      row.frequency,
      row.source,
    ].map(formatCsvCell).join(','));
  }
  return lines.join('\r\n') + '\r\n';
}

export function triggerCsvDownload(filename, csvContent, rowCount) {
  try {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch {
    // Fallback in non-download environments still reports CSV build status.
  }
  setState({ lastExportMessage: `Exported ${rowCount} indicators to ${filename} (${csvContent.length} bytes, UTF-8 CSV).` });
}

export function formatBillions(value) {
  return `M$ ${Number(value).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}B`;
}

export function escapeHtml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
