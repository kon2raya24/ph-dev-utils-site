import { Code, Tag } from './ui';
import { PACKAGES } from '../lib/packages';

export function Hero() {
  const npmCount = PACKAGES.length;
  return (
    <header className="relative overflow-hidden">
      {/* PH flag accent stripe */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-ph-blue via-ph-red to-ph-yellow" />
      <div className="mx-auto max-w-5xl px-5 pb-10 pt-16 sm:pt-20">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Tag color="blue">🇵🇭 Made in the Philippines</Tag>
          <Tag color="slate">MIT</Tag>
          <Tag color="slate">JS / TS + PHP</Tag>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          <span className="font-mono text-ph-blue">@ph-dev-utils</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          A family of open-source <strong>Filipino developer utilities</strong> — peso, government
          IDs, PSGC addresses, ZIP codes, payroll, BIR tax, holidays &amp; Tagalog dates, fake data,
          and a React address picker. Built with <strong>JS ↔ PHP parity</strong> so your backend
          and frontend agree. {npmCount} packages, all on npm &amp; Packagist.
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <Code lang="npm" code={`npm i @ph-dev-utils/core`} />
          <Code lang="composer" code={`composer require phdevutils/core`} />
        </div>

        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <a
            href="#packages"
            className="rounded-lg bg-ph-blue px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-ph-blue/90"
          >
            Browse packages
          </a>
          <a
            href="#playground"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:border-ph-blue hover:text-ph-blue"
          >
            Try it live ↓
          </a>
          <a
            href="https://github.com/kon2raya24"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
