<?php
// 1. Load session config and START session immediately
require 'session_config.php'; 
session_start();

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'db.php';

// 2. Centralized authentication check
if (!isset($_SESSION['user'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

$user = $_SESSION['user'];
$data = json_decode(file_get_contents('php://input'), true);

// Handle GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($user['role'] === 'mosque_admin') {
        $stmt = $pdo->prepare("SELECT * FROM outreach_logs WHERE user_id = ? ORDER BY contacted_at DESC");
        $stmt->execute([$user['id']]);
    } else {
        $stmt = $pdo->query("SELECT * FROM outreach_logs ORDER BY contacted_at DESC");
    }
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $stmt = $pdo->prepare("
        INSERT INTO outreach_logs 
        (mosque_id, user_id, method, contacted_by_org_id, contacted_person_name, contacted_person_phone, contacted_person_email, notes, result, contacted_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    ");

    $stmt->execute([
        $data['mosque_id'],
        $user['id'], // Automatically use ID from session
        $data['method'],
        $user['organization_id'], // Automatically use Org ID from session
        $data['contacted_person_name'] ?? null,
        $data['contacted_person_phone'] ?? null,
        $data['contacted_person_email'] ?? null,
        $data['notes'] ?? null,
        $data['result'] ?? null
    ]);

    $id = $pdo->lastInsertId();
    $stmt = $pdo->prepare("SELECT * FROM outreach_logs WHERE id = ?");
    $stmt->execute([$id]);
    echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
    exit;
}
