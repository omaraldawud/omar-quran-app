-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 29, 2026 at 12:28 AM
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
CREATE DATABASE IF NOT EXISTS `masjid_saas` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `masjid_saas`;

-- --------------------------------------------------------

--
-- Table structure for table `mosques`
--

DROP TABLE IF EXISTS `mosques`;
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `mosques`
--

INSERT INTO `mosques` (`id`, `organization_id`, `name`, `street`, `city`, `state`, `zip`, `phone`, `email`, `website`, `facebook`, `whatsapp`, `contact_name`, `contact_email`, `contact_phone`, `created_at`) VALUES
(1, 1, 'Masjid Abu Bakr', '2071 S Parker Rd', 'Denver', 'CO', '80231', '(303) 696-9800', 'info@coloradomuslimsociety.org', 'https://coloradomuslimsociety.org', NULL, NULL, 'Omar Alheji', 'omar@coloradomuslimsociety.org', '(303) 555-1111', '2026-01-28 15:28:30'),
(2, 1, 'Colorado Islamic Center (Masjid Al-Salam)', '14201 E Evans Ave', 'Aurora', 'CO', '80014', '(720) 544-3249', 'office@coislamiccenter.com', 'https://coislamiccenter.com', NULL, NULL, 'Abdul Rahman', 'office@coislamiccenter.com', '(720) 555-2222', '2026-01-28 15:29:44'),
(3, 1, 'Colorado Muslims Community Center (CMCC)', '1523 S Buckley Rd', 'Aurora', 'CO', '80017', '(720) 432-9027', 'info@ourcmcc.org', 'https://ourcmcc.org', NULL, NULL, 'Mustafa Khan', 'info@ourcmcc.org', '(720) 555-3333', '2026-01-28 15:29:44'),
(4, 1, 'Downtown Denver Islamic Center (Masjid Al-Shuhada)', '1235 Galapago St', 'Denver', 'CO', '80204', '(720) 580-2605', 'info@theddic.org', 'https://theddic.org', NULL, NULL, 'Imam Karim', 'info@theddic.org', '(720) 555-4444', '2026-01-28 15:29:44'),
(5, 1, 'Islamic Society of Colorado Springs (Masjid Al-Farooq)', '1350 Potter Dr', 'Colorado Springs', 'CO', '80909', '(719) 632-3364', 'iscs.info.contact@gmail.com', 'http://iscs.info', NULL, NULL, 'Dr. Hassan', 'iscs.info.contact@gmail.com', '(719) 555-5555', '2026-01-28 15:29:44'),
(10, 2, 'Islamic Center of Greater Houston (ICGH)', '3110 Eastside St', 'Houston', 'TX', '77098', '(713) 528-7130', 'info@icgh.org', 'https://icgh.org', NULL, NULL, 'Dr. Waleed Basyouni', 'info@icgh.org', '(713) 555-1010', '2026-01-28 15:29:44'),
(11, 2, 'East Plano Islamic Center (EPIC)', '4700 14th St', 'Plano', 'TX', '75074', '(972) 423-7499', 'info@epicmasjid.org', 'https://epicmasjid.org', NULL, NULL, 'Abdul Malik Mujahid', 'info@epicmasjid.org', '(972) 555-2020', '2026-01-28 15:29:44'),
(12, 2, 'Valley Ranch Islamic Center (VRIC)', '3625 Prosperity Ave', 'Irving', 'TX', '75063', '(972) 258-0786', 'info@valleyranchmasjid.org', 'https://valleyranchmasjid.org', NULL, NULL, 'Imam Omar Suleiman', 'info@valleyranchmasjid.org', '(972) 555-3030', '2026-01-28 15:29:44'),
(13, 2, 'Islamic Association of North Texas (IANT)', '840 Abrams Rd', 'Richardson', 'TX', '75081', '(972) 231-5698', 'info@iant.com', 'https://iant.com', NULL, NULL, 'Board Office', 'info@iant.com', '(972) 555-4040', '2026-01-28 15:29:44'),
(14, 2, 'Islamic Center of Irving', '2555 Esters Rd', 'Irving', 'TX', '75062', '(972) 243-0660', 'info@irvingmasjid.org', 'https://irvingmasjid.org', NULL, NULL, 'Community Office', 'info@irvingmasjid.org', '(972) 555-5050', '2026-01-28 15:29:44');

-- --------------------------------------------------------

--
-- Table structure for table `organizations`
--

