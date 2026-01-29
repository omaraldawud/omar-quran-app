<?php
session_start();
require 'db.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");

if (isset($_SESSION['user_id'])) {
    $stmt = $pdo->prepare("SELECT id, organization_id, role, user_name, user_email, associated_mosque_id FROM users WHERE id = ? AND is_active = 1");
    $stmt->execute([$_SESSION['user_id']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user) {
        echo json_encode(['authenticated' => true, 'user' => $user]);
    } else {
        echo json_encode(['authenticated' => false]);
    }
} else {
    echo json_encode(['authenticated' => false]);
}