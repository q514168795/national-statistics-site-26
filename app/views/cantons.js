// SPDX-License-Identifier: MIT
import { CANTONS } from '../data.js';
let sortCol = 'pop', sortAsc = false;
export function render() {
  const sorted = [...CANTONS].sort((a,b) => (a[sortCol] > b[sortCol] ? 1 : -1) * (sortAsc ? 1 : -1));
  return `
    <h2>Cantonal Portraits 2025</h2>
    <p class="subtitle">Key indicators across Swiss cantons. Source: FSO Regional Statistics, 2025.</p>
    <div style="overflow-x:auto; background:#fff; border:1px solid #e2e2e2; border-radius:4px">
      <table id="ctable" style="margin:0">
        <thead>
          <tr>
            <th data-col="name">Canton ${sortCol==='name'?(sortAsc?'▲':'▼'):''}</th>
            <th data-col="pop">Population ${sortCol==='pop'?(sortAsc?'▲':'▼'):''}</th>
            <th data-col="gdp">GDP (CHF Bn) ${sortCol==='gdp'?(sortAsc?'▲':'▼'):''}</th>
            <th data-col="unemp">Unemployment (%) ${sortCol==='unemp'?(sortAsc?'▲':'▼'):''}</th>
          </tr>
        </thead>
        <tbody>
          ${sorted.map(c => `<tr>
            <td><strong>${c.name}</strong> (${c.code})</td>
            <td style="font-variant-numeric:tabular-nums">${c.pop.toLocaleString()}</td>
            <td style="font-variant-numeric:tabular-nums">${c.gdp.toFixed(1)}</td>
            <td style="font-variant-numeric:tabular-nums">${c.unemp.toFixed(1)}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;
}
export function mount() {
  document.querySelectorAll('#ctable th').forEach(th => {
    th.addEventListener('click', () => {
      const col = th.dataset.col;
      if (sortCol === col) sortAsc = !sortAsc;
      else { sortCol = col; sortAsc = false; }
      import('../app.js').then(m => m.refresh());
    });
  });
}
