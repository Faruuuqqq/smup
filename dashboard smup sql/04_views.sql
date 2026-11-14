USE dashboard_smup;

-- Data siap pakai (semua nama sudah di-join). mode Dedup = WHERE dup_keep=1
CREATE OR REPLACE VIEW v_pendaftaran AS
SELECT p.id, p.no_pendaftaran, p.tahun_masuk, p.gelombang, j.nama AS jenjang, jm.nama AS jalur_masuk,
       f.nama_lengkap AS fakultas, ps.label AS prodi_jenjang, p.prodi_id,
       p.flag_lulus, p.flag_regist, p.is_duplikat, p.dup_keep,
       p.tgl_daftar, DATE(p.tgl_daftar) AS tanggal_daftar, p.tgl_verifikasi,
       CASE WHEN p.status_verifikasi IN ('Terverifikasi','Ditolak') THEN p.status_verifikasi ELSE 'Menunggu' END AS status_verifikasi_grup,
       p.sumber, p.flag_tahun_teks
FROM pendaftaran p
JOIN jenjang j ON j.id=p.jenjang_id
JOIN jalur_masuk jm ON jm.id=p.jalur_id
LEFT JOIN fakultas f ON f.id=p.fakultas_id
LEFT JOIN program_studi ps ON ps.id=p.prodi_id;

-- Daya tampung efektif: jika prodi punya rincian per jalur (daya_tampung_jalur) pada tahun itu,
-- pakai jumlah per jalur (sama seperti dashboard sheet); jika tidak, pakai daya_tampung.
CREATE OR REPLACE VIEW v_daya_tampung_efektif AS
SELECT dt.prodi_id, dt.tahun,
       COALESCE(j.total_jalur, dt.daya_tampung) AS daya_tampung,
       CASE WHEN j.total_jalur IS NULL THEN 'sheet_daya_tampung' ELSE 'jumlah_per_jalur' END AS sumber_dt
FROM daya_tampung dt
LEFT JOIN (SELECT prodi_id, tahun, SUM(daya_tampung) total_jalur FROM daya_tampung_jalur GROUP BY prodi_id, tahun) j
       ON j.prodi_id=dt.prodi_id AND j.tahun=dt.tahun;

-- Keketatan & persaingan per prodi x tahun (juga dasar "% keketatan/registrasi per tahun masuk")
CREATE OR REPLACE VIEW v_keketatan_prodi_tahun AS
SELECT m.mode_data, ps.id AS prodi_id, ps.label AS prodi_jenjang, j.nama AS jenjang, f.nama_lengkap AS fakultas,
       m.tahun_masuk, m.pendaftar, m.diterima, m.registrasi, dt.daya_tampung,
       ROUND(m.diterima/NULLIF(m.pendaftar,0),4)  AS keketatan,      -- diterima/pendaftar (kecil = ketat)
       ROUND(m.pendaftar/NULLIF(m.diterima,0),4)  AS persaingan,     -- pendaftar/diterima
       ROUND(m.registrasi/NULLIF(m.diterima,0),4) AS pct_registrasi, -- registrasi/diterima
       ROUND(m.registrasi/NULLIF(dt.daya_tampung,0),4) AS keterisian -- registrasi/daya tampung
FROM (
  SELECT 'apa_adanya' AS mode_data, prodi_id, tahun_masuk, COUNT(*) pendaftar, SUM(flag_lulus) diterima, SUM(flag_regist) registrasi
    FROM pendaftaran WHERE prodi_id IS NOT NULL GROUP BY prodi_id, tahun_masuk
  UNION ALL
  SELECT 'dedup', prodi_id, tahun_masuk, COUNT(*), SUM(flag_lulus), SUM(flag_regist)
    FROM pendaftaran WHERE prodi_id IS NOT NULL AND dup_keep=1 GROUP BY prodi_id, tahun_masuk
) m
JOIN program_studi ps ON ps.id=m.prodi_id
JOIN jenjang j ON j.id=ps.jenjang_id
JOIN fakultas f ON f.id=ps.fakultas_id
LEFT JOIN v_daya_tampung_efektif dt ON dt.prodi_id=m.prodi_id AND dt.tahun=m.tahun_masuk;

