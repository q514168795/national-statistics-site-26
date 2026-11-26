// SPDX-License-Identifier: MIT
// Pure inline SVG chart renderers for StatAtlas (zero external assets or URLs).

import { escapeHtml } from './state.js';

export function renderSparkline(values, tone = 'positive', width = 92, height = 28, targetRef = null) {
  if (!values || values.length < 2) return '';
  const allVals = targetRef !== null ? [...values, targetRef] : values;
  const min = Math.min(...allVals);
  const max = Math.max(...allVals);
  const span = max - min || 1;
  const padX = 4;
  const padY = 4;
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;
  const yAt = (v) => padY + (1 - (v - min) / span) * innerH;
  const pts = values.map((v, i) => {
    const x = padX + (i / (values.length - 1)) * innerW;
    return [Number(x.toFixed(1)), Number(yAt(v).toFixed(1))];
  });
  const polyline = pts.map(([x, y]) => `${x},${y}`).join(' ');
  const area = `${padX},${height - padY} ${polyline} ${width - padX},${height - padY}`;
  const stroke = tone === 'warning' ? '#9F2D20' : tone === 'neutral' ? '#1D4E6E' : '#166534';
  const fill = tone === 'warning' ? '#FEF2F2' : tone === 'neutral' ? '#EEF4F8' : '#ECFDF3';
  const [lx, ly] = pts[pts.length - 1];
  const refLine = targetRef !== null
    ? `<line x1="${padX}" y1="${yAt(targetRef).toFixed(1)}" x2="${width - padX}" y2="${yAt(targetRef).toFixed(1)}" stroke="#8A948D" stroke-dasharray="2 2" stroke-width="1"/>`
    : '';
  return `<svg class="sparkline" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" aria-hidden="true">`
    + `<polygon points="${area}" fill="${fill}"/>`
    + refLine
    + `<polyline points="${polyline}" fill="none" stroke="${stroke}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`
    + `<circle cx="${lx}" cy="${ly}" r="2.6" fill="${stroke}"/>`
    + `</svg>`;
}

export function renderDualLineChart(rows, options = {}) {
  const width = options.width || 680;
  const height = options.height || 220;
  const padL = 42;
  const padR = 56;
  const padT = 14;
  const padB = 30;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const yMin = 0;
  const yMax = 6.2;

  const xAt = (i) => padL + (i / Math.max(1, rows.length - 1)) * plotW;
  const yAt = (v) => padT + (1 - (v - yMin) / (yMax - yMin)) * plotH;

  const gdpPts = rows.map((r, i) => `${xAt(i).toFixed(1)},${yAt(r.gdpYoY).toFixed(1)}`).join(' ');
  const cpiPts = rows.map((r, i) => `${xAt(i).toFixed(1)},${yAt(r.cpiYoY).toFixed(1)}`).join(' ');

  const ticks = [0, 1, 2, 3, 4, 5, 6];
  const grid = ticks.map((t) => {
    const y = yAt(t).toFixed(1);
    const isTarget = t === 2;
    return `<line x1="${padL}" y1="${y}" x2="${width - padR}" y2="${y}" stroke="${isTarget ? '#7E8C82' : '#E7EAE6'}" stroke-dasharray="${isTarget ? '4 3' : ''}" stroke-width="1"/>`
      + `<text x="${padL - 8}" y="${Number(y) + 3.5}" text-anchor="end" class="svg-tick">${t}%</text>`;
  }).join('');

  const step = rows.length > 14 ? 3 : 2;
  const xLabels = rows.map((r, i) => {
    if (i % step !== 0 && i !== rows.length - 1) return '';
    return `<text x="${xAt(i).toFixed(1)}" y="${height - 8}" text-anchor="middle" class="svg-tick">${escapeHtml(r.q)}</text>`;
  }).join('');

  const last = rows[rows.length - 1];
  const lastX = xAt(rows.length - 1);
  const gdpY = yAt(last.gdpYoY);
  const cpiY = yAt(last.cpiYoY);
  const gap = Math.abs(gdpY - cpiY);
  const gdpLabelY = gap < 15 ? gdpY - 6 : gdpY + 3.5;
  const cpiLabelY = gap < 15 ? cpiY + 11 : cpiY + 3.5;

  const gdpDots = rows.map((r, i) => {
    const cx = xAt(i).toFixed(1);
    return `<circle cx="${cx}" cy="${yAt(r.gdpYoY).toFixed(1)}" r="${i === rows.length - 1 ? 3.8 : 2.3}" fill="#166534"><title>${escapeHtml(r.q)} Real GDP: +${r.gdpYoY.toFixed(1)}%</title></circle>`;
  }).join('');

  const cpiDots = rows.map((r, i) => {
    const cx = xAt(i).toFixed(1);
    const rad = i === rows.length - 1 ? 4.4 : 3.2;
    return `<circle cx="${cx}" cy="${yAt(r.cpiYoY).toFixed(1)}" r="${rad}" fill="none" stroke="#9F2D20" stroke-width="1.8"><title>${escapeHtml(r.q)} CPI YoY: ${r.cpiYoY.toFixed(1)}%</title></circle>`;
  }).join('');

  const targetBandY = yAt(2.5).toFixed(1);
  const targetBandH = (yAt(1.5) - yAt(2.5)).toFixed(1);

  return `<svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Quarterly Real GDP and CPI Inflation Trend">`
    + `<rect x="${padL}" y="${targetBandY}" width="${plotW}" height="${targetBandH}" fill="#ECF3EE" opacity="0.9"/>`
    + grid
    + `<text x="${padL + 6}" y="${yAt(1.56).toFixed(1)}" class="svg-note">CPI target 2.0% (±0.5%)</text>`
    + `<polyline points="${gdpPts}" fill="none" stroke="#166534" stroke-width="2.3" stroke-linejoin="round" stroke-linecap="round"/>`
    + `<polyline points="${cpiPts}" fill="none" stroke="#9F2D20" stroke-width="2.1" stroke-dasharray="6 3" stroke-linejoin="round" stroke-linecap="round"/>`
    + gdpDots
    + cpiDots
    + `<text x="${(lastX + 7).toFixed(1)}" y="${gdpLabelY.toFixed(1)}" class="svg-callout svg-callout-pos">+${last.gdpYoY.toFixed(1)}%</text>`
    + `<text x="${(lastX + 7).toFixed(1)}" y="${cpiLabelY.toFixed(1)}" class="svg-callout svg-callout-neg">${last.cpiYoY.toFixed(1)}%</text>`
    + xLabels
    + `</svg>`;
}

