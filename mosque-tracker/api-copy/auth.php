<?php
// 1. Configure session BEFORE starting it
require 'session_config.php';

// 2. NOW start the session
session_start();

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'db.php';

try {
    // Check if user is logged in via session
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['authenticated' => false]);
        exit;
    }

    // Fetch current user data
    $stmt = $pdo->prepare("
        SELECT 
            id, 
            organization_id, 
            role, 
            user_name, 
            user_email, 
            associated_mosque_id,
            is_active,
            user_phone
        FROM users 
        WHERE id = ? AND is_active = 1
    ");
    $stmt->execute([$_SESSION['user_id']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        // User is authenticated and active
        echo json_encode([
            'authenticated' => true, 
            'user' => $user
        ]);
    } else {
        // User not found or inactive - clear session
        session_destroy();
        echo json_encode(['authenticated' => false]);
    }

} catch (PDOException $e) {
    error_log("Auth check error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'authenticated' => false,
        'error' => 'An error occurred'
    ]);
}
?>