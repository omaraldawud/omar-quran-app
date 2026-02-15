<?php
$data = json_decode(file_get_contents('php://input'), true);

header('Content-Type: application/json');
$allowedOrigins = [
    "http://localhost:5173",
    "https://hostitwise.net"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

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
