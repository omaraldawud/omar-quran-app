<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->query("SELECT * FROM outreach_logs ORDER BY created_at DESC");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $stmt = $pdo->prepare("
        INSERT INTO outreach_logs (masjid_id, method, contact_name, notes, result, user_id, created_at)
        VALUES (?, ?, ?, ?, ?, ?, NOW())
    ");
    $stmt->execute([
        $data['masjid_id'],
        $data['method'],
        $data['contact_name'],
        $data['notes'],
        $data['result'],
        $data['user_id']
    ]);

    // return inserted record with its new ID
    $id = $pdo->lastInsertId();
    $stmt = $pdo->prepare("SELECT * FROM outreach_logs WHERE id = ?");
    $stmt->execute([$id]);
    echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
    exit;
}
