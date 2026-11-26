// SPDX-License-Identifier: MIT
// Reconciled national statistics dataset for the Republic of Meridian (MNSB / StatAtlas).
// Every headline figure carries an explicit statistical source division and reference period.

export const BUREAU_META = {
  brand: 'StatAtlas',
  bureau: 'Meridian National Statistics Bureau',
  acronym: 'MNSB',
  country: 'Republic of Meridian',
  currency: 'M$',
  edition: 'Release: Q3 / Oct 2026',
  standards: 'SNA-2020 · COICOP-2018 · ILO-LFS · Census 2025',
  updated: '26 Nov 2026',
};

export const HEADLINE_KPIS = [
  {
    id: 'gdp',
    label: 'Real GDP Growth',
    value: '+2.7%',
    subvalue: 'Nominal M$ 2,414.0B (ann.)',
    delta: '+0.2 pp vs Q2',
    tone: 'positive',
    sparkTone: 'positive',
    period: 'Q3 2026',
    source: 'National Accounts, Q3 2026',
    route: 'economy',
    spark: [2.1, 2.3, 2.2, 2.4, 2.5, 2.7],
  },
  {
    id: 'cpi',
    label: 'CPI Inflation (YoY)',
    value: '2.4%',
    subvalue: 'Core 2.8% · Target 2.0%',
    delta: '-0.1 pp vs Sep',
    tone: 'positive',
    sparkTone: 'warning',
    targetRef: 2.0,
    period: 'Oct 2026',
    source: 'Consumer Price Survey, Oct 2026',
    route: 'economy',
    spark: [3.2, 3.0, 2.8, 2.6, 2.5, 2.4],
  },
  {
    id: 'unemployment',
    label: 'Unemployment Rate',
    value: '4.3%',
    subvalue: '21.64M employed · 66.8% LFPR',
    delta: '-0.1 pp YoY',
    tone: 'positive',
    sparkTone: 'neutral',
    period: 'Q3 2026',
    source: 'Labour Force Survey, Q3 2026',
    route: 'economy',
    spark: [4.6, 4.5, 4.5, 4.4, 4.4, 4.3],
  },
  {
    id: 'population',
    label: 'Resident Population',
    value: '42.84M',
    subvalue: 'Median 39.7 yrs · +0.6% YoY',
    delta: '+256k YoY',
    tone: 'neutral',
    sparkTone: 'neutral',
    period: 'Mid-2026',
    source: 'Population Register, Mid-2026',
    route: 'demographics',
    spark: [41.78, 42.01, 42.24, 42.43, 42.58, 42.84],
  },
];