DROP TABLE IF EXISTS `organizations`;
CREATE TABLE IF NOT EXISTS `organizations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('nonprofit','mosque','other') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'nonprofit',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `organizations`
--

INSERT INTO `organizations` (`id`, `name`, `type`, `created_at`) VALUES
(1, 'Colorado Outreach Org', 'nonprofit', '2026-01-28 15:22:10'),
(2, 'Texas Dawah Org', 'nonprofit', '2026-01-28 15:22:10');

-- --------------------------------------------------------

--
-- Table structure for table `outreach_logs`
--

DROP TABLE IF EXISTS `outreach_logs`;
CREATE TABLE IF NOT EXISTS `outreach_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mosque_id` int NOT NULL,
  `user_id` int NOT NULL,
  `method` enum('phone','email','visit','whatsapp','social') COLLATE utf8mb4_unicode_ci NOT NULL,
  `contacted_person_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contacted_person_phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contacted_person_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `result` text COLLATE utf8mb4_unicode_ci,
  `contacted_at` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `mosque_id` (`mosque_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `outreach_logs`
--

INSERT INTO `outreach_logs` (`id`, `mosque_id`, `user_id`, `method`, `contacted_person_name`, `contacted_person_phone`, `contacted_person_email`, `notes`, `result`, `contacted_at`, `created_at`) VALUES
(7, 1, 2, 'phone', 'OMAR', '6308008077', 'omar@hostitwise.com', 'Spoke with admin regarding outreach program', 'Invited for Dec 3rd Jummah presentation', '2026-01-20 14:30:00', '2026-01-28 15:35:50'),
(8, 1, 5, 'email', NULL, NULL, NULL, 'Sent introductory email', 'Awaiting response', '2026-01-18 10:00:00', '2026-01-28 15:35:50'),
(9, 2, 2, 'visit', NULL, NULL, NULL, 'Met board member after Maghrib prayer', 'Requested follow-up meeting', '2026-01-15 18:45:00', '2026-01-28 15:35:50'),
(10, 10, 3, 'email', NULL, NULL, NULL, 'Sent outreach overview deck', 'Admin requested follow-up call', '2026-01-22 09:30:00', '2026-01-28 15:35:50'),
(11, 10, 3, 'phone', NULL, NULL, NULL, 'Spoke with front office', 'Referred to community coordinator', '2026-01-24 13:15:00', '2026-01-28 15:35:50'),
(12, 11, 3, 'visit', NULL, NULL, NULL, 'Attended Jummah and met coordinator', 'Invited to community event', '2026-01-19 14:00:00', '2026-01-28 15:35:50'),
(13, 1, 1, 'phone', NULL, NULL, NULL, 'sc', 'sc', '2026-01-28 16:35:52', '2026-01-28 22:35:52'),
(14, 1, 1, 'phone', NULL, NULL, NULL, 'the notes', 'the results', '2026-01-28 16:37:43', '2026-01-28 22:37:43'),
(17, 1, 1, 'phone', 'Omar Aldawud', '6308008077', 'oaldawud@clarku.edu', 'sc', 'sac', '2026-01-28 16:46:28', '2026-01-28 22:46:28'),
(18, 1, 1, 'phone', 'Omar Aldawud33', '6308008077', 'Omar.Aldawud@gmail.com33', 'n otes33', 'res33', '2026-01-28 16:47:47', '2026-01-28 22:47:47'),
(19, 1, 1, 'phone', 'Omar Aldawud44', '6308008044', 'Omar.Aldawud@gmail.com44', '44', '44', '2026-01-28 16:48:12', '2026-01-28 22:48:12'),
(20, 1, 1, 'phone', 'Omar Aldawud55', '6308008055', 'oaldawud@clarku.edu55', '55', '55', '2026-01-28 16:49:14', '2026-01-28 22:49:14'),
(21, 1, 1, 'phone', 'Omar Aldawud', '6308008077', 'Omar.Aldawud@gmail.com', 'xcv', 'xcv', '2026-01-28 16:52:36', '2026-01-28 22:52:36'),
(22, 1, 1, 'phone', 'Omar Aldawud', '6308008077', 'Omar.Aldawud@gmail.com', 'ac', 'c', '2026-01-28 16:53:27', '2026-01-28 22:53:27'),
(23, 1, 1, 'phone', 'Omar Aldawud', '6308008077', 'Omar.Aldawud@gmail.com', 'sc', 'sc', '2026-01-28 17:04:37', '2026-01-28 23:04:37'),
(24, 1, 1, 'phone', 'Omar Aldawud', '6308008077', 'Omar.Aldawud@gmail.com', 'wd', 'dw', '2026-01-28 17:29:19', '2026-01-28 23:29:19'),
(25, 1, 1, 'email', 'wdw', 'wd', 'wd', 'wd', 'wd', '2026-01-28 17:29:31', '2026-01-28 23:29:31'),
(26, 1, 1, 'phone', 'Omar Aldawud', '6308008077', 'oaldawud@clarku.edu', 'wdw', 'wd', '2026-01-28 17:29:58', '2026-01-28 23:29:58'),
(27, 1, 1, 'phone', 'Omar Aldawud', '6308008077', 'oaldawud@clarku.edu', 'w', '', '2026-01-28 17:32:02', '2026-01-28 23:32:02'),
(28, 1, 1, 'phone', 'Omar Aldawud', '6308008077', 'oaldawud@clarku.edu', 'w', 'w', '2026-01-28 17:32:35', '2026-01-28 23:32:35'),
(29, 1, 1, 'whatsapp', 'wcws', 'cws', 'ccs', 'csc', 'cscc', '2026-01-28 17:37:45', '2026-01-28 23:37:45'),
(30, 1, 1, 'phone', 'Omar Aldawud', '6308008077', 'Omar.Aldawud@gmail.com', 'ghngh', 'hgnhg', '2026-01-28 17:44:22', '2026-01-28 23:44:22'),
(31, 1, 1, 'phone', 'Omar Aldawud', '6308008077', 'Omar.Aldawud@gmail.com', 'v ', 'cv cv', '2026-01-28 17:50:40', '2026-01-28 23:50:40'),
(32, 1, 1, 'phone', 'Omar Aldawud', '6308008077', 'omar@rushrash.com', 'ce', 'cee', '2026-01-28 17:53:12', '2026-01-28 23:53:12'),
(33, 2, 1, 'social', 'Omar Aldawud', '6308008077', 'omar@rushrash.com', 'social linked', 'yeaaaa ', '2026-01-28 17:54:50', '2026-01-28 23:54:50');

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

DROP TABLE IF EXISTS `schedules`;
CREATE TABLE IF NOT EXISTS `schedules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `speaker_id` int NOT NULL,
  `mosque_id` int NOT NULL,
  `scheduled_at` datetime NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_speaker` (`speaker_id`),
  KEY `mosque_id` (`mosque_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `schedules`
--

INSERT INTO `schedules` (`id`, `speaker_id`, `mosque_id`, `scheduled_at`, `notes`, `created_at`) VALUES
(1, 1, 1, '2026-02-15 10:00:00', 'Family & Faith Forum', '2026-01-28 15:38:31'),
(2, 2, 2, '2026-02-20 13:00:00', 'Youth Outreach Workshop', '2026-01-28 15:38:31'),
(3, 3, 10, '2026-03-05 11:00:00', 'Interfaith Conference at ICGH', '2026-01-28 15:38:31');

-- --------------------------------------------------------

--
-- Table structure for table `speakers`
--

DROP TABLE IF EXISTS `speakers`;
CREATE TABLE IF NOT EXISTS `speakers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `organization_id` int NOT NULL,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `organization_id` (`organization_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `speakers`
--

INSERT INTO `speakers` (`id`, `organization_id`, `name`, `bio`, `created_at`) VALUES
(1, 1, 'Imam Ahmed Alawi', 'Experienced community speaker on family & faith', '2026-01-28 15:37:46'),
(2, 1, 'Sister Mariam Yusuf', 'Youth engagement and outreach specialist', '2026-01-28 15:37:46'),
(3, 2, 'Dr. Khalid Alvi', 'Interfaith dialogue, keynote speaker', '2026-01-28 15:37:46');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `organization_id` int NOT NULL,
  `role` enum('system_admin','organization_admin','mosque_admin') COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_phone` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `associated_mosque_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`user_email`),
  KEY `organization_id` (`organization_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `organization_id`, `role`, `user_name`, `user_email`, `user_phone`, `associated_mosque_id`, `created_at`) VALUES
(1, 1, 'system_admin', 'System Admin', 'sysadmin@example.com', '(303) 555-0000', NULL, '2026-01-28 15:35:16'),
(2, 1, 'organization_admin', 'Colorado Admin', 'coadmin@example.com', '(303) 555-0101', NULL, '2026-01-28 15:35:16'),
(3, 2, 'organization_admin', 'Texas Admin', 'txadmin@example.com', '(713) 555-0202', NULL, '2026-01-28 15:35:16'),
(4, 1, 'mosque_admin', 'Omar Alheji', 'omar@coloradomuslimsociety.org', '(303) 555-1111', NULL, '2026-01-28 15:35:16'),
(5, 1, 'mosque_admin', 'Abdul Rahman', 'abdul@coislamiccenter.com', '(720) 555-2222', NULL, '2026-01-28 15:35:16'),
(6, 1, 'mosque_admin', 'Mustafa Khan', 'mustafa@ourcmcc.org', '(720) 555-3333', NULL, '2026-01-28 15:35:16'),
(7, 2, 'mosque_admin', 'Houston Mosque Admin', 'admin@icgh.org', '(713) 555-1010', NULL, '2026-01-28 15:35:16');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `mosques`
--
ALTER TABLE `mosques`
  ADD CONSTRAINT `mosques_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `outreach_logs`
--
ALTER TABLE `outreach_logs`
  ADD CONSTRAINT `outreach_logs_ibfk_1` FOREIGN KEY (`mosque_id`) REFERENCES `mosques` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `outreach_logs_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`speaker_id`) REFERENCES `speakers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `schedules_ibfk_2` FOREIGN KEY (`mosque_id`) REFERENCES `mosques` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `speakers`
--
ALTER TABLE `speakers`
  ADD CONSTRAINT `speakers_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
