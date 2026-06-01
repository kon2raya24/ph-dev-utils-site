import { useMemo, useState, type ReactElement } from 'react';
import {
  formatPHP,
  pesoToWords,
  pesoToWordsFilipino,
  validateTIN,
  formatTIN,
  validateSSS,
  formatSSS,
  validatePhilHealth,
  formatPhilHealth,
  validatePagIBIG,
  formatPagIBIG,
  validateNationalID,
  formatNationalID,
  validateUMID,
  formatUMID,
  validatePassport,
  formatPassport,
  validatePRC,
  formatPRC,
  validateDriversLicense,
  formatDriversLicense,
  validatePlate,
  parsePlate,
  toE164,
  toNational,
  parseMobile,
} from '@ph-dev-utils/core';
import { incomeTaxGraduated, incomeTax8 } from '@ph-dev-utils/bir';
import { netTakeHome } from '@ph-dev-utils/payroll';
import { formatFilipino, isBusinessDay, addBusinessDays } from '@ph-dev-utils/dates';
import { faker } from '@ph-dev-utils/faker';
import { PhAddressPicker, type AddressValue } from '@ph-dev-utils/address-react';
import '@ph-dev-utils/address-react/theme.css';
import { Card, Code, Field, Input, Row, Tag, Verdict, peso } from './ui';

/* ── core: peso ─────────────────────────────────────────────────────────── */
/** The number-word helpers reject negative / out-of-range input — never crash the demo. */
function tryStr(fn: () => string): string {
  try {
    return fn();
  } catch {
    return '—';
  }
}
function PesoDemo() {
  const [raw, setRaw] = useState('1234567.89');
  const n = Number(raw);
  const ok = Number.isFinite(n);
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <Field label="Amount" hint="try a negative or huge value — it degrades gracefully">
          <Input value={raw} inputMode="decimal" onChange={(e) => setRaw(e.target.value)} />
        </Field>
      </div>
      <div className="space-y-1">
        <Row k="formatPHP" v={ok ? tryStr(() => formatPHP(n)) : '—'} strong />
        <Row k="pesoToWords (EN)" v={<span className="text-right">{ok ? tryStr(() => pesoToWords(n)) : '—'}</span>} />
        <Row k="pesoToWordsFilipino" v={<span className="text-right">{ok ? tryStr(() => pesoToWordsFilipino(n)) : '—'}</span>} />
      </div>
    </div>
  );
}

