import type { ReactNode } from "react";

import { SEMUA, catatanFilter, filterFields, type FilterKey, type Filters } from "@/lib/smup-data";

// Sengaja tanpa text-align & vertical-align: <th> default-nya center/middle, jadi
// arah tiap kolom harus disebut eksplisit di pemakaian (text-left / text-right).
export const cellTh = "whitespace-nowrap px-3 py-2 text-[11px] font-bold text-ink";
export const cellTd = "whitespace-nowrap px-3 py-2 text-[11px] text-ink tabular-nums";

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="flex items-center gap-2 text-[13px] font-bold text-ink">
        <span className="h-4 w-1 rounded-sm bg-series-1" />
        {title}
      </h2>
      {children}
    </section>
  );
}

export function Panel({
  title,
  note,
  aside,
  children,
  className = "",
}: {
  title: string;
  note?: string;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex min-w-0 flex-col rounded-panel bg-surface p-4 shadow-card ${className}`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-[12px] font-bold text-ink">{title}</h3>
          {note && <p className="mt-0.5 text-[11px] text-ink-muted">{note}</p>}
        </div>
        {aside}
      </div>
      <div className="mt-3 flex flex-1 flex-col justify-center">{children}</div>
    </div>
  );
}

export function KpiCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-card bg-surface p-4 shadow-card">
      <p className="text-[11px] font-bold uppercase tracking-wide text-ink-muted">{label}</p>
      <p className="mt-1 text-[26px] font-bold leading-tight text-ink tabular-nums">{value}</p>
      <p className="mt-1 text-[11px] text-ink-muted">{note}</p>
    </div>
  );
}

export function FilterBar({
  values,
  onChange,
}: {
  values: Filters;
  onChange: (key: FilterKey, value: string) => void;
}) {
  return (
    <div className="rounded-card bg-surface p-4 shadow-card">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        {filterFields.map((f) => (
          <label key={f.key} className="block">
            <span className="mb-1 block text-[11px] font-bold text-ink-muted">{f.label}</span>
            <select
              value={values[f.key]}
              onChange={(e) => onChange(f.key, e.target.value)}
              className="w-full rounded-lg border border-border bg-surface-alt px-2 py-1.5 text-xs text-ink"
            >
              <option value={SEMUA}>{SEMUA}</option>
              {f.options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-ink-muted">{catatanFilter}</p>
    </div>
  );
}

export function PageHeader({ title, action, note }: { title: string; action?: ReactNode; note?: string }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3">
      <h1 className="rounded-lg bg-primary px-4 py-2 text-[22px] text-ink">{title}</h1>
      {(action || note) && (
        <div className="text-right">
          {action}
          {note && <p className="mt-1 text-[11px] text-ink-muted">{note}</p>}
        </div>
      )}
    </header>
  );
}

export function PanelGrid({ cols = 3, children }: { cols?: 2 | 3; children: ReactNode }) {
  return (
    <div className={`grid gap-3 ${cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>{children}</div>
  );
}

export function RowCount({ shown }: { shown: number }) {
  return (
    <p className="py-2 text-center text-[11px] text-ink-muted">
      Menampilkan {shown} program studi (contoh data)
    </p>
  );
}
