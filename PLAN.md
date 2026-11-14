# Plan — Dashboard SMUP

Sumber desain: `design.md` (token brand) + mockup Figma `public/figma/smup` (struktur & palet seri).
Sumber data: `dashboard smup sql/` (MySQL) → target Supabase (Postgres).

## Selesai

- [x] Ekstrak peta desain mockup (998×1640, 579 elemen absolut) jadi struktur seksi.
- [x] Pecah jadi komponen responsif — 795 baris, dari 1.747 baris `position:absolute`.
- [x] Token `design.md` terpasang di `app/globals.css` (primary/ink/border/surface, radius, shadow).
- [x] Chart sendiri (donut, bar, grouped bar, line) tanpa library tambahan.
- [x] Filter nyata: opsi dari master SQL, JENJANG & PRODI benar-benar memfilter.
- [x] Buang hint palsu "201 program studi lainnya"; ganti hitungan baris jujur.
- [x] Navbar & footer: struktur/token dari unpad.ac.id, isi sengaja dikosongkan (hanya tombol SMUP/PMB). Logo di `public/logo-unpad-duo.svg`.
- [x] Dashboard PMB (`/pmb`): 6 KPI, tren harian 30 hari + garis rata-rata, donut 3 segmen, 30 bar bertumpuk + tabel 8 kolom; ikut filter JENJANG/PRODI.
- [x] `tsc` + `eslint` + `next build` bersih.

## Berikutnya, urut

1. **Supabase** — port skema MySQL→Postgres (`01_schema`), 8 view (`04_views.sql`), seed, dan RPC agregat berparameter. Ingat: `SUM(boolean)` gagal di Postgres (baris 69 & 74 di views).
2. **Data layer** — ganti `lib/smup-data.ts` dengan query; tambah `lib/supabase/server.ts` + `lib/queries.ts`, generate types.
3. **Filter jadi nyata** — pindah state ke URL search params, query di server, bukan filter array di klien.
4. **KPI & chart ikut filter** — sekarang masih angka statis (10 baris contoh tidak bisa menghasilkan 40.049).
5. **Jalur & Fakultas memfilter** — butuh dimensi dari view; sekarang ditandai `shortcut:` di `lib/smup-data.ts`.
6. **Interaksi tabel** — sorting, dan paging saat 211 baris nyata masuk.
7. **Bersih-bersih** — hapus `public/figma/` (175 SVG), `ResponsiveFrame`, `05_user_readonly.sql`.

## Menunggu keputusan

- **Shadow.** `shadow-card` (`0 10px 30px rgba(0,0,0,.1)`, dari design.md) kini dipakai di semua kartu. Kalau terasa berat, ubah satu nilai di `app/globals.css`.
- **Font.** Sekarang Inter. `design.md` menyebut Lato (brand publik) atau Geist (LiVE).
- **Palet seri chart** (`series-1..4`) diambil dari mockup, bukan design.md — perlu ditegaskan mana yang jadi acuan.
