<?php
header('Content-Type: application/json');

$allowedOrigins = [
    "http://localhost:5173",
    "https://hostitwise.net"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    try {
        // Validate required fields
        if (empty($data['name']) || empty($data['email']) || empty($data['type'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Name, email, and organization type are required']);
            exit;
        }

        // Check if email already exists
        $stmt = $pdo->prepare("SELECT id FROM organizations WHERE email = ?");
        $stmt->execute([$data['email']]);
        if ($stmt->fetch()) {
            http_response_code(409);
            echo json_encode(['error' => 'An organization with this email already exists']);
            exit;
        }

        // Insert new organization with is_active = 0 (pending approval)
        $stmt = $pdo->prepare("
            INSERT INTO organizations 
            (name, type, phone, email, website, street, city, state, zip, 
             tagline, mission_statement, description, ein, tax_exempt_status,
             is_active, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, NOW())
        ");

        $stmt->execute([
            $data['name'],
            $data['type'],
            $data['phone'] ?? null,
            $data['email'],
            $data['website'] ?? null,
            $data['street'] ?? null,
            $data['city'] ?? null,
            $data['state'] ?? null,
            $data['zip'] ?? null,
            $data['tagline'] ?? null,
            $data['mission_statement'] ?? null,
            $data['description'] ?? null,
            $data['ein'] ?? null,
            $data['tax_exempt_status'] ?? null
        ]);

        $orgId = $pdo->lastInsertId();

        // Create an admin user for this organization
        if (!empty($data['admin_name']) && !empty($data['admin_email'])) {
            $stmt = $pdo->prepare("
                INSERT INTO users 
                (user_name, user_email, user_phone, role, organization_id, created_at)
                VALUES (?, ?, ?, 'admin', ?, NOW())
            ");
            
            $stmt->execute([
                $data['admin_name'],
                $data['admin_email'],
                $data['admin_phone'] ?? null,
                $orgId
            ]);
        }

        echo json_encode([
            'success' => true,
            'message' => 'Organization registered successfully! Your application is pending admin approval.',
            'organization_id' => $orgId
        ]);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

// GET - Retrieve pending organizations (for admin approval)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $status = $_GET['status'] ?? 'pending';
        
        if ($status === 'pending') {
            $stmt = $pdo->query("
                SELECT 
                    id, name, type, email, phone, website, 
                    street, city, state, zip, ein, tax_exempt_status,
                    created_at
                FROM organizations
                WHERE is_active = 0
                ORDER BY created_at DESC
            ");
        } else {
            $stmt = $pdo->query("
                SELECT 
                    id, name, type, email, phone, website, 
                    street, city, state, zip, ein, tax_exempt_status,
                    is_active, created_at
                FROM organizations
                ORDER BY created_at DESC
            ");
        }

        $organizations = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($organizations);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>