export const QUARTERLY_MACRO = [
  { q: '2022 Q1', gdpYoY: 3.4, nominalBn: 1842.0, cpiYoY: 4.8, coreCpi: 4.1, unemp: 4.9, exportsBn: 148.2, importsBn: 141.6 },
  { q: '2022 Q2', gdpYoY: 3.1, nominalBn: 1882.4, cpiYoY: 5.4, coreCpi: 4.5, unemp: 4.8, exportsBn: 151.4, importsBn: 145.0 },
  { q: '2022 Q3', gdpYoY: 2.7, nominalBn: 1920.5, cpiYoY: 5.7, coreCpi: 4.8, unemp: 4.7, exportsBn: 153.8, importsBn: 148.2 },
  { q: '2022 Q4', gdpYoY: 2.2, nominalBn: 1954.8, cpiYoY: 5.2, coreCpi: 4.7, unemp: 4.7, exportsBn: 155.1, importsBn: 149.4 },
  { q: '2023 Q1', gdpYoY: 1.9, nominalBn: 1986.2, cpiYoY: 4.6, coreCpi: 4.4, unemp: 4.8, exportsBn: 154.6, importsBn: 147.8 },
  { q: '2023 Q2', gdpYoY: 1.8, nominalBn: 2014.5, cpiYoY: 4.1, coreCpi: 4.0, unemp: 4.8, exportsBn: 156.9, importsBn: 148.5 },
  { q: '2023 Q3', gdpYoY: 2.0, nominalBn: 2044.0, cpiYoY: 3.7, coreCpi: 3.8, unemp: 4.7, exportsBn: 159.2, importsBn: 150.1 },
  { q: '2023 Q4', gdpYoY: 2.1, nominalBn: 2072.8, cpiYoY: 3.4, coreCpi: 3.6, unemp: 4.6, exportsBn: 161.0, importsBn: 151.6 },
  { q: '2024 Q1', gdpYoY: 2.1, nominalBn: 2101.6, cpiYoY: 3.2, coreCpi: 3.5, unemp: 4.6, exportsBn: 162.8, importsBn: 152.9 },
  { q: '2024 Q2', gdpYoY: 2.3, nominalBn: 2131.0, cpiYoY: 3.0, coreCpi: 3.3, unemp: 4.5, exportsBn: 165.4, importsBn: 154.8 },
  { q: '2024 Q3', gdpYoY: 2.2, nominalBn: 2160.4, cpiYoY: 2.9, coreCpi: 3.2, unemp: 4.5, exportsBn: 167.2, importsBn: 156.3 },
  { q: '2024 Q4', gdpYoY: 2.3, nominalBn: 2190.2, cpiYoY: 2.8, coreCpi: 3.1, unemp: 4.5, exportsBn: 169.0, importsBn: 157.5 },
  { q: '2025 Q1', gdpYoY: 2.2, nominalBn: 2224.8, cpiYoY: 2.7, coreCpi: 3.0, unemp: 4.4, exportsBn: 170.6, importsBn: 158.9 },
  { q: '2025 Q2', gdpYoY: 2.4, nominalBn: 2261.2, cpiYoY: 2.6, coreCpi: 2.9, unemp: 4.4, exportsBn: 172.9, importsBn: 160.4 },
  { q: '2025 Q3', gdpYoY: 2.4, nominalBn: 2296.9, cpiYoY: 2.6, coreCpi: 2.9, unemp: 4.4, exportsBn: 174.5, importsBn: 161.6 },
  { q: '2025 Q4', gdpYoY: 2.5, nominalBn: 2328.4, cpiYoY: 2.5, coreCpi: 2.8, unemp: 4.4, exportsBn: 175.8, importsBn: 162.4 },
  { q: '2026 Q1', gdpYoY: 2.5, nominalBn: 2356.8, cpiYoY: 2.5, coreCpi: 2.8, unemp: 4.4, exportsBn: 176.5, importsBn: 163.0 },
  { q: '2026 Q2', gdpYoY: 2.5, nominalBn: 2385.2, cpiYoY: 2.5, coreCpi: 2.8, unemp: 4.3, exportsBn: 177.3, importsBn: 163.6 },
  { q: '2026 Q3', gdpYoY: 2.7, nominalBn: 2414.0, cpiYoY: 2.5, coreCpi: 2.8, unemp: 4.3, exportsBn: 178.4, importsBn: 164.2 },
];

export const CPI_BASKET = [
  { group: 'Housing & Utilities', weight: 28.5, yoy: 3.5, contrib: 1.00, source: 'MNSB CPI COICOP-04, Oct 2026' },
  { group: 'Food & Beverages', weight: 16.0, yoy: 2.6, contrib: 0.42, source: 'MNSB CPI COICOP-01, Oct 2026' },
  { group: 'Healthcare & Medical', weight: 9.5, yoy: 3.8, contrib: 0.36, source: 'MNSB CPI COICOP-06, Oct 2026' },
  { group: 'Restaurants & Hotels', weight: 8.5, yoy: 3.4, contrib: 0.29, source: 'MNSB CPI COICOP-11, Oct 2026' },
  { group: 'Recreation & Culture', weight: 9.0, yoy: 2.2, contrib: 0.20, source: 'MNSB CPI COICOP-09, Oct 2026' },
  { group: 'Education & Comms', weight: 7.0, yoy: 1.9, contrib: 0.13, source: 'MNSB CPI COICOP-08/10, Oct 2026' },
  { group: 'Household Goods', weight: 8.0, yoy: 0.9, contrib: 0.07, source: 'MNSB CPI COICOP-05, Oct 2026' },
  { group: 'Transport & Fuel', weight: 13.5, yoy: -0.5, contrib: -0.07, source: 'MNSB CPI COICOP-07, Oct 2026' },
];

