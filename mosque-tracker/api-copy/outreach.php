<?php
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

$data = json_decode(file_get_contents('php://input'), true);

// Handle GET request - fetch outreach logs
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    session_start();
    $user = $_SESSION['user'] ?? null;

    if (!$user) {
        http_response_code(401);
        echo json_encode(['error' => 'Not authenticated']);
        exit;
    }

    if ($user['role'] === 'mosque_admin') {
        // Only fetch records created by this user
        $stmt = $pdo->prepare("
            SELECT * FROM outreach_logs
            WHERE user_id = ?
            ORDER BY contacted_at DESC
        ");
        $stmt->execute([$user['id']]);
    } else {
        // system_admin or other roles can see all for now
        $stmt = $pdo->query("
            SELECT * FROM outreach_logs
            ORDER BY contacted_at DESC
        ");
    }

    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}


// Handle POST request - create new outreach log
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $stmt = $pdo->prepare("
        INSERT INTO outreach_logs 
        (mosque_id, user_id, method, contacted_person_name, contacted_person_phone, contacted_person_email, notes, result, contacted_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
    ");

    $stmt->execute([
        $data['mosque_id'],
        $data['user_id'],
        $data['method'],
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