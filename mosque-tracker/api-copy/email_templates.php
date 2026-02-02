<?php
require 'session_config.php'; 
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
 

// Ensure user is logged in
$user = $_SESSION['user'] ?? null;
if (!$user) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

try {
    // Templates are a global pool — no mosque/org ownership.
    // Any authenticated user (organization_admin or mosque_admin) sees
    // the same set of active templates.
    $sql = "
        SELECT id, slug, name, purpose, subject, body_html, body_text,
               placeholders, is_active, version, created_at, updated_at
        FROM email_templates
        WHERE is_active = 1
        ORDER BY purpose ASC, name ASC
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $templates = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Decode placeholders JSON for each template
    foreach ($templates as &$t) {
        if ($t['placeholders']) {
            $t['placeholders'] = json_decode($t['placeholders'], true);
        }
    }
    unset($t); // break reference

    // Temporary debug inside email_templates.php
error_log("User Role: " . $_SESSION['user']['role']);
error_log("Templates Count: " . count($templates));

echo json_encode([
    'success' => true,
    'templates' => $templates
]);


} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
