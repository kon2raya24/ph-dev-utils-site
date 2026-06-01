export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/60">
      <div className="mx-auto max-w-5xl px-5 py-10 text-sm text-slate-500">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p>
            <span className="font-mono font-semibold text-slate-700">@ph-dev-utils</span> — open-source
            Filipino developer utilities.
          </p>
          <div className="flex gap-4">
            <a className="hover:text-slate-900" href="https://github.com/kon2raya24" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="hover:text-slate-900" href="https://www.npmjs.com/org/ph-dev-utils" target="_blank" rel="noreferrer">
              npm org
            </a>
            <a className="hover:text-slate-900" href="https://packagist.org/packages/phdevutils/" target="_blank" rel="noreferrer">
              Packagist
            </a>
          </div>
        </div>
        <p className="mt-4 text-xs">
          MIT licensed. Address/ZIP data © GeoNames (CC BY 4.0); PSGC © Philippine Statistics
          Authority. Tax/contribution tables follow published BIR/SSS/PhilHealth/Pag-IBIG/DOLE
          issuances — verify against the latest official circulars before relying on them in
          production. Not affiliated with any Philippine government agency.
        </p>
      </div>
    </footer>
  );
}
