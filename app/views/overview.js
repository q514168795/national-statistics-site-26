// SPDX-License-Identifier: MIT
import { MACRO } from '../data.js';
export function render() {
  return `
    <h2>Macro Snapshot</h2>
    <p class="subtitle">Latest headline indicators for Switzerland. Reconciled with SNA-2020.</p>
    <div class="grid">
      ${MACRO.map(m => `
        <div class="card">
          <h3>${m.label}</h3>
          <div class="val">${m.val}</div>
          <div class="meta">
            <span class="${m.tone}">${m.delta}</span> &bull; ${m.source}
          </div>
        </div>
      `).join('')}
    </div>
    <div class="card" style="margin-top:2rem">
      <h3>Latest Statistical Releases</h3>
      <ul style="margin-top:1rem; padding-left:1.5rem; line-height:2">
        <li><strong>Nov 26, 2026:</strong> Swiss Labour Force Survey Q3 2026 (Source: FSO)</li>
        <li><strong>Nov 15, 2026:</strong> Consumer Price Index Oct 2026 (Source: FSO)</li>
        <li><strong>Nov 02, 2026:</strong> Retail Trade Turnover Sep 2026 (Source: FSO)</li>
      </ul>
    </div>
  `;
}
