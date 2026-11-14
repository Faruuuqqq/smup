# Unpad Design Language

Referensi desain dari tiga situs resmi Unpad, diekstrak langsung dari CSS/DOM produksi:
`www.unpad.ac.id` (situs publik), `live.unpad.ac.id` (e-learning), `students.unpad.ac.id/pacis` (aplikasi mahasiswa).

Tujuannya: satu bahasa visual yang bisa dipakai ulang di project ini (Next.js 16 + Tailwind v4).

## 1. Warna

Kuning adalah identitas utama Unpad. Ketiga situs memakai **`#F9B129`** sebagai primary
(di `live` muncul sebagai `--bs-primary: #f9b129`; di `unpad.ac.id` sebagai bg topbar & CTA "Daftar").

| Token | Nilai | Dipakai di |
|---|---|---|
| primary | `#F9B129` | topbar, CTA, footer, `--bs-primary` |
| primary-accent | `#F9B000` | kata "LiVE" pada hero |
| primary-light | `#FCCD75` | ikon sosial footer, tombol mobile `#F7A724` |
| primary-subtle | `#FFF6E4` / `#FFF6E5` | bg kartu tombol, bg item `.lm` |
| primary-subtle-alt | `#FEF7EA` | `--bs-primary-bg-subtle` |
| primary-border | `#FFCA65` / `#956A19` | border item, `--bs-primary-border-subtle` |
| accent-red | `#B0061C` → `#C50921` | tombol "Dana Abadi" (gradien 180deg) |
| accent-blue | `#2096F3` (hover `#1180D8`) | widget aksesibilitas, link `u-hyperlink` |
| ink | `#333333` | teks utama (dominan di semua halaman) |
| ink-strong | `#1A1A1A` | `--accent-color` tema SITAS |
| ink-muted | `#4D4D4D` / `#666666` | label, helper text |
| border | `#979797` / `#EBECF2` / `#E5E5E5` | garis, divider |
| surface | `#FFFFFF` | kartu |
| surface-alt | `#F5F5F5` / `#F2F3F8` | panel |
| neutral-rumi | `#E9E9E9` (pill pagination), `#474747` (dot aktif), `#808080` (arrow) | slider hero LiVE |

`pacis` memakai DaisyUI semantic: `bg-base-100/200/300`, `text-primary`, `text-neutral`, `text-neutral-60`.

## 2. Tipografi

Berbeda per situs — samakan hanya kalau memang satu aplikasi.

- **unpad.ac.id (brand publik)** — `Lato` 400 / 400 italic / 700 / 900 (teks & UI) + `Merriweather` 300 / 400 / 700 (judul serif) + `Work Sans` (topbar & footer, dari custom CSS). Dimuat via Google Fonts, `display=swap`.
- **live.unpad.ac.id** — `Geist` sebagai body (`--bs-body-font-family`), opsi `Lexend` dan `Atkinson Hyperlegible` (readability).
- **pacis** — font default Tailwind/DaisyUI; hierarki: judul `text-3xl text-primary capitalize`, eyebrow `text-xl text-neutral`, helper `text-base text-neutral-60`.

Skala yang terlihat: hero title 38px → 30px (tablet) → 24px (mobile); body 18px → 16px → 14px.

## 3. Bentuk (radius & shadow)

Radius besar dan konsisten — ciri paling mudah dikenali dari desain ini.

`8px` (tombol kecil) · `10px` (ikon sosial `.lm`) · `12px` (kartu, iframe, panel) · `14px` (tombol Dana Abadi) · `16px` (kartu LiVE) · `20px` (kartu hero LiVE) · `24px` (gambar prodi, iframe fakultas) · `26px` (CTA "Daftar" berbentuk pill) · `38px` (panel filter tab) · `999px` (pill, dot, badge).

Shadow:
- `0 10px 30px rgba(0,0,0,.1)` — kartu hero
- `0 10px 30px rgb(60 80 170 / 10%)` — panel aksesibilitas (biru-tinted)
- `0 0 30px rgba(0,0,0,.07)` — header saat mobile
- `0 2px 8px rgba(0,0,0,.15)` — tombol navigasi slider

## 4. Struktur per situs

