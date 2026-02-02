<?php
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

    $to      = $masjid['contact_email'] ?? 'test@yourdomain.com';
    $subject = $template['subject'];
    $body    = $template['body_html'];

    // Replace placeholders using masjid + sending-user data
    $body = str_replace(
        ['{masjid_name}', '{contact_name}', '{user_name}'],
        [$masjid['name'], $masjid['contact_name'] ?? '', $user['user_name'] ?? ''],
        $body
    );

    // Also replace in subject in case it contains placeholders
    $subject = str_replace(
        ['{masjid_name}', '{contact_name}'],
        [$masjid['name'], $masjid['contact_name'] ?? ''],
        $subject
    );

    $headers  = "From: noreply@yourdomain.com\r\n";
    $headers .= "CC: {$user['user_email']}\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Notes for outreach log: template name + resolved subject gives full context
    $outreach_notes = "Template: {$template['name']} | Subject: {$subject}";

    // ----------------------------------------------------------
    // LIVE PATH (uncomment before go live, remove dry-run block)
    // ----------------------------------------------------------
    // if (mail($to, $subject, $body, $headers)) {
    //
    //     // Log to outreach_logs
    //     $pdo->prepare("
    //         INSERT INTO outreach_logs
    //           (mosque_id, user_id, contacted_by_org_id, method,
    //            contacted_person_name, contacted_person_phone, contacted_person_email,
    //            notes, result)
    //         VALUES (?, ?, ?, 'Email', ?, ?, ?, ?, 'Email Sent')
    //     ")->execute([
    //         $masjid_id,
    //         $user['id'],
    //         $user['organization_id'] ?? null,
    //         $masjid['contact_name']  ?? null,
    //         $masjid['contact_phone'] ?? null,
    //         $masjid['contact_email'] ?? null,
    //         $outreach_notes
    //     ]);
    //
    //     echo json_encode(['message' => "Email sent to {$to}"]);
    // } else {
    //     http_response_code(500);
    //     echo json_encode(['error' => 'Failed to send email']);
    // }

    // ----------------------------------------------------------
    // DRY RUN (remove this block before go live)
    // ----------------------------------------------------------
    file_put_contents(
        'C:/wamp64/www/email_log.txt',
        "TO: $to\nSUBJECT: $subject\nHEADERS:\n$headers\nBODY:\n$body\n-----------------\n",
        FILE_APPEND
    );

    // Log to outreach_logs
    $pdo->prepare("
        INSERT INTO outreach_logs
          (mosque_id, user_id, contacted_by_org_id, method,
           contacted_person_name, contacted_person_phone, contacted_person_email,
           notes, result)
        VALUES (?, ?, ?, 'Email', ?, ?, ?, ?, 'Email Queued (dry run)')
    ")->execute([
        $masjid_id,
        $user['id'],
        $user['organization_id'] ?? null,
        $masjid['contact_name']  ?? null,
        $masjid['contact_phone'] ?? null,
        $masjid['contact_email'] ?? null,
        $outreach_notes
    ]);

    echo json_encode([
        'message' => "Email queued (dry run) to {$to}",
        'to'      => $to,
        'subject' => $subject
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}