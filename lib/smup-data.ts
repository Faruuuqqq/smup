// Data untuk Dashboard Keketatan SMUP.
// Sementara hardcode mengikuti mockup Figma; nanti diganti hasil query view Supabase.

const id = new Intl.NumberFormat("id-ID");

export const int = (n: number) => id.format(n);
export const pct = (n: number, d = 1) =>
  n.toLocaleString("id-ID", { minimumFractionDigits: d, maximumFractionDigits: d }) + "%";
export const dec = (n: number, d = 2) =>
  n.toLocaleString("id-ID", { minimumFractionDigits: d, maximumFractionDigits: d });

export type Kpi = { label: string; value: string; note: string };
export type Serie = { label: string; value: number; color: string };
export type ProdiRow = {
  prodi: string;
  pendaftar: number;
  diterima: number;
  dayaTampung: number;
  keketatan: number; // % diterima dari pendaftar
  persaingan: number; // pendaftar per 1 diterima
  rasio: number; // pendaftar / daya tampung
  peringkat: number; // 1 = paling ketat
};
export type RasioRow = {
  prodi: string;
  pendaftar: number;
  dayaTampung: number;
  rasio: number; // pendaftar / daya tampung
  keterisian: number; // registrasi / daya tampung, dalam %
};
export type TrenRow = {
  prodi: string;
  keketatan: (number | null)[];
  totalKeketatan: number | null;
  registrasi: (number | null)[];
  totalRegistrasi: number | null;
};

// Warna seri diambil apa adanya dari mockup Figma.
export const SERIES = {
  s1: "#E3C744",
  s2: "#EFE08F",
  s3: "#EC8F63",
  s4: "#BFA73C",
};

export const tahunAcuan = 2025;

export const catatanFilter =
  "Pilih 'Semua' untuk tanpa filter. Filter berlaku untuk semua KPI & chart; matriks di bagian bawah mengikuti Jenjang, Jalur Masuk, dan Fakultas.";

export const kpis: Kpi[] = [
  { label: "JUMLAH PENDAFTAR", value: int(40049), note: "Akumulasi calon mahasiswa yang mendaftar" },
  { label: "JUMLAH DITERIMA", value: int(22366), note: "Lulus seleksi: 55,85% dari pendaftar" },
  { label: "JUMLAH REGISTRASI", value: int(20349), note: "Daftar ulang: 90,98% dari diterima" },
  { label: "TOTAL DAYA TAMPUNG SMUP", value: int(14471), note: `Tahun acuan ${tahunAcuan} | 211 prodi` },
  { label: "RATA-RATA KEKETATAN UNPAD", value: pct(54.5), note: "Gabungan 55,8% | 203 prodi berdata" },
];

export const statusKelulusan = {
  judul: "Status Kelulusan",
  keterangan: "Persentase Keketatan: 55,85%",
  rincian: [
    { label: "Lulus 22,37K (55,85%)", value: 0.5585, color: SERIES.s1 },
    { label: "Tidak Lulus 17,68K (44,15%)", value: 0.4415, color: SERIES.s2 },
  ],
};

export const statusRegistrasi = {
  judul: "Status Registrasi",
  keterangan: "Persentase Registrasi: 90,98%",
  rincian: [
    { label: "Registrasi 20,35K (90,98%)", value: 0.9098, color: SERIES.s1 },
    { label: "Tidak Registrasi 2,02K (9,02%)", value: 0.0902, color: SERIES.s2 },
  ],
};

// Lebar bar mengikuti mockup (bukan nilai riil).
export const distribusiJalur: Serie[] = [
  { label: "Reguler", value: 200, color: SERIES.s1 },
  { label: "Internal", value: 120, color: SERIES.s1 },
  { label: "RPL", value: 26, color: SERIES.s1 },
  { label: "Double Degree", value: 18, color: SERIES.s1 },
  { label: "Berbasis Project", value: 40, color: SERIES.s1 },
  { label: "SNBP", value: 90, color: SERIES.s1 },
  { label: "SNBT", value: 70, color: SERIES.s1 },
  { label: "Mandiri", value: 30, color: SERIES.s1 },
];

