<?php
header('Content-Type: application/json');

header("Access-Control-Allow-Origin: https://hostitwise.net/qt");
header("Access-Control-Allow-Methods: POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'PUT' || $_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    try {
        $orgId = $data['organization_id'] ?? null;
        $action = $data['action'] ?? null; // 'approve' or 'reject'

        if (!$orgId || !$action) {
            http_response_code(400);
            echo json_encode(['error' => 'Organization ID and action are required']);
            exit;
        }

        if ($action === 'approve') {
            // Activate the organization
            $stmt = $pdo->prepare("
                UPDATE organizations 
                SET is_active = 1, updated_at = NOW()
                WHERE id = ?
            ");
            $stmt->execute([$orgId]);

            echo json_encode([
                'success' => true,
                'message' => 'Organization approved successfully!'
            ]);

        } elseif ($action === 'reject') {
            // Delete the organization and associated users
            $stmt = $pdo->prepare("DELETE FROM users WHERE organization_id = ?");
            $stmt->execute([$orgId]);

            $stmt = $pdo->prepare("DELETE FROM organizations WHERE id = ?");
            $stmt->execute([$orgId]);

            echo json_encode([
                'success' => true,
                'message' => 'Organization registration rejected and removed.'
            ]);

        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid action. Use "approve" or "reject"']);
        }

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}
?>
