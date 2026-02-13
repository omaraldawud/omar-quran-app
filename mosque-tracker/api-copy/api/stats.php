<?php
require 'session_config.php';
session_start();

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: https://hostitwise.net/qt");
header("Access-Control-Allow-Credentials: true");

require 'db.php';

// 🔒 Admin only
if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'system_admin') {
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden']);
    exit;
}

try {
    $stats = [];

    // 1. Total mosques
    $stats['total_mosques'] = (int) $pdo
        ->query("SELECT COUNT(*) FROM mosques")
        ->fetchColumn();

    // 2. Total organizations
    $stats['total_organizations'] = (int) $pdo
        ->query("SELECT COUNT(*) FROM organizations")
        ->fetchColumn();

    // 3. Total outreach (ALL orgs)
    $stats['total_outreach'] = (int) $pdo
        ->query("SELECT COUNT(*) FROM outreach_logs")
        ->fetchColumn();

    // 4. Total users
    $stats['total_users'] = (int) $pdo
        ->query("SELECT COUNT(*) FROM users")
        ->fetchColumn();

    echo json_encode($stats);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to load stats']);
}
