// SPDX-License-Identifier: MIT
// National Overview view: headline KPIs, macro GDP/CPI trajectory, sectoral snapshot, bulletins & calendar.

import { renderDualLineChart, renderSparkline } from '../charts.js';
import {
  BULLETINS,
  GDP_SECTORS,
  HEADLINE_KPIS,
  QUARTERLY_MACRO,
  RELEASE_CALENDAR,
  reconcileNationalStats,
} from '../data.js';
import { escapeHtml, formatBillions, setState } from '../state.js';

export function renderMacroSnapshot() {
  const latest = QUARTERLY_MACRO[QUARTERLY_MACRO.length - 1];
  const tradeNet = (latest.exportsBn - latest.importsBn).toFixed(1);
  return `<div class="mini-stat-row">
    <div class="mini-stat">
      <span class="mini-label">Trade Balance (Q3 2026)</span>
      <strong class="mini-value text-pos">+M$ ${tradeNet}B</strong>
      <span class="source-tag">Customs &amp; Trade, Q3 2026</span>
    </div>
    <div class="mini-stat">
      <span class="mini-label">GDP per Capita (Ann.)</span>
      <strong class="mini-value">M$ 56,349</strong>
      <span class="source-tag">National Accounts, Q3 2026</span>
    </div>
    <div class="mini-stat">
      <span class="mini-label">Clean Electricity Share</span>
      <strong class="mini-value">64.2% <em class="mini-delta text-pos">+4.8 pp YoY</em></strong>
      <span class="source-tag">Energy Balances, Q3 2026</span>
    </div>
  </div>`;
}

export function renderView(state) {
  const rows = state.horizon === '3y' ? QUARTERLY_MACRO.slice(-11) : QUARTERLY_MACRO;
  const audit = reconcileNationalStats();

  const kpiCards = HEADLINE_KPIS.map((k) => {
    const badgeCls = k.tone === 'positive' ? 'badge-pos' : k.tone === 'warning' ? 'badge-neg' : 'badge-neu';
    return `<a class="card kpi-card" href="#/${k.route}">
      <div class="kpi-top">
        <span class="kpi-label">${escapeHtml(k.label)}</span>
        <span class="badge ${badgeCls}">${escapeHtml(k.delta)}</span>
      </div>
      <div class="kpi-mid">
        <div class="kpi-num-wrap">
          <strong class="kpi-value">${escapeHtml(k.value)}</strong>
          <span class="kpi-sub">${escapeHtml(k.subvalue)}</span>
        </div>
        ${renderSparkline(k.spark, k.sparkTone || k.tone, 88, 28, k.targetRef ?? null)}
      </div>
      <div class="kpi-foot">
        <span class="source-tag">${escapeHtml(k.source)}</span>
        <span class="kpi-link">Inspect →</span>
      </div>
    </a>`;
  }).join('');

  const bulletinItems = BULLETINS.slice(0, 4).map((b) => `
    <a class="bulletin-row" href="#/${b.route}">
      <div class="bulletin-meta">
        <span class="domain-tag">${escapeHtml(b.domain)}</span>
        <span class="muted-date">${escapeHtml(b.date)} · ${escapeHtml(b.id)}</span>
      </div>
      <div class="bulletin-line">
        <span class="bulletin-title">${escapeHtml(b.title)}</span>
        <span class="row-arrow" aria-hidden="true">→</span>
      </div>
    </a>
  `).join('');

  const nextReleases = RELEASE_CALENDAR.slice(0, 3).map((r) => `
    <div class="cal-row">
      <span class="cal-date">${escapeHtml(r.date)}</span>
      <span class="cal-name">${escapeHtml(r.release)}</span>
      <span class="${r.status === 'Embargoed' ? 'tag-chip tag-embargo' : 'tag-chip'}">${escapeHtml(r.status)}</span>
    </div>
  `).join('');

  const sectorBars = GDP_SECTORS.map((s) => `
    <div class="inline-bar-row">
      <div class="inline-bar-head">
        <span>${escapeHtml(s.sector)}</span>
        <span class="num">${s.share.toFixed(1)}% · ${formatBillions(s.valueBn)} <em class="text-pos">(+${s.yoy.toFixed(1)}%)</em></span>
      </div>
      <div class="bar-track"><div class="bar-fill" style="width:${(s.share / 28) * 100}%"></div></div>
    </div>
  `).join('');

  return `<section class="page-head">
    <div>
      <div class="eyebrow">Republic of Meridian · Official National Statistics Portal</div>
      <h1>National Statistical Overview</h1>
    </div>
    <div class="head-actions">
      <a class="btn btn-secondary" href="#/regions">Compare 8 Provinces</a>
      <a class="btn btn-primary" href="#/explorer">Explore &amp; Export CSV</a>
    </div>
  </section>

  <section class="kpi-grid" aria-label="Headline national statistics">${kpiCards}</section>

  <section class="overview-grid">
    <div class="col-main">
      <article class="card main-chart-card">
        <div class="card-head">
          <div>
            <h2>Macroeconomic Trajectory: Real GDP vs. CPI Inflation</h2>
            <p class="card-sub">Quarterly YoY (%) · Source: MNSB National Accounts &amp; Consumer Price Survey, 2022–2026</p>
          </div>
          <div class="seg-group" role="group" aria-label="Chart timeframe">
            <button type="button" class="seg-btn ${state.horizon === '5y' ? 'is-active' : ''}" data-horizon="5y">5Y (2022–26)</button>
            <button type="button" class="seg-btn ${state.horizon === '3y' ? 'is-active' : ''}" data-horizon="3y">3Y (2024–26)</button>
          </div>
        </div>
        <div class="legend-row">
          <span class="legend-item"><i class="swatch-line swatch-gdp"></i>Real GDP Growth YoY (+2.7% Q3 2026)</span>
          <span class="legend-item"><i class="swatch-line swatch-cpi"></i>Quarterly CPI YoY (2.5% Q3 · 2.4% Oct)</span>
        </div>
        ${renderDualLineChart(rows, { width: 680, height: 204 })}
        ${renderMacroSnapshot()}
      </article>
    </div>

    <aside class="col-side">
      <article class="card">
        <div class="card-head">
          <div>
            <h2>Latest Official Bulletins</h2>
            <p class="card-sub">MNSB Publishing Desk · Nov 2026</p>
          </div>
          <a class="text-link" href="#/explorer">All Releases →</a>
        </div>
        <div class="bulletin-list">${bulletinItems}</div>
      </article>

      <article class="card">
        <div class="card-head">
          <div>
            <h3>Upcoming Release Calendar</h3>
            <p class="card-sub">Published at 08:00 UTC · Dec 2026</p>
          </div>
          <a class="text-link" href="#/methodology">All Dates →</a>
        </div>
        <div class="cal-list">${nextReleases}</div>
      </article>
    </aside>
  </section>

  <article class="card compact-card below-fold-card">
    <div class="card-head">
      <div>
        <h3>Gross Value Added by Economic Sector (Q3 2026)</h3>
        <p class="card-sub">6 ISIC Rev.4 sectors reconcile to ${formatBillions(audit.sectorGdpBn)} (${audit.sectorShareSum.toFixed(1)}%) · Source: MNSB GVA Accounts, Q3 2026</p>
      </div>
      <a class="text-link" href="#/economy">Full Economy Breakdown →</a>
    </div>
    <div class="inline-bar-grid">${sectorBars}</div>
  </article>`;
}

export function bindView(container) {
  container.querySelectorAll('[data-horizon]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setState({ horizon: btn.dataset.horizon });
    });
  });
}