export function renderTradeSurplusChart(rows, options = {}) {
  const width = options.width || 600;
  const height = options.height || 230;
  const padL = 56;
  const padR = 72;
  const padT = 16;
  const padB = 30;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const yMin = 135;
  const yMax = 186;

  const xAt = (i) => padL + (i / Math.max(1, rows.length - 1)) * plotW;
  const yAt = (v) => padT + (1 - (v - yMin) / (yMax - yMin)) * plotH;

  const expPts = rows.map((r, i) => [xAt(i), yAt(r.exportsBn)]);
  const impPts = rows.map((r, i) => [xAt(i), yAt(r.importsBn)]);
  const areaPoly = [
    ...expPts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`),
    ...[...impPts].reverse().map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`),
  ].join(' ');

  const ticks = [140, 150, 160, 170, 180];
  const grid = ticks.map((t) => {
    const y = yAt(t).toFixed(1);
    return `<line x1="${padL}" y1="${y}" x2="${width - padR}" y2="${y}" stroke="#E7EAE6" stroke-width="1"/>`
      + `<text x="${padL - 8}" y="${Number(y) + 3.5}" text-anchor="end" class="svg-tick">M$ ${t}B</text>`;
  }).join('');

  const step = rows.length > 14 ? 4 : 2;
  const xLabels = rows.map((r, i) => {
    const isLast = i === rows.length - 1;
    const nearLast = rows.length - 1 - i === 1;
    if (!isLast && (i % step !== 0 || nearLast)) return '';
    return `<text x="${xAt(i).toFixed(1)}" y="${height - 8}" text-anchor="middle" class="svg-tick">${escapeHtml(r.q.replace('20', "'"))}</text>`;
  }).join('');

  const last = rows[rows.length - 1];
  const lx = xAt(rows.length - 1);
  const ey = yAt(last.exportsBn);
  const iy = yAt(last.importsBn);
  const midY = (ey + iy) / 2;
  const net = (last.exportsBn - last.importsBn).toFixed(1);

  const dots = rows.map((r, i) => {
    const cx = xAt(i).toFixed(1);
    return `<circle cx="${cx}" cy="${yAt(r.exportsBn).toFixed(1)}" r="${i === rows.length - 1 ? 3.6 : 2}" fill="#166534"><title>${escapeHtml(r.q)} Exports: M$ ${r.exportsBn.toFixed(1)}B</title></circle>`
      + `<circle cx="${cx}" cy="${yAt(r.importsBn).toFixed(1)}" r="${i === rows.length - 1 ? 3.4 : 2}" fill="#FFFFFF" stroke="#1D4E6E" stroke-width="1.6"><title>${escapeHtml(r.q)} Imports: M$ ${r.importsBn.toFixed(1)}B</title></circle>`;
  }).join('');

  const bracket = `<line x1="${(lx + 6).toFixed(1)}" y1="${ey.toFixed(1)}" x2="${(lx + 11).toFixed(1)}" y2="${ey.toFixed(1)}" stroke="#166534" stroke-width="1.2"/>`
    + `<line x1="${(lx + 11).toFixed(1)}" y1="${ey.toFixed(1)}" x2="${(lx + 11).toFixed(1)}" y2="${iy.toFixed(1)}" stroke="#166534" stroke-width="1.2"/>`
    + `<line x1="${(lx + 6).toFixed(1)}" y1="${iy.toFixed(1)}" x2="${(lx + 11).toFixed(1)}" y2="${iy.toFixed(1)}" stroke="#166534" stroke-width="1.2"/>`
    + `<text x="${(lx + 15).toFixed(1)}" y="${(midY + 3.5).toFixed(1)}" class="svg-callout svg-callout-pos">+M$ ${net}B</text>`;

  return `<svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Quarterly Merchandise Exports, Imports, and Trade Surplus">`
    + grid
    + `<polygon points="${areaPoly}" fill="#DCFCE7" opacity="0.62"/>`
    + `<polyline points="${expPts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')}" fill="none" stroke="#166534" stroke-width="2.2" stroke-linejoin="round"/>`
    + `<polyline points="${impPts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')}" fill="none" stroke="#1D4E6E" stroke-width="2" stroke-dasharray="5 3" stroke-linejoin="round"/>`
    + dots + bracket + xLabels
    + `</svg>`;
}