export const GDP_SECTORS = [
  { sector: 'Finance & Business Services', share: 26.4, valueBn: 637.3, yoy: 3.3, source: 'MNSB GVA Accounts, Q3 2026' },
  { sector: 'Manufacturing & High-Tech', share: 19.8, valueBn: 478.0, yoy: 3.1, source: 'MNSB GVA Accounts, Q3 2026' },
  { sector: 'Public Admin, Health & Ed.', share: 18.2, valueBn: 439.3, yoy: 2.2, source: 'MNSB GVA Accounts, Q3 2026' },
  { sector: 'Wholesale, Retail & Tourism', share: 14.5, valueBn: 350.0, yoy: 2.4, source: 'MNSB GVA Accounts, Q3 2026' },
  { sector: 'Transport, Energy & Infra.', share: 12.6, valueBn: 304.2, yoy: 2.8, source: 'MNSB GVA Accounts, Q3 2026' },
  { sector: 'Agriculture, Forestry & Mining', share: 8.5, valueBn: 205.2, yoy: 1.4, source: 'MNSB GVA Accounts, Q3 2026' },
];

export const REGIONS = [
  {
    code: 'NBM', name: 'Northbay Metro', specialty: 'Capital & Finance',
    popK: 8920, gdpBn: 612.8, gdpPerCapita: 68700, gdpYoY: 3.1,
    unemp: 3.6, labourK: 4840, cpiYoY: 2.7, medianAge: 36.4, urbanPct: 94.2,
    source: 'MNSB Regional Accounts, 2026',
  },
  {
    code: 'VLR', name: 'Valeridge', specialty: 'Semiconductors & Mfg.',
    popK: 7480, gdpBn: 468.2, gdpPerCapita: 62594, gdpYoY: 3.4,
    unemp: 3.8, labourK: 4010, cpiYoY: 2.4, medianAge: 38.9, urbanPct: 83.5,
    source: 'MNSB Regional Accounts, 2026',
  },
  {
    code: 'ALF', name: 'Alderford', specialty: 'Biotech & Research',
    popK: 4720, gdpBn: 284.5, gdpPerCapita: 60275, gdpYoY: 2.7,
    unemp: 3.9, labourK: 2540, cpiYoY: 2.6, medianAge: 37.6, urbanPct: 85.1,
    source: 'MNSB Regional Accounts, 2026',
  },
  {
    code: 'SHC', name: 'Solhaven Coast', specialty: 'Ports & Clean Energy',
    popK: 6340, gdpBn: 354.6, gdpPerCapita: 55931, gdpYoY: 2.9,
    unemp: 4.1, labourK: 3360, cpiYoY: 2.5, medianAge: 39.7, urbanPct: 81.0,
    source: 'MNSB Regional Accounts, 2026',
  },
  {
    code: 'IPH', name: 'Ironpeak Highlands', specialty: 'Mining & Hydro Power',
    popK: 3890, gdpBn: 192.6, gdpPerCapita: 49512, gdpYoY: 1.5,
    unemp: 5.3, labourK: 1980, cpiYoY: 2.1, medianAge: 43.2, urbanPct: 61.8,
    source: 'MNSB Regional Accounts, 2026',
  },
  {
    code: 'KSL', name: 'Kestrel Isles', specialty: 'Offshore Wind & Marine',
    popK: 2560, gdpBn: 114.1, gdpPerCapita: 44570, gdpYoY: 2.1,
    unemp: 4.6, labourK: 1320, cpiYoY: 2.5, medianAge: 42.5, urbanPct: 70.2,
    source: 'MNSB Regional Accounts, 2026',
  },
  {
    code: 'CNP', name: 'Cinderplain', specialty: 'Agribusiness & Rail',
    popK: 5610, gdpBn: 248.4, gdpPerCapita: 44278, gdpYoY: 1.8,
    unemp: 4.9, labourK: 2890, cpiYoY: 2.2, medianAge: 41.8, urbanPct: 66.4,
    source: 'MNSB Regional Accounts, 2026',
  },
  {
    code: 'WSM', name: 'Westmoor', specialty: 'Forestry & Eco-Tourism',
    popK: 3320, gdpBn: 138.8, gdpPerCapita: 41807, gdpYoY: 1.4,
    unemp: 5.6, labourK: 1660, cpiYoY: 2.3, medianAge: 44.1, urbanPct: 58.9,
    source: 'MNSB Regional Accounts, 2026',
  },
];