### unpad.ac.id
- **Header sticky** (`.navbar-sticky`), background translusen: `rgba(255,255,255,.22)` + `backdrop-filter: blur(16.291px)` — efek kaca di atas konten.
- **Topbar utilitas** (`beta-fluid`, bg kuning): Kepakaran · Perpustakaan · PPID · E-Learning · Majalah · Wakaf · Login ▾ (Students/Staffs) · Dana Abadi.
- **Nav utama**: mega-menu bertingkat (Tentang Unpad / Penelitian / Akademik / Mahasiswa / Kerja Sama), search toggle, switch bahasa (flag `EN`), CTA **"Daftar"** (pill kuning `26px` → `smup.unpad.ac.id`).
- **Logo**: `logo-unpad-duo.svg`, 220×54.8.
- **Footer** (`beta-eleven`, bg kuning + gambar `bg_footer.jpg`): logo 60px, ikon sosial kotak `46px` radius `10px` bg `#FCCD75`, kolom menu terpusat, baris lokasi (Bandung / Jatinangor), dan badge app store.
- Konten homepage disusun sebagai section bernama `beta-two` … `beta-eleven`.

### live.unpad.ac.id
- **Moodle + tema BAZIS.** Topbar desktop (`rui-topbar`) dengan logo, plugin slot, dark-mode toggle, dan tombol Login; versi mobile pakai topbar sendiri + offcanvas `#bazisMobileNav`.
- **Ada dark mode** (toggle `data-preference="darkmode-on"`).
- **Hero swiper** (Swiper, 5 slide): tinggi `550px` (480 tablet, 440 mobile), background cover + overlay kartu putih translusen `rgba(255,255,255,.8)` radius `20px`, padding `40px`, `max-width: 700px`, shadow lembut. Judul putih `#000`, 38px; kata "LiVE" kuning `#F9B000` dengan outline hitam `text-shadow`.
- **Kontrol slider**: pagination berbentuk pill bg `#E9E9E9` (dot `6px`, aktif `24×8` `#474747`), arrow bulat `#808080`; di ≤992px pindah ke bawah slide.
- **Grid kategori** 7 ikon: 2 kolom (mobile) → 3 → 4 → 7 (≥992px).
- **Kartu**: `live-card` putih radius `16px` padding `24px`; tombol `bg #FFF6E5` radius `8px`; kartu berwarna (`live-color-card`) radius `12px` dengan thumbnail `140×140px`.

### students.unpad.ac.id/pacis
- **Next.js + Tailwind + DaisyUI, halaman login full-screen.**
- Split layar: **3/4 ilustrasi** (`ill_unpad.svg`, hanya `lg:flex`) kiri + **1/4 form** (`bg-base-100`) kanan; padding `20%` di mobile.
- Logo huruf (`logo_unpad_letter.svg`) di kiri-atas, tombol bahasa bulat (`btn-circle`) di kanan-atas.
- Isi form: eyebrow "Masuk" (`text-xl text-neutral`), judul "STUDENT UNPAD" (`text-3xl text-primary capitalize`), helper "Silahkan login dengan Akun PAUS UNPAD" (`text-neutral-60`), `divider`, lalu tombol outline full-width → `api-students.unpad.ac.id/web/auth/paus`.
- Hierarki teks DaisyUI: `text-primary` untuk nama aplikasi, `neutral-60` untuk teks sekunder.

## 5. Navbar & Footer

Diambil dari markup produksi unpad.ac.id: `div.container-fluid.beta-fluid` (topbar), `header.site-header` (nav), `div.container-fluid.beta-eleven` (footer).

> **Status: sengaja dikosongkan.** Navbar & footer sekarang hanya kerangka UI + tombol **SMUP / PMB** (`lib/site-nav.ts`): tanpa menu, ikon sosial, badge, maupun teks hak cipta asli. Spesifikasi di bawah disimpan supaya gampang diisi lagi nanti — yang ditiru dari unpad.ac.id hanya tampilannya, bukan isinya.

### Header

Sticky. Latar kaca `rgba(255,255,255,.22)` + `backdrop-filter: blur(16.291px)`. Dua baris: topbar 40px + baris utama ~80px.

**Topbar** — latar `#f9b129`, rata kanan, 13px `#333`, tanpa text-transform. Di implementasi sekarang dibiarkan kosong sebagai aksen.

**Baris utama**: logo (`public/logo-unpad-duo.svg`, ~55px tinggi) + tombol dashboard di kanan. Salah satu item menu bisa punya **mega-menu** beberapa kolom.

**Tombol** bentuk pill: radius `26px` → token `--radius-cta`. Tombol halaman aktif terisi `#f9b129`, yang lain outline.
(Situs aslinya `padding: 24px 36px`; di sini diperkecil karena 24px vertikal membuat tombol setinggi ~80px.)

