// SPDX-License-Identifier: MIT
// Economy, Inflation & Merchandise Trade view with interactive filters and COICOP decomposition.

import { renderDualLineChart, renderHorizontalBars, renderTradeSurplusChart } from '../charts.js';
import { CPI_BASKET, GDP_SECTORS, QUARTERLY_MACRO, reconcileNationalStats } from '../data.js';
import { escapeHtml, formatBillions, setState } from '../state.js';

export const ECONOMY_TABS = [
  { id: 'gdp', label: 'Macro & Trade' },
  { id: 'cpi', label: 'Inflation & CPI' },
  { id: 'sectors', label: 'Sectoral GVA' },
];

export function renderView(state) {
  const tab = ECONOMY_TABS.some((t) => t.id === state.economyTab) ? state.economyTab : 'gdp';
  const macroRows = state.horizon === '3y' ? QUARTERLY_MACRO.slice(-11) : QUARTERLY_MACRO;
  const rangeLabel = state.horizon === '3y' ? '2024 Q1–2026 Q3' : '2022 Q1–2026 Q3';
  const audit = reconcileNationalStats();

  const tabBtns = ECONOMY_TABS.map((t) => `
    <button type="button" class="seg-btn ${tab === t.id ? 'is-active' : ''}" data-econ-tab="${t.id}">${escapeHtml(t.label)}</button>
  `).join('');

  const cpiItems = CPI_BASKET.map((c) => ({
    label: c.group,
    value: c.contrib,
    formatted: `${c.contrib >= 0 ? '+' : ''}${c.contrib.toFixed(2)} pp (${c.yoy > 0 ? '+' : ''}${c.yoy.toFixed(1)}%)`,
    tone: c.contrib >= 0.35 ? 'warning' : c.contrib > 0 ? 'amber' : 'positive',
  }));

  const sectorItems = GDP_SECTORS.map((s) => ({
    label: s.sector,
    value: s.valueBn,
    formatted: `${formatBillions(s.valueBn)} (+${s.yoy.toFixed(1)}%)`,
    tone: 'slate',
  }));

  const leftCard = tab === 'cpi'
    ? `<article class="card chart-card">
        <div class="card-head">
          <div>
            <h2>Real GDP vs. CPI Disinflation Path (${rangeLabel})</h2>
            <p class="card-sub">Quarterly YoY (%) · Headline CPI eased from 5.7% (Q3 2022) to 2.5% (Q3 2026; 2.4% Oct)</p>
          </div>
        </div>
        ${renderDualLineChart(macroRows, { width: 600, height: 222 })}
        <div class="card-foot-source">Source: MNSB National Accounts &amp; Consumer Price Survey, ${rangeLabel}</div>
      </article>`
    : tab === 'sectors'
      ? `<article class="card chart-card">
          <div class="card-head">
            <div>
              <h2>Gross Value Added by Sector (Q3 2026)</h2>
              <p class="card-sub">Annualised nominal output summing to ${formatBillions(audit.sectorGdpBn)} (100.0%)</p>
            </div>
          </div>
          ${renderHorizontalBars(sectorItems, { width: 600, padL: 184, padR: 132, rowH: 31, showAxis: true, ticks: [0, 200, 400, 600], tickFmt: (v) => `M$ ${v}B` })}
          <div class="card-foot-source">Source: MNSB GVA Accounts (ISIC Rev.4), Q3 2026</div>
        </article>`
      : `<article class="card chart-card">
          <div class="card-head">
            <div>
              <h2>Quarterly Merchandise Trade &amp; Surplus (${rangeLabel})</h2>
              <p class="card-sub">Exports (FOB) vs. Imports (CIF) in M$ Billions · Shaded area shows net surplus</p>
            </div>
          </div>
          <div class="legend-row">
            <span class="legend-item"><i class="swatch-line swatch-gdp"></i>Exports FOB (M$ 178.4B)</span>
            <span class="legend-item"><i class="swatch-line swatch-imp"></i>Imports CIF (M$ 164.2B)</span>
            <span class="legend-item"><i class="swatch swatch-surplus"></i>Surplus (+M$ 14.2B)</span>
          </div>
          ${renderTradeSurplusChart(macroRows, { width: 600, height: 204 })}
          <div class="card-foot-source">Source: MNSB Customs &amp; Trade Statistics, ${rangeLabel}</div>
        </article>`;

  const rightCard = `<article class="card chart-card">
    <div class="card-head">
      <div>
        <h2>CPI Contribution by COICOP-2018 Division</h2>
        <p class="card-sub">Percentage-point (pp) drivers of 2.4% Oct CPI (parentheses = YoY %) · Weights = ${audit.cpiWeightSum.toFixed(1)}%</p>
      </div>
    </div>
    <div class="legend-row">
      <span class="legend-item"><i class="swatch swatch-neg"></i>Major (≥0.35 pp)</span>
      <span class="legend-item"><i class="swatch swatch-amber"></i>Moderate (0.01–0.34 pp)</span>
      <span class="legend-item"><i class="swatch swatch-pos"></i>Deflationary (&lt;0 pp)</span>
    </div>
    ${renderHorizontalBars(cpiItems, {
      width: 590,
      padL: 136,
      padR: 124,
      rowH: 23,
      minVal: -0.25,
      maxVal: 1.08,
      showAxis: true,
      ticks: [-0.25, 0, 0.25, 0.5, 0.75, 1.0],
      tickFmt: (v) => (v === 0 ? '0.00' : `${v > 0 ? '+' : ''}${v.toFixed(2)}`),
    })}
    <div class="card-foot-source">Source: MNSB Consumer Price Survey (COICOP-2018), Oct 2026 · Sum = +2.40 pp</div>
  </article>`;

  const recentQuarters = QUARTERLY_MACRO.slice(-5).reverse().map((r) => {
    const net = r.exportsBn - r.importsBn;
    return `<tr>
      <td class="strong-cell">${escapeHtml(r.q)}</td>
      <td class="num text-pos">+${r.gdpYoY.toFixed(1)}%</td>
      <td class="num">${formatBillions(r.nominalBn)}</td>
      <td class="num">${r.cpiYoY.toFixed(1)}%</td>
      <td class="num">${r.coreCpi.toFixed(1)}%</td>
      <td class="num">${r.unemp.toFixed(1)}%</td>
      <td class="num text-pos">+M$ ${net.toFixed(1)}B</td>
      <td class="source-cell source-pad">Nat. Accounts, CPI, LFS &amp; Trade, ${escapeHtml(r.q.slice(0, 4))}</td>
    </tr>`;
  }).join('');

  return `<section class="page-head">
    <div>
      <div class="eyebrow">Macroeconomics · Prices · External Trade</div>
      <h1>Economy, Inflation &amp; Trade Accounts</h1>
    </div>
    <div class="head-controls">
      <div class="seg-group" role="group" aria-label="Economy sub-views">${tabBtns}</div>
      <div class="seg-group" role="group" aria-label="Time horizon">
        <button type="button" class="seg-btn ${state.horizon === '5y' ? 'is-active' : ''}" data-horizon="5y">5Y</button>
        <button type="button" class="seg-btn ${state.horizon === '3y' ? 'is-active' : ''}" data-horizon="3y">3Y</button>
      </div>
    </div>
  </section>

  <section class="strip-grid">
    <div class="strip-card">
      <span class="mini-label">Nominal GDP (Ann.)</span>
      <div class="strip-val-row"><strong>M$ 2,414.0B</strong><span class="badge badge-pos">+2.7% real</span></div>
      <span class="source-tag">National Accounts, Q3 2026</span>
    </div>
    <div class="strip-card">
      <span class="mini-label">Headline CPI (Mo.)</span>
      <div class="strip-val-row"><strong>2.4%</strong><span class="badge badge-neu">Core 2.8%</span></div>
      <span class="source-tag">Consumer Price Survey, Oct 2026</span>
    </div>
    <div class="strip-card">
      <span class="mini-label">Trade Balance (Q3)</span>
      <div class="strip-val-row"><strong>+M$ 14.2B</strong><span class="badge badge-pos">+0.5B QoQ</span></div>
      <span class="source-tag">Customs &amp; Trade, Q3 2026</span>
    </div>
    <div class="strip-card">
      <span class="mini-label">Avg Weekly Earnings</span>
      <div class="strip-val-row"><strong>M$ 1,284</strong><span class="badge badge-pos">+3.9% YoY</span></div>
      <span class="source-tag">Earnings Survey, Q3 2026</span>
    </div>
  </section>

  <section class="two-col-grid">
    ${leftCard}
    ${rightCard}
  </section>

  <article class="card">
    <div class="card-head">
      <div>
        <h3>Quarterly Macroeconomic Accounts Ledger (2025 Q3 – 2026 Q3)</h3>
        <p class="card-sub">Real GDP in chain-linked volumes (2020=100, SA) · Quarterly CPI averages · Trade Net = Exports FOB minus Imports CIF</p>
      </div>
      <a class="btn btn-secondary btn-sm" href="#/explorer">Export Full Series CSV →</a>
    </div>
    <div class="table-wrap">
      <table class="data-table compact-table">
        <thead>
          <tr>
            <th>Quarter</th>
            <th class="num">Real GDP YoY</th>
            <th class="num">Nominal GDP</th>
            <th class="num">Qtr CPI</th>
            <th class="num">Core CPI</th>
            <th class="num">Unemp.</th>
            <th class="num">Trade Net</th>
            <th class="source-pad">MNSB Source Divisions</th>
          </tr>
        </thead>
        <tbody>${recentQuarters}</tbody>
      </table>
    </div>
  </article>`;
}

export function bindView(container) {
  container.querySelectorAll('[data-econ-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setState({ economyTab: btn.dataset.econTab });
    });
  });
  container.querySelectorAll('[data-horizon]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setState({ horizon: btn.dataset.horizon });
    });
  });
}
