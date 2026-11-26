// SPDX-License-Identifier: MIT
// Methodology, Statistical Standards & Embargo Release Calendar view + shared provenance banner.

import { BUREAU_META, METHODOLOGY_SECTIONS, RELEASE_CALENDAR, reconcileNationalStats } from '../data.js';
import { escapeHtml, setState } from '../state.js';

export const METHOD_TABS = [
  { id: 'accounts', label: 'National Accounts' },
  { id: 'cpi', label: 'CPI Basket' },
  { id: 'labour', label: 'Labour Survey' },
  { id: 'demographics', label: 'Population Register' },
];

export const CALENDAR_CATEGORIES = ['All', 'Macroeconomics', 'Prices & Trade', 'Labour Market', 'Demographics'];

export function renderProvenanceBanner() {
  const next = RELEASE_CALENDAR[0];
  const audit = reconcileNationalStats();
  return `<article class="card provenance-card">
    <div class="card-head">
      <h3>Statistical Governance &amp; Next Release</h3>
      <a class="text-link" href="#/methodology">Methodology →</a>
    </div>
    <p class="card-sub prov-std">${escapeHtml(BUREAU_META.standards)}</p>
    <p class="prov-copy">Reconciled: ${(audit.regionPopK / 1000).toFixed(2)}M pop · M$ ${audit.regionGdpBn.toLocaleString('en-US', { minimumFractionDigits: 1 })}B GDP · ${audit.cpiWeightSum.toFixed(1)}% CPI weights (<span class="nowrap">X&#8209;13 SA</span>)</p>
    <div class="prov-next">
      <span class="tag-chip tag-embargo">Next Release</span>
      <span><strong>${escapeHtml(next.date)}</strong> · ${escapeHtml(next.release)}</span>
    </div>
  </article>`;
}

export function renderView(state) {
  const activeKey = METHODOLOGY_SECTIONS[state.methodologyTab] ? state.methodologyTab : 'accounts';
  const section = METHODOLOGY_SECTIONS[activeKey];
  const audit = reconcileNationalStats();
  const calFilter = CALENDAR_CATEGORIES.includes(state.calendarFilter) ? state.calendarFilter : 'All';
  const calRows = calFilter === 'All'
    ? RELEASE_CALENDAR
    : RELEASE_CALENDAR.filter((r) => r.category === calFilter);

  const methodBtns = METHOD_TABS.map((t) => `
    <button type="button" class="seg-btn ${t.id === activeKey ? 'is-active' : ''}" data-method-tab="${t.id}">${escapeHtml(t.label)}</button>
  `).join('');

  const calChips = CALENDAR_CATEGORIES.map((c) => `
    <button type="button" class="chip-btn ${c === calFilter ? 'is-active' : ''}" data-cal-cat="${escapeHtml(c)}">${escapeHtml(c)}</button>
  `).join('');

  const calTableRows = calRows.map((r) => `
    <tr>
      <td class="strong-cell">${escapeHtml(r.date)}</td>
      <td class="num">${escapeHtml(r.time)}</td>
      <td>${escapeHtml(r.release)}</td>
      <td><span class="tag-chip">${escapeHtml(r.category)}</span></td>
      <td class="source-cell">${escapeHtml(r.division)}</td>
      <td><span class="badge ${r.status === 'Embargoed' ? 'badge-neu' : 'badge-pos'}">${escapeHtml(r.status)}</span></td>
    </tr>
  `).join('');

  return `<section class="page-head">
    <div>
      <div class="eyebrow">Statistical Governance · SDDS+ Transparency · Revision Policy</div>
      <h1>Methodology &amp; Official Release Calendar</h1>
    </div>
    <div class="seg-group" role="group" aria-label="Methodology domain">${methodBtns}</div>
  </section>

  <section class="two-col-grid">
    <article class="card">
      <div class="card-head">
        <div>
          <h2>${escapeHtml(section.title)}</h2>
          <p class="card-sub">${escapeHtml(section.standard)}</p>
        </div>
      </div>
      <p class="body-copy">${escapeHtml(section.summary)}</p>
      <ul class="method-list">
        ${section.notes.map((n) => `<li>${escapeHtml(n)}</li>`).join('')}
      </ul>
    </article>

    <article class="card">
      <div class="card-head">
        <div>
          <h2>Automated Internal Consistency Audit</h2>
          <p class="card-sub">Live cross-table reconciliation across MNSB datasets · Updated ${escapeHtml(BUREAU_META.updated)}</p>
        </div>
        <span class="badge badge-pos">${audit.reconciled ? 'PASS · 0 Residual' : 'Check'}</span>
      </div>
      <div class="audit-grid">
        <div class="audit-item"><span>Provincial vs. Pyramid Pop.</span><strong>${(audit.regionPopK / 1000).toFixed(2)}M = ${(audit.pyramidPopK / 1000).toFixed(2)}M</strong></div>
        <div class="audit-item"><span>Provincial vs. Sectoral GDP</span><strong>M$ ${audit.regionGdpBn.toFixed(1)}B = M$ ${audit.sectorGdpBn.toFixed(1)}B</strong></div>
        <div class="audit-item"><span>CPI COICOP Basket Weights</span><strong>${audit.cpiWeightSum.toFixed(1)}% → ${audit.cpiWeightedYoY.toFixed(1)}% YoY</strong></div>
        <div class="audit-item"><span>Labour Force Weighted Unemp.</span><strong>${audit.nationalUnempRate.toFixed(1)}% (${(audit.totalLabourK / 1000).toFixed(2)}M LF)</strong></div>
      </div>
    </article>
  </section>

  <article class="card">
    <div class="card-head">
      <div>
        <h2>Advance Release Calendar (Dec 2026 – Feb 2027)</h2>
        <p class="card-sub">All official indicators publish simultaneously at 08:00 UTC with zero pre-release access · MNSB Publishing Desk</p>
      </div>
      <div class="chip-row" role="group" aria-label="Filter calendar by category">${calChips}</div>
    </div>
    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>Release Date</th>
            <th class="num">Time</th>
            <th>Statistical Publication</th>
            <th>Domain</th>
            <th>Issuing Division</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>${calTableRows}</tbody>
      </table>
    </div>
  </article>`;
}

export function bindView(container) {
  container.querySelectorAll('[data-method-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setState({ methodologyTab: btn.dataset.methodTab });
    });
  });
  container.querySelectorAll('[data-cal-cat]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setState({ calendarFilter: btn.dataset.calCat });
    });
  });
}
