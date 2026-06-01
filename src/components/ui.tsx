import type { ReactNode } from 'react';

/** A bordered surface used for demo panels and package cards. */
export function Card({ children, className = '', id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <div
      id={id}
      className={`rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur ${className}`}
    >
      {children}
    </div>
  );
}

/** Small monospace pill (versions, tags). */
export function Tag({ children, color = 'slate' }: { children: ReactNode; color?: 'slate' | 'blue' | 'red' | 'amber' }) {
  const map: Record<string, string> = {
    slate: 'bg-slate-100 text-slate-600',
    blue: 'bg-ph-blue/10 text-ph-blue',
    red: 'bg-ph-red/10 text-ph-red',
    amber: 'bg-amber-100 text-amber-700',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${map[color]}`}>
      {children}
    </span>
  );
}

/** Labeled form control wrapper. */
export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-slate-700">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

/** Text input styled to match the family theme. */
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base outline-none transition focus:border-ph-blue focus:ring-2 focus:ring-ph-blue/20 ${props.className ?? ''}`}
    />
  );
}

/** A key → value result row. */
export function Row({ k, v, strong = false }: { k: ReactNode; v: ReactNode; strong?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between gap-4 py-1 ${strong ? 'font-semibold text-slate-900' : 'text-slate-700'}`}>
      <span className="text-sm">{k}</span>
      <span className="font-mono text-sm tabular-nums">{v}</span>
    </div>
  );
}

/** Result whose state colors it (valid/invalid). */
export function Verdict({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-mono text-sm ${
        ok ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
      }`}
    >
      {ok ? '✓' : '✕'} {children}
    </span>
  );
}

/** Monospace code block with a copy button. */
export function Code({ code, lang = 'ts' }: { code: string; lang?: string }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-800 px-3 py-1.5">
        <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">{lang}</span>
        <button
          type="button"
          onClick={() => navigator.clipboard?.writeText(code)}
          className="rounded px-2 py-0.5 text-[11px] text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
        >
          copy
        </button>
      </div>
      <pre className="overflow-x-auto p-3 text-[13px] leading-relaxed text-slate-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function peso(n: number): string {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(n);
}