export const POPULATION_PYRAMID = [
  { cohort: '80+',   maleK: 820,  femaleK: 1340 },
  { cohort: '70–79', maleK: 1480, femaleK: 1760 },
  { cohort: '60–69', maleK: 2240, femaleK: 2420 },
  { cohort: '50–59', maleK: 2670, femaleK: 2750 },
  { cohort: '40–49', maleK: 2860, femaleK: 2880 },
  { cohort: '30–39', maleK: 3260, femaleK: 3200 },
  { cohort: '20–29', maleK: 2910, femaleK: 2820 },
  { cohort: '10–19', maleK: 2520, femaleK: 2410 },
  { cohort: '0–9',   maleK: 2310, femaleK: 2190 },
];

export const DEMOGRAPHIC_VITALS = [
  { label: 'Total Population', value: '42.84M', note: '21.07M male · 21.77M female', source: 'Population Register, Mid\u20112026' },
  { label: 'Median Age', value: '39.7 yrs', note: 'Up from 38.4 yrs in 2021', source: 'Census & Vital Stats, 2026' },
  { label: 'Life Expectancy', value: '82.6 yrs', note: '80.4 male · 84.7 female', source: 'Vital Statistics, 2025' },
  { label: 'Urbanisation Rate', value: '78.6%', note: '33.68M urban · 9.16M rural', source: 'Settlement Survey, 2026' },
  { label: 'Total Fertility Rate', value: '1.58', note: 'Births per woman (2025 final)', source: 'Vital Statistics, 2025' },
  { label: 'Net Migration', value: '+184k', note: 'Annual net inflows (FY 2025–26)', source: 'Migration Register, 2026' },
];

