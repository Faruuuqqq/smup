DATABASE dashboard_smup - Laragon (MySQL 8 / MariaDB)
Urutan jalankan:  01_schema.sql -> 02_seed_master.sql -> 03_seed_pendaftaran.sql -> 04_views.sql -> (opsional) 05_user_readonly.sql

Cara 1 - HeidiSQL (bawaan Laragon): buka koneksi, File > Run SQL file..., jalankan file satu per satu sesuai urutan.
Cara 2 - Terminal Laragon (Menu > Terminal), masuk ke folder file ini lalu:
  mysql -u root --max_allowed_packet=64M < 01_schema.sql
  mysql -u root --max_allowed_packet=64M < 02_seed_master.sql
  mysql -u root --max_allowed_packet=64M < 03_seed_pendaftaran.sql
  mysql -u root --max_allowed_packet=64M < 04_views.sql
(root Laragon default tanpa password; kalau pakai password tambahkan -p)
phpMyAdmin tidak disarankan utk 03 (file ~10 MB, kena batas upload).
PERHATIAN: 01_schema.sql menghapus lalu membuat ulang database dashboard_smup.
