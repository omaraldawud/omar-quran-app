-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 29, 2026 at 03:55 PM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `masjid_saas`
--

-- --------------------------------------------------------

--
-- Table structure for table `organizations`
--

DROP TABLE IF EXISTS `organizations`;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `organizations`
--

INSERT INTO `organizations` (`id`, `name`, `type`, `phone`, `email`, `website`, `street`, `city`, `state`, `zip`, `logo_url`, `tagline`, `mission_statement`, `description`, `talking_points`, `elevator_pitch`, `outreach_goals`, `brochure_url`, `presentation_url`, `donation_link`, `facebook_url`, `instagram_url`, `twitter_url`, `linkedin_url`, `youtube_url`, `ein`, `tax_exempt_status`, `primary_color`, `secondary_color`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Islamic Circle of North America', 'nonprofit', '718-658-1199', 'info@icna.org', 'https://www.icna.org', '166-26 89th Avenue', 'Jamaica', 'NY', '11432', 'https://islaminprison.org/wp-content/uploads/2024/11/IslamInPrison-logo-Final.png', 'Building Better Communities', 'To build better communities through humanitarian relief, social services, and Islamic education.', 'The Islamic Circle of North America (ICNA) is a leading American Muslim organization dedicated to the betterment of society through the application of Islamic values. Since 1968, ICNA has worked to build relations between communities by devoting itself to education, outreach, social services and relief efforts.', '[\"Established in 1968 with 50+ years of community service\", \"Operating humanitarian programs in 30+ countries worldwide\", \"Providing Zakat and Sadaqah distribution services to those in need\", \"Youth development through Young Muslims (YM) and Young Muslims Sisters (YW) programs\", \"Educational initiatives including weekend Islamic schools and adult education\", \"Emergency relief and disaster response through ICNA Relief\", \"Dawah and outreach programs across North America\", \"Women\'s empowerment through Sisters Wing initiatives\", \"Interfaith dialogue and community bridge-building\", \"Annual conventions bringing together 20,000+ attendees\"]', 'ICNA is a leading American Muslim organization dedicated to building better communities through faith-based social services, humanitarian relief, and educational programs. Since 1968, we\'ve been serving millions across North America and globally through initiatives like ICNA Relief, Young Muslims, and our extensive network of educational and outreach programs.', 'Our current outreach goals include: expanding partnerships with 100 new mosques this year, increasing Ramadan programs in underserved communities, launching new youth mentorship initiatives, and strengthening our disaster relief response capabilities nationwide.', 'https://www.icna.org/wp-content/uploads/icna-brochure.pdf', 'https://www.icna.org/presentations/about-icna.pptx', 'https://www.icna.org/donate', 'https://www.facebook.com/icnaorg', 'https://www.instagram.com/icnaorg', 'https://twitter.com/ICNAorg', 'https://www.linkedin.com/company/icna', 'https://www.youtube.com/user/icnatv', '11-2555065', '501c3', '#00693E', '#FDB913', 1, '2026-01-29 01:00:48', '2026-01-29 04:43:36'),
(2, 'Islam in Prison', 'nonprofit', '+1-844-7-PRISON (774766)', 'info@islaminprison.org/', 'https://islaminprison.org/', '642 Forestwood Dr', 'Romeoville', 'IL', '60446', 'https://islaminprison.org/wp-content/uploads/2024/11/IslamInPrison-logo-Final.png', 'New Life Without Bars', 'To establish Islam in America as a complete way of life.', NULL, '[\"To help Muslims in the American prison system practice their faith, we provide essential religious materials, including:\", \"Prayer rugs\", \"Kufis and hijabs\", \"Dhikr beads\", \"Islamic books\", \"Miswak, attar, and thobes (where facilities permit)\"]', 'We provide unlimited free quantities of the English, Spanish, and Arabic Qurans to facilities across the U.S., meeting both individual and bulk requests from facility personnel. Additionally, we distribute free Islamic literature and brochures to introduce and deepen understanding of Islam.', NULL, NULL, NULL, 'https://islaminprison.org/donate/', 'https://facebook.com/islaminprisonorg', 'https://www.instagram.com/islaminprison', NULL, NULL, 'https://www.youtube.com/playlist?list=PLfr60nLPhb5wJCCIwKZodAlqt2wyMUdti', '20-0310701', '501c3', '#F0552E', '#233E93', 1, '2026-01-29 01:00:48', '2026-01-29 05:22:11');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
