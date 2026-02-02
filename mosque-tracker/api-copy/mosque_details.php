<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'db.php';
session_start();

// Check if user is logged in
if (!isset($_SESSION['user'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

$user = $_SESSION['user'];

/**
 * Check if user can edit a specific mosque
 */
function canEditMosque($pdo, $user, $mosqueId) {
    // system_admin can edit any mosque
    if ($user['role'] === 'system_admin') {
        return true;
    }
    
    // Get mosque details
    $stmt = $pdo->prepare("SELECT id, parent_organization_id FROM mosques WHERE id = ?");
    $stmt->execute([$mosqueId]);
    $mosque = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$mosque) {
        return false;
    }
    
    // organization_admin can only edit mosques in their organization
    if ($user['role'] === 'organization_admin') {
        // Mosque must belong to an organization
        if ($mosque['parent_organization_id'] === null) {
            return false;
        }
        // Must match user's organization
        return $mosque['parent_organization_id'] == $user['organization_id'];
    }
    
    // mosque_admin can only edit their own mosque
    if ($user['role'] === 'mosque_admin') {
        // Use associated_mosque_id from users table
        if (!isset($user['associated_mosque_id']) || $user['associated_mosque_id'] === null) {
            return false;
        }
        return $mosque['id'] == $user['associated_mosque_id'];
    }
    
    return false;
}

// GET - Fetch mosque details for editing
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $mosqueId = $_GET['id'] ?? null;
        
        if (!$mosqueId) {
            http_response_code(400);
            echo json_encode(['error' => 'Mosque ID is required']);
            exit;
        }
        
        // Check authorization
        if (!canEditMosque($pdo, $user, $mosqueId)) {
            http_response_code(403);
            echo json_encode([
                'error' => 'You do not have permission to access this mosque',
                'debug' => [
                    'user_role' => $user['role'],
                    'user_associated_mosque_id' => $user['associated_mosque_id'] ?? 'not set',
                    'user_organization_id' => $user['organization_id'] ?? 'not set',
                    'requested_mosque_id' => $mosqueId
                ]
            ]);
            exit;
        }
        
        // Fetch mosque
        $stmt = $pdo->prepare("
            SELECT *
            FROM mosques
            WHERE id = ?
        ");
        
        $stmt->execute([$mosqueId]);
        $mosque = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$mosque) {
            http_response_code(404);
            echo json_encode(['error' => 'Mosque not found']);
            exit;
        }
        
        echo json_encode($mosque);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

// PUT - Update mosque details
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    try {
        $data = json_decode(file_get_contents('php://input'), true);
        
        $mosqueId = $data['id'] ?? null;
        
        if (!$mosqueId) {
            http_response_code(400);
            echo json_encode(['error' => 'Mosque ID is required']);
            exit;
        }
        
        // Check authorization
        if (!canEditMosque($pdo, $user, $mosqueId)) {
            http_response_code(403);
            echo json_encode(['error' => 'You do not have permission to edit this mosque']);
            exit;
        }
        
        // Validate required fields
        if (empty($data['name'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Mosque name is required']);
            exit;
        }
        
        // Update mosque
        $stmt = $pdo->prepare("
            UPDATE mosques SET
                name = ?,
                street = ?,
                city = ?,
                state = ?,
                zip = ?,
                contact_name = ?,
                contact_email = ?,
                contact_phone = ?,
                phone = ?,
                email = ?,
                website = ?,
                facebook = ?,
                whatsapp = ?,
                updated_at = NOW()
            WHERE id = ?
        ");
        
        $stmt->execute([
            $data['name'],
            $data['street'] ?? null,
            $data['city'] ?? null,
            $data['state'] ?? null,
            $data['zip'] ?? null,
            $data['contact_name'] ?? null,
            $data['contact_email'] ?? null,
            $data['contact_phone'] ?? null,
            $data['phone'] ?? null,
            $data['email'] ?? null,
            $data['website'] ?? null,
            $data['facebook'] ?? null,
            $data['whatsapp'] ?? null,
            $mosqueId
        ]);
        
        // Fetch updated mosque
        $stmt = $pdo->prepare("
            SELECT  *
            FROM mosques
            WHERE id = ?
        ");
        $stmt->execute([$mosqueId]);
        $updatedMosque = $stmt->fetch(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'message' => 'Mosque updated successfully',
            'mosque' => $updatedMosque
        ]);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}
?>
