// SPDX-License-Identifier: MIT
export function render() {
  return `
    <h2>Economy & Prices</h2>
    <p class="subtitle">National accounts, trade balance, and inflation components.</p>
    <div class="grid">
      <div class="card">
        <h3>GDP Components (Expenditure Approach)</h3>
        <table style="margin-top:1rem; width:100%; border-collapse:collapse">
          <tr><td style="padding:0.75rem 0">Household Consumption</td><td style="text-align:right;font-variant-numeric:tabular-nums">52.1%</td></tr>
          <tr><td style="padding:0.75rem 0">Government Spending</td><td style="text-align:right;font-variant-numeric:tabular-nums">11.8%</td></tr>
          <tr><td style="padding:0.75rem 0">Gross Fixed Capital</td><td style="text-align:right;font-variant-numeric:tabular-nums">24.5%</td></tr>
          <tr><td style="padding:0.75rem 0;border-bottom:none">Net Exports</td><td style="text-align:right;font-variant-numeric:tabular-nums">11.6%</td></tr>
        </table>
        <div class="meta" style="margin-top:1.5rem">Source: SECO, 2025 Annual Data</div>
      </div>
      <div class="card">
        <h3>CPI Weights 2026</h3>
        <table style="margin-top:1rem; width:100%; border-collapse:collapse">
          <tr><td style="padding:0.75rem 0">Housing & Energy</td><td style="text-align:right;font-variant-numeric:tabular-nums">26.8%</td></tr>
          <tr><td style="padding:0.75rem 0">Healthcare</td><td style="text-align:right;font-variant-numeric:tabular-nums">16.3%</td></tr>
          <tr><td style="padding:0.75rem 0">Food & Beverages</td><td style="text-align:right;font-variant-numeric:tabular-nums">11.5%</td></tr>
          <tr><td style="padding:0.75rem 0;border-bottom:none">Transport</td><td style="text-align:right;font-variant-numeric:tabular-nums">11.2%</td></tr>
        </table>
        <div class="meta" style="margin-top:1.5rem">Source: FSO, 2026 Basket</div>
      </div>
    </div>
  `;
}
