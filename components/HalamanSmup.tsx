"use client";

import { useState } from "react";
import Link from "next/link";
import {
  SERIES,
  catatanTabel,
  dec,
  defaultFilters,
  distribusiJalur,
  fakultas,
  filterProdi,
  int,
  keketatanProdi,
  kpis,
  pct,
  perFakultas,
  prodiTerfavorit,
  rasioPeminat,
  statusKelulusan,
  statusRegistrasi,
  tahunMasuk,
  trenHistoris,
  trenTahun,
  type FilterKey,
  type Filters,
} from "@/lib/smup-data";
import { BarList, Donut, GroupedBars, Legend, LineChart } from "@/components/dashboard/charts";
import {
  FilterBar,
  PageHeader,
  KpiCard,
  Panel,
  PanelGrid,
  RowCount,
  Section,
  cellTd,
  cellTh,
} from "@/components/dashboard/ui";

export default function HalamanSmup() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const onChange = (key: FilterKey, value: string) => setFilters((s) => ({ ...s, [key]: value }));

  const prodi = filterProdi(keketatanProdi, filters);
  const tren = filterProdi(trenHistoris, filters);

  return (
    <div className="flex min-h-full flex-1 flex-col bg-surface-alt p-4 sm:p-6 lg:p-8">
      <div className="flex flex-1 flex-col gap-6">
        <PageHeader
          title="Keketatan SMUP"
          action={
            <Link
              href="/pmb"
              className="inline-block rounded-lg border border-primary-accent bg-primary px-4 py-1.5 text-[11px] font-bold text-ink transition-colors hover:bg-primary-accent"
            >
              Lihat Dashboard PMB →
            </Link>
          }
          note="Klik tombol untuk berpindah ke halaman Dashboard PMB (realtime)"
        />
        <FilterBar values={filters} onChange={onChange} />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
          {kpis.map((k) => (
            <KpiCard key={k.label} {...k} />
          ))}
        </div>

        <Section title="Ringkasan & Status">
          <PanelGrid cols={3}>
            <StatusPanel data={statusKelulusan} />
            <StatusPanel data={statusRegistrasi} />
            <Panel
              title="Distribusi Jalur Masuk (Pendaftar)"
              note="Contoh tampilan – data per jalur tidak ada di CSV"
            >
              <BarList items={distribusiJalur} />
            </Panel>
          </PanelGrid>
        </Section>

        <Section title="Perbandingan per Fakultas dan Tren Tahun Masuk">
          <PanelGrid cols={2}>
            <Panel
              title="Perbandingan per Fakultas"
              note="Contoh tampilan – data per fakultas tidak ada di CSV"
              aside={
                <Legend
                  items={[
                    { label: "Pendaftar", color: SERIES.s3 },
                    { label: "Diterima", color: SERIES.s1 },
                    { label: "Registrasi", color: SERIES.s2 },
                  ]}
                />
              }
            >
              <GroupedBars
                groups={fakultas}
                series={[
                  { label: "Pendaftar", values: perFakultas.pendaftar, color: SERIES.s3 },
                  { label: "Diterima", values: perFakultas.diterima, color: SERIES.s1 },
                  { label: "Registrasi", values: perFakultas.registrasi, color: SERIES.s2 },
                ]}
              />
            </Panel>
            <Panel
              title="Tren Tahun Masuk (rata-rata antarprodi)"
              note="Rata-rata % per prodi berdata, tanpa pembobotan"
              aside={
                <Legend
                  items={[
                    { label: "Keketatan", color: SERIES.s4 },
                    { label: "Registrasi", color: SERIES.s1 },
                  ]}
                />
              }
            >
              <LineChart
                x={trenTahun.tahun}
                series={[
                  { label: "Registrasi", values: trenTahun.registrasi, color: SERIES.s1 },
                  { label: "Keketatan", values: trenTahun.keketatan, color: SERIES.s4 },
                ]}
              />
            </Panel>
          </PanelGrid>
        </Section>

        <Section title="Peringkat dan Rasio Peminat">
          <div className="grid gap-3 lg:grid-cols-[400px_1fr]">
            <Panel title="Peringkat Prodi Terfavorit" note="Top 10 menurut jumlah pendaftar pilihan ke-1">
              <BarList items={prodiTerfavorit.map((p) => ({ label: p.prodi, value: p.value }))} labelWidth="10rem" showValue />
            </Panel>
            <Panel
              title="Rasio Peminat terhadap Daya Tampung"
              note="Top 10, tahun acuan = Tahun terpilih atau tahun terbaru"
            >
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-surface-alt">
                      <th className={`${cellTh} text-left`}>No</th>
                      <th className={`${cellTh} text-left`}>Prodi (Jenjang)</th>
                      <th className={`${cellTh} text-right`}>Pendaftar</th>
                      <th className={`${cellTh} text-right`}>Daya tampung</th>
                      <th className={`${cellTh} text-right`}>Rasio</th>
                      <th className={`${cellTh} text-right`}>Keterisian</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rasioPeminat.map((r, i) => (
                      <tr key={r.prodi} className="border-b border-border last:border-0">
                        <td className={cellTd}>{i + 1}</td>
                        <td className={cellTd}>{r.prodi}</td>
                        <td className={`${cellTd} text-right`}>{int(r.pendaftar)}</td>
                        <td className={`${cellTd} text-right`}>{int(r.dayaTampung)}</td>
                        <td className={`${cellTd} text-right`}>{dec(r.rasio, 2)}</td>
                        <td className={`${cellTd} text-right`}>{pct(r.keterisian)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          </div>
        </Section>

        <Section title="Keketatan & Persaingan per Program Studi">
          <div className="rounded-panel bg-surface p-4 shadow-card">
            <p className="text-[11px] text-ink-muted">{catatanTabel[0]}</p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-surface-alt">
                    <th className={`${cellTh} text-left`}>Program Studi (Jenjang)</th>
                    <th className={`${cellTh} text-right`}>Pendaftar</th>
                    <th className={`${cellTh} text-right`}>Diterima</th>
                    <th className={`${cellTh} text-right`}>Daya Tampung</th>
                    <th className={`${cellTh} text-right`}>
                      Keketatan
                      <span className="block text-[10px] font-normal text-ink-muted">(% Diterima)</span>
                    </th>
                    <th className={`${cellTh} text-right`}>
                      Persaingan
                      <span className="block text-[10px] font-normal text-ink-muted">(Pendaftar : 1 Diterima)</span>
                    </th>
                    <th className={`${cellTh} text-right`}>
                      Rasio Peminat :
                      <span className="block text-[10px] font-normal text-ink-muted">Daya Tampung</span>
                    </th>
                    <th className={`${cellTh} text-right`}>
                      Peringkat Keketatan
                      <span className="block text-[10px] font-normal text-ink-muted">(1 = paling ketat)</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {prodi.map((r) => (
                    <tr key={r.prodi} className="border-b border-border last:border-0">
                      <td className={cellTd}>{r.prodi}</td>
                      <td className={`${cellTd} text-right`}>{int(r.pendaftar)}</td>
                      <td className={`${cellTd} text-right`}>{int(r.diterima)}</td>
                      <td className={`${cellTd} text-right`}>{int(r.dayaTampung)}</td>
                      <td className={`${cellTd} text-right`}>{pct(r.keketatan)}</td>
                      <td className={`${cellTd} text-right`}>{dec(r.persaingan, 1)} : 1</td>
                      <td className={`${cellTd} text-right`}>{dec(r.rasio, 2)}</td>
                      <td className={`${cellTd} text-right`}>{int(r.peringkat)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <RowCount shown={prodi.length} />
            <p className="text-[11px] text-ink-muted">{catatanTabel[1]}</p>
          </div>
        </Section>

        <Section title="Tren Historis per Program Studi (Jenjang)">
          <div className="rounded-panel bg-surface p-4 shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th rowSpan={2} className={`${cellTh} bg-surface-alt align-middle text-left`}>
                      Program Studi (Jenjang)
                    </th>
                    <th
                      colSpan={7}
                      className={`${cellTh} border-l border-border bg-primary-subtle text-center align-middle`}
                    >
                      Keketatan
                      <span className="block text-[10px] font-normal leading-tight text-ink-muted">
                        % diterima dari pendaftar — makin kecil makin ketat
                      </span>
                    </th>
                    <th
                      colSpan={7}
                      className={`${cellTh} border-l border-border bg-primary-subtle text-center align-middle`}
                    >
                      Registrasi
                      <span className="block text-[10px] font-normal leading-tight text-ink-muted">
                        % daftar ulang dari diterima
                      </span>
                    </th>
                  </tr>
                  <tr className="border-b border-border bg-surface-alt">
                    {[...tahunMasuk, "Total", ...tahunMasuk, "Total"].map((t, i) => (
                      <th
                        key={`${t}-${i}`}
                        className={`${cellTh} text-right ${i === 7 ? "border-l border-border" : ""} ${
                          i === 6 || i === 13 ? "bg-primary-subtle" : ""
                        }`}
                      >
                        {t}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tren.map((r) => (
                    <tr key={r.prodi} className="border-b border-border last:border-0">
                      <td className={`${cellTd} text-left`}>{r.prodi}</td>
                      {[...r.keketatan, r.totalKeketatan].map((v, i) => (
                        <td key={`k${i}`} className={`${cellTd} text-right ${i === 6 ? "font-semibold" : ""}`}>
                          {v === null ? "-" : pct(v)}
                        </td>
                      ))}
                      {[...r.registrasi, r.totalRegistrasi].map((v, i) => (
                        <td
                          key={`r${i}`}
                          className={`${cellTd} text-right ${i === 6 ? "font-semibold" : ""} ${
                            i === 0 ? "border-l border-border" : ""
                          }`}
                        >
                          {v === null ? "-" : pct(v)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <RowCount shown={tren.length} />
          </div>
        </Section>
      </div>
    </div>
  );
}

function StatusPanel({ data }: { data: typeof statusKelulusan }) {
  return (
    <Panel title={data.judul} note={data.keterangan}>
      <div className="flex items-center gap-4">
        <Donut parts={data.rincian} size={96} />
        <ul className="space-y-1.5">
          {data.rincian.map((r) => (
            <li key={r.label} className="flex items-center gap-2 text-xs text-ink">
              <i className="size-2 shrink-0 rounded-[2px]" style={{ background: r.color }} />
              {r.label}
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}
