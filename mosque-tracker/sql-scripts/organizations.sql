 

--
-- Database: `masjid_saas`
--

-- --------------------------------------------------------

--
-- Table structure for table `organizations`
--

 CREATE TABLE IF NOT EXISTS `organizations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('nonprofit','mosque','other') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'nonprofit',
  `phone` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `street` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tagline` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mission_statement` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `talking_points` json DEFAULT NULL COMMENT 'Array of key talking points',
  `elevator_pitch` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `outreach_goals` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `brochure_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `presentation_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `donation_link` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instagram_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitter_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `linkedin_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `youtube_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ein` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tax_exempt_status` enum('501c3','other','none') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `primary_color` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '#28a745',
  `secondary_color` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '#007bff',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('pending','active','suspended') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `organizations`
--

INSERT INTO `organizations` (`id`, `name`, `type`, `phone`, `email`, `website`, `street`, `city`, `state`, `zip`, `logo_url`, `tagline`, `mission_statement`, `description`, `talking_points`, `elevator_pitch`, `outreach_goals`, `brochure_url`, `presentation_url`, `donation_link`, `facebook_url`, `instagram_url`, `twitter_url`, `linkedin_url`, `youtube_url`, `ein`, `tax_exempt_status`, `primary_color`, `secondary_color`, `is_active`, `created_at`, `updated_at`, `status`) VALUES
('Islam in Prison', 'nonprofit', '+1-844-7-PRISON (774766)', 'info@islaminprison.org', 'https://islaminprison.org/', '642 Forestwood Dr', 'Romeoville', 'IL', '60446', 'https://islaminprison.org/wp-content/uploads/2024/11/IslamInPrison-logo-Final.png', 'New Life Without Bars', 'To establish Islam in America as a complete way of life.', 'We work tirelessly to promote understanding and respect for Islamic practices in prisons. This includes advocating for the right to wear the hijab, access to prayer spaces, Halal meals, Jumu’ah services, and accommodations during Ramadhan. We also address the denial of Islamic resources and the lack of knowledge about Islamic practices among prison personnel. Through advocacy and action, we aim to secure the rights and dignity of Muslim prisoners while driving systemic change. ', '[\"To help Muslims in the American prison system practice their faith, we provide essential religious materials, including:\", \"Prayer rugs\", \"Kufis and hijabs\", \"Dhikr beads\", \"Islamic books\", \"Miswak, attar, and thobes (where facilities permit)\"]', 'We provide unlimited free quantities of the English, Spanish, and Arabic Qurans to facilities across the U.S., meeting both individual and bulk requests from facility personnel. Additionally, we distribute free Islamic literature and brochures to introduce and deepen understanding of Islam.', NULL, NULL, NULL, 'https://islaminprison.org/donate/', 'https://facebook.com/islaminprisonorg', 'https://www.instagram.com/islaminprison', NULL, NULL, 'https://www.youtube.com/playlist?list=PLfr60nLPhb5wJCCIwKZodAlqt2wyMUdti', '20-0310701', '501c3', '#F0552E', '#233E93', 1, '2026-01-29 01:00:48', '2026-01-29 22:48:02', 'pending'),

INSERT INTO `organizations`
(`name`, `type`, `phone`, `email`, `website`, `street`, `city`, `state`, `zip`,
 `logo_url`, `tagline`, `mission_statement`, `description`, `talking_points`,
 `elevator_pitch`, `outreach_goals`, `brochure_url`, `presentation_url`,
 `donation_link`, `facebook_url`, `instagram_url`, `twitter_url`, `linkedin_url`,
 `youtube_url`, `ein`, `tax_exempt_status`, `primary_color`, `secondary_color`,
 `is_active`, `created_at`, `updated_at`, `status`)
VALUES

-- ICNA
('Islamic Circle of North America (ICNA)', 'nonprofit',
 '+1-718-658-7028',
 'info@icna.org',
 'https://www.icna.org',
 '166-26 89th Ave',
 'Jamaica',
 'NY',
 '11432',
 'https://www.icna.org/wp-content/uploads/2020/07/icna-logo.png',
 'Establishing Islam in America',
 'To seek the pleasure of Allah through building strong Muslim communities.',
 'ICNA is a leading grassroots Muslim organization focused on education, social services, relief, and dawah across North America.',
 '[\"Community education\", \"Disaster relief\", \"Youth development\", \"Interfaith outreach\"]',
 'ICNA empowers communities through education, relief, and service rooted in Islamic values.',
 'Expand partnerships with mosques nationwide to increase community programs and outreach.',
 NULL,
 NULL,
 'https://www.icna.org/donate/',
 'https://facebook.com/icnaorg',
 'https://instagram.com/icnaorg',
 'https://twitter.com/icna',
 'https://www.linkedin.com/company/icna/',
 'https://www.youtube.com/@ICNAorg',
 '11-2993976',
 '501c3',
 '#006837',
 '#1C75BC',
 1,
 NOW(),
 NOW(),
 'active'),

-- CAIR
('Council on American-Islamic Relations (CAIR)', 'nonprofit',
 '+1-202-488-8787',
 'info@cair.com',
 'https://www.cair.com',
 NULL,
 'Washington',
 'DC',
 '20005',
 'https://www.cair.com/wp-content/uploads/CAIR-logo-green.png',
 'Challenging stereotypes. Defending civil liberties.',
 'To enhance understanding of Islam and protect civil rights.',
 'CAIR is America’s largest Muslim civil liberties and advocacy organization.',
 '[\"Civil rights advocacy\", \"Legal defense\", \"Media engagement\", \"Community empowerment\"]',
 'CAIR protects the civil rights of American Muslims through advocacy and education.',
 'Build stronger relationships with mosques to support civil rights education.',
 NULL,
 NULL,
 'https://www.cair.com/donate/',
 'https://facebook.com/cairnational',
 'https://instagram.com/cairnational',
 'https://twitter.com/cairnational',
 'https://www.linkedin.com/company/cair/',
 'https://www.youtube.com/@CAIRNational',
 '52-1884951',
 '501c3',
 '#2E7D32',
 '#1565C0',
 1,
 NOW(),
 NOW(),
 'active'),

-- Islamic Relief USA
('Islamic Relief USA', 'nonprofit',
 '+1-703-370-7202',
 'info@irusa.org',
 'https://irusa.org',
 '3655 Wheeler Ave',
 'Alexandria',
 'VA',
 '22304',
 'https://irusa.org/wp-content/uploads/2021/06/IRUSA-logo.png',
 'Working Together for a Better World',
 'To alleviate human suffering regardless of race or religion.',
 'Islamic Relief USA provides humanitarian aid and development programs domestically and globally.',
 '[\"Disaster response\", \"Food assistance\", \"Orphan support\", \"Health services\"]',
 'Islamic Relief USA delivers life-saving aid and builds resilient communities.',
 'Increase mosque-based fundraising and awareness campaigns.',
 NULL,
 NULL,
 'https://irusa.org/donate/',
 'https://facebook.com/islamicreliefusa',
 'https://instagram.com/islamicreliefusa',
 'https://twitter.com/IRUSA',
 'https://www.linkedin.com/company/islamic-relief-usa/',
 'https://www.youtube.com/@IslamicReliefUSA',
 '95-4453134',
 '501c3',
 '#E31B23',
 '#0054A6',
 1,
 NOW(),
 NOW(),
 'active');

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