export function renderHorizontalBars(items, options = {}) {
  const width = options.width || 560;
  const rowH = options.rowH || 27;
  const padL = options.padL || 164;
  const padR = options.padR || 92;
  const padT = options.benchmarkLabel ? 18 : 6;
  const padB = options.showAxis ? 24 : 8;
  const height = padT + padB + items.length * rowH;
  const plotW = width - padL - padR;

  const vals = items.map((d) => d.value);
  const rawMin = Math.min(0, ...vals);
  const rawMax = Math.max(0, ...vals);
  const domMin = options.minVal !== undefined ? options.minVal : rawMin < 0 ? rawMin * 1.25 : 0;
  const domMax = options.maxVal !== undefined ? options.maxVal : rawMax * 1.12 || 1;
  const span = domMax - domMin || 1;
  const xAt = (v) => padL + ((v - domMin) / span) * plotW;
  const zeroX = xAt(0);

  const ticks = options.ticks || [];
  const axisGrid = ticks.map((t) => {
    const x = xAt(t).toFixed(1);
    const isZero = t === 0;
    const lbl = options.tickFmt ? options.tickFmt(t) : String(t);
    return `<line x1="${x}" y1="${padT}" x2="${x}" y2="${height - padB}" stroke="${isZero ? '#7E8C82' : '#ECEEEB'}" stroke-width="${isZero ? 1.2 : 1}"/>`
      + `<text x="${x}" y="${height - 6}" text-anchor="middle" class="svg-tick">${escapeHtml(lbl)}</text>`;
  }).join('');

  const rowsSvg = items.map((d, idx) => {
    const y = padT + idx * rowH;
    const barH = 13;
    const barY = y + (rowH - barH) / 2;
    const x0 = xAt(Math.min(0, d.value));
    const x1 = xAt(Math.max(0, d.value));
    const bw = Math.max(2.5, x1 - x0);
    const fill = d.highlight === 'primary'
      ? '#141715'
      : d.highlight === 'secondary'
        ? '#0F766E'
        : d.value < 0
          ? '#166534'
          : d.tone === 'warning'
            ? '#9F2D20'
            : d.tone === 'amber'
              ? '#B4691E'
              : d.tone === 'muted'
                ? '#7E93A4'
                : d.tone === 'slate'
                  ? '#1D4E6E'
                  : '#2A6F4E';
    const track = options.showTrack
      ? `<rect x="${padL}" y="${barY}" width="${plotW}" height="${barH}" rx="3" fill="#F1F3F0"/>`
      : '';
    return `<g>`
      + `<text x="${padL - 9}" y="${y + rowH / 2 + 4}" text-anchor="end" class="svg-bar-label">${escapeHtml(d.label)}</text>`
      + track
      + `<rect x="${x0.toFixed(1)}" y="${barY}" width="${bw.toFixed(1)}" height="${barH}" rx="2.5" fill="${fill}"><title>${escapeHtml(d.label)}: ${escapeHtml(d.formatted)}</title></rect>`
      + `<text x="${width - 4}" y="${y + rowH / 2 + 4}" text-anchor="end" class="svg-bar-val">${escapeHtml(d.formatted)}</text>`
      + `</g>`;
  }).join('');

  const zeroRule = ticks.length === 0 && rawMin < 0
    ? `<line x1="${zeroX.toFixed(1)}" y1="${padT}" x2="${zeroX.toFixed(1)}" y2="${height - padB}" stroke="#7E8C82" stroke-width="1.2"/>`
    : '';

  const benchmark = options.benchmarkValue !== undefined
    ? (() => {
        const bx = xAt(options.benchmarkValue).toFixed(1);
        return `<line x1="${bx}" y1="${padT - 2}" x2="${bx}" y2="${height - padB}" stroke="#FFFFFF" stroke-width="2.2" opacity="0.55"/>`
          + `<line x1="${bx}" y1="${padT - 2}" x2="${bx}" y2="${height - padB}" stroke="#3D4741" stroke-dasharray="3 3" stroke-width="1.2"/>`
          + `<text x="${bx}" y="11" text-anchor="middle" class="svg-note">${escapeHtml(options.benchmarkLabel || 'Avg')}</text>`;
      })()
    : '';

  return `<svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Horizontal Statistical Bar Chart">${axisGrid}${rowsSvg}${zeroRule}${benchmark}</svg>`;
}