-- Keketatan per prodi x tahun x jalur
CREATE OR REPLACE VIEW v_keketatan_prodi_jalur AS
SELECT m.mode_data, ps.label AS prodi_jenjang, jm.nama AS jalur_masuk, m.tahun_masuk,
       m.pendaftar, m.diterima, m.registrasi,
       ROUND(m.diterima/NULLIF(m.pendaftar,0),4) AS keketatan,
       ROUND(m.pendaftar/NULLIF(m.diterima,0),4) AS persaingan
FROM (
  SELECT 'apa_adanya' AS mode_data, prodi_id, jalur_id, tahun_masuk, COUNT(*) pendaftar, SUM(flag_lulus) diterima, SUM(flag_regist) registrasi
    FROM pendaftaran WHERE prodi_id IS NOT NULL GROUP BY prodi_id, jalur_id, tahun_masuk
  UNION ALL
  SELECT 'dedup', prodi_id, jalur_id, tahun_masuk, COUNT(*), SUM(flag_lulus), SUM(flag_regist)
    FROM pendaftaran WHERE prodi_id IS NOT NULL AND dup_keep=1 GROUP BY prodi_id, jalur_id, tahun_masuk
) m
JOIN program_studi ps ON ps.id=m.prodi_id
JOIN jalur_masuk jm ON jm.id=m.jalur_id;

-- Tracking verifikasi berkas per prodi x tahun
CREATE OR REPLACE VIEW v_verifikasi_prodi AS
SELECT m.mode_data, ps.label AS prodi_jenjang, f.nama_lengkap AS fakultas, j.nama AS jenjang, m.tahun_masuk,
       m.terverifikasi, m.ditolak, m.menunggu, m.total
FROM (
  SELECT 'apa_adanya' AS mode_data, prodi_id, tahun_masuk,
         SUM(status_verifikasi='Terverifikasi') terverifikasi, SUM(status_verifikasi='Ditolak') ditolak,
         SUM(COALESCE(status_verifikasi,'') NOT IN ('Terverifikasi','Ditolak')) menunggu, COUNT(*) total
    FROM pendaftaran WHERE prodi_id IS NOT NULL GROUP BY prodi_id, tahun_masuk
  UNION ALL
  SELECT 'dedup', prodi_id, tahun_masuk,
         SUM(status_verifikasi='Terverifikasi'), SUM(status_verifikasi='Ditolak'),
         SUM(COALESCE(status_verifikasi,'') NOT IN ('Terverifikasi','Ditolak')), COUNT(*)
    FROM pendaftaran WHERE prodi_id IS NOT NULL AND dup_keep=1 GROUP BY prodi_id, tahun_masuk
) m
JOIN program_studi ps ON ps.id=m.prodi_id
JOIN jenjang j ON j.id=ps.jenjang_id
JOIN fakultas f ON f.id=ps.fakultas_id;

-- Realtime: pendaftar per hari
CREATE OR REPLACE VIEW v_realtime_harian AS
SELECT 'apa_adanya' AS mode_data, DATE(tgl_daftar) AS tanggal, COUNT(*) AS pendaftar
  FROM pendaftaran WHERE tgl_daftar IS NOT NULL GROUP BY DATE(tgl_daftar)
UNION ALL
SELECT 'dedup', DATE(tgl_daftar), COUNT(*)
  FROM pendaftaran WHERE tgl_daftar IS NOT NULL AND dup_keep=1 GROUP BY DATE(tgl_daftar);

-- Total daya tampung per prodi x tahun (+ atribut filter)
CREATE OR REPLACE VIEW v_daya_tampung AS
SELECT ps.id AS prodi_id, ps.label AS prodi_jenjang, j.nama AS jenjang, f.nama_lengkap AS fakultas, dt.tahun, dt.daya_tampung
FROM v_daya_tampung_efektif dt JOIN program_studi ps ON ps.id=dt.prodi_id
JOIN jenjang j ON j.id=ps.jenjang_id JOIN fakultas f ON f.id=ps.fakultas_id;
