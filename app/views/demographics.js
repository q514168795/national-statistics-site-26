// SPDX-License-Identifier: MIT
// Demographics & Population Structure view: interactive cohort pyramid, vital indicators, and provenance banner.

import { renderPopulationPyramid } from '../charts.js';
import { DEMOGRAPHIC_VITALS, POPULATION_PYRAMID, reconcileNationalStats } from '../data.js';
import { escapeHtml, setState } from '../state.js';
import { renderProvenanceBanner } from './methodology.js';

export function renderView(state) {
  const isCompact = typeof window !== 'undefined' && window.innerWidth <= 520;
  const audit = reconcileNationalStats();
  const activeCohort = POPULATION_PYRAMID.find((c) => c.cohort === state.highlightCohort) || POPULATION_PYRAMID[5];
  const cohortTotal = activeCohort.maleK + activeCohort.femaleK;
  const cohortShare = ((cohortTotal / audit.pyramidPopK) * 100).toFixed(1);

  const vitalCards = DEMOGRAPHIC_VITALS.slice(0, 4).map((v) => `
    <div class="strip-card demo-kpi">
      <span class="mini-label">${escapeHtml(v.label)}</span>
      <strong>${escapeHtml(v.value)}</strong>
      <span class="kpi-note">${escapeHtml(v.note)}</span>
      <span class="source-tag">${escapeHtml(v.source)}</span>
    </div>
  `).join('');

  const cohortButtons = POPULATION_PYRAMID.map((c) => `
    <button type="button" class="chip-btn ${c.cohort === activeCohort.cohort ? 'is-active' : ''}" data-cohort-btn="${escapeHtml(c.cohort)}">${escapeHtml(c.cohort)}</button>
  `).join('');

  const youthPopK = POPULATION_PYRAMID.filter((c) => ['0–9', '10–19'].includes(c.cohort)).reduce((s, c) => s + c.maleK + c.femaleK, 0);
  const workPopK = POPULATION_PYRAMID.filter((c) => ['20–29', '30–39', '40–49', '50–59'].includes(c.cohort)).reduce((s, c) => s + c.maleK + c.femaleK, 0);
  const seniorPopK = POPULATION_PYRAMID.filter((c) => ['60–69', '70–79', '80+'].includes(c.cohort)).reduce((s, c) => s + c.maleK + c.femaleK, 0);

  const broadBands = [
    { label: 'Youth (0–19 yrs)', popK: youthPopK, share: Number(((youthPopK / audit.pyramidPopK) * 100).toFixed(1)) },
    { label: 'Core Working Age (20–59 yrs)', popK: workPopK, share: Number(((workPopK / audit.pyramidPopK) * 100).toFixed(1)) },
    { label: 'Senior (60+ yrs)', popK: seniorPopK, share: Number(((seniorPopK / audit.pyramidPopK) * 100).toFixed(1)) },
  ].map((b) => `
    <div class="inline-bar-row">
      <div class="inline-bar-head">
        <span>${escapeHtml(b.label)}</span>
        <span class="num">${(b.popK / 1000).toFixed(2)}M (${b.share.toFixed(1)}%)</span>
      </div>
      <div class="bar-track"><div class="bar-fill" style="width:${b.share}%"></div></div>
    </div>
  `).join('');

  return `<section class="page-head compact-head">
    <div>
      <div class="eyebrow">Population Register · Census 2025 Benchmark</div>
      <h1>Demographics &amp; Age Structure</h1>
    </div>
  </section>

  <section class="strip-grid">${vitalCards}</section>

  <section class="demo-grid">
    <article class="card">
      <div class="card-head">
        <div>
          <h2>Mid&#8209;2026 Population Pyramid</h2>
          <p class="card-sub">9 cohorts · Total 42.84M · MNSB Population Register, Mid&#8209;2026</p>
        </div>
        <div class="seg-group" role="group" aria-label="Pyramid display unit">
          <button type="button" class="seg-btn ${state.pyramidMode === 'thousands' ? 'is-active' : ''}" data-pyr-mode="thousands">Millions</button>
          <button type="button" class="seg-btn ${state.pyramidMode === 'share' ? 'is-active' : ''}" data-pyr-mode="share">Share %</button>
        </div>
      </div>
      <div class="cohort-callout">
        <strong>Cohort ${escapeHtml(activeCohort.cohort)}:</strong>
        <span>${(cohortTotal / 1000).toFixed(2)}M (${cohortShare}%) · ${(activeCohort.maleK / 1000).toFixed(2)}M male · ${(activeCohort.femaleK / 1000).toFixed(2)}M female</span>
      </div>
      ${renderPopulationPyramid(POPULATION_PYRAMID, state.pyramidMode, activeCohort.cohort, isCompact)}
      <div class="chip-row cohort-chips" aria-label="Select age cohort">${cohortButtons}</div>
    </article>

    <div class="col-side">
      ${renderProvenanceBanner()}
      <article class="card">
        <div class="card-head">
          <div>
            <h3>Broad Age Structure (Mid&#8209;2026)</h3>
            <p class="card-sub">Reconciled 3-band total: 42.84M (100.0%) · MNSB Vital Statistics, 2026</p>
          </div>
        </div>
        <div class="inline-bar-grid">${broadBands}</div>
        <div class="vital-extra">
          <div><span class="mini-label">Total Fertility Rate</span><strong>1.58 /w</strong><span class="source-tag">Vital Statistics, 2025</span></div>
          <div><span class="mini-label">Annual Net Migration</span><strong class="text-pos">+184k</strong><span class="source-tag">Migration Register, 2026</span></div>
        </div>
      </article>
    </div>
  </section>`;
}

export function bindView(container) {
  container.querySelectorAll('[data-pyr-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setState({ pyramidMode: btn.dataset.pyrMode });
    });
  });
  container.querySelectorAll('[data-cohort-btn]').forEach((el) => {
    el.addEventListener('click', () => {
      setState({ highlightCohort: el.dataset.cohortBtn });
    });
  });
}
