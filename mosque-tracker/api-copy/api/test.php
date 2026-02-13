<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

echo json_encode([
    'message' => 'API is working!',
    'time' => date('Y-m-d H:i:s')
]);