export function renderPopulationPyramid(cohorts, mode = 'thousands', highlightCohort = '30–39', compact = false) {
  const width = compact ? 350 : 610;
  const rowH = compact ? 23 : 27;
  const padT = 22;
  const padB = 18;
  const centerW = compact ? 44 : 62;
  const sidePad = compact ? 46 : 58;
  const halfW = (width - centerW) / 2 - sidePad;
  const height = padT + padB + cohorts.length * rowH;
  const totalPopK = cohorts.reduce((s, c) => s + c.maleK + c.femaleK, 0);

  const valOf = (k) => (mode === 'share' ? (k / totalPopK) * 100 : k);
  const maxVal = Math.max(...cohorts.flatMap((c) => [valOf(c.maleK), valOf(c.femaleK)]));
  const leftEdge = (width - centerW) / 2;
  const rightEdge = (width + centerW) / 2;

  const header = `<text x="${(leftEdge - halfW / 2).toFixed(1)}" y="14" text-anchor="middle" class="svg-pyr-head svg-pyr-m">Male (49.2%)</text>`
    + `<text x="${(width / 2).toFixed(1)}" y="14" text-anchor="middle" class="svg-pyr-head">Age</text>`
    + `<text x="${(rightEdge + halfW / 2).toFixed(1)}" y="14" text-anchor="middle" class="svg-pyr-head svg-pyr-f">Female (50.8%)</text>`;

  const rows = cohorts.map((c, idx) => {
    const y = padT + idx * rowH;
    const bh = compact ? 14 : 16;
    const by = y + (rowH - bh) / 2;
    const mv = valOf(c.maleK);
    const fv = valOf(c.femaleK);
    const mw = Math.max(4, (mv / maxVal) * halfW);
    const fw = Math.max(4, (fv / maxVal) * halfW);
    const active = c.cohort === highlightCohort;
    const fmt = (v) => (mode === 'share' ? `${v.toFixed(1)}%` : `${(v / 1000).toFixed(2)}M`);
    const bg = active
      ? `<rect x="2" y="${y + 1}" width="${width - 4}" height="${rowH - 2}" rx="4" fill="#E9EFEA" stroke="#CBD5CD" stroke-width="0.8"/>`
      : '';
    const lblCls = active ? 'svg-bar-val' : 'svg-tick';
    return `<g class="pyr-row" data-cohort-btn="${escapeHtml(c.cohort)}">${bg}`
      + `<rect x="${(leftEdge - mw).toFixed(1)}" y="${by}" width="${mw.toFixed(1)}" height="${bh}" rx="2" fill="${active ? '#12354D' : '#3C6E91'}"/>`
      + `<rect x="${rightEdge.toFixed(1)}" y="${by}" width="${fw.toFixed(1)}" height="${bh}" rx="2" fill="${active ? '#14532D' : '#3B8A68'}"/>`
      + `<text x="${(width / 2).toFixed(1)}" y="${y + rowH / 2 + 4}" text-anchor="middle" class="svg-bar-val">${escapeHtml(c.cohort)}</text>`
      + `<text x="${(leftEdge - mw - 5).toFixed(1)}" y="${y + rowH / 2 + 4}" text-anchor="end" class="${lblCls}">${fmt(mv)}</text>`
      + `<text x="${(rightEdge + fw + 5).toFixed(1)}" y="${y + rowH / 2 + 4}" text-anchor="start" class="${lblCls}">${fmt(fv)}</text>`
      + `</g>`;
  }).join('');

  const axisUnit = mode === 'share' ? '% of total population (42.84M · Mid-2026)' : 'Residents in millions · Tap any cohort row';
  const footer = `<text x="${(width / 2).toFixed(1)}" y="${height - 4}" text-anchor="middle" class="svg-note">${axisUnit}</text>`;

  return `<svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Meridian Mid-2026 Population Pyramid">${header}${rows}${footer}</svg>`;
}
