"use client";

import { useState } from "react";
import Link from "next/link";
import {
  SERIES,
  dec,
  defaultFilters,
  filterProdi,
  int,
  pct,
  type FilterKey,
  type Filters,
} from "@/lib/smup-data";
import {
  DANGER,
  catatanTabelVerifikasi,
  catatanTren,
  catatanVerifikasi,
  kpisPmb,
  prodiVerifikasi,
  rataHarian,
  tanggalTerakhir,
  total,
  trenHarian,
  verifikasiSegmen,
} from "@/lib/pmb-data";
import { Donut, Legend, LineChart, StackedBarList } from "@/components/dashboard/charts";
import { FilterBar, KpiCard, PageHeader, Panel, RowCount, Section, cellTd, cellTh } from "@/components/dashboard/ui";

const totalBerstatus = verifikasiSegmen.reduce((a, s) => a + s.value, 0);

const segmenWarna = { menunggu: SERIES.s2, terverifikasi: SERIES.s1, ditolak: DANGER };

export default function HalamanPmb() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const onChange = (key: FilterKey, value: string) => setFilters((s) => ({ ...s, [key]: value }));

  const rows = filterProdi(prodiVerifikasi, filters);

  const chartRows = rows.map((r) => ({
    label: r.prodi,
    total: total(r),
    segments: [
      { value: r.menunggu, color: segmenWarna.menunggu },
      { value: r.terverifikasi, color: segmenWarna.terverifikasi },
      { value: r.ditolak, color: segmenWarna.ditolak },
    ],
  }));

  return (
    <div className="flex min-h-full flex-1 flex-col bg-surface-alt p-4 sm:p-6 lg:p-8">
      <div className="flex flex-1 flex-col gap-6">
        <PageHeader
          title="Dashboard PMB"
          action={
            <Link
              href="/"
              className="inline-block rounded-lg border border-border bg-surface px-4 py-1.5 text-[11px] font-bold text-ink transition-colors hover:bg-primary-subtle"
            >
              ← Kembali ke Keketatan SMUP
            </Link>
          }
          note={`Data realtime aktif. Tanggal data terakhir: ${tanggalTerakhir}`}
        />

        <FilterBar values={filters} onChange={onChange} />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {kpisPmb.map((k) => (
            <KpiCard key={k.label} {...k} />
          ))}
        </div>

        <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr]">
          <Panel title="Tren Pendaftar Harian (30 hari terakhir)" note={catatanTren}>
            <LineChart
              series={[{ label: "Pendaftar", values: trenHarian, color: SERIES.s4 }]}
              yMax={750}
              ticks={[0, 250, 500]}
              avg={{ value: rataHarian, label: `rata-rata ${dec(rataHarian, 1)}` }}
              edgeLabels={["30 hari lalu", "Hari terakhir"]}
            />
          </Panel>

          <Panel title="Tracking Verifikasi Berkas">
            <div className="flex items-center gap-4">
              <Donut parts={verifikasiSegmen} size={104} thickness={22} />
              <ul className="space-y-1.5">
                {verifikasiSegmen.map((s) => (
                  <li key={s.label} className="flex items-center gap-2 text-xs text-ink">
                    <i className="size-2 shrink-0 rounded-[2px]" style={{ background: s.color }} />
                    {s.label} {int(s.value)} ({pct((s.value / totalBerstatus) * 100)})
                  </li>
                ))}
              </ul>
            </div>
          </Panel>
        </div>

        <Section title="Status Verifikasi Berkas per Program Studi">
          <div className="rounded-panel bg-surface p-4 shadow-card">
            <p className="text-[11px] text-ink-muted">{catatanVerifikasi}</p>

            <Legend
              className="mt-3"
              items={[
                { label: "Menunggu", color: segmenWarna.menunggu },
                { label: "Terverifikasi", color: segmenWarna.terverifikasi },
                { label: "Ditolak", color: segmenWarna.ditolak },
              ]}
            />

            <div className="mt-3">
              <StackedBarList rows={chartRows} labelWidth="14rem" />
            </div>

            <div className="mt-4 overflow-x-auto border-t border-border pt-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-surface-alt">
                    <th className={`${cellTh} text-left`}>Program Studi (Jenjang)</th>
                    <th className={`${cellTh} text-right`}>Menunggu</th>
                    <th className={`${cellTh} text-right`}>Terverifikasi</th>
                    <th className={`${cellTh} text-right`}>Ditolak</th>
                    <th className={`${cellTh} text-right`}>Total Berstatus</th>
                    <th className={`${cellTh} text-right`}>% Menunggu</th>
                    <th className={`${cellTh} text-right`}>% Terverifikasi</th>
                    <th className={`${cellTh} text-right`}>% Ditolak</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => {
                    const t = total(r);
                    const persen = (v: number) => (t === 0 ? "-" : pct((v / t) * 100));
                    return (
                      <tr key={r.prodi} className="border-b border-border last:border-0">
                        <td className={`${cellTd} text-left`}>{r.prodi}</td>
                        <td className={`${cellTd} text-right`}>{int(r.menunggu)}</td>
                        <td className={`${cellTd} text-right`}>{int(r.terverifikasi)}</td>
                        <td className={`${cellTd} text-right`}>{int(r.ditolak)}</td>
                        <td className={`${cellTd} text-right`}>{int(t)}</td>
                        <td className={`${cellTd} text-right`}>{persen(r.menunggu)}</td>
                        <td className={`${cellTd} text-right`}>{persen(r.terverifikasi)}</td>
                        <td className={`${cellTd} text-right`}>{persen(r.ditolak)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <RowCount shown={rows.length} />
            <p className="text-[11px] text-ink-muted">{catatanTabelVerifikasi}</p>
          </div>
        </Section>
      </div>
    </div>
  );
}
