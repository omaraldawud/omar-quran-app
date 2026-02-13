<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

header("Access-Control-Allow-Origin: https://hostitwise.net/qt");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'db.php';

$sql = "
SELECT *
FROM mosques m
ORDER BY m.id
";

$stmt = $pdo->query($sql);
echo json_encode($stmt->fetchAll());