export const SERIES_CATALOG = [
  { code: 'NA-GDP-01', short: 'Real GDP', title: 'Real GDP Growth (YoY, chain-linked)', domain: 'Macroeconomics', value: '+2.7%', numeric: 2.7, unit: '% YoY', change: '+0.2 pp QoQ', tone: 'positive', period: 'Q3 2026', frequency: 'Quarterly', source: 'MNSB National Accounts, Q3 2026', spark: [2.2, 2.4, 2.5, 2.5, 2.7] },
  { code: 'NA-GDP-02', short: 'Nominal GDP', title: 'Nominal GDP (Annualised)', domain: 'Macroeconomics', value: 'M$ 2,414.0B', numeric: 2414.0, unit: 'M$ Billions', change: '+5.1% YoY', tone: 'positive', period: 'Q3 2026', frequency: 'Quarterly', source: 'MNSB National Accounts, Q3 2026', spark: [2225, 2297, 2357, 2385, 2414] },
  { code: 'NA-GDP-03', short: 'GDP/Capita', title: 'GDP per Capita (Nominal)', domain: 'Macroeconomics', value: 'M$ 56,349', numeric: 56349, unit: 'M$ / person', change: '+4.5% YoY', tone: 'positive', period: 'Q3 2026', frequency: 'Quarterly', source: 'MNSB National Accounts, Q3 2026', spark: [53420, 54180, 54910, 55840, 56349] },
  { code: 'NA-INV-04', short: 'Fixed Inv.', title: 'Gross Fixed Capital Formation', domain: 'Macroeconomics', value: '23.4%', numeric: 23.4, unit: '% of GDP', change: '+0.6 pp YoY', tone: 'positive', period: 'Q3 2026', frequency: 'Quarterly', source: 'MNSB National Accounts, Q3 2026', spark: [22.1, 22.4, 22.8, 23.1, 23.4] },
  { code: 'NA-SAV-05', short: 'Saving Rate', title: 'Household Net Saving Rate', domain: 'Macroeconomics', value: '8.9%', numeric: 8.9, unit: '% disp. inc.', change: '-0.3 pp YoY', tone: 'neutral', period: 'Q3 2026', frequency: 'Quarterly', source: 'MNSB Sector Accounts, Q3 2026', spark: [9.4, 9.3, 9.2, 9.0, 8.9] },
  { code: 'PR-CPI-01', short: 'CPI YoY', title: 'Consumer Price Index (Headline YoY)', domain: 'Prices & Trade', value: '2.4%', numeric: 2.4, unit: '% YoY', change: '-0.1 pp MoM', tone: 'positive', period: 'Oct 2026', frequency: 'Monthly', source: 'MNSB Consumer Price Survey, Oct 2026', spark: [2.9, 2.7, 2.6, 2.5, 2.4] },
  { code: 'PR-CPI-02', short: 'Core CPI', title: 'Core CPI (excl. Food & Energy)', domain: 'Prices & Trade', value: '2.8%', numeric: 2.8, unit: '% YoY', change: '0.0 pp MoM', tone: 'neutral', period: 'Oct 2026', frequency: 'Monthly', source: 'MNSB Consumer Price Survey, Oct 2026', spark: [3.2, 3.0, 2.9, 2.8, 2.8] },
  { code: 'PR-PPI-03', short: 'PPI Final', title: 'Producer Price Index (Final Demand)', domain: 'Prices & Trade', value: '1.6%', numeric: 1.6, unit: '% YoY', change: '-0.2 pp MoM', tone: 'positive', period: 'Oct 2026', frequency: 'Monthly', source: 'MNSB Industrial Prices, Oct 2026', spark: [2.4, 2.1, 1.9, 1.8, 1.6] },
  { code: 'TR-BAL-04', short: 'Trade Net', title: 'Merchandise Trade Balance', domain: 'Prices & Trade', value: '+M$ 14.2B', numeric: 14.2, unit: 'M$ Billions', change: '+M$ 1.3B YoY', tone: 'positive', period: 'Q3 2026', frequency: 'Quarterly', source: 'MNSB Customs & Trade, Q3 2026', spark: [10.9, 11.7, 12.9, 13.7, 14.2] },
  { code: 'TR-EXP-05', short: 'Exports', title: 'Merchandise Exports (FOB)', domain: 'Prices & Trade', value: 'M$ 178.4B', numeric: 178.4, unit: 'M$ Billions', change: '+2.2% YoY', tone: 'positive', period: 'Q3 2026', frequency: 'Quarterly', source: 'MNSB Customs & Trade, Q3 2026', spark: [167.2, 170.6, 174.5, 177.3, 178.4] },
  { code: 'TR-IMP-06', short: 'Imports', title: 'Merchandise Imports (CIF)', domain: 'Prices & Trade', value: 'M$ 164.2B', numeric: 164.2, unit: 'M$ Billions', change: '+1.6% YoY', tone: 'neutral', period: 'Q3 2026', frequency: 'Quarterly', source: 'MNSB Customs & Trade, Q3 2026', spark: [156.3, 158.9, 161.6, 163.6, 164.2] },
  { code: 'LB-UNP-01', short: 'Unemp.', title: 'Unemployment Rate (ILO, SA)', domain: 'Labour Market', value: '4.3%', numeric: 4.3, unit: '% labour force', change: '-0.1 pp YoY', tone: 'positive', period: 'Q3 2026', frequency: 'Quarterly', source: 'MNSB Labour Force Survey, Q3 2026', spark: [4.5, 4.4, 4.4, 4.3, 4.3] },
  { code: 'LB-EMP-02', short: 'Employed', title: 'Total Employed Persons', domain: 'Labour Market', value: '21.64M', numeric: 21.64, unit: 'Millions', change: '+1.2% YoY', tone: 'positive', period: 'Q3 2026', frequency: 'Quarterly', source: 'MNSB Labour Force Survey, Q3 2026', spark: [21.12, 21.28, 21.39, 21.52, 21.64] },
  { code: 'LB-WAG-03', short: 'Earnings', title: 'Average Weekly Earnings (Nominal)', domain: 'Labour Market', value: 'M$ 1,284', numeric: 1284, unit: 'M$ / week', change: '+3.9% YoY', tone: 'positive', period: 'Q3 2026', frequency: 'Quarterly', source: 'MNSB Earnings Survey, Q3 2026', spark: [1198, 1218, 1236, 1262, 1284] },
  { code: 'LB-PAR-04', short: 'LF Part.', title: 'Labour Force Participation (15+)', domain: 'Labour Market', value: '66.8%', numeric: 66.8, unit: '% pop 15+', change: '+0.3 pp YoY', tone: 'positive', period: 'Q3 2026', frequency: 'Quarterly', source: 'MNSB Labour Force Survey, Q3 2026', spark: [66.2, 66.3, 66.5, 66.7, 66.8] },
  { code: 'LB-VAC-05', short: 'Vacancies', title: 'Job Vacancy Rate (All Sectors)', domain: 'Labour Market', value: '3.1%', numeric: 3.1, unit: '% of posts', change: '-0.4 pp YoY', tone: 'neutral', period: 'Q3 2026', frequency: 'Quarterly', source: 'MNSB Employer Vacancy Survey, Q3 2026', spark: [3.8, 3.6, 3.5, 3.3, 3.1] },
  { code: 'DM-POP-01', short: 'Population', title: 'Resident Population (Mid-Year)', domain: 'Demographics', value: '42.84M', numeric: 42.84, unit: 'Millions', change: '+0.6% YoY', tone: 'neutral', period: 'Mid-2026', frequency: 'Annual', source: 'MNSB Population Register, 2026', spark: [41.78, 42.01, 42.24, 42.58, 42.84] },
  { code: 'DM-AGE-02', short: 'Med. Age', title: 'National Median Age', domain: 'Demographics', value: '39.7 yrs', numeric: 39.7, unit: 'Years', change: '+0.2 yrs YoY', tone: 'neutral', period: 'Mid-2026', frequency: 'Annual', source: 'MNSB Census & Vital Statistics, 2026', spark: [38.9, 39.1, 39.3, 39.5, 39.7] },
  { code: 'DM-FER-03', short: 'Fertility', title: 'Total Fertility Rate', domain: 'Demographics', value: '1.58 /w', numeric: 1.58, unit: 'Births / woman', change: '-0.03 YoY', tone: 'neutral', period: '2025 Final', frequency: 'Annual', source: 'MNSB Vital Statistics, 2025', spark: [1.67, 1.65, 1.63, 1.61, 1.58] },
  { code: 'DM-LIF-04', short: 'Life Exp.', title: 'Life Expectancy at Birth', domain: 'Demographics', value: '82.6 yrs', numeric: 82.6, unit: 'Years', change: '+0.2 yrs YoY', tone: 'positive', period: '2025 Final', frequency: 'Annual', source: 'MNSB Vital Statistics, 2025', spark: [81.9, 82.0, 82.2, 82.4, 82.6] },
  { code: 'RG-GAP-01', short: 'Reg. Ratio', title: 'Top-to-Bottom Regional GDP/Capita Ratio', domain: 'Regional Accounts', value: '1.64×', numeric: 1.64, unit: 'NBM / WSM', change: '-0.02 YoY', tone: 'positive', period: '2026 Est.', frequency: 'Annual', source: 'MNSB Regional Accounts, 2026', spark: [1.70, 1.69, 1.68, 1.66, 1.64] },
  { code: 'RG-URB-02', short: 'Urban %', title: 'National Urbanisation Share', domain: 'Regional Accounts', value: '78.6%', numeric: 78.6, unit: '% population', change: '+0.4 pp YoY', tone: 'neutral', period: 'Mid-2026', frequency: 'Annual', source: 'MNSB Settlement Survey, 2026', spark: [77.1, 77.5, 77.9, 78.2, 78.6] },
  { code: 'EN-REN-01', short: 'Clean Elec.', title: 'Clean Electricity Generation Share', domain: 'Environment & Energy', value: '64.2%', numeric: 64.2, unit: '% of TWh', change: '+4.8 pp YoY', tone: 'positive', period: 'Q3 2026', frequency: 'Quarterly', source: 'MNSB Energy Balances, Q3 2026', spark: [52.4, 55.1, 59.4, 62.0, 64.2] },
  { code: 'EN-GHG-02', short: 'CO₂ Int.', title: 'Territorial CO₂e Intensity', domain: 'Environment & Energy', value: '118 t/M$M', numeric: 118, unit: 'Tonnes / M$M GDP', change: '-5.6% YoY', tone: 'positive', period: '2025 Final', frequency: 'Annual', source: 'MNSB Environmental Accounts, 2025', spark: [139, 134, 129, 125, 118] },
];