export const fakultas = ["Fakultas A", "Fakultas B", "Fakultas C", "Fakultas D", "Fakultas E", "Fakultas F"];

// Tinggi bar dari mockup, diskalakan x100 supaya terbaca sebagai angka.
export const perFakultas = {
  pendaftar: [10600, 8600, 6800, 5000, 3600, 2200],
  diterima: [5900, 4700, 3600, 2900, 2000, 1300],
  registrasi: [5400, 4200, 3200, 2500, 1800, 1200],
};

export const trenTahun = {
  tahun: [2020, 2021, 2022, 2023, 2024, 2025],
  registrasi: [94.0, 92.0, 92.8, 91.6, 91.0, 86.5],
  keketatan: [62.4, 52.3, 58.7, 60.7, 61.8, 54.5],
};

export const prodiTerfavorit = [
  { prodi: "1. Apoteker (Profesi)", value: 1921 },
  { prodi: "2. Dokter (Profesi)", value: 1570 },
  { prodi: "3. Profesi Ners (Profesi)", value: 1083 },
  { prodi: "4. Kedokteran (Sarjana)", value: 900 },
  { prodi: "5. Manajemen (Magister)", value: 892 },
  { prodi: "6. Dokter Gigi (Profesi)", value: 766 },
  { prodi: "7. Manajemen (Sarjana)", value: 741 },
  { prodi: "8. Hukum (Magister)", value: 705 },
  { prodi: "9. Kenotariatan (Magister)", value: 689 },
  { prodi: "10. Psikologi (Sarjana)", value: 683 },
];

export const rasioPeminat: RasioRow[] = [
  { prodi: "Kedokteran Fisik dan Rehabilitasi (Spesialis)", pendaftar: 45, dayaTampung: 5, rasio: 9.0, keterisian: 200.0 },
  { prodi: "Kesehatan Telinga Hidung Tenggorok Bedah Kepala d…", pendaftar: 9, dayaTampung: 1, rasio: 9.0, keterisian: 400.0 },
  { prodi: "Pendidikan Profesi Psikologi (Profesi)", pendaftar: 308, dayaTampung: 36, rasio: 8.56, keterisian: 177.8 },
  { prodi: "Ilmu Kesehatan Mata (Spesialis)", pendaftar: 57, dayaTampung: 8, rasio: 7.13, keterisian: 262.5 },
  { prodi: "Kedokteran Nuklir (Spesialis)", pendaftar: 14, dayaTampung: 2, rasio: 7.0, keterisian: 500.0 },
  { prodi: "Penyakit Jantung dan Pembuluh Darah (Spesialis)", pendaftar: 35, dayaTampung: 5, rasio: 7.0, keterisian: 160.0 },
  { prodi: "Dermatologi, Venereologi dan Estetika (Spesialis)", pendaftar: 28, dayaTampung: 5, rasio: 5.6, keterisian: 160.0 },
  { prodi: "Ortodontik (Spesialis)", pendaftar: 39, dayaTampung: 7, rasio: 5.57, keterisian: 171.4 },
  { prodi: "Kedokteran Jiwa (Spesialis)", pendaftar: 22, dayaTampung: 4, rasio: 5.5, keterisian: 150.0 },
  { prodi: "Bedah Mulut dan Maksilofasial (Spesialis)", pendaftar: 41, dayaTampung: 8, rasio: 5.13, keterisian: 187.5 },
];

