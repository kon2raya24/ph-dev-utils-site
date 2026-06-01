# ph-dev-utils-site

The landing page + **live playground** for the [`@ph-dev-utils`](https://github.com/kon2raya24) family of Filipino developer utilities (JavaScript/TypeScript + PHP).

Every demo on the site runs the **real published npm package** in the browser — no mocks, no server. It doubles as a real-world consumer integration test for the family.

## Stack

Vite + React 19 + TypeScript + Tailwind 3.4 (PH flag theme). Same conventions as the sibling demos `ph-payroll-demo` and `ph-address-demo`.

## What it showcases

Live, interactive (browser-safe packages):

- **core** — peso formatting + Tagalog number-words, every government-ID validator, phone normalization
- **payroll** — gross salary → SSS/PhilHealth/Pag-IBIG + withholding tax → net take-home
- **bir** — graduated TRAIN income tax vs the flat 8% option
- **dates** — holiday-aware business-day math + Filipino date formatting
- **faker** — seedable fake Filipino people (names, real PSGC addresses, valid IDs)
- **address-picker** — `<PhAddressPicker searchable showBarangay>` (the v0.3 typeahead combobox)

Code-snippet cards (Node-only, data-from-disk packages): **postal**, **psgc-barangays**.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
```

## License

MIT. Bundled address/ZIP data © GeoNames (CC BY 4.0); PSGC © Philippine Statistics Authority. Tax/contribution figures follow published BIR/SSS/PhilHealth/Pag-IBIG/DOLE issuances — verify against the latest official circulars before production use.