export const BULLETINS = [
  { id: 'MNSB-2026-114', date: '24 Nov 2026', domain: 'National Accounts', title: 'Q3 2026 Real GDP expands 2.7% YoY on tech and services gains', route: 'economy' },
  { id: 'MNSB-2026-112', date: '18 Nov 2026', domain: 'Prices', title: 'October CPI eases to 2.4% YoY as transport fuel falls 0.5%', route: 'economy' },
  { id: 'MNSB-2026-109', date: '12 Nov 2026', domain: 'Labour Market', title: 'Unemployment holds at 4.3% in Q3; real wages rise 1.4%', route: 'explorer' },
  { id: 'MNSB-2026-105', date: '04 Nov 2026', domain: 'Regional Accounts', title: 'Valeridge leads provincial growth at 3.4%; Northbay at M$ 68.7k', route: 'regions' },
  { id: 'MNSB-2026-101', date: '28 Oct 2026', domain: 'Demographics', title: 'Mid-2026 population reaches 42.84M with median age 39.7 yrs', route: 'demographics' },
];

export const RELEASE_CALENDAR = [
  { date: '04 Dec 2026', time: '08:00 UTC', release: 'Merchandise Trade Preliminary — Nov 2026', category: 'Prices & Trade', status: 'Scheduled', division: 'MNSB Customs & Trade' },
  { date: '11 Dec 2026', time: '08:00 UTC', release: 'Consumer Price Index (CPI) — Nov 2026', category: 'Prices & Trade', status: 'Embargoed', division: 'MNSB Consumer Price Survey' },
  { date: '18 Dec 2026', time: '08:00 UTC', release: 'Labour Force & Earnings — Nov 2026', category: 'Labour Market', status: 'Scheduled', division: 'MNSB Labour Force Survey' },
  { date: '15 Jan 2027', time: '08:00 UTC', release: 'Producer Price Index — Dec 2026', category: 'Prices & Trade', status: 'Scheduled', division: 'MNSB Industrial Prices' },
  { date: '29 Jan 2027', time: '08:00 UTC', release: 'Quarterly National Accounts — Q4 2026 (First Est.)', category: 'Macroeconomics', status: 'Embargoed', division: 'MNSB National Accounts' },
  { date: '19 Feb 2027', time: '08:00 UTC', release: 'Provincial Population Estimates — Year-End 2026', category: 'Demographics', status: 'Scheduled', division: 'MNSB Population Register' },
];

