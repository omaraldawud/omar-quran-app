CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `organization_id` int(11) DEFAULT NULL,
  `associated_mosque_id` int(11) DEFAULT NULL,
  `user_name` varchar(255) NOT NULL,
  `role` enum('system_admin','organization_admin','mosque_admin') NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `email_verified` tinyint(1) DEFAULT 0,
  `failed_login_attempts` int(11) DEFAULT 0,
  `account_locked_until` datetime DEFAULT NULL,
  `last_login_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
