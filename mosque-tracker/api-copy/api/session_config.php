<?php
if (session_status() === PHP_SESSION_NONE) {

    // Detect if we're in production or localhost
    $isLocalhost = in_array($_SERVER['HTTP_HOST'], ['localhost', '127.0.0.1']);

    // Configure session cookie params dynamically
    session_set_cookie_params([
        'lifetime' => 3600,                         // 1 hour session
        'path'     => '/',
        'domain'   => $isLocalhost ? '' : 'hostitwise.net',  // localhost = default, prod = real domain
        'secure'   => $isLocalhost ? false : true,           // HTTPS required in prod
        'httponly' => true,                           // JS cannot access cookie
        'samesite' => $isLocalhost ? 'Lax' : 'None'  // cross-domain POST allowed in prod
    ]);

    session_start();
}
?>

