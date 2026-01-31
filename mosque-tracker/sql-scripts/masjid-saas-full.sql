-- ===========================================================
-- Database: Outreach Management SaaS (Clean Schema)
-- ===========================================================

-- -----------------------------------------------------------
-- Table structure for `organizations`
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `organizations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('nonprofit','mosque','other') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'nonprofit',
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` char(2) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `logo_url` varchar(500) DEFAULT NULL,
  `tagline` varchar(255) DEFAULT NULL,
  `mission_statement` text,
  `description` text,
  `talking_points` json DEFAULT NULL,
  `elevator_pitch` text,
  `outreach_goals` text,
  `brochure_url` varchar(500) DEFAULT NULL,
  `presentation_url` varchar(500) DEFAULT NULL,
  `donation_link` varchar(500) DEFAULT NULL,
  `facebook_url` varchar(255) DEFAULT NULL,
  `instagram_url` varchar(255) DEFAULT NULL,
  `twitter_url` varchar(255) DEFAULT NULL,
  `linkedin_url` varchar(255) DEFAULT NULL,
  `youtube_url` varchar(255) DEFAULT NULL,
  `ein` varchar(50) DEFAULT NULL,
  `tax_exempt_status` enum('501c3','other','none') DEFAULT NULL,
  `primary_color` varchar(7) DEFAULT '#28a745',
  `secondary_color` varchar(7) DEFAULT '#007bff',
  `is_active` tinyint(1) DEFAULT '1',
  `status` enum('pending','active','suspended') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------
-- Table structure for `mosques`
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `mosques` (
  `id` int NOT NULL AUTO_INCREMENT,
  `organization_id` int DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `street` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` char(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `whatsapp` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `organization_id` (`organization_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------
-- Table structure for `users`
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('system_admin','organization_admin','mosque_admin') COLLATE utf8mb4_unicode_ci NOT NULL,
  `organization_id` int DEFAULT NULL,
  `associated_mosque_id` int DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `email_verified` tinyint(1) DEFAULT 0,
  `failed_login_attempts` int DEFAULT 0,
  `account_locked_until` datetime DEFAULT NULL,
  `last_login_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `organization_id` (`organization_id`),
  KEY `associated_mosque_id` (`associated_mosque_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------
-- Table structure for `outreach_logs`
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `outreach_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mosque_id` int NOT NULL,
  `user_id` int NOT NULL,
  `contacted_by_org_id` int DEFAULT NULL,
  `method` varchar(50) DEFAULT NULL,
  `contacted_person_name` varchar(255) DEFAULT NULL,
  `contacted_person_phone` varchar(50) DEFAULT NULL,
  `contacted_person_email` varchar(255) DEFAULT NULL,
  `notes` text,
  `result` text,
  `contacted_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `mosque_id` (`mosque_id`),
  KEY `user_id` (`user_id`),
  KEY `contacted_by_org_id` (`contacted_by_org_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===========================================================
-- Sample Admin Users (default password: "password")
-- ===========================================================

-- ===========================================================
-- You can now INSERT default organizations & mosques separately
-- ===========================================================
-- ===========================================================
-- Database: Outreach Management SaaS (Clean Schema)
-- ===========================================================

-- -----------------------------------------------------------
-- Table structure for `organizations`
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `organizations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('nonprofit','mosque','other') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'nonprofit',
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` char(2) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `logo_url` varchar(500) DEFAULT NULL,
  `tagline` varchar(255) DEFAULT NULL,
  `mission_statement` text,
  `description` text,
  `talking_points` json DEFAULT NULL,
  `elevator_pitch` text,
  `outreach_goals` text,
  `brochure_url` varchar(500) DEFAULT NULL,
  `presentation_url` varchar(500) DEFAULT NULL,
  `donation_link` varchar(500) DEFAULT NULL,
  `facebook_url` varchar(255) DEFAULT NULL,
  `instagram_url` varchar(255) DEFAULT NULL,
  `twitter_url` varchar(255) DEFAULT NULL,
  `linkedin_url` varchar(255) DEFAULT NULL,
  `youtube_url` varchar(255) DEFAULT NULL,
  `ein` varchar(50) DEFAULT NULL,
  `tax_exempt_status` enum('501c3','other','none') DEFAULT NULL,
  `primary_color` varchar(7) DEFAULT '#28a745',
  `secondary_color` varchar(7) DEFAULT '#007bff',
  `is_active` tinyint(1) DEFAULT '1',
  `status` enum('pending','active','suspended') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------
-- Table structure for `mosques`
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `mosques` (
  `id` int NOT NULL AUTO_INCREMENT,
  `organization_id` int DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `street` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` char(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `whatsapp` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `organization_id` (`organization_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------
-- Table structure for `users`
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('system_admin','organization_admin','mosque_admin') COLLATE utf8mb4_unicode_ci NOT NULL,
  `organization_id` int DEFAULT NULL,
  `associated_mosque_id` int DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `email_verified` tinyint(1) DEFAULT 0,
  `failed_login_attempts` int DEFAULT 0,
  `account_locked_until` datetime DEFAULT NULL,
  `last_login_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `organization_id` (`organization_id`),
  KEY `associated_mosque_id` (`associated_mosque_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`user_name`,`organization_id`,`user_email`,`password_hash`,`role`,`is_active`) VALUES
('System Admin',null,'sysadmin@example.com','".password_hash('password', PASSWORD_DEFAULT)."','system_admin',1),
('Org Admin','1,orgadmin@example.com','".password_hash('password', PASSWORD_DEFAULT)."','organization_admin',1),
('Mosque Admin',null,'mosqueadmin@example.com','".password_hash('password', PASSWORD_DEFAULT)."','mosque_admin',1);


-- -----------------------------------------------------------
-- Table structure for `outreach_logs`
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `outreach_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mosque_id` int NOT NULL,
  `user_id` int NOT NULL,
  `contacted_by_org_id` int DEFAULT NULL,
  `method` varchar(50) DEFAULT NULL,
  `contacted_person_name` varchar(255) DEFAULT NULL,
  `contacted_person_phone` varchar(50) DEFAULT NULL,
  `contacted_person_email` varchar(255) DEFAULT NULL,
  `notes` text,
  `result` text,
  `contacted_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `mosque_id` (`mosque_id`),
  KEY `user_id` (`user_id`),
  KEY `contacted_by_org_id` (`contacted_by_org_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===========================================================
-- Sample Admin Users (default password: "password")
-- ===========================================================
INSERT INTO `users` (`user_name`,`user_email`,`password_hash`,`role`,`is_active`) VALUES
('System Admin','sysadmin@example.com','".password_hash('111', PASSWORD_DEFAULT)."','system_admin',1),
('Org Admin','orgadmin@example.com','".password_hash('111', PASSWORD_DEFAULT)."','organization_admin',1),
('Mosque Admin','mosqueadmin@example.com','".password_hash('111', PASSWORD_DEFAULT)."','mosque_admin',1);

-- ===========================================================
-- You can now INSERT default organizations & mosques separately
-- ===========================================================
