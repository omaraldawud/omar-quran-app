-- Enhanced Organizations Table with Additional Fields
-- This migration adds comprehensive organization information

-- First, let's create a new enhanced version of the organizations table
DROP TABLE IF EXISTS `organizations_enhanced`;
CREATE TABLE IF NOT EXISTS `organizations_enhanced` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('nonprofit','mosque','other') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'nonprofit',
  
  -- Contact & Location Information
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `street` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` char(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  
  -- Branding & Identity
  `logo_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tagline` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mission_statement` text COLLATE utf8mb4_unicode_ci,
  `description` text COLLATE utf8mb4_unicode_ci,
  
  -- Outreach & Messaging
  `talking_points` json DEFAULT NULL COMMENT 'Array of key talking points for outreach',
  `elevator_pitch` text COLLATE utf8mb4_unicode_ci COMMENT 'Quick 30-second pitch',
  `outreach_goals` text COLLATE utf8mb4_unicode_ci COMMENT 'Current outreach objectives',
  
  -- Resources & Materials
  `brochure_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `presentation_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `donation_link` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  
  -- Social Media
  `facebook_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instagram_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitter_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `linkedin_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `youtube_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  
  -- Tax & Legal
  `ein` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Tax ID / EIN',
  `tax_exempt_status` enum('501c3','other','none') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  
  -- Settings
  `primary_color` varchar(7) COLLATE utf8mb4_unicode_ci DEFAULT '#28a745' COMMENT 'Hex color for branding',
  `secondary_color` varchar(7) COLLATE utf8mb4_unicode_ci DEFAULT '#007bff',
  `is_active` tinyint(1) DEFAULT 1,
  
  -- Timestamps
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- To migrate from existing organizations table:
-- INSERT INTO organizations_enhanced (id, name, type, created_at)
-- SELECT id, name, type, created_at FROM organizations;

-- Alternative: Add columns to existing organizations table
-- Use this approach if you want to keep existing data without migration

ALTER TABLE `organizations`
  ADD COLUMN `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL AFTER `type`,
  ADD COLUMN `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL AFTER `phone`,
  ADD COLUMN `website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL AFTER `email`,
  ADD COLUMN `street` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL AFTER `website`,
  ADD COLUMN `city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL AFTER `street`,
  ADD COLUMN `state` char(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL AFTER `city`,
  ADD COLUMN `zip` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL AFTER `state`,
  ADD COLUMN `logo_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL AFTER `zip`,
  ADD COLUMN `tagline` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL AFTER `logo_url`,
  ADD COLUMN `mission_statement` text COLLATE utf8mb4_unicode_ci AFTER `tagline`,
  ADD COLUMN `description` text COLLATE utf8mb4_unicode_ci AFTER `mission_statement`,
  ADD COLUMN `talking_points` json DEFAULT NULL COMMENT 'Array of key talking points' AFTER `description`,
  ADD COLUMN `elevator_pitch` text COLLATE utf8mb4_unicode_ci AFTER `talking_points`,
  ADD COLUMN `outreach_goals` text COLLATE utf8mb4_unicode_ci AFTER `elevator_pitch`,
  ADD COLUMN `brochure_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL AFTER `outreach_goals`,
  ADD COLUMN `presentation_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL AFTER `brochure_url`,
  ADD COLUMN `donation_link` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL AFTER `presentation_url`,
  ADD COLUMN `facebook_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL AFTER `donation_link`,
  ADD COLUMN `instagram_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL AFTER `facebook_url`,
  ADD COLUMN `twitter_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL AFTER `instagram_url`,
  ADD COLUMN `linkedin_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL AFTER `twitter_url`,
  ADD COLUMN `youtube_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL AFTER `linkedin_url`,
  ADD COLUMN `ein` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL AFTER `youtube_url`,
  ADD COLUMN `tax_exempt_status` enum('501c3','other','none') COLLATE utf8mb4_unicode_ci DEFAULT NULL AFTER `ein`,
  ADD COLUMN `primary_color` varchar(7) COLLATE utf8mb4_unicode_ci DEFAULT '#28a745' AFTER `tax_exempt_status`,
  ADD COLUMN `secondary_color` varchar(7) COLLATE utf8mb4_unicode_ci DEFAULT '#007bff' AFTER `primary_color`,
  ADD COLUMN `is_active` tinyint(1) DEFAULT 1 AFTER `secondary_color`,
  ADD COLUMN `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER `created_at`;

-- Sample data insert to demonstrate the talking_points JSON structure
-- INSERT INTO organizations (name, type, tagline, mission_statement, talking_points, elevator_pitch)
-- VALUES (
--   'Islamic Circle of North America',
--   'nonprofit',
--   'Building Better Communities',
--   'To build better communities through humanitarian relief, social services, and Islamic education.',
--   JSON_ARRAY(
--     'Established in 1968 with 50+ years of community service',
--     'Operating humanitarian programs in 30+ countries',
--     'Providing Zakat and Sadaqah distribution services',
--     'Youth development through YM and YW programs',
--     'Educational initiatives including weekend schools',
--     'Emergency relief and disaster response'
--   ),
--   'ICNA is a leading American Muslim organization dedicated to building better communities through faith-based social services, humanitarian relief, and educational programs serving millions across North America and globally.'
-- );
