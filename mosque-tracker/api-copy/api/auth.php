<?php
// 1. Configure session BEFORE starting it
require 'session_config.php';

// 2. NOW start the session
session_start();

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: https://hostitwise.net/qt");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'db.php';

try {
    // login.php stores the session as $_SESSION['user']['id']
    // so we must read it the same way
    if (!isset($_SESSION['user']['id'])) {
        echo json_encode(['authenticated' => false]);
        exit;
    }

    // Fetch current user data from DB to get fresh values
    $stmt = $pdo->prepare("
        SELECT 
            id,
            organization_id,
            associated_mosque_id,
            user_name,
            user_email,
            role,
            is_active,
            user_profile_picture
        FROM users 
        WHERE id = ? AND is_active = 1
    ");
    $stmt->execute([$_SESSION['user']['id']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        // User not found or inactive - clear session
        session_destroy();
        echo json_encode(['authenticated' => false]);
        exit;
    }

    // Return the user object with the same shape login.php sends.
    // This keeps the frontend consistent regardless of which path set the user.
    echo json_encode([
        'authenticated' => true,
        'user' => [
            'id'                   => $user['id'],
            'user_name'            => $user['user_name'],
            'user_email'           => $user['user_email'],
            'role'                 => $user['role'],
            'organization_id'      => $user['organization_id'],
            'associated_mosque_id' => $user['associated_mosque_id'],
            'user_profile_picture' => $user['user_profile_picture'],
        ]
    ]);

} catch (PDOException $e) {
    error_log("Auth check error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'authenticated' => false,
        'error' => 'An error occurred'
    ]);
}
?>
