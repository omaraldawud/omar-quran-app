<?php
// 1. Configure session BEFORE starting it
require 'session_config.php';
session_start();

// 2. Set headers for CORS & JSON
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'db.php';

// Parse JSON payload
$data = json_decode(file_get_contents('php://input'), true);

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

try {
    // Validate input
    if (empty($data['email']) || empty($data['password'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Email and password are required']);
        exit;
    }

    // Fetch user by email
    $stmt = $pdo->prepare("
        SELECT 
            id, 
            organization_id, 
            role, 
            user_name, 
            user_email, 
            password_hash, 
            is_active,
            email_verified,
            associated_mosque_id,
            failed_login_attempts,
            account_locked_until
        FROM users 
        WHERE user_email = ?
    ");
    $stmt->execute([$data['email']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
        exit;
    }

    // Check if account is locked
    if ($user['account_locked_until'] && strtotime($user['account_locked_until']) > time()) {
        $lockMinutes = ceil((strtotime($user['account_locked_until']) - time()) / 60);
        http_response_code(403);
        echo json_encode([
            'success' => false,
            'message' => "Account is locked. Try again in {$lockMinutes} minutes."
        ]);
        exit;
    }

    // Check if account is active
    if (!$user['is_active']) {
        http_response_code(403);
        echo json_encode(['success' => false, 'message' => 'Account is disabled. Contact administrator.']);
        exit;
    }

    // Verify password
    if (!password_verify($data['password'], $user['password_hash'])) {
        $failedAttempts = $user['failed_login_attempts'] + 1;
        $lockUntil = null;
        if ($failedAttempts >= 5) {
            $lockUntil = date('Y-m-d H:i:s', strtotime('+30 minutes'));
        }

        $updateStmt = $pdo->prepare("
            UPDATE users SET 
                failed_login_attempts = ?, 
                account_locked_until = ? 
            WHERE id = ?
        ");
        $updateStmt->execute([$failedAttempts, $lockUntil, $user['id']]);

        http_response_code(401);
        if ($lockUntil) {
            echo json_encode(['success' => false, 'message' => 'Too many failed attempts. Account locked for 30 minutes.']);
        } else {
            $remaining = 5 - $failedAttempts;
            echo json_encode(['success' => false, 'message' => "Invalid email or password. {$remaining} attempts remaining."]);
        }
        exit;
    }

    // Successful login: reset failed attempts and last login
    $stmt = $pdo->prepare("
        UPDATE users SET 
            failed_login_attempts = 0,
            account_locked_until = NULL,
            last_login_at = NOW()
        WHERE id = ?
    ");
    $stmt->execute([$user['id']]);

    // Set session user array for mosque_details.php
    $_SESSION['user'] = [
        'id' => $user['id'],
        'username' => $user['user_name'],
        'email' => $user['user_email'],
        'role' => $user['role'],
        'organization_id' => $user['organization_id'],
        'associated_mosque_id' => $user['associated_mosque_id']
    ];

    // Remove sensitive data before sending response
    unset($user['password_hash'], $user['failed_login_attempts'], $user['account_locked_until']);

    echo json_encode([
        'success' => true,
        'user' => $_SESSION['user']
    ]);

} catch (PDOException $e) {
    error_log("Login error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'An internal error occurred. Please try again later.'
    ]);
}
?>