/* ── core: validators ───────────────────────────────────────────────────── */
interface VConf {
  key: string;
  label: string;
  example: string;
  check: (v: string) => boolean;
  detail: (v: string) => string;
}
const VALIDATORS: VConf[] = [
  { key: 'tin', label: 'TIN', example: '123-456-789-000', check: validateTIN, detail: (v) => formatTIN(v) ?? '—' },
  { key: 'sss', label: 'SSS', example: '34-1234567-8', check: validateSSS, detail: (v) => formatSSS(v) ?? '—' },
  { key: 'philhealth', label: 'PhilHealth', example: '12-345678901-2', check: validatePhilHealth, detail: (v) => formatPhilHealth(v) ?? '—' },
  { key: 'pagibig', label: 'Pag-IBIG', example: '1234-5678-9012', check: validatePagIBIG, detail: (v) => formatPagIBIG(v) ?? '—' },
  { key: 'philsys', label: 'PhilSys (PCN)', example: '1234-5678-9012-3456', check: validateNationalID, detail: (v) => formatNationalID(v) ?? '—' },
  { key: 'umid', label: 'UMID (CRN)', example: '1234-5678901-2', check: validateUMID, detail: (v) => formatUMID(v) ?? '—' },
  { key: 'passport', label: 'Passport', example: 'P1234567A', check: validatePassport, detail: (v) => formatPassport(v) ?? '—' },
  { key: 'prc', label: 'PRC', example: '1234567', check: validatePRC, detail: (v) => formatPRC(v) ?? '—' },
  { key: 'drivers', label: "Driver's license", example: 'N02-12-345678', check: validateDriversLicense, detail: (v) => formatDriversLicense(v) ?? '—' },
  {
    key: 'plate',
    label: 'Plate',
    example: 'ABC 1234',
    check: validatePlate,
    detail: (v) => {
      const p = parsePlate(v);
      return p ? `${p.plate} · ${p.type}` : '—';
    },
  },
];
function ValidatorDemo() {
  const [key, setKey] = useState('tin');
  const conf = VALIDATORS.find((v) => v.key === key)!;
  const [val, setVal] = useState(conf.example);
  const valid = val.trim() ? conf.check(val) : null;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-3">
        <Field label="ID type">
          <select
            value={key}
            onChange={(e) => {
              const next = VALIDATORS.find((v) => v.key === e.target.value)!;
              setKey(next.key);
              setVal(next.example);
            }}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base outline-none focus:border-ph-blue focus:ring-2 focus:ring-ph-blue/20"
          >
            {VALIDATORS.map((v) => (
              <option key={v.key} value={v.key}>
                {v.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Value" hint={`e.g. ${conf.example}`}>
          <Input value={val} onChange={(e) => setVal(e.target.value)} />
        </Field>
      </div>
      <div className="space-y-2">
        <Row
          k="valid?"
          v={valid === null ? '—' : <Verdict ok={valid}>{valid ? 'valid' : 'invalid'}</Verdict>}
          strong
        />
        <Row k="normalized" v={val.trim() ? conf.detail(val) : '—'} />
        <p className="pt-1 text-xs text-slate-500">
          Format-level checks (no reverse-engineered checksums) — same logic on the PHP side.
        </p>
      </div>
    </div>
  );
}

/* ── core: phone ────────────────────────────────────────────────────────── */
function PhoneDemo() {
  const [raw, setRaw] = useState('0917 123 4567');
  const e164 = toE164(raw);
  const national = toNational(raw);
  const mobile = parseMobile(raw);
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Phone number" hint="+63 / 63 / 0 / formatted all accepted">
        <Input value={raw} onChange={(e) => setRaw(e.target.value)} />
      </Field>
      <div className="space-y-1">
        <Row k="toE164" v={e164 ?? '—'} strong />
        <Row k="toNational" v={national ?? '—'} />
        <Row k="network" v={mobile ? <Tag color="blue">{mobile.network}</Tag> : '—'} />
      </div>
    </div>
  );
}

/* ── payroll ────────────────────────────────────────────────────────────── */
function PayrollDemo() {
  const [raw, setRaw] = useState('30000');
  const salary = Number(raw);
  const r = useMemo(() => {
    if (!Number.isFinite(salary) || salary < 0) return null;
    try {
      return netTakeHome(salary, { includeWT: true });
    } catch {
      return null;
    }
  }, [salary]);
  const wt = r ? Math.max(0, r.net - (r.netAfterTax ?? r.net)) : 0;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Monthly gross salary">
        <Input value={raw} inputMode="numeric" onChange={(e) => setRaw(e.target.value)} />
      </Field>
      {r ? (
        <div className="space-y-1">
          <Row k="Gross" v={peso(r.gross)} />
          <Row k="− SSS (employee)" v={peso(r.sss.employeeShare ?? 0)} />
          <Row k="− PhilHealth (employee)" v={peso(r.philHealth.employee ?? 0)} />
          <Row k="− Pag-IBIG (employee)" v={peso(r.pagIbig.employee ?? 0)} />
          <Row k="− Withholding tax" v={peso(wt)} />
          <div className="my-1 border-t border-slate-100" />
          <Row k="Net take-home" v={peso(r.netAfterTax ?? r.net)} strong />
        </div>
      ) : (
        <p className="self-center text-sm text-slate-500">Enter a valid salary.</p>
      )}
    </div>
  );
}

/* ── bir: income tax ────────────────────────────────────────────────────── */
function BirDemo() {
  const [raw, setRaw] = useState('500000');
  const income = Number(raw);
  const ok = Number.isFinite(income) && income >= 0;
  const grad = ok ? incomeTaxGraduated(income) : null;
  const eight = ok ? incomeTax8(income) : null;
  return (
    <div className="space-y-4">
      <Field label="Annual taxable income (self-employed / professional)">
        <Input value={raw} inputMode="numeric" onChange={(e) => setRaw(e.target.value)} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="p-4">
          <div className="mb-2 flex items-center gap-2">
            <h4 className="font-semibold text-slate-800">Graduated (TRAIN)</h4>
          </div>
          <Row k="Tax due" v={grad ? peso(grad.tax) : '—'} strong />
          <Row k="Marginal rate" v={grad ? `${(grad.marginalRate * 100).toFixed(0)}%` : '—'} />
        </Card>
        <Card className="p-4">
          <div className="mb-2 flex items-center gap-2">
            <h4 className="font-semibold text-slate-800">8% option</h4>
            {eight && <Tag color={eight.eligible ? 'blue' : 'red'}>{eight.eligible ? 'eligible' : 'not eligible'}</Tag>}
          </div>
          <Row k="Tax due" v={eight ? peso(eight.tax) : '—'} strong />
          <Row k="On amount over" v={eight ? peso(eight.base) : '—'} />
        </Card>
      </div>
      <p className="text-xs text-slate-500">
        8% applies in lieu of graduated income tax + 3% percentage tax; unavailable above ₱3M gross
        or if VAT-registered. Pick whichever is lower for your situation.
      </p>
    </div>
  );
}

/* ── dates ──────────────────────────────────────────────────────────────── */
function toDate(s: string): Date | null {
  const [y, m, d] = s.split('-').map(Number);
  if (!y || !m || !d) return null;
  const dt = new Date(y, m - 1, d);
  return Number.isNaN(dt.getTime()) ? null : dt;
}
function DatesDemo() {
  const [start, setStart] = useState('2026-06-10'); // around Independence Day (Jun 12)
  const [n, setN] = useState('5');
  const valid = toDate(start) !== null;
  const days = Number(n);
  // addBusinessDays accepts a Date | ISO string and returns an ISO string.
  const result = valid && Number.isFinite(days) ? addBusinessDays(start, days) : null;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-3">
        <Field label="Start date">
          <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
        </Field>
        <Field label="Add business days" hint="weekends + PH holidays skipped">
          <Input value={n} inputMode="numeric" onChange={(e) => setN(e.target.value)} />
        </Field>
      </div>
      <div className="space-y-1">
        <Row k="Start in Filipino" v={<span className="text-right">{valid ? formatFilipino(start) : '—'}</span>} />
        <Row k="Start is a business day?" v={valid ? <Verdict ok={isBusinessDay(start)}>{isBusinessDay(start) ? 'yes' : 'no'}</Verdict> : '—'} />
        <div className="my-1 border-t border-slate-100" />
        <Row k="+N business days" v={result ?? '—'} strong />
        <Row k="result in Filipino" v={<span className="text-right">{result ? formatFilipino(result) : '—'}</span>} />
      </div>
    </div>
  );
}

