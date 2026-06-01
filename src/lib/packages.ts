export interface FamilyPackage {
  /** Stable id / anchor slug. */
  id: string;
  /** npm package name (the primary published artifact). */
  npm: string;
  /** Composer/Packagist name, or null for JS-only members. */
  php: string | null;
  /** Latest published version at time of writing. */
  version: string;
  title: string;
  tagline: string;
  /** Short bullet highlights for the card. */
  highlights: string[];
  github: string;
  /**
   * `true` → a live in-browser demo exists (see Playground). `false` → the
   * package reads from disk (Node-only) or is data-only, so the card shows a
   * code snippet instead of running in the browser.
   */
  live: boolean;
  /** One-liner note shown when not live (why / how to use). */
  serverNote?: string;
}

const GH = 'https://github.com/kon2raya24';

export const PACKAGES: FamilyPackage[] = [
  {
    id: 'core',
    npm: '@ph-dev-utils/core',
    php: 'phdevutils/core',
    version: '0.5.0',
    title: 'core',
    tagline: 'The foundation — peso, government IDs, phone, address, holidays.',
    highlights: [
      'Peso format/parse + English & Tagalog number-words',
      'Validators: TIN, SSS, PhilHealth, Pag-IBIG, PhilSys, UMID, passport, PRC, driver’s license, plate',
      'Phone parse + E.164/national normalize (Globe/Smart/Sun/DITO)',
      'PSGC regions / provinces / cities + PH holidays w/ DOLE pay multipliers',
    ],
    github: `${GH}/ph-dev-utils`,
    live: true,
  },
  {
    id: 'payroll',
    npm: '@ph-dev-utils/payroll',
    php: 'phdevutils/payroll',
    version: '0.3.0',
    title: 'payroll',
    tagline: 'Statutory contributions + net take-home, all in one call.',
    highlights: [
      'SSS, PhilHealth, Pag-IBIG contributions (versioned tables)',
      'BIR withholding tax for all 4 payroll periods (TRAIN)',
      '13th-month, de minimis caps, ₱90k bonus exemption',
      'netTakeHome() — gross → deductions → net',
    ],
    github: `${GH}/ph-payroll`,
    live: true,
  },
  {
    id: 'bir',
    npm: '@ph-dev-utils/bir',
    php: 'phdevutils/bir',
    version: '0.2.0',
    title: 'bir',
    tagline: 'Bureau of Internal Revenue tax math.',
    highlights: [
      'VAT (12% / ₱3M threshold) add & extract',
      'Percentage tax (3%, historical 1% awareness)',
      'Individual income tax — graduated TRAIN vs 8% option',
      'Reference list of commonly-used BIR forms',
    ],
    github: `${GH}/ph-bir`,
    live: true,
  },
  {
    id: 'dates',
    npm: '@ph-dev-utils/dates',
    php: 'phdevutils/dates',
    version: '0.1.1',
    title: 'dates',
    tagline: 'Holiday-aware business days + Filipino date formatting.',
    highlights: [
      'addBusinessDays / businessDaysBetween (PH holiday-aware)',
      'isBusinessDay, next/previousBusinessDay',
      'formatFilipino() — Tagalog month & day names',
      'Companion to core’s holiday calendar',
    ],
    github: `${GH}/ph-dates`,
    live: true,
  },
  {
    id: 'faker',
    npm: '@ph-dev-utils/faker',
    php: 'phdevutils/faker',
    version: '0.3.0',
    title: 'faker',
    tagline: 'Realistic Filipino fake data for tests & seeds.',
    highlights: [
      'Names, addresses (real PSGC), phones, peso amounts',
      'Government IDs that pass core’s validators',
      'Businesses + full payslip fixtures (uses payroll)',
      'Seedable RNG for reproducible fixtures',
    ],
    github: `${GH}/ph-faker`,
    live: true,
  },
  {
    id: 'address-picker',
    npm: '@ph-dev-utils/address-react',
    php: null,
    version: '0.3.0',
    title: 'address-picker',
    tagline: 'Cascading PH address picker — React, web component & headless core.',
    highlights: [
      '<PhAddressPicker> region → province → city → ZIP',
      'Searchable typeahead combobox (v0.3) for long lists',
      'NCR / independent-city / multi-ZIP handled correctly',
      'Barangay level lazy-loads (42k) via CDN; web component too',
    ],
    github: `${GH}/ph-address-picker`,
    live: true,
  },
  {
    id: 'postal',
    npm: '@ph-dev-utils/postal',
    php: 'phdevutils/postal',
    version: '0.2.0',
    title: 'postal',
    tagline: 'PH ZIP / postal codes joined to PSGC cities.',
    highlights: [
      '2,048 entries, 0 orphans, multi-ZIP overlay',
      'Zero-dependency lookup helpers',
      'Data from GeoNames (CC BY 4.0)',
    ],
    github: `${GH}/ph-postal`,
    live: false,
    serverNote: 'Server-side (Node): loads its dataset from disk. Use in your API / build step.',
  },
  {
    id: 'psgc-barangays',
    npm: '@ph-dev-utils/psgc-barangays',
    php: 'phdevutils/psgc-barangays',
    version: '0.1.0',
    title: 'psgc-barangays',
    tagline: 'The complete PSGC barangay dataset.',
    highlights: [
      '42,046 barangays (PSA Q4 2024)',
      'Joins to core cities/municipalities',
      'Zero-dependency lookup helpers',
    ],
    github: `${GH}/ph-psgc-barangays`,
    live: false,
    serverNote: 'Server-side (Node): 42k-entry dataset loaded from disk — too large to bundle in a browser.',
  },
];

export const npmUrl = (name: string) => `https://www.npmjs.com/package/${name}`;
export const packagistUrl = (name: string) => `https://packagist.org/packages/${name}`;