export const keketatanProdi: ProdiRow[] = [
  { prodi: "Administrasi Bisnis (Magister)", pendaftar: 163, diterima: 140, dayaTampung: 52, keketatan: 85.9, persaingan: 1.2, rasio: 0.5, peringkat: 154 },
  { prodi: "Administrasi Bisnis (Sarjana)", pendaftar: 89, diterima: 3, dayaTampung: 44, keketatan: 3.4, persaingan: 29.7, rasio: 2.02, peringkat: 6 },
  { prodi: "Administrasi Bisnis PSDKU (Sarjana)", pendaftar: 264, diterima: 47, dayaTampung: 40, keketatan: 17.8, persaingan: 5.6, rasio: 1.15, peringkat: 37 },
  { prodi: "Administrasi Keuangan Publik (Sarjana Terapan)", pendaftar: 145, diterima: 5, dayaTampung: 158, keketatan: 3.4, persaingan: 29.0, rasio: 0.92, peringkat: 7 },
  { prodi: "Administrasi Pemerintahan (Sarjana Terapan)", pendaftar: 136, diterima: 5, dayaTampung: 126, keketatan: 3.7, persaingan: 27.2, rasio: 1.08, peringkat: 8 },
  { prodi: "Administrasi Publik (Magister)", pendaftar: 329, diterima: 282, dayaTampung: 36, keketatan: 85.7, persaingan: 1.2, rasio: 3.03, peringkat: 152 },
  { prodi: "Administrasi Publik (Sarjana)", pendaftar: 235, diterima: 80, dayaTampung: 265, keketatan: 34.0, persaingan: 2.9, rasio: 0.14, peringkat: 68 },
  { prodi: "Agribisnis (Sarjana)", pendaftar: 148, diterima: 71, dayaTampung: 116, keketatan: 48.0, persaingan: 2.1, rasio: 0.28, peringkat: 92 },
  { prodi: "Agronomi (Magister)", pendaftar: 131, diterima: 120, dayaTampung: 57, keketatan: 91.6, persaingan: 1.1, rasio: 0.49, peringkat: 182 },
  { prodi: "Agroteknologi (Sarjana)", pendaftar: 137, diterima: 68, dayaTampung: 276, keketatan: 49.6, persaingan: 2.0, rasio: 0.1, peringkat: 96 },
];

export const trenHistoris: TrenRow[] = [
  { prodi: "Administrasi Bisnis (Magister)", keketatan: [92.0, 72.4, 91.3, 81.3, 85.7, 96.2], totalKeketatan: 85.9, registrasi: [91.3, 66.7, 85.7, 92.3, 91.7, 80.0], totalRegistrasi: 85.0 },
  { prodi: "Administrasi Bisnis (Sarjana)", keketatan: [null, null, null, null, null, 3.4], totalKeketatan: 3.4, registrasi: [null, null, null, null, null, 100.0], totalRegistrasi: 100.0 },
  { prodi: "Administrasi Bisnis PSDKU (Sarjana)", keketatan: [22.5, 7.5, 28.6, 26.1, 12.0, 10.9], totalKeketatan: 17.8, registrasi: [100.0, 100.0, 100.0, 75.0, 100.0, 100.0], totalRegistrasi: 93.6 },
  { prodi: "Administrasi Keuangan Publik (Sarjana Terapan)", keketatan: [null, null, null, null, null, 3.4], totalKeketatan: 3.4, registrasi: [null, null, null, null, null, 100.0], totalRegistrasi: 100.0 },
  { prodi: "Administrasi Pemerintahan (Sarjana Terapan)", keketatan: [null, null, null, null, null, 3.7], totalKeketatan: 3.7, registrasi: [null, null, null, null, null, 100.0], totalRegistrasi: 100.0 },
  { prodi: "Administrasi Publik (Magister)", keketatan: [75.0, 75.8, 84.2, 79.5, 75.6, 100.0], totalKeketatan: 85.7, registrasi: [100.0, 72.0, 87.5, 80.0, 91.5, 19.3], totalRegistrasi: 59.9 },
  { prodi: "Administrasi Publik (Sarjana)", keketatan: [28.6, 36.8, 24.4, 33.3, 40.9, 39.5], totalKeketatan: 34.0, registrasi: [80.0, 85.7, 90.0, 84.6, 83.3, 86.7], totalRegistrasi: 85.0 },
  { prodi: "Agribisnis (Sarjana)", keketatan: [55.6, 25.0, 36.4, 58.1, 56.0, 50.0], totalKeketatan: 48.0, registrasi: [90.0, 100.0, 87.5, 100.0, 85.7, 81.3], totalRegistrasi: 90.1 },
  { prodi: "Agronomi (Magister)", keketatan: [100.0, 83.3, 83.3, 100.0, 95.7, 85.7], totalKeketatan: 91.6, registrasi: [90.9, 100.0, 100.0, 90.9, 86.4, 100.0], totalRegistrasi: 94.2 },
  { prodi: "Agroteknologi (Sarjana)", keketatan: [59.1, 30.0, 31.8, 57.1, 52.0, 63.0], totalKeketatan: 49.6, registrasi: [100.0, 100.0, 85.7, 100.0, 92.3, 94.1], totalRegistrasi: 95.6 },
];