/* ── faker ──────────────────────────────────────────────────────────────── */
function FakerDemo() {
  const [seed, setSeed] = useState(1);
  const person = useMemo(() => {
    faker.seed(seed);
    return {
      name: faker.name.fullWithMiddle(),
      address: faker.address.full(),
      mobile: faker.phone.mobile(),
      tin: faker.id.tin(),
      sss: faker.id.sss(),
      salary: faker.money.salary(),
      company: faker.business.name(),
    };
  }, [seed]);
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => setSeed((s) => s + 1)}
          className="rounded-lg bg-ph-blue px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-ph-blue/90"
        >
          🎲 Generate another
        </button>
        <p className="text-xs text-slate-500">
          Seedable RNG — every value is reproducible. IDs here pass <code className="rounded bg-slate-100 px-1">core</code>’s
          validators; the address is a real PSGC place.
        </p>
      </div>
      <div className="space-y-1">
        <Row k="Name" v={person.name} strong />
        <Row k="Address" v={<span className="text-right">{person.address}</span>} />
        <Row k="Mobile" v={person.mobile} />
        <Row k="TIN" v={person.tin} />
        <Row k="SSS" v={person.sss} />
        <Row k="Employer" v={person.company} />
        <Row k="Salary" v={peso(person.salary)} />
      </div>
    </div>
  );
}