**Dropdown**: mega-menu bertingkat, panel putih, satu kolom per grup. Di situs aslinya digerakkan JS; di sini cukup CSS `hover` + `focus-within` supaya tetap ringan. Di mobile memakai `<details>`.

### Footer

Latar `#f9b129` + gambar (`cover`, posisi kanan bawah — aset belum dipasang).

| Bagian | Ukuran |
|---|---|
| Logo | tinggi `60px` |
| Ikon sosial | `46×46`, `border-radius: 10px`, latar `#FCCD75`, glyph `20px` |
| Jarak ke blok menu | `margin-top: 90px`, `padding-bottom: 50px` |
| Badge app store | tinggi `48px`, `border-radius: 8px` |
| Baris lokasi | flex terpusat, `gap: 46px`, 16px |
| Judul kolom menu | 16px bold, terpusat |
| Hak cipta | 16px |

Susunan lengkap (kalau nanti diisi): logo + deretan ikon sosial → **3 kolom menu** terpusat → baris lokasi → badge App Store · tautan legal + hak cipta · badge Google Play.

Status sekarang: satu bar kuning berisi gambar brand `public/footer-unpad.svg` (viewBox `570×142`, tinggi `60px`) di kiri, tombol SMUP/PMB di kanan, dan hak cipta terpusat di bawahnya. Kolom menu, ikon sosial, dan badge belum dirender.

Penyimpangan sadar:
- Hak cipta di situs aslinya `#fff` (`.level-2 p`) karena duduk di atas foto; di sini fotonya belum ada, jadi dipakai `#1a1a1a` agar terbaca di atas kuning.
- Ikon brand akan butuh FontAwesome (sudah dilepas dari `layout.tsx` karena belum ada ikon), atau SVG inline kalau mau tanpa permintaan eksternal.

## 6. Konvensi bersama

- **Primary selalu kuning `#F9B129`**; merah `#B0061C` khusus "Dana Abadi"; biru `#2096F3` hanya untuk utilitas/link.
- **Teks default `#333`**, bukan hitam pekat.
- Sudut membulat di mana-mana; pill (`999px`) untuk tombol aksi utama.
- Tombol utama = kuning dengan teks gelap; tombol sekunder = outline (`btn-outline`, border `#979797` / `base-300`).
- Header transparan + blur di desktop, solid putih di mobile.
- Komponen selalu menyertakan `aria-label` (pagination, arrow, search) dan `:focus` state — pertahankan saat implementasi.

## 7. Peta ke Tailwind v4 project ini

`globals.css` sudah pakai `@theme inline`. Tambahkan blok berikut agar token di atas tersedia sebagai utility (`bg-primary`, `text-ink`, `rounded-card`, dst.):

```css
@theme {
  --color-primary: #f9b129;
  --color-primary-accent: #f9b000;
  --color-primary-light: #fccd75;
  --color-primary-subtle: #fff6e5;
  --color-accent-red: #b0061c;
  --color-accent-blue: #2096f3;
  --color-ink: #333333;
  --color-ink-strong: #1a1a1a;
  --color-ink-muted: #666666;
  --color-border: #ebecf2;
  --color-surface: #ffffff;
  --color-surface-alt: #f5f5f5;
  /* Header kaca unpad.ac.id */
  --color-glass: rgb(255 255 255 / 0.22);

  --radius-card: 12px;
  --radius-panel: 16px;
  --radius-hero: 20px;
  --radius-pill: 999px;
  /* CTA "Daftar" */
  --radius-cta: 26px;

  --shadow-card: 0 10px 30px rgb(0 0 0 / 0.1);
  --shadow-header: 0 0 30px rgb(0 0 0 / 0.07);
}
```

Catatan implementasi:
- Halaman SMUP/PMB saat ini disusun dari SVG hasil ekspor Figma dengan posisi absolut (`components/HalamanSmup.tsx`, `HalamanPmb.tsx`). Dokumen ini bisa dipakai sebagai acuan saat layar tersebut dibangun ulang jadi komponen Tailwind yang responsif.
- Font: pilih satu keluarga untuk konsistensi; `Lato` (brand publik) atau `Geist` (LiVE). Muat via `next/font`.
- Header brand publik bisa ditiru dengan `bg-white/20 backdrop-blur-md` (padanan `rgba(255,255,255,.22)` + `blur(16.291px)`).
