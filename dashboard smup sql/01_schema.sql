-- =====================================================================
-- Dashboard Keketatan SMUP & Realtime PMB - Skema database
-- Kompatibel: MySQL 8 / MariaDB 10.x (Laragon)
-- Jalankan berurutan: 01_schema -> 02_seed_master -> 03_seed_pendaftaran -> 04_views
-- PERINGATAN: file ini DROP + CREATE database dashboard_smup (data lama hilang).
-- =====================================================================
DROP DATABASE IF EXISTS dashboard_smup;
CREATE DATABASE dashboard_smup CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE dashboard_smup;

CREATE TABLE jenjang (
  id TINYINT UNSIGNED PRIMARY KEY,
  nama VARCHAR(30) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE fakultas (
  id TINYINT UNSIGNED PRIMARY KEY,
  nama_lengkap VARCHAR(80) NOT NULL UNIQUE,   -- mis. '13 - Kedokteran' (dipakai filter dashboard)
  nama_singkat VARCHAR(80) NOT NULL           -- mis. 'MIPA', 'Pascasarjana'
) ENGINE=InnoDB;

CREATE TABLE jalur_masuk (
  id TINYINT UNSIGNED PRIMARY KEY,
  nama VARCHAR(40) NOT NULL UNIQUE            -- = Jalur_Final (JalurMasuk5, kosong -> 'Berbasis Project')
) ENGINE=InnoDB;

CREATE TABLE program_studi (
  id SMALLINT UNSIGNED PRIMARY KEY,
  kode_prodi VARCHAR(10) NULL,                -- bisa sama utk >1 prodi (alias) -> tidak UNIQUE
  nama_prodi VARCHAR(150) NOT NULL,
  jenjang_id TINYINT UNSIGNED NOT NULL,
  fakultas_id TINYINT UNSIGNED NOT NULL,
  label VARCHAR(170) NOT NULL UNIQUE,         -- = Prodi_Jenjang, mis. 'Akuntansi (Sarjana)'
  KEY ix_ps_jenjang (jenjang_id),
  KEY ix_ps_fak (fakultas_id),
  CONSTRAINT fk_ps_jenjang FOREIGN KEY (jenjang_id) REFERENCES jenjang(id),
  CONSTRAINT fk_ps_fak FOREIGN KEY (fakultas_id) REFERENCES fakultas(id)
) ENGINE=InnoDB;

CREATE TABLE prodi_alias (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nama_prodi_raw VARCHAR(170) NOT NULL,       -- tulisan di data mentah yg tidak sama dgn master
  kode_prodi_raw VARCHAR(10) NULL,
  prodi_id SMALLINT UNSIGNED NOT NULL,
  cara_mapping ENUM('alias','kode') NOT NULL, -- alias = aturan nama, kode = lewat KodeProdiPilihan1
  jumlah_baris INT NOT NULL DEFAULT 0,
  KEY ix_pa_prodi (prodi_id),
  CONSTRAINT fk_pa_prodi FOREIGN KEY (prodi_id) REFERENCES program_studi(id)
) ENGINE=InnoDB;

CREATE TABLE daya_tampung (
  prodi_id SMALLINT UNSIGNED NOT NULL,
  tahun SMALLINT UNSIGNED NOT NULL,
  daya_tampung INT NOT NULL,
  PRIMARY KEY (prodi_id, tahun),
  CONSTRAINT fk_dt_prodi FOREIGN KEY (prodi_id) REFERENCES program_studi(id)
) ENGINE=InnoDB;

CREATE TABLE daya_tampung_jalur (            -- sheet Lists P:W (rasio per prodi x jalur)
  prodi_id SMALLINT UNSIGNED NOT NULL,
  jalur_id TINYINT UNSIGNED NOT NULL,
  tahun SMALLINT UNSIGNED NOT NULL DEFAULT 2025,  -- sheet Lists tidak punya tahun; diasumsikan tahun acuan terbaru
  peminat INT NOT NULL,
  daya_tampung INT NOT NULL,
  pendaftar_proporsional DECIMAL(10,2) NULL,
  kelulusan_proporsional DECIMAL(10,2) NULL,
  rasio DECIMAL(12,6) NULL,
  PRIMARY KEY (prodi_id, jalur_id, tahun),
  CONSTRAINT fk_dtj_prodi FOREIGN KEY (prodi_id) REFERENCES program_studi(id),
  CONSTRAINT fk_dtj_jalur FOREIGN KEY (jalur_id) REFERENCES jalur_masuk(id)
) ENGINE=InnoDB;

CREATE TABLE pendaftaran (                   -- gabungan Raw Pasca + Raw Sarjana (1 baris = 1 pilihan-1 pendaftar)
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  no_pendaftaran BIGINT UNSIGNED NOT NULL,   -- BOLEH ganda (lihat is_duplikat)
  tahun_masuk SMALLINT UNSIGNED NOT NULL,
  gelombang TINYINT UNSIGNED NULL,
  jalur_detail VARCHAR(150) NULL,             -- JMNama
  jenjang_id TINYINT UNSIGNED NOT NULL,
  jenis_pendidikan VARCHAR(20) NULL,
  status_jalur_masuk VARCHAR(30) NULL,
  jalur_id TINYINT UNSIGNED NOT NULL,        -- Jalur_Final
  status_kelulusan VARCHAR(20) NULL,         -- 'Lulus' / 'Tidak Lulus'
  status_regist_final VARCHAR(20) NULL,      -- 'Registrasi' / kosong
  fakultas_id TINYINT UNSIGNED NULL,
  prodi_id SMALLINT UNSIGNED NULL,           -- NULL = prodi tak ada di master (lihat nama_prodi_raw)
  kode_prodi_raw VARCHAR(10) NULL,
  nama_prodi_raw VARCHAR(150) NULL,
  nama_pilihan1_detail VARCHAR(200) NULL,
  flag_lulus TINYINT(1) NOT NULL DEFAULT 0,
  flag_regist TINYINT(1) NOT NULL DEFAULT 0,
  is_duplikat TINYINT(1) NOT NULL DEFAULT 0, -- no_pendaftaran muncul >1x (Dup_Flag)
  dup_keep TINYINT(1) NOT NULL DEFAULT 1,    -- 1 = kemunculan pertama (mode "Dedup")
  tgl_daftar DATETIME NULL,
  status_verifikasi VARCHAR(30) NULL,
  tgl_verifikasi DATETIME NULL,
  sumber ENUM('pasca_asli','sarjana_dummy') NOT NULL,
  flag_tahun_teks TINYINT(1) NOT NULL DEFAULT 0, -- 1 = di sheet tahun/tgl bertipe teks (tak terbaca KPI dashboard sheet)
  KEY ix_p_tahun (tahun_masuk),
  KEY ix_p_prodi_tahun (prodi_id, tahun_masuk),
  KEY ix_p_nodaf (no_pendaftaran),
  KEY ix_p_jenjang (jenjang_id),
  KEY ix_p_jalur (jalur_id),
  KEY ix_p_fak (fakultas_id),
  KEY ix_p_tgl (tgl_daftar),
  CONSTRAINT fk_p_jenjang FOREIGN KEY (jenjang_id) REFERENCES jenjang(id),
  CONSTRAINT fk_p_jalur FOREIGN KEY (jalur_id) REFERENCES jalur_masuk(id),
  CONSTRAINT fk_p_fak FOREIGN KEY (fakultas_id) REFERENCES fakultas(id),
  CONSTRAINT fk_p_prodi FOREIGN KEY (prodi_id) REFERENCES program_studi(id)
) ENGINE=InnoDB;
