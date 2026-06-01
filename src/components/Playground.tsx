import { Card, Code } from './ui';
import { DEMOS } from './demos';

export function Playground() {
  return (
    <section id="playground" className="mx-auto max-w-5xl scroll-mt-6 px-5 py-12">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">Try it live</h2>
      <p className="mt-1 text-slate-600">
        Every panel below runs the <strong>real published package</strong> in your browser — no
        server, no mock. (The data-only packages <code className="rounded bg-slate-100 px-1 text-sm">postal</code> and{' '}
        <code className="rounded bg-slate-100 px-1 text-sm">psgc-barangays</code> read from disk, so they’re Node-side — see
        their cards above.)
      </p>

      <div className="mt-6 space-y-6">
        {DEMOS.map(({ id, title, blurb, Demo, code }) => (
          <Card key={id} id={`demo-${id}`} className="scroll-mt-6 overflow-hidden">
            <div className="border-b border-slate-100 px-5 py-3">
              <h3 className="font-mono text-base font-bold text-slate-900">{title}</h3>
              <p className="text-sm text-slate-500">{blurb}</p>
            </div>
            <div className="p-5">
              <Demo />
            </div>
            <div className="border-t border-slate-100 bg-slate-50/60 p-5">
              <Code code={code} />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
