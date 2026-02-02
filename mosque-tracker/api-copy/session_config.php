<?php
if (session_status() === PHP_SESSION_NONE) {
    ini_set('session.cookie_httponly', 1);
    ini_set('session.use_only_cookies', 1);

    session_set_cookie_params([
        'lifetime' => 3600,
        'path' => '/',
        'domain' => '',       // Let browser default to current host
        'secure' => false,    // HTTP on localhost
        'httponly' => true,
        'samesite' => 'Lax'   // Works for cross-port localhost:5173 for react and localhost:80 for api
    ]);
}
?>