export const catatanTabel = [
  "Keketatan = % Diterima dari Pendaftar (makin kecil = makin ketat). Persaingan = jumlah Pendaftar untuk tiap 1 Diterima (makin besar = makin ketat). Daya tampung memakai tahun acuan 2025.",
  "Catatan: '-' = tidak ada data (Pendaftar atau Diterima = 0) atau daya tampung kosong pada kombinasi filter tersebut.",
];

// Opsi filter diambil dari master yang sama dengan seed SQL (02_seed_master.sql).
export const SEMUA = "Semua";

export const tahunMasuk = [2020, 2021, 2022, 2023, 2024, 2025];

export const masterJenjang = [
  "Sarjana",
  "Sarjana Terapan",
  "Magister",
  "Doktor",
  "Spesialis",
  "Subspesialis",
  "Profesi",
];

export const masterJalurMasuk = [
  "SNBP",
  "SNBT",
  "Mandiri",
  "Berbasis Project",
  "Double Degree",
  "Internal",
  "RPL",
  "Reguler",
];

export const masterFakultas = [
  "11 - Hukum",
  "12 - Ekonomi dan Bisnis",
  "13 - Kedokteran",
  "14 - Matematika dan Ilmu Pengetahuan Alam",
  "15 - Pertanian",
  "16 - Kedokteran Gigi",
  "17 - Ilmu Sosial dan Ilmu Politik",
  "18 - Ilmu Budaya",
  "19 - Psikologi",
  "20 - Peternakan",
  "21 - Ilmu Komunikasi",
  "22 - Keperawatan",
  "23 - Perikanan dan Ilmu Kelautan",
  "24 - Teknologi Industri Pertanian",
  "25 - Sekolah Pascasarjana",
  "26 - Farmasi",
  "27 - Teknik Geologi",
  "28 - Sekolah Vokasi",
  "Program PSDKU Pangandaran",
];

export type FilterKey = "jenjang" | "jalur" | "fakultas" | "prodi" | "tahun";
export type Filters = Record<FilterKey, string>;

export const defaultFilters: Filters = {
  jenjang: SEMUA,
  jalur: SEMUA,
  fakultas: SEMUA,
  prodi: SEMUA,
  tahun: SEMUA,
};

export const filterFields: { key: FilterKey; label: string; options: string[] }[] = [
  { key: "jenjang", label: "JENJANG", options: masterJenjang },
  { key: "jalur", label: "JALUR MASUK", options: masterJalurMasuk },
  { key: "fakultas", label: "FAKULTAS", options: masterFakultas },
  { key: "prodi", label: "PRODI (JENJANG)", options: [...new Set(keketatanProdi.map((r) => r.prodi))].sort() },
  { key: "tahun", label: "TAHUN MASUK", options: tahunMasuk.map(String) },
];

// Label prodi di master berbentuk "Nama (Jenjang)", mis. 'Akuntansi (Sarjana)'.
export const jenjangOf = (label: string) => label.match(/\(([^)]+)\)\s*$/)?.[1] ?? "";

// shortcut: `jalur` dan `fakultas` belum ada di data contoh, jadi baru bisa memfilter
// setelah view SQL disambung. KPI & chart juga belum dihitung ulang mengikuti filter.
export function filterProdi<T extends { prodi: string }>(rows: T[], f: Filters): T[] {
  return rows.filter(
    (r) =>
      (f.jenjang === SEMUA || jenjangOf(r.prodi) === f.jenjang) && (f.prodi === SEMUA || r.prodi === f.prodi)
  );
}
