<?php
$pdo = new PDO(
  "mysql:host=localhost;dbname=masjid_saas;charset=utf8mb4",
  "root",
  "omar",
  [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
  ]
);
