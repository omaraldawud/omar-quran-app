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

require 'db.php'; // your PDO connection

header('Content-Type: application/json');

try {
    $stmt = $pdo->query("
        SELECT id, user_name, user_email, user_phone, role, organization_id
        FROM users
        ORDER BY user_name
    ");

    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($users);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "error" => $e->getMessage()
    ]);
}
?>
