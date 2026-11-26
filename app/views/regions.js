// SPDX-License-Identifier: MIT
// Regional & Provincial Statistics view: 8-province ranking, side-by-side comparator, and integrated Data Explorer.

import { renderHorizontalBars } from '../charts.js';
import { REGIONS, reconcileNationalStats } from '../data.js';
import { escapeHtml, formatBillions, setState } from '../state.js';
import { bindExplorerPanel, renderExplorerPanel } from './explorer.js';

export const REGION_METRICS = [
  { id: 'gdpPerCapita', label: 'GDP / Capita', fmt: (r) => `M$ ${r.gdpPerCapita.toLocaleString('en-US')}`, val: (r) => r.gdpPerCapita, avg: 56349, avgLabel: 'Avg M$ 56,349' },
  { id: 'gdpYoY', label: 'Real GDP YoY', fmt: (r) => `+${r.gdpYoY.toFixed(1)}%`, val: (r) => r.gdpYoY, avg: 2.7, avgLabel: 'Avg +2.7%' },
  { id: 'unemp', label: 'Unemployment', fmt: (r) => `${r.unemp.toFixed(1)}%`, val: (r) => r.unemp, avg: 4.3, avgLabel: 'Avg 4.3%' },
  { id: 'popK', label: 'Population', fmt: (r) => `${(r.popK / 1000).toFixed(2)}M`, val: (r) => r.popK, avg: 5355, avgLabel: 'Mean 5.36M' },
];

export function renderView(state) {
  const metric = REGION_METRICS.find((m) => m.id === state.regionMetric) || REGION_METRICS[0];
  const regA = REGIONS.find((r) => r.code === state.compareA) || REGIONS[0];
  const regB = REGIONS.find((r) => r.code === state.compareB) || REGIONS[1];
  const audit = reconcileNationalStats();

  const sortedForChart = [...REGIONS].sort((a, b) => metric.val(b) - metric.val(a));
  const chartItems = sortedForChart.map((r) => ({
    label: `${r.name} (${r.code})`,
    value: metric.val(r),
    formatted: metric.fmt(r),
    tone: 'muted',
    highlight: r.code === regA.code ? 'primary' : r.code === regB.code ? 'secondary' : false,
  }));

  const metricBtns = REGION_METRICS.map((m) => `
    <button type="button" class="seg-btn ${m.id === metric.id ? 'is-active' : ''}" data-reg-metric="${m.id}">${escapeHtml(m.label)}</button>
  `).join('');

  const optionsHtml = (selected) => REGIONS.map((r) => `
    <option value="${r.code}" ${r.code === selected ? 'selected' : ''}>${escapeHtml(r.name)} (${r.code})</option>
  `).join('');

  const gdpCapDiff = regA.gdpPerCapita - regB.gdpPerCapita;
  const growthDiff = regA.gdpYoY - regB.gdpYoY;
  const unempDiff = regA.unemp - regB.unemp;

  const tableRows = sortedForChart.map((r) => {
    const popShare = (r.popK / audit.regionPopK) * 100;
    const tag = r.code === regA.code ? ' <span class="ab-dot ab-a ab-trail">A</span>' : r.code === regB.code ? ' <span class="ab-dot ab-b ab-trail">B</span>' : '';
    const rowCls = r.code === regA.code ? 'row-a' : r.code === regB.code ? 'row-b' : '';
    return `<tr class="${rowCls}">
      <td class="strong-cell">${escapeHtml(r.name)} <span class="muted-code">${r.code}</span>${tag}</td>
      <td class="num">${(r.popK / 1000).toFixed(2)}M</td>
      <td class="num muted-pct">${popShare.toFixed(1)}%</td>
      <td class="num">${formatBillions(r.gdpBn)}</td>
      <td class="num strong-cell">M$ ${r.gdpPerCapita.toLocaleString('en-US')}</td>
      <td class="num text-pos">+${r.gdpYoY.toFixed(1)}%</td>
      <td class="num">${r.unemp.toFixed(1)}%</td>
    </tr>`;
  }).join('');

  return `<section class="page-head">
    <div>
      <div class="eyebrow">Sub-National Accounts · 8 Provinces Reconciled to National Totals</div>
      <h1>Regional Accounts &amp; Series Explorer</h1>
    </div>
    <div class="seg-group" role="group" aria-label="Regional ranking metric">${metricBtns}</div>
  </section>

  <section class="two-col-grid regions-top">
    <article class="card">
      <div class="card-head">
        <div>
          <h2>Provincial Ranking: ${escapeHtml(metric.label)}</h2>
          <p class="card-sub">Black = Province A · Teal = Province B · Source: MNSB Regional Accounts, 2026</p>
        </div>
      </div>
      ${renderHorizontalBars(chartItems, {
        width: 570,
        padL: 158,
        padR: 78,
        rowH: 25,
        showTrack: true,
        benchmarkValue: metric.avg,
        benchmarkLabel: metric.avgLabel,
      })}
      <div class="compare-strip">
        <div class="compare-pickers">
          <span class="ab-dot ab-a">A</span>
          <select data-compare-a="1" aria-label="Province A">${optionsHtml(regA.code)}</select>
          <span class="vs-label">vs</span>
          <span class="ab-dot ab-b">B</span>
          <select data-compare-b="1" aria-label="Province B">${optionsHtml(regB.code)}</select>
        </div>
        <div class="compare-deltas">
          <span class="muted-code">${escapeHtml(regA.code)} − ${escapeHtml(regB.code)}:</span>
          <span>GDP/Cap: <strong class="${gdpCapDiff >= 0 ? 'text-pos' : 'text-neg'}">${gdpCapDiff >= 0 ? '+' : '-'}M$ ${Math.abs(gdpCapDiff).toLocaleString('en-US')}</strong></span>
          <span>YoY: <strong class="${growthDiff >= 0 ? 'text-pos' : 'text-neg'}">${growthDiff >= 0 ? '+' : ''}${growthDiff.toFixed(1)} pp</strong></span>
          <span>Unemp: <strong class="${unempDiff <= 0 ? 'text-pos' : 'text-neg'}">${unempDiff >= 0 ? '+' : ''}${unempDiff.toFixed(1)} pp</strong></span>
        </div>
      </div>
    </article>

    <article class="card">
      <div class="card-head">
        <div>
          <h2>Provincial Accounts Table (2026)</h2>
          <p class="card-sub">Sorted descending by ${escapeHtml(metric.label)} · Reconciles to 42.84M &amp; M$ 2,414.0B</p>
        </div>
      </div>
      <div class="table-wrap">
        <table class="data-table compact-table">
          <thead>
            <tr>
              <th>Province</th>
              <th class="num">Pop.</th>
              <th class="num">Share</th>
              <th class="num">GDP</th>
              <th class="num">GDP / Cap</th>
              <th class="num">YoY</th>
              <th class="num">Unemp.</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
            <tr class="total-row">
              <td>Meridian Total</td>
              <td class="num">${(audit.regionPopK / 1000).toFixed(2)}M</td>
              <td class="num">100.0%</td>
              <td class="num">${formatBillions(audit.regionGdpBn)}</td>
              <td class="num">M$ 56,349</td>
              <td class="num text-pos">+2.7%</td>
              <td class="num">${audit.nationalUnempRate.toFixed(1)}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  </section>

  ${renderExplorerPanel(state, { compact: true })}`;
}

export function bindView(container, state) {
  container.querySelectorAll('[data-reg-metric]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setState({ regionMetric: btn.dataset.regMetric });
    });
  });
  const selA = container.querySelector('[data-compare-a]');
  if (selA) {
    selA.addEventListener('change', (e) => setState({ compareA: e.target.value }));
  }
  const selB = container.querySelector('[data-compare-b]');
  if (selB) {
    selB.addEventListener('change', (e) => setState({ compareB: e.target.value }));
  }
  bindExplorerPanel(container, state);
}
