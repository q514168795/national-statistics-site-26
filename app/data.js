// SPDX-License-Identifier: MIT
export const MACRO = [
  { id: 'pop', label: 'Resident Population', val: '8,960,817', delta: '+0.8% YoY', tone: 'pos', source: 'FSO STATPOP, 2025' },
  { id: 'gdp', label: 'Real GDP', val: 'CHF 822.4B', delta: '+1.3% YoY', tone: 'pos', source: 'SECO Accounts, Q3 2026' },
  { id: 'cpi', label: 'Consumer Price Index', val: '1.2%', delta: '-0.1pp vs Sep', tone: 'pos', source: 'FSO Prices, Oct 2026' },
  { id: 'unemp', label: 'Unemployment Rate', val: '2.1%', delta: '0.0pp YoY', tone: 'neu', source: 'SECO Labour, Oct 2026' }
];
export const CANTONS = [
  { code: 'ZH', name: 'Zürich', pop: 1579967, gdp: 149.0, unemp: 2.1 },
  { code: 'BE', name: 'Bern', pop: 1047473, gdp: 82.3, unemp: 1.6 },
  { code: 'VD', name: 'Vaud', pop: 830431, gdp: 59.2, unemp: 3.3 },
  { code: 'AG', name: 'Aargau', pop: 703186, gdp: 44.1, unemp: 2.3 },
  { code: 'SG', name: 'St. Gallen', pop: 519245, gdp: 38.6, unemp: 2.0 },
  { code: 'GE', name: 'Genève', pop: 514114, gdp: 53.6, unemp: 4.1 },
  { code: 'LU', name: 'Lucerne', pop: 420366, gdp: 28.5, unemp: 1.7 },
  { code: 'TI', name: 'Ticino', pop: 351491, gdp: 29.8, unemp: 2.7 },
  { code: 'VS', name: 'Valais', pop: 353209, gdp: 19.4, unemp: 2.6 },
  { code: 'FR', name: 'Fribourg', pop: 330225, gdp: 19.8, unemp: 2.2 },
  { code: 'TG', name: 'Thurgau', pop: 285994, gdp: 17.5, unemp: 1.9 },
  { code: 'BL', name: 'Basel-Landschaft', pop: 293671, gdp: 21.3, unemp: 2.1 },
  { code: 'BS', name: 'Basel-Stadt', pop: 196144, gdp: 38.0, unemp: 3.0 },
  { code: 'GR', name: 'Graubünden', pop: 201376, gdp: 14.8, unemp: 1.2 },
  { code: 'NE', name: 'Neuchâtel', pop: 176166, gdp: 15.6, unemp: 3.5 }
];
