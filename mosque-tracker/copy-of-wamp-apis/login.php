<?php
session_start();
require 'db.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");

$data = json_decode(file_get_contents('php://input'), true);

try {
    $stmt = $pdo->prepare("
        SELECT id, organization_id, role, user_name, user_email, password_hash, 
               is_active, email_verified, associated_mosque_id
        FROM users 
        WHERE user_email = ? AND is_active = 1
    ");
    $stmt->execute([$data['email']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user && password_verify($data['password'], $user['password_hash'])) {
        // Update last login
        $updateStmt = $pdo->prepare("UPDATE users SET last_login_at = NOW(), failed_login_attempts = 0 WHERE id = ?");
        $updateStmt->execute([$user['id']]);
        
        // Set session
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['organization_id'] = $user['organization_id'];
        $_SESSION['role'] = $user['role'];
        
        unset($user['password_hash']); // Don't send hash to client
        echo json_encode(['success' => true, 'user' => $user]);
    } else {
        // Increment failed attempts
        if ($user) {
            $stmt = $pdo->prepare("UPDATE users SET failed_login_attempts = failed_login_attempts + 1 WHERE id = ?");
            $stmt->execute([$user['id']]);
        }
        
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}