/* ── address-picker ─────────────────────────────────────────────────────── */
function AddressDemo() {
  const [value, setValue] = useState<AddressValue | null>(null);
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Tag color="amber">searchable ✦ new in v0.3</Tag>
        </div>
        <PhAddressPicker searchable showBarangay onChange={setValue} />
        <p className="mt-2 text-xs text-slate-500">
          Type in the city or barangay field — order-independent matching finds “City of Cebu” when
          you type “Cebu City”. Region IV-A / NCR show the province step adapt automatically.
        </p>
      </div>
      <div>
        <span className="mb-1 block text-sm font-semibold text-slate-700">onChange value</span>
        <Code lang="json" code={value ? JSON.stringify(value, null, 2) : '// select an address…'} />
      </div>
    </div>
  );
}

/* ── registry: maps package id → live demo + a representative code snippet ── */
export interface DemoEntry {
  id: string;
  title: string;
  blurb: string;
  Demo: () => ReactElement;
  code: string;
}

export const DEMOS: DemoEntry[] = [
  {
    id: 'core',
    title: 'core · peso',
    blurb: 'Format pesos and spell amounts out in English or Tagalog.',
    Demo: PesoDemo,
    code: `import { formatPHP, pesoToWordsFilipino } from '@ph-dev-utils/core';

formatPHP(1234567.89);            // "₱1,234,567.89"
pesoToWordsFilipino(1234.5);      // "Isang libo dalawang daan ... at 50/100 piso"`,
  },
  {
    id: 'core-validators',
    title: 'core · ID validators',
    blurb: 'Validate & normalize every common PH government ID + LTO plates.',
    Demo: ValidatorDemo,
    code: `import { validateTIN, formatTIN, parsePlate } from '@ph-dev-utils/core';

validateTIN('123-456-789-000');   // true
formatTIN('123456789000');        // "123-456-789-000"
parsePlate('ABC 1234');           // { plate: 'ABC1234', type: 'car' }`,
  },
  {
    id: 'core-phone',
    title: 'core · phone',
    blurb: 'Normalize any PH number to E.164 / national and detect the network.',
    Demo: PhoneDemo,
    code: `import { toE164, parseMobile } from '@ph-dev-utils/core';

toE164('0917 123 4567');          // "+639171234567"
parseMobile('09171234567');       // { e164, national, network: 'Globe' }`,
  },
  {
    id: 'payroll',
    title: 'payroll · net take-home',
    blurb: 'Gross salary → statutory deductions + withholding tax → net pay.',
    Demo: PayrollDemo,
    code: `import { netTakeHome } from '@ph-dev-utils/payroll';

const r = netTakeHome(30000, { includeWT: true });
r.sss.employeeShare;  r.philHealth.employee;  r.netAfterTax;`,
  },
  {
    id: 'bir',
    title: 'bir · income tax',
    blurb: 'Compare graduated TRAIN tax against the flat 8% option.',
    Demo: BirDemo,
    code: `import { incomeTaxGraduated, incomeTax8 } from '@ph-dev-utils/bir';

incomeTaxGraduated(500000).tax;   // 42500
incomeTax8(500000);               // { tax: 20000, eligible: true, ... }`,
  },
  {
    id: 'dates',
    title: 'dates · business days & Tagalog',
    blurb: 'Holiday-aware business-day math + Filipino date formatting.',
    Demo: DatesDemo,
    code: `import { addBusinessDays, formatFilipino } from '@ph-dev-utils/dates';

addBusinessDays(new Date('2026-06-10'), 5);  // skips weekends + Jun 12
formatFilipino(new Date('2026-06-12'));      // "Biyernes, 12 ng Hunyo 2026"`,
  },
  {
    id: 'faker',
    title: 'faker · fake Filipino data',
    blurb: 'Realistic, seedable names / addresses / IDs / payslips for tests.',
    Demo: FakerDemo,
    code: `import { faker } from '@ph-dev-utils/faker';

faker.seed(1);
faker.name.fullWithMiddle();      // "Angelica ... Lazaro"
faker.address.full();             // real PSGC place
faker.id.tin();                   // passes core's validateTIN`,
  },
  {
    id: 'address-picker',
    title: 'address-picker · React',
    blurb: 'Cascading region→province→city→ZIP picker with searchable lists.',
    Demo: AddressDemo,
    code: `import { PhAddressPicker } from '@ph-dev-utils/address-react';
import '@ph-dev-utils/address-react/theme.css';

<PhAddressPicker searchable showBarangay onChange={setValue} />`,
  },
];
