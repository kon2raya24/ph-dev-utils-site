import { Card, Tag } from './ui';
import { PACKAGES, npmUrl, packagistUrl, type FamilyPackage } from '../lib/packages';

function PackageCard({ p }: { p: FamilyPackage }) {
  return (
    <Card className="flex flex-col p-5">
      <div className="mb-1 flex items-center gap-2">
        <h3 className="font-mono text-lg font-bold text-slate-900">{p.title}</h3>
        <Tag color="blue">v{p.version}</Tag>
        {p.live ? <Tag color="amber">live demo</Tag> : <Tag color="slate">server-side</Tag>}
      </div>
      <p className="text-sm text-slate-600">{p.tagline}</p>

      <ul className="mt-3 flex-1 space-y-1.5 text-sm text-slate-600">
        {p.highlights.map((h) => (
          <li key={h} className="flex gap-2">
            <span className="mt-0.5 text-ph-blue">›</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>

      {p.serverNote && <p className="mt-3 text-xs italic text-slate-500">{p.serverNote}</p>}

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-slate-100 pt-3 text-sm font-medium">
        <a className="text-[#cb3837] hover:underline" href={npmUrl(p.npm)} target="_blank" rel="noreferrer">
          npm
        </a>
        {p.php && (
          <a className="text-[#f28d1a] hover:underline" href={packagistUrl(p.php)} target="_blank" rel="noreferrer">
            Packagist
          </a>
        )}
        <a className="text-slate-600 hover:underline" href={p.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        {p.live && (
          <a className="ml-auto text-ph-blue hover:underline" href={`#demo-${p.id}`}>
            Try it ↓
          </a>
        )}
      </div>
    </Card>
  );
}

export function PackageGrid() {
  return (
    <section id="packages" className="mx-auto max-w-5xl scroll-mt-6 px-5 py-12">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">The family</h2>
      <p className="mt-1 text-slate-600">
        Each package is independent — install only what you need. <code className="rounded bg-slate-100 px-1 text-sm">core</code> is
        the shared base most others build on.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PACKAGES.map((p) => (
          <PackageCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}