export const METHODOLOGY_SECTIONS = {
  accounts: {
    title: 'National & Regional Accounts (SNA-2020)',
    standard: 'UN System of National Accounts 2020 · Chain-Linked Volumes (2020 = 100)',
    summary: 'Quarterly GDP is compiled independently from production (GVA across 6 ISIC Rev.4 macro-sectors), expenditure, and income approaches, reconciled via Supply-Use Tables within 45 days of quarter end.',
    notes: [
      'Seasonal adjustment uses X-13ARIMA-SEATS with concurrent parameter updates each quarter.',
      'Provincial GVA sums exactly to national nominal GDP (M$ 2,414.0B in Q3 2026 annualised) with zero unallocated residual.',
      'First estimates undergo scheduled revisions at T+90 days and in the annual September benchmark release.',
    ],
  },
  cpi: {
    title: 'Consumer Price Index (COICOP-2018)',
    standard: 'Laspeyres Chained Monthly Index · 82,400 Price Quotes across 8 Provinces',
    summary: 'CPI measures monthly price changes across a weighted household expenditure basket of 8 COICOP divisions updated annually from the Household Budget Survey (2025 weights sum to 100.0%).',
    notes: [
      'Owner-occupied housing follows the rental-equivalence method; utility tariffs use billed-consumption tiers.',
      'Core CPI excludes Food & Non-Alcoholic Beverages and Transport & Fuel energy sub-indices.',
      'Quality adjustments for electronics and vehicles apply hedonic regression models.',
    ],
  },
  labour: {
    title: 'Labour Force & Earnings Survey (ILO Standard)',
    standard: 'Rotating Panel of 48,000 Households · Monthly & Quarterly Releases',
    summary: 'Employment, unemployment, and participation follow International Labour Organization (ILO) definitions for the civilian resident population aged 15 and over.',
    notes: [
      'National unemployment (4.3% in Q3 2026) equals 963.7k unemployed out of 22.60M active labour force across all 8 provinces.',
      'Average weekly earnings cover full-time and part-time payroll employees from administrative tax filings.',
      '95% confidence interval for the headline national unemployment rate is ±0.12 percentage points.',
    ],
  },
  demographics: {
    title: 'Population Register & Decennial Census',
    standard: 'Continuous Civil Register Benchmarked to 2025 National Census',
    summary: 'Mid-year population estimates combine 2025 Census counts with verified birth, death, and cross-border migration records across all 8 provinces and 9 age cohorts.',
    notes: [
      'Cohort totals (21.07M male + 21.77M female = 42.84M) reconcile identically with provincial population totals.',
      'Interpolated national median age (39.7 years) matches the population-weighted provincial average.',
      'Urban settlement boundaries follow the 2025 Degree-of-Urbanisation grid classification (≥ 1,500 residents/km²).',
    ],
  },
};

