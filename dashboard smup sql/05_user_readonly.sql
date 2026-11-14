-- Opsional: user read-only utk dashboard (Admin tidak boleh ubah data). GANTI passwordnya.
CREATE USER IF NOT EXISTS 'dashboard_ro'@'localhost' IDENTIFIED BY 'GantiPasswordIni!';
GRANT SELECT ON dashboard_smup.* TO 'dashboard_ro'@'localhost';
FLUSH PRIVILEGES;
