# national-statistics-site-26

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/q514168795/national-statistics-site-26/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/q514168795/national-statistics-site-26/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

**StatAtlas** is an offline-first national statistics portal for the fictional **Republic of Meridian (Meridian National Statistics Bureau · MNSB)**. Built as zero-dependency static ES modules under `app/` with a minimal 1-file bootstrap shell (`app/index.html`, zero external requests) and dynamic route imports across six modules: Overview, Economy & Prices, Demographics, Regions, Data Explorer (with live search, domain filters, sorting, pinning, and offline RFC-4180 CSV export), and Methodology & Release Calendar. Every headline, sectoral, CPI COICOP, provincial, and age-cohort figure reconciles mathematically and cites its official statistical source and reference period.

## Run it

```sh
node serve.ts
# Open http://127.0.0.1:8080 in Chrome (desktop & mobile)

# Build deterministic submission output + dossier.json
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=93fa4mdc&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