export function reconcileNationalStats() {
  const regionPopK = REGIONS.reduce((sum, r) => sum + r.popK, 0);
  const regionGdpBn = Number(REGIONS.reduce((sum, r) => sum + r.gdpBn, 0).toFixed(1));
  const pyramidMaleK = POPULATION_PYRAMID.reduce((sum, c) => sum + c.maleK, 0);
  const pyramidFemaleK = POPULATION_PYRAMID.reduce((sum, c) => sum + c.femaleK, 0);
  const pyramidPopK = pyramidMaleK + pyramidFemaleK;
  const cpiWeightSum = Number(CPI_BASKET.reduce((sum, c) => sum + c.weight, 0).toFixed(1));
  const cpiWeightedYoY = Number(CPI_BASKET.reduce((sum, c) => sum + (c.weight * c.yoy) / 100, 0).toFixed(1));
  const sectorShareSum = Number(GDP_SECTORS.reduce((sum, s) => sum + s.share, 0).toFixed(1));
  const sectorGdpBn = Number(GDP_SECTORS.reduce((sum, s) => sum + s.valueBn, 0).toFixed(1));
  const totalLabourK = REGIONS.reduce((sum, r) => sum + r.labourK, 0);
  const totalUnempK = REGIONS.reduce((sum, r) => sum + (r.labourK * r.unemp) / 100, 0);
  const nationalUnempRate = Number(((totalUnempK / totalLabourK) * 100).toFixed(1));

  return {
    regionPopK,
    pyramidPopK,
    pyramidMaleK,
    pyramidFemaleK,
    regionGdpBn,
    sectorGdpBn,
    sectorShareSum,
    cpiWeightSum,
    cpiWeightedYoY,
    totalLabourK,
    nationalUnempRate,
    reconciled:
      regionPopK === pyramidPopK &&
      regionGdpBn === sectorGdpBn &&
      cpiWeightSum === 100.0 &&
      sectorShareSum === 100.0 &&
      cpiWeightedYoY === 2.4 &&
      nationalUnempRate === 4.3,
  };
}
