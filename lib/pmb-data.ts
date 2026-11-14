// Data Dashboard PMB. Sama seperti SMUP: hardcode dulu, nanti dari view SQL
// (v_realtime_harian, v_verifikasi_prodi).
import { SERIES, type Kpi } from "./smup-data";

// Merah "Ditolak" dari mockup — beda dari --color-accent-red (#b0061c).
export const DANGER = "#D64045";

export const tanggalTerakhir = "24 Jul 2025";
export const rataHarian = 442.9;

export const kpisPmb: Kpi[] = [
  { label: "PENDAFTAR HARI INI", value: "186", note: "Hari terakhir pada data" },
  { label: "RATA-RATA HARIAN", value: "442,9", note: "Rata-rata 30 hari" },
  { label: "TERVERIFIKASI", value: "38.024", note: "Berkas terverifikasi" },
  { label: "MENUNGGU VERIFIKASI", value: "1.962", note: "Belum diverifikasi" },
  { label: "BERKAS DITOLAK", value: "3.171", note: "Tidak memenuhi syarat" },
  { label: "TOTAL SEMUA PENDAFTAR", value: "40.049", note: "Akumulasi seluruh pendaftar" },
];

// Donut & legend. Persentase dihitung dari total berstatus, bukan total pendaftar.
export const verifikasiSegmen = [
  { label: "Menunggu", value: 1962, color: SERIES.s2 },
  { label: "Terverifikasi", value: 38024, color: SERIES.s1 },
  { label: "Ditolak", value: 3171, color: DANGER },
];

export type VerifikasiRow = { prodi: string; menunggu: number; terverifikasi: number; ditolak: number };
export const total = (r: VerifikasiRow) => r.menunggu + r.terverifikasi + r.ditolak;

// Chart memuat 30 prodi dengan berkas terbanyak; tabel di bawahnya memakai 10 teratas.
export const prodiVerifikasi: VerifikasiRow[] = [
  { prodi: "Apoteker (Profesi)", menunggu: 133, terverifikasi: 1608, ditolak: 180 },
  { prodi: "Dokter (Profesi)", menunggu: 124, terverifikasi: 1306, ditolak: 140 },
  { prodi: "Profesi Ners (Profesi)", menunggu: 80, terverifikasi: 911, ditolak: 92 },
  { prodi: "Kedokteran (Sarjana)", menunggu: 36, terverifikasi: 824, ditolak: 40 },
  { prodi: "Manajemen (Magister)", menunggu: 60, terverifikasi: 774, ditolak: 58 },
  { prodi: "Dokter Gigi (Profesi)", menunggu: 56, terverifikasi: 653, ditolak: 57 },
  { prodi: "Manajemen (Sarjana)", menunggu: 31, terverifikasi: 679, ditolak: 31 },
  { prodi: "Hukum (Magister)", menunggu: 31, terverifikasi: 601, ditolak: 73 },
  { prodi: "Kenotariatan (Magister)", menunggu: 37, terverifikasi: 576, ditolak: 76 },
  { prodi: "Psikologi (Sarjana)", menunggu: 21, terverifikasi: 637, ditolak: 25 },
  { prodi: "Psikologi Profesi (Magister)", menunggu: 28, terverifikasi: 541, ditolak: 51 },
  { prodi: "Ilmu Komunikasi (Sarjana)", menunggu: 29, terverifikasi: 551, ditolak: 35 },
  { prodi: "Ilmu Komunikasi (Magister)", menunggu: 44, terverifikasi: 519, ditolak: 38 },
  { prodi: "Kedokteran Gigi (Sarjana)", menunggu: 17, terverifikasi: 495, ditolak: 26 },
  { prodi: "Akuntansi (Sarjana)", menunggu: 18, terverifikasi: 489, ditolak: 29 },
  { prodi: "Keperawatan (Magister)", menunggu: 39, terverifikasi: 444, ditolak: 50 },
  { prodi: "Farmasi (Sarjana)", menunggu: 23, terverifikasi: 466, ditolak: 31 },
  { prodi: "Hubungan Internasional (Sarjana)", menunggu: 17, terverifikasi: 456, ditolak: 36 },
  { prodi: "Ilmu Hukum (Sarjana)", menunggu: 30, terverifikasi: 372, ditolak: 27 },
  { prodi: "Ilmu Administrasi (Doktor)", menunggu: 36, terverifikasi: 339, ditolak: 37 },
  { prodi: "Ilmu Politik (Magister)", menunggu: 18, terverifikasi: 351, ditolak: 33 },
  { prodi: "Akuntansi (Magister)", menunggu: 19, terverifikasi: 348, ditolak: 33 },
  { prodi: "Keperawatan (Sarjana)", menunggu: 20, terverifikasi: 338, ditolak: 26 },
  { prodi: "Radiologi (Spesialis)", menunggu: 10, terverifikasi: 327, ditolak: 34 },
  { prodi: "Kebidanan (Magister)", menunggu: 17, terverifikasi: 301, ditolak: 31 },
  { prodi: "Kedokteran Fisik dan Rehabilitasi (Spesialis)", menunggu: 29, terverifikasi: 279, ditolak: 39 },
  { prodi: "Obstetri dan Ginekologi (Spesialis)", menunggu: 29, terverifikasi: 286, ditolak: 28 },
  { prodi: "Administrasi Publik (Magister)", menunggu: 41, terverifikasi: 264, ditolak: 24 },
  { prodi: "Penyakit Jantung dan Pembuluh Darah (Spesialis)", menunggu: 28, terverifikasi: 271, ditolak: 23 },
  { prodi: "Teknik Informatika (Sarjana)", menunggu: 0, terverifikasi: 310, ditolak: 0 },
];

// Ilustrasi 30 hari: rata-rata tepat 442,9 dan hari terakhir 186 (= KPI "Pendaftar Hari Ini").
export const trenHarian = [
  425, 384, 465, 516, 394, 354, 485, 566, 617, 526, 647, 708, 586, 495, 435, 475, 556, 627, 546, 465, 414, 384,
  354, 334, 303, 293, 273, 253, 221, 186,
];

export const catatanTren = "Bentuk tren ilustrasi – data harian tidak ada di CSV";
export const catatanVerifikasi =
  "Menampilkan 211 program studi dari semua jenjang. Menunggu = status selain Terverifikasi dan Ditolak. Mengikuti filter Jenjang, Jalur, Fakultas, dan Prodi; tidak mengikuti filter Tahun. Chart memuat maksimal 30 prodi dengan berkas terbanyak; tabel di bawahnya memuat semua prodi.";
export const catatanTabelVerifikasi =
  "Catatan: '-' = total berstatus 0. Baris yang StatusVerifikasi-nya kosong tidak dihitung di tabel ini.";
