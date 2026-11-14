// Primitif chart sederhana (div + SVG). Sengaja tanpa library chart:
// kebutuhan di sini cuma bar, stacked bar, donut, dan garis.
import { SERIES, int } from "@/lib/smup-data";

type Part = { value: number; color: string };

export function Donut({ parts, size = 96, thickness = 20 }: { parts: Part[]; size?: number; thickness?: number }) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const sum = parts.reduce((a, p) => a + p.value, 0) || 1;
  // Offset tiap segmen dihitung sebagai prefix-sum, tanpa variabel yang diubah-ubah saat render.
  const lens = parts.map((p) => (p.value / sum) * c);
  const arcs = lens.map((len, i) => ({
    len,
    start: lens.slice(0, i).reduce((a, b) => a + b, 0),
    color: parts[i].color,
  }));
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden>
      {arcs.map((a, i) => (
        <circle
          key={i}
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={a.color}
          strokeWidth={thickness}
          strokeDasharray={`${a.len} ${c - a.len}`}
          strokeDashoffset={-a.start}
        />
      ))}
    </svg>
  );
}

export function Legend({ items, className = "" }: { items: { label: string; color: string }[]; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 ${className}`}>
      {items.map((s) => (
        <span key={s.label} className="flex items-center gap-1.5 text-xs text-ink-muted">
          <i className="size-2 rounded-[2px]" style={{ background: s.color }} />
          {s.label}
        </span>
      ))}
    </div>
  );
}

export function BarList({
  items,
  labelWidth = "8rem",
  showValue = false,
}: {
  items: { label: string; value: number; color?: string }[];
  labelWidth?: string;
  showValue?: boolean;
}) {
  const max = Math.max(...items.map((i) => i.value));
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-3">
          <span className="shrink-0 truncate text-xs text-ink" style={{ width: labelWidth }} title={item.label}>
            {item.label}
          </span>
          <span className="h-2.5 flex-1 rounded-full bg-border">
            <span
              className="block h-full rounded-full"
              style={{ width: `${(item.value / max) * 100}%`, background: item.color ?? SERIES.s1 }}
            />
          </span>
          {showValue && (
            <span className="w-12 shrink-0 text-right text-xs text-ink tabular-nums">{int(item.value)}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function StackedBarList({
  rows,
  labelWidth = "12rem",
}: {
  rows: { label: string; segments: Part[]; total: number }[];
  labelWidth?: string;
}) {
  const max = Math.max(...rows.map((r) => r.total)) || 1;
  return (
    <ul className="space-y-2">
      {rows.map((row) => (
        <li key={row.label} className="flex items-center gap-3">
          <span
            className="shrink-0 truncate text-xs text-ink"
            style={{ width: labelWidth, maxWidth: "45%" }}
            title={row.label}
          >
            {row.label}
          </span>
          <span className="h-2.5 flex-1">
            <span
              className="flex h-full overflow-hidden rounded-full"
              style={{ width: `${(row.total / max) * 100}%` }}
            >
              {row.segments.map((s, i) => (
                <span key={i} style={{ width: `${(s.value / row.total) * 100}%`, background: s.color }} />
              ))}
            </span>
          </span>
          <span className="w-12 shrink-0 text-right text-xs text-ink-muted tabular-nums">{int(row.total)}</span>
        </li>
      ))}
    </ul>
  );
}

export function GroupedBars({
  groups,
  series,
  height = 150,
}: {
  groups: string[];
  series: { label: string; values: number[]; color: string }[];
  height?: number;
}) {
  const max = Math.max(...series.flatMap((s) => s.values));
  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max items-end gap-3 border-b border-border" style={{ height }}>
        {groups.map((g, i) => (
          <div key={g} className="flex h-full flex-1 flex-col justify-end">
            <div className="flex flex-1 items-end justify-center gap-[3px]">
              {series.map((s) => (
                <span
                  key={s.label}
                  className="w-3 rounded-t-[2px]"
                  style={{ height: `${(s.values[i] / max) * 100}%`, background: s.color }}
                  title={`${g} · ${s.label}`}
                />
              ))}
            </div>
            <span className="mt-1.5 truncate text-center text-xs text-ink-muted">{g.replace("Fakultas ", "")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LineChart({
  x,
  series,
  yMax = 100,
  ticks = [0, 50, 100],
  avg,
  edgeLabels,
}: {
  x?: (number | string)[];
  series: { label: string; values: (number | null)[]; color: string }[];
  yMax?: number;
  ticks?: number[];
  avg?: { value: number; label: string; color?: string };
  edgeLabels?: [string, string];
}) {
  const W = 800;
  const H = 170;
  const pad = { t: 10, r: 10, b: 22, l: 34 };
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;
  const n = x?.length ?? series[0].values.length;
  const px = (i: number) => pad.l + (i / (n - 1)) * plotW;
  const py = (v: number) => pad.t + (1 - v / yMax) * plotH;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Tren">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={pad.l} x2={W - pad.r} y1={py(t)} y2={py(t)} stroke="#C8C8C8" strokeWidth={1} />
          <text x={pad.l - 6} y={py(t) + 3} textAnchor="end" fontSize={9} fill="var(--color-ink-muted)">
            {t}
          </text>
        </g>
      ))}

      {avg && (
        <g>
          <line
            x1={pad.l}
            x2={W - pad.r}
            y1={py(avg.value)}
            y2={py(avg.value)}
            stroke={avg.color ?? "#D64045"}
            strokeWidth={1.5}
            strokeDasharray="4 3"
          />
          <text x={W - pad.r} y={py(avg.value) - 4} textAnchor="end" fontSize={9} fontWeight={600} fill={avg.color ?? "#D64045"}>
            {avg.label}
          </text>
        </g>
      )}

      {series.map((s) => {
        // null = lompatan garis, jadi points dipecah per segmen.
        const segs: string[][] = [];
        let cur: string[] = [];
        s.values.forEach((v, i) => {
          if (v === null) {
            if (cur.length) segs.push(cur);
            cur = [];
          } else {
            cur.push(`${px(i)},${py(v)}`);
          }
        });
        if (cur.length) segs.push(cur);
        return (
          <g key={s.label}>
            {segs.map((pts, i) => (
              <polyline key={i} points={pts.join(" ")} fill="none" stroke={s.color} strokeWidth={2} />
            ))}
          </g>
        );
      })}

      {edgeLabels ? (
        <>
          <text x={pad.l} y={H - 6} textAnchor="start" fontSize={9} fill="var(--color-ink-muted)">
            {edgeLabels[0]}
          </text>
          <text x={W - pad.r} y={H - 6} textAnchor="end" fontSize={9} fill="var(--color-ink-muted)">
            {edgeLabels[1]}
          </text>
        </>
      ) : (
        (x ?? series[0].values.map((_, i) => i + 1)).map((t, i) => (
          <text key={`${t}-${i}`} x={px(i)} y={H - 6} textAnchor="middle" fontSize={9} fill="var(--color-ink-muted)">
            {t}
          </text>
        ))
      )}
    </svg>
  );
}
