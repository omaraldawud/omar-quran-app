<?php
header('Content-Type: application/json');

$allowedOrigins = [
    "http://localhost:5173",
    "https://hostitwise.net"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'db.php';
session_start();

// Ensure user is logged in
$user = $_SESSION['user'] ?? null;
if (!$user) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

// Only organization_admin and mosque_admin can send
if (!in_array($user['role'], ['organization_admin', 'mosque_admin'])) {
    http_response_code(403);
    echo json_encode(['error' => 'Not authorized to send emails']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$template_id = $data['template_id'] ?? null;
$masjid_id   = $data['masjid_id']   ?? null;

if (!$template_id || !$masjid_id) {
    http_response_code(400);
    echo json_encode(['error' => 'template_id and masjid_id are required']);
    exit;
}

try {
    // Fetch template
    $stmt = $pdo->prepare("SELECT * FROM email_templates WHERE id = ? AND is_active = 1");
    $stmt->execute([$template_id]);
    $template = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$template) {
        http_response_code(404);
        echo json_encode(['error' => 'Template not found or inactive']);
        exit;
    }

    // Fetch masjid
    $stmt = $pdo->prepare("SELECT * FROM mosques WHERE id = ?");
    $stmt->execute([$masjid_id]);
    $masjid = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$masjid) {
        http_response_code(404);
        echo json_encode(['error' => 'Masjid not found']);
        exit;
    }

    // Resolve placeholders
    $body = str_replace(
        ['{masjid_name}', '{contact_name}', '{user_name}', '{organization.name}', '{user_email}', '{user_phone}', '{organization_website}'],
        [
            $masjid['name'],
            $masjid['contact_name'] ?? '',
            $user['user_name'] ?? '',
            $user['organization_name'] ?? '',
            $user['organization_website'] ?? '',
            $user['user_email'] ?? '',
            $user['user_phone'] ?? ''
        ],
        $template['body_html']
    );

    $subject = str_replace(
        ['{masjid_name}', '{contact_name}', '{organization.name}'],
        [
            $masjid['name'],
            $masjid['contact_name'] ?? '',
            $user['organization_name'] ?? ''
        ],
        $template['subject']
    );

    // Email headers
    // $headers  = "From: noreply@hostitwise.net\r\n";
    $headers  = "From: {$user['user_name']} <noreply@hostitwise.net>\r\n";
    $headers .= "Reply-To: {$user['user_email']}\r\n";
    $headers .= "CC: {$user['user_email']}\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Send email
    //info@coloradomuslimsociety.org
    // send to masjid's contact email
    if (mail($masjid['contact_email'], $subject, $body, $headers)) {

        // Log to outreach_logs (matches manual form structure)
        $stmt = $pdo->prepare("
            INSERT INTO outreach_logs
              (mosque_id, user_id, contacted_by_org_id, method,
               contacted_person_name, contacted_person_phone, contacted_person_email,
               notes, result)
            VALUES (?, ?, ?, 'Email', ?, ?, ?, ?, 'Email Sent')
        ");
        $stmt->execute([
            $masjid_id,
            $user['id'],
            $user['organization_id'] ?? null,
            $masjid['contact_name'] ?? null,
            $masjid['contact_phone'] ?? null,
            $masjid['contact_email'] ?? null,
            "Template: {$template['name']} | Subject: {$subject}"
        ]);

        echo json_encode(['message' => "Email sent to {$masjid['contact_email']}"]);

    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to send email']);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}