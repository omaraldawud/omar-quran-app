-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 01, 2026 at 06:16 PM
-- Server version: 10.6.24-MariaDB-cll-lve
-- PHP Version: 8.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `majid_saas`
--

-- --------------------------------------------------------

--
-- Table structure for table `email_templates`
--

CREATE TABLE `email_templates` (
  `id` int(11) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `purpose` varchar(50) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `body_html` longtext NOT NULL,
  `body_text` text DEFAULT NULL,
  `placeholders` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`placeholders`)),
  `is_active` tinyint(1) DEFAULT 1,
  `version` int(11) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `email_templates`
--

INSERT INTO `email_templates` (`id`, `slug`, `name`, `purpose`, `subject`, `body_html`, `body_text`, `placeholders`, `is_active`, `version`, `created_at`, `updated_at`) VALUES
(1, 'event-invitation', 'Event Invitation', 'Event', 'You Are Invited – Upcoming Event at {masjid_name}', '<p>Dear {contact_name},</p>\r\n<p>\r\n  We hope this message finds you well. We are pleased to invite you\r\n  to an upcoming event being held at <strong>{masjid_name}</strong>.\r\n</p>\r\n<p>\r\n  We believe this event will be a wonderful opportunity for our community\r\n  to come together. Please find the details below and let us know if you\r\n  have any questions.\r\n</p>\r\n<p>\r\n  We look forward to seeing you there.<br/>\r\n  Warm regards,<br/>\r\n  <strong>{user_name}</strong>\r\n</p>', 'Dear {contact_name},\r\n\r\nWe hope this message finds you well. We are pleased to invite you to an upcoming event being held at {masjid_name}.\r\n\r\nWe believe this event will be a wonderful opportunity for our community to come together. Please find the details below and let us know if you have any questions.\r\n\r\nWe look forward to seeing you there.\r\nWarm regards,\r\n{user_name}', '[\"masjid_name\", \"contact_name\", \"user_name\"]', 1, 1, '2026-02-01 22:00:04', '2026-02-01 22:00:04'),
(2, 'thank-you-note', 'Thank You Note', 'Thank You', 'Thank You – {masjid_name}', '<p>Dear {contact_name},</p>\r\n<p>\r\n  We wanted to take a moment to express our sincere gratitude to you\r\n  and the team at <strong>{masjid_name}</strong>.\r\n</p>\r\n<p>\r\n  Your support and collaboration mean a great deal to our organization,\r\n  and we truly appreciate everything you do for the community.\r\n</p>\r\n<p>\r\n  Please do not hesitate to reach out if there is anything we can do\r\n  for you in return.<br/>\r\n  With appreciation,<br/>\r\n  <strong>{user_name}</strong>\r\n</p>', 'Dear {contact_name},\r\n\r\nWe wanted to take a moment to express our sincere gratitude to you and the team at {masjid_name}.\r\n\r\nYour support and collaboration mean a great deal to our organization, and we truly appreciate everything you do for the community.\r\n\r\nPlease do not hesitate to reach out if there is anything we can do for you in return.\r\nWith appreciation,\r\n{user_name}', '[\"masjid_name\", \"contact_name\", \"user_name\"]', 1, 1, '2026-02-01 22:00:04', '2026-02-01 22:00:04'),
(3, 'visit-request', 'Visit Request', 'Request For Visit', 'Request For Visit – {masjid_name}', '<p>Dear {contact_name},</p>\r\n<p>\r\n  We hope you are doing well. We would like to kindly request the\r\n  opportunity to visit <strong>{masjid_name}</strong> at your earliest\r\n  convenience.\r\n</p>\r\n<p>\r\n  The purpose of the visit is to strengthen our relationship and explore\r\n  ways we can work together to better serve our community. We are\r\n  flexible on timing and happy to work around your schedule.\r\n</p>\r\n<p>\r\n  Please let us know what dates and times work best for you, and we will\r\n  confirm the details.<br/>\r\n  Thank you for your time,<br/>\r\n  <strong>{user_name}</strong>\r\n</p>', 'Dear {contact_name},\r\n\r\nWe hope you are doing well. We would like to kindly request the opportunity to visit {masjid_name} at your earliest convenience.\r\n\r\nThe purpose of the visit is to strengthen our relationship and explore ways we can work together to better serve our community. We are flexible on timing and happy to work around your schedule.\r\n\r\nPlease let us know what dates and times work best for you, and we will confirm the details.\r\nThank you for your time,\r\n{user_name}', '[\"masjid_name\", \"contact_name\", \"user_name\"]', 1, 1, '2026-02-01 22:00:04', '2026-02-01 22:00:04');

-- --------------------------------------------------------

--
-- Table structure for table `mosques`
--

CREATE TABLE `mosques` (
  `id` int(11) NOT NULL,
  `parent_organization_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `contact_name` varchar(255) DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `contact_phone` varchar(50) DEFAULT NULL,
  `is_outreach_enabled` tinyint(1) NOT NULL DEFAULT 1,
  `is_verified` tinyint(1) NOT NULL DEFAULT 1,
  `street` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` char(2) NOT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `whatsapp` varchar(255) DEFAULT NULL,
  `youtube` varchar(255) NOT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `donation_url` varchar(255) DEFAULT NULL,
  `jumuah_schedule_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `mosques`
--

INSERT INTO `mosques` (`id`, `parent_organization_id`, `name`, `contact_name`, `contact_email`, `contact_phone`, `is_outreach_enabled`, `is_verified`, `street`, `city`, `state`, `zip`, `phone`, `email`, `website`, `facebook`, `whatsapp`, `youtube`, `logo_url`, `donation_url`, `jumuah_schedule_url`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Masjid Abu Bakr', 'Iman Jodeh', 'Omar.Aldawud@gmail.com', '720-608-1882', 1, 1, '2071 S Parker Rd', 'Denver', 'CO', '80231', '(303) 696-9800', 'info@coloradomuslimsociety.org', 'https://coloradomuslimsociety.org', NULL, NULL, '', 'https://coloradomuslimsociety.org/wp-content/uploads/2018/03/cms-header-1-1024x94.gif', 'https://coloradomuslimsociety.org/donate/', NULL, '2026-01-31 12:19:29', '2026-02-01 19:41:46'),
(2, NULL, 'Colorado Islamic Center (Masjid Al-Salam)', 'Abdul Rahman', 'office@coislamiccenter.com', '(720) 555-2222', 1, 1, '14201 E Evans Ave', 'Aurora', 'CO', '80014', '(720) 544-3249', 'office@coislamiccenter.com', 'https://coislamiccenter.com', 'https://www.facebook.com/profile.php?id=100080104572185', NULL, 'https://www.youtube.com/channel/UCz-ybHATfNmaovUytFHwTDw', NULL, 'https://us.mohid.co/co/aurora/coislamiccenter/masjid/online/donation', NULL, '2026-01-31 12:19:29', '2026-02-01 07:09:52'),
(3, NULL, 'Colorado Muslims Community Center (CMCC)', 'Mustafa Khan', 'info@ourcmcc.org', '(720) 555-3333', 1, 1, '1523 S Buckley Rd', 'Aurora', 'CO', '80017', '(720) 432-9027', 'info@ourcmcc.org', 'https://ourcmcc.org', NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 12:19:29', '2026-01-31 12:48:49'),
(4, NULL, 'Downtown Denver Islamic Center (Masjid Al-Shuhada)', 'Imam Karim', 'info@theddic.org', '(720) 555-4444', 1, 1, '1235 Galapago St', 'Denver', 'CO', '80204', '(720) 580-2605', 'info@theddic.org', 'https://theddic.org', NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 12:19:29', '2026-01-31 12:48:49'),
(5, NULL, 'Islamic Society of Colorado Springs (Masjid Al-Farooq)', 'Dr. Hassan', 'iscs.info.contact@gmail.com', '(719) 555-5555', 1, 1, '1350 Potter Dr', 'Colorado Springs', 'CO', '80909', '(719) 632-3364', 'iscs.info.contact@gmail.com', 'http://iscs.info', NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 12:19:29', '2026-01-31 12:48:49'),
(10, NULL, 'Islamic Center of Greater Houston (ICGH)', 'Dr. Waleed Basyouni', 'info@icgh.org', '(713) 555-1010', 1, 1, '3110 Eastside St', 'Houston', 'TX', '77098', '(713) 528-7130', 'info@icgh.org', 'https://icgh.org', NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 12:19:29', '2026-01-31 12:48:49'),
(11, NULL, 'East Plano Islamic Center (EPIC)', 'Abdul Malik Mujahid', 'info@epicmasjid.org', '(972) 555-2020', 1, 1, '4700 14th St', 'Plano', 'TX', '75074', '(972) 423-7499', 'info@epicmasjid.org', 'https://epicmasjid.org', NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 12:19:29', '2026-01-31 12:48:49'),
(12, NULL, 'Valley Ranch Islamic Center (VRIC)', 'Imam Omar Suleiman', 'info@valleyranchmasjid.org', '(972) 555-3030', 1, 1, '3625 Prosperity Ave', 'Irving', 'TX', '75063', '(972) 258-0786', 'info@valleyranchmasjid.org', 'https://valleyranchmasjid.org', NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 12:19:29', '2026-01-31 12:48:49'),
(13, NULL, 'Islamic Association of North Texas (IANT)', 'Board Office', 'info@iant.com', '(972) 555-4040', 1, 1, '840 Abrams Rd', 'Richardson', 'TX', '75081', '(972) 231-5698', 'info@iant.com', 'https://iant.com', NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 12:19:29', '2026-01-31 12:48:49'),
(14, NULL, 'Islamic Center of Irving', 'Community Office', 'info@irvingmasjid.org', '(972) 555-5050', 1, 1, '2555 Esters Rd', 'Irving', 'TX', '75062', '(972) 243-0660', 'info@irvingmasjid.org', 'https://irvingmasjid.org', NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 12:19:29', '2026-01-31 12:48:49'),
(15, NULL, 'Chicago Islamic Center', NULL, NULL, NULL, 1, 1, NULL, 'Chicago', 'IL', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 15:39:36'),
(16, NULL, 'Masjid Al-Huda IL', NULL, NULL, NULL, 1, 1, NULL, 'Naperville', 'IL', NULL, NULL, NULL, NULL, NULL, NULL, '', 'https://images.squarespace-cdn.com/content/v1/6419595e639fe705a364b885/2379360a-c54e-4f60-a55e-b7ed5940634b/icnlogo-white.png?format=1500w', NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 17:02:51'),
(17, NULL, 'Masjid Al-Taqwa IL', NULL, NULL, NULL, 1, 1, NULL, 'Aurora', 'IL', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(18, NULL, 'Islamic Center of Schaumburg', NULL, NULL, NULL, 1, 1, NULL, 'Schaumburg', 'IL', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(19, NULL, 'Masjid Umar IL', NULL, NULL, NULL, 1, 1, NULL, 'Bridgeview', 'IL', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(20, NULL, 'Islamic Center of Peoria', NULL, NULL, NULL, 1, 1, NULL, 'Peoria', 'IL', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(21, NULL, 'Masjid Al-Noor IL', NULL, NULL, NULL, 1, 1, NULL, 'Skokie', 'IL', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(22, NULL, 'Islamic Center of Rockford', NULL, NULL, NULL, 1, 1, NULL, 'Rockford', 'IL', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(23, NULL, 'Masjid An-Nur IL', NULL, NULL, NULL, 1, 1, NULL, 'Joliet', 'IL', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(24, NULL, 'Islamic Center of Champaign-Urbana', NULL, NULL, NULL, 1, 1, NULL, 'Champaign', 'IL', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(25, NULL, 'Islamic Center of Detroit', NULL, NULL, NULL, 1, 1, NULL, 'Detroit', 'MI', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(26, NULL, 'Masjid Al-Tawheed MI', NULL, NULL, NULL, 1, 1, NULL, 'Dearborn', 'MI', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(27, NULL, 'Islamic Center of Ann Arbor', NULL, NULL, NULL, 1, 1, NULL, 'Ann Arbor', 'MI', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(28, NULL, 'Masjid Al-Noor MI', NULL, NULL, NULL, 1, 1, NULL, 'Livonia', 'MI', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(29, NULL, 'Islamic Center of Warren', NULL, NULL, NULL, 1, 1, NULL, 'Warren', 'MI', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(30, NULL, 'Masjid Umar MI', NULL, NULL, NULL, 1, 1, NULL, 'Sterling Heights', 'MI', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(31, NULL, 'Islamic Center of Flint', NULL, NULL, NULL, 1, 1, NULL, 'Flint', 'MI', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(32, NULL, 'Masjid Al-Huda MI', NULL, NULL, NULL, 1, 1, NULL, 'Troy', 'MI', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(33, NULL, 'Islamic Center of Lansing', NULL, NULL, NULL, 1, 1, NULL, 'Lansing', 'MI', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(34, NULL, 'Masjid An-Nur MI', NULL, NULL, NULL, 1, 1, NULL, 'Dearborn Heights', 'MI', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(35, NULL, 'Islamic Center of Milwaukee', NULL, NULL, NULL, 1, 1, NULL, 'Milwaukee', 'WI', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(36, NULL, 'Masjid Al-Huda WI', NULL, NULL, NULL, 1, 1, NULL, 'Madison', 'WI', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(37, NULL, 'Islamic Center of Madison', NULL, NULL, NULL, 1, 1, NULL, 'Madison', 'WI', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(38, NULL, 'Masjid Al-Noor WI', NULL, NULL, NULL, 1, 1, NULL, 'Green Bay', 'WI', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(39, NULL, 'Islamic Center of Racine', NULL, NULL, NULL, 1, 1, NULL, 'Racine', 'WI', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(40, NULL, 'Masjid Umar WI', NULL, NULL, NULL, 1, 1, NULL, 'Kenosha', 'WI', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(41, NULL, 'Islamic Center of Waukesha', NULL, NULL, NULL, 1, 1, NULL, 'Waukesha', 'WI', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(42, NULL, 'Masjid Al-Taqwa WI', NULL, NULL, NULL, 1, 1, NULL, 'Oshkosh', 'WI', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(43, NULL, 'Islamic Center of Appleton', NULL, NULL, NULL, 1, 1, NULL, 'Appleton', 'WI', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(44, NULL, 'Masjid An-Nur WI', NULL, NULL, NULL, 1, 1, NULL, 'La Crosse', 'WI', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(45, NULL, 'Islamic Center of Indianapolis', NULL, NULL, NULL, 1, 1, NULL, 'Indianapolis', 'IN', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(46, NULL, 'Masjid Al-Huda IN', NULL, NULL, NULL, 1, 1, NULL, 'Carmel', 'IN', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(47, NULL, 'Islamic Center of Fort Wayne', NULL, NULL, NULL, 1, 1, NULL, 'Fort Wayne', 'IN', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(48, NULL, 'Masjid Al-Noor IN', NULL, NULL, NULL, 1, 1, NULL, 'Fishers', 'IN', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(49, NULL, 'Islamic Center of Bloomington', NULL, NULL, NULL, 1, 1, NULL, 'Bloomington', 'IN', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(50, NULL, 'Masjid Umar IN', NULL, NULL, NULL, 1, 1, NULL, 'Lafayette', 'IN', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(51, NULL, 'Islamic Center of Terre Haute', NULL, NULL, NULL, 1, 1, NULL, 'Terre Haute', 'IN', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(52, NULL, 'Masjid Al-Taqwa IN', NULL, NULL, NULL, 1, 1, NULL, 'Muncie', 'IN', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(53, NULL, 'Islamic Center of South Bend', NULL, NULL, NULL, 1, 1, NULL, 'South Bend', 'IN', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(54, NULL, 'Masjid An-Nur IN', NULL, NULL, NULL, 1, 1, NULL, 'Gary', 'IN', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(55, NULL, 'Islamic Center of New York', NULL, NULL, NULL, 1, 1, NULL, 'New York', 'NY', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(56, NULL, 'Masjid Al-Huda NY', NULL, NULL, NULL, 1, 1, NULL, 'Brooklyn', 'NY', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(57, NULL, 'Islamic Center of Queens', NULL, NULL, NULL, 1, 1, NULL, 'Queens', 'NY', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(58, NULL, 'Masjid Al-Noor NY', NULL, NULL, NULL, 1, 1, NULL, 'Bronx', 'NY', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(59, NULL, 'Islamic Center of Staten Island', NULL, NULL, NULL, 1, 1, NULL, 'Staten Island', 'NY', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(60, NULL, 'Masjid Umar NY', NULL, NULL, NULL, 1, 1, NULL, 'Yonkers', 'NY', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(61, NULL, 'Islamic Center of Buffalo', NULL, NULL, NULL, 1, 1, NULL, 'Buffalo', 'NY', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(62, NULL, 'Masjid Al-Taqwa NY', NULL, NULL, NULL, 1, 1, NULL, 'Rochester', 'NY', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(63, NULL, 'Islamic Center of Syracuse', NULL, NULL, NULL, 1, 1, NULL, 'Syracuse', 'NY', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(64, NULL, 'Masjid An-Nur NY', NULL, NULL, NULL, 1, 1, NULL, 'Albany', 'NY', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 13:12:41', '2026-01-31 13:12:41'),
(65, NULL, 'Al Hira Community Center', NULL, NULL, NULL, 1, 1, '140 Commercial St.', 'Wood Dale', 'IL', '60191', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(66, NULL, 'Al-Aqsa Islamic Community Center', NULL, NULL, NULL, 1, 1, '17940 Bronk Rd.', 'Plainfield', 'IL', '50586', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(67, NULL, 'Al-Azhar Islamic Foundation', NULL, NULL, NULL, 1, 1, '160 Hawthorne Rd.', 'Barrington', 'IL', '60010', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(68, NULL, 'Al-Farooq Mosque', NULL, NULL, NULL, 1, 1, '8950 S. Stony Island', 'Chicago', 'IL', '60649', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(69, NULL, 'Al-Jameel Masjid', NULL, NULL, NULL, 1, 1, '4 N 251 North Swift Rd.', 'Addison', 'IL', '60101', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(70, NULL, 'Al-Madina Islamic Center', NULL, NULL, NULL, 1, 1, '2 N 579 Morton Rd.', 'West Chicago', 'IL', '60185', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(71, NULL, 'Al-Madinah Islamic Center', NULL, NULL, NULL, 1, 1, '1701 W. Wallen Ave. Basement', 'Chicago', 'IL', '60626', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(72, NULL, 'Al-Masjidul-Huq', NULL, NULL, NULL, 1, 1, '1620 S. Highland Ave.', 'Lombard', 'IL', '60148', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(73, NULL, 'Al-Mustafa Islamic Center', NULL, NULL, NULL, 1, 1, '5736 N. Western Ave.', 'Chicago', 'IL', '60659', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(74, NULL, 'Albanian American Islamic Center', NULL, NULL, NULL, 1, 1, '5825 W. St. Charles Rd.', 'Hillsdale', 'IL', '60163', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(75, NULL, 'American Islamic Association', NULL, NULL, NULL, 1, 1, '8860 W. St. Francis Rd.', 'Frankfort', 'IL', '60423', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(76, NULL, 'American Muslim Community Organization', NULL, NULL, NULL, 1, 1, '1548 E Algonquin Rd. No.511', 'Algonquin', 'IL', '60102', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(77, NULL, 'Bait Ul Ilm Islamic Center', NULL, NULL, NULL, 1, 1, '485 S. Bartlett Rd.', 'Streamwood', 'IL', '60107', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(78, NULL, 'Batavia Islamic Center', NULL, NULL, NULL, 1, 1, '222 S. Batavia Ave.', 'Batavia', 'IL', '60510', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(79, NULL, 'Bosnian Islamic Cultural Center', NULL, NULL, NULL, 1, 1, '7022 N. Western Ave.', 'Chicago', 'IL', '60645', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(80, NULL, 'Bosnian Masjid', NULL, NULL, NULL, 1, 1, '4731 N. Lawndale Ave.', 'Chicago', 'IL', '60625', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(81, NULL, 'Central Illinois Mosque And Islamic Center', NULL, NULL, NULL, 1, 1, '106 S. Lincoln Ave.', 'Urbana', 'IL', '61801', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(82, NULL, 'Dar-Us-Sunnah Masjid and Comm Center', NULL, NULL, NULL, 1, 1, '2045 Brown Ave.', 'Evanston', 'IL', '60201', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(83, NULL, 'Darus Salam', NULL, NULL, NULL, 1, 1, '21 W 525 North Ave', 'Lombard', 'IL', '60148', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(84, NULL, 'Downtown Islamic Center', NULL, NULL, NULL, 1, 1, '231 S. State St. 4Th Fl.', 'Chicago', 'IL', '60604', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(85, NULL, 'Fox Vally Muslim Community Center', NULL, NULL, NULL, 1, 1, '1187 Timberlake Dr.', 'Aurora', 'IL', '60506', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(86, NULL, 'Harvey Islamic Center', NULL, NULL, NULL, 1, 1, '163 E. 154th St.', 'Harvey', 'IL', '60426', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(87, NULL, 'Icna-Chicago', NULL, NULL, NULL, 1, 1, '6224 N. California Ave.', 'Chicago', 'IL', '60659', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(88, NULL, 'Insitutue of Islamic Education', NULL, NULL, NULL, 1, 1, '1048 Bluff City Blvd', 'Elgin', 'IL', '60120', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(89, NULL, 'Islamic Center of Bloomington-Normal', NULL, NULL, NULL, 1, 1, '2911 Gill St. Suite 6', 'Bloomington', 'IL', '61704', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(90, NULL, 'Islamic Center of Carbondale', NULL, NULL, NULL, 1, 1, '511 S. Popular', 'Carbondale', 'IL', '62901', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(91, NULL, 'Islamic Center of Chicago', NULL, NULL, NULL, 1, 1, '5933 N. Lincoln Ave.', 'Chicago', 'IL', '60659', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(92, NULL, 'Islamic Center of Greater Centralia', NULL, NULL, NULL, 1, 1, '224 S. Broadway', 'Centralia', 'IL', '62801', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(93, NULL, 'Islamic Center of Macomb', NULL, NULL, NULL, 1, 1, '601 Wigwam Hollow', 'Macomb', 'IL', '61455', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(94, NULL, 'Islamic Center of Mchenry County', NULL, NULL, NULL, 1, 1, '5800 E. Crystal Lake Ave.', 'Crystal Lake', 'IL', '60014', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(95, NULL, 'Islamic Center of Naperville-Al-Hidayah', NULL, NULL, NULL, 1, 1, '450 S Olson Dr', 'Naperville', 'IL', '60566', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(96, NULL, 'Islamic Center of Naperville-Al-Hilal', NULL, NULL, NULL, 1, 1, '2844 W. Ogden Ave.', 'Naperville', 'IL', '60540', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(97, NULL, 'Islamic Center of Peoria', NULL, NULL, NULL, 1, 1, '1716 N. North St.', 'Peoria', 'IL', '61605', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(98, NULL, 'Islamic Center of Western Suburbs', NULL, NULL, NULL, 1, 1, '28W774 Army Trail Rd.', 'West Chicago', 'IL', '60185', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(99, NULL, 'Islamic Community Center', NULL, NULL, NULL, 1, 1, '345 Heine St.', 'Elgin', 'IL', '60123', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(100, NULL, 'Islamic Community Center of Des Plains', NULL, NULL, NULL, 1, 1, '480 Potter Rd', 'Des Plains', 'IL', '60016', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(101, NULL, 'Islamic Community Center of Illinois', NULL, NULL, NULL, 1, 1, '6435 W. Belmont Ave.', 'Chicago', 'IL', '60634', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(102, NULL, 'Islamic Cultural Center of Greater Chicago', NULL, NULL, NULL, 1, 1, '1810 N Pfingsten Rd', 'Northbrook', 'IL', '60062', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(103, NULL, 'Islamic Education Center', NULL, NULL, NULL, 1, 1, '1269 Goodrich Ave.', 'Glendale Heights', 'IL', '60139', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(104, NULL, 'Islamic Foundation', NULL, NULL, NULL, 1, 1, '300 W. Highridge', 'Villa Park', 'IL', '60181', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(105, NULL, 'Islamic Foundation North', NULL, NULL, NULL, 1, 1, '1751 N. O Plaine Rd.', 'Libertyville', 'IL', '60048', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(106, NULL, 'Islamic Foundation of Southwest Suburbs', NULL, NULL, NULL, 1, 1, '16122 R. 59 Suite 108', 'Plainfield', 'IL', '60586', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(107, NULL, 'Islamic Information Center of America', NULL, NULL, NULL, 1, 1, '830 E. Old Willow Rd.', 'Prospect Heights', 'IL', '60070', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(108, NULL, 'Islamic Organization of North America', NULL, NULL, NULL, 1, 1, '561 Lancaster Cr', 'Elgin', 'IL', '60123', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(109, NULL, 'Islamic Society of Greater Springfield', NULL, NULL, NULL, 1, 1, '3000 Stanton St.', 'Springfield', 'IL', '62703', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(110, NULL, 'Islamic Society of Northern Illinois Univ.', NULL, NULL, NULL, 1, 1, '721 Normal Rd', 'Dekalb', 'IL', '60115', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(111, NULL, 'Islamic Society of Northwest Suburbs', NULL, NULL, NULL, 1, 1, '3890 Industrial Ave', 'Rolling Meadows', 'IL', '60008', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(112, NULL, 'Islamic Student Society', NULL, NULL, NULL, 1, 1, '1315 W. Main St.', 'Peoria', 'IL', '61604', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(113, NULL, 'Jamia Masjid', NULL, NULL, NULL, 1, 1, '6340 N. Campbell Ave.', 'Chicago', 'IL', '60659', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(114, NULL, 'Lake Cook Weiland Comm Ctr For Spiritual Healing', NULL, NULL, NULL, 1, 1, '20515 N. Horatio Blvd', 'Lincolnshire', 'IL', '60069', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(115, NULL, 'Lake Shore Muslim Community Center', NULL, NULL, NULL, 1, 1, '7324 N. Western Ave.', 'Chicago', 'IL', '60645', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(116, NULL, 'Light of Islam (Masjid Nur-Ul-Islam)', NULL, NULL, NULL, 1, 1, '46 E. Sibley Blvd', 'Harvey', 'IL', '60426', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(117, NULL, 'Makki Masjid', NULL, NULL, NULL, 1, 1, '3418 W. Ainslie St.', 'Chicago', 'IL', '60625', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(118, NULL, 'Masjid Al Faatir', NULL, NULL, NULL, 1, 1, '1200 E. 47th St', 'Chicago', 'IL', '60615', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(119, NULL, 'Masjid Al-Ansar', NULL, NULL, NULL, 1, 1, '2506 W. 63Rd St.', 'Chicago', 'IL', '60629', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(120, NULL, 'Masjid Al-Ghuraba', NULL, NULL, NULL, 1, 1, '21-A Kettle River Rd.', 'Edwardsville', 'IL', '62034', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(121, NULL, 'Masjid Al-Hafeez', NULL, NULL, NULL, 1, 1, '461 E. 83Rd St.', 'Chicago', 'IL', '60613', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(122, NULL, 'Masjid Al-Huda', NULL, NULL, NULL, 1, 1, '1081 W. Irving Park Rd.', 'Schaumburg', 'IL', '60193', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(123, NULL, 'Masjid Al-Ihsan', NULL, NULL, NULL, 1, 1, '6005 34th Ave.', 'Moline', 'IL', '61265', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(124, NULL, 'Masjid Al-Ihsan', NULL, NULL, NULL, 1, 1, '227 E. 51St St.', 'Chicago', 'IL', '60615', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(125, NULL, 'Masjid Al-Islam', NULL, NULL, NULL, 1, 1, '56 E. North Frontage Rd', 'Bolingbrook', 'IL', '60440', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(126, NULL, 'Masjid Al-Latif', NULL, NULL, NULL, 1, 1, '1747 W. 51St St.', 'Chicago', 'IL', '60609', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(127, NULL, 'Masjid Al-Muhajireen', NULL, NULL, NULL, 1, 1, '3777 W. Columbus Ave.', 'Chicago', 'IL', '60652', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(128, NULL, 'Masjid Al-Qassam', NULL, NULL, NULL, 1, 1, '3357 W. 63Rd St.', 'Chicago', 'IL', '60629', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(129, NULL, 'Masjid Al-Salam', NULL, NULL, NULL, 1, 1, '3247 W. 63Rd St.', 'Chicago', 'IL', '60629', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(130, NULL, 'Masjid Al-Salam', NULL, NULL, NULL, 1, 1, '4819 S. Ashland Ave.', 'Chicago', 'IL', '60609', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(131, NULL, 'Masjid Al-Taqwa', NULL, NULL, NULL, 1, 1, '3065 E. 93Rd St.', 'Chicago', 'IL', '60617', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(132, NULL, 'Masjid Al-Taqwa', NULL, NULL, NULL, 1, 1, '5101 N. Sheridan Rd.', 'Chicago', 'IL', '60640', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(133, NULL, 'Masjid An-Nur', NULL, NULL, NULL, 1, 1, '504 S. Wall', 'Carbondale', 'IL', '62901', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(134, NULL, 'Masjid As-Salaam', NULL, NULL, NULL, 1, 1, '823 W. Salaam Dr.', 'Peoria', 'IL', '61615', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(135, NULL, 'Masjid At-Tawheed Chicago', NULL, NULL, NULL, 1, 1, '8726 S. Halsted St.', 'Chicago', 'IL', '60620', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(136, NULL, 'Masjid Darussalam', NULL, NULL, NULL, 1, 1, '21W525 North Ave.', 'Lombard', 'IL', '60148', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(137, NULL, 'Masjid Dawah', NULL, NULL, NULL, 1, 1, '210 N. Homan Ave.', 'Chicago', 'IL', '60624', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(138, NULL, 'Masjid E Faizan E Madeena', NULL, NULL, NULL, 1, 1, '6305 N. Ridge Blvd', 'Chicago', 'IL', '60626', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(139, NULL, 'Masjid Hameedia', NULL, NULL, NULL, 1, 1, '1456 W. Elmdale Ave.', 'Chicago', 'IL', '60660', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(140, NULL, 'Masjid Ibrahim', NULL, NULL, NULL, 1, 1, '2407 E. Washington St.', 'Bloomington', 'IL', '61704', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(141, NULL, 'Masjid Muminun', NULL, NULL, NULL, 1, 1, '3003 W. Harrison', 'Chicago', 'IL', '60612', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(142, NULL, 'Masjid Noor', NULL, NULL, NULL, 1, 1, '6151 N. Greenview', 'Chicago', 'IL', '60660', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(143, NULL, 'Masjid Sahwa', NULL, NULL, NULL, 1, 1, '4913 N. Whipple', 'Chicago', 'IL', '60625', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(144, NULL, 'Masjid Umar', NULL, NULL, NULL, 1, 1, '11405 S. Michigan Ave', 'Chicago', 'IL', '60628', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(145, NULL, 'Masjid Wali Hasan', NULL, NULL, NULL, 1, 1, '1635 Huston Dr.', 'Decatur', 'IL', '62526', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(146, NULL, 'Masjid-E�Abu Bakar (Roscoe Masjid)', NULL, NULL, NULL, 1, 1, '1015 W. Roscoe St.', 'Chicago', 'IL', '60657', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(147, NULL, 'Masjid-E-Ayesha', NULL, NULL, NULL, 1, 1, '2409-B W. Devon Ave', 'Chicago', 'IL', '60659', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(148, NULL, 'Masjid-E-Rahmat', NULL, NULL, NULL, 1, 1, '6412 N. Talman Ave.', 'Chicago', 'IL', '60645', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(149, NULL, 'Masjid-E-Syed Hashim', NULL, NULL, NULL, 1, 1, '7419 N. Western Ave.', 'Chicago', 'IL', '60645', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(150, NULL, 'Masom Community Center', NULL, NULL, NULL, 1, 1, '6111 W. Addison St.', 'Chicago', 'IL', '60634', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(151, NULL, 'Mecca', NULL, NULL, NULL, 1, 1, '720 E. Plainfield Rd.', 'Willowsbrook', 'IL', '60527', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(152, NULL, 'Midwest Masoom Assocation', NULL, NULL, NULL, 1, 1, '4353 W. Laurence Ave.', 'Chicago', 'IL', '60660', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(153, NULL, 'Mosque And Islamic Education Center', NULL, NULL, NULL, 1, 1, '4525 Old Collinsville Rd.', 'Belleville', 'IL', '62226', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(154, NULL, 'Mosque Foundation of Chicago', NULL, NULL, NULL, 1, 1, '7360 W. 93Rd St.', 'Bridgeview', 'IL', '60455', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(155, NULL, 'Muslim Assoc. of Greater Peoria', NULL, NULL, NULL, 1, 1, '25172 N. Spring Creek Rd.', 'Peoria', 'IL', '61671', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(156, NULL, 'Muslim Community Center', NULL, NULL, NULL, 1, 1, '4380 N. Elston Ave', 'Chicago', 'IL', '60641', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(157, NULL, 'Muslim Community Center of Rockford', NULL, NULL, NULL, 1, 1, '5921 Darlene Dr.', 'Rockford', 'IL', '61109', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(158, NULL, 'Muslim Education & Community Asst', NULL, NULL, NULL, 1, 1, '817 W. Armstrong', 'Peoria', 'IL', '61606', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(159, NULL, 'Muslim Education Center', NULL, NULL, NULL, 1, 1, '8601 Menard Ave.', 'Morton Grove', 'IL', '60053', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(160, NULL, 'Muslim House', NULL, NULL, NULL, 1, 1, '8008 S. Cottage Grove Ave.', 'Chicago', 'IL', '60619', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(161, NULL, 'Muslim Society', NULL, NULL, NULL, 1, 1, '1785 Bloomingdale Rd', 'Glendale Hights', 'IL', '60139', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(162, NULL, 'Muslim Student Association House', NULL, NULL, NULL, 1, 1, '1315 W. Main St.', 'Peoria', 'IL', '61606', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(163, NULL, 'Nigerian Islamic Assoc.', NULL, NULL, NULL, 1, 1, '932 W. Sheridian Rd', 'Chicago', 'IL', '60613', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(164, NULL, 'South Suburban Islamic Center', NULL, NULL, NULL, 1, 1, '15200 S. Broadway', 'Harvey', 'IL', '60426', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(165, NULL, 'Sri Lanka Jummah Masjid', NULL, NULL, NULL, 1, 1, '6412 N. Hamilton Ave.', 'Chicago', 'IL', '60645', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(166, NULL, 'Tafweedul Quran', NULL, NULL, NULL, 1, 1, '6355 N. Claremont Ave. @B1', 'Chicago', 'IL', '60659', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(167, NULL, 'Taqwa Islamic Center', NULL, NULL, NULL, 1, 1, '1550 W. 88Th St.', 'Chicago', 'IL', '60620', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(168, NULL, 'The Ephraim Bahar Cultural Center', NULL, NULL, NULL, 1, 1, '2525 W. 71St St.', 'Chicago', 'IL', '60629', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(169, NULL, 'The Prayer Center of Orland Park', NULL, NULL, NULL, 1, 1, '16530 S. 104th Ave.', 'Orland Park', 'IL', '60467', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(170, NULL, 'Turkish American Cultural Alliance', NULL, NULL, NULL, 1, 1, '3745 N. Harlem Ave', 'Chicago', 'IL', '60634', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(171, NULL, 'United Muslims of America', NULL, NULL, NULL, 1, 1, '26 W 251 Widgear Lane', 'Bartlett', 'IL', '60133', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49'),
(172, NULL, 'Western Bosnian Islamic Community Center', NULL, NULL, NULL, 1, 1, '2944 N. Narragansett Ave.', 'Chicago', 'IL', '60634', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '2026-01-31 15:34:49', '2026-01-31 15:34:49');

-- --------------------------------------------------------

--
-- Table structure for table `organizations`
--

CREATE TABLE `organizations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` enum('nonprofit','mosque','other') NOT NULL DEFAULT 'nonprofit',
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` char(2) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `logo_url` varchar(500) DEFAULT NULL,
  `tagline` varchar(255) DEFAULT NULL,
  `mission_statement` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `talking_points` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`talking_points`)),
  `elevator_pitch` text DEFAULT NULL,
  `outreach_goals` text DEFAULT NULL,
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
  `is_active` tinyint(1) DEFAULT 1,
  `status` enum('pending','active','suspended') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `organizations`
--

INSERT INTO `organizations` (`id`, `name`, `type`, `phone`, `email`, `website`, `street`, `city`, `state`, `zip`, `logo_url`, `tagline`, `mission_statement`, `description`, `talking_points`, `elevator_pitch`, `outreach_goals`, `brochure_url`, `presentation_url`, `donation_link`, `facebook_url`, `instagram_url`, `twitter_url`, `linkedin_url`, `youtube_url`, `ein`, `tax_exempt_status`, `primary_color`, `secondary_color`, `is_active`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Islam in Prison', 'nonprofit', '+1-844-7-PRISON (774766)', 'omar.aldawud@gmail.com', 'https://islaminprison.org/', '642 Forestwood Dr', 'Romeoville', 'IL', '60446', 'https://islaminprison.org/wp-content/uploads/2024/11/IslamInPrison-logo-Final.png', 'New Life Without Bars', 'To establish Islam in America as a complete way of life and to promote understanding and respect for Islamic practices in prisons. ', 'We work tirelessly to promote understanding and respect for Islamic practices in prisons. This includes advocating for the right to wear the hijab, access to prayer spaces, Halal meals, Jumu’ah services, and accommodations during Ramadhan. We also address the denial of Islamic resources and the lack of knowledge about Islamic practices among prison personnel. Through advocacy and action, we aim to secure the rights and dignity of Muslim prisoners while driving systemic change.', '[\"To help Muslims in the American prison system practice their faith, we provide essential religious materials, including:\",\"Prayer rugs\",\"Kufis and hijabs\",\"Dhikr beads\",\"Islamic books\",\"Miswak, attar, and thobes (where facilities permit)\"]', 'We provide unlimited free quantities of the English, Spanish, and Arabic Qurans to facilities across the U.S., meeting both individual and bulk requests from facility personnel. Additionally, we distribute free Islamic literature and brochures to introduce and deepen understanding of Islam.', NULL, NULL, NULL, 'https://islaminprison.org/donate/', 'https://facebook.com/islaminprisonorg', 'https://www.instagram.com/islaminprison', NULL, NULL, 'https://www.youtube.com/playlist?list=PLfr60nLPhb5wJCCIwKZodAlqt2wyMUdti', '20-0310701', '501c3', '#F0552E', '#233E93', 1, 'pending', '2026-01-29 08:00:48', '2026-02-01 19:15:45'),
(2, 'Islamic Circle of North America (ICNA)', 'nonprofit', '+1-718-658-7028', 'info@icna.org', 'https://www.icna.org', '166-26 89th Ave', 'Jamaica', 'NY', '11432', 'https://www.icna.org/wp-content/uploads/2020/07/icna-logo.png', 'Establishing Islam in America', '<p><b>THE MISSION STATEMENT</b><br />\nMission of ICNA is to seek the pleasure of Allah (SWT) through the struggle for Iqamat-ud-Deen (application of the Islamic system of life) as spelled out in the Qur’an and the Sunnah of Prophet Muhammad (SAW).</p>\n<p><b>THE VISION STATEMENT</b><br />\nTo be a truly representative grassroots organization of diverse Muslim Americans inclusive for all ages, ethnicities and socioeconomic statuses. ICNA will be an innovative, agile, and credible source of institutional support for connecting with Allah (God), with other individuals, and with the community.</p>\n\n<p><b>THE 7-POINT PROGRAM OF ICNA</b><br /></p>\n<ol>\n  <li>Inviting mankind to submit to the Creator by using all possible means of communication.</li>\n  <li>Motivating Muslims to perform their duty of being witness unto mankind by their words and deeds.</li>\n  <li>Organizing those who agree to work for this cause in the discipline of ICNA.</li>\n  <li>Offering educational and training opportunities to increase Islamic knowledge, to enhance character, and to develop skills of all those who are associated with ICNA.</li>\n  <li>Opposing immorality and oppression in all forms, supporting efforts for socioeconomic justice and civil liberties in the society.</li>\n  <li>Strengthening the bond of humanity by serving all those in need anywhere in world, with special focus on our neighborhood across North America.</li>\n  <li>Cooperating with other organizations for implementation of this program and unity in the Ummah. (Clause 6 of ICNA Charter)</li>\n</ol>\n<style>\n  ol li::marker {\n    color: red; /* makes only the numbers red */\n  }\n</style>', 'ICNA is a leading grassroots Muslim organization focused on education, social services, relief, and dawah across North America.', '[\"Community education\",\"Disaster relief\",\"Youth development\",\"Interfaith outreach\"]', 'ICNA empowers communities through education, relief, and service rooted in Islamic values.', 'Expand partnerships with mosques nationwide to increase community programs and outreach.', NULL, NULL, 'https://www.icna.org/donate/', 'https://facebook.com/icnaorg', 'https://instagram.com/icnaorg', 'https://twitter.com/icna', 'https://www.linkedin.com/company/icna/', 'https://www.youtube.com/@ICNAorg', '11-2993976', '501c3', '#006837', '#1C75BC', 1, 'active', '2026-01-31 12:18:13', '2026-01-31 14:57:59'),
(3, 'Council on American-Islamic Relations (CAIR)', 'nonprofit', '+1-202-488-8787', 'info@cair.com', 'https://www.cair.com', NULL, 'Washington', 'DC', '20005', 'https://www.cair.com/wp-content/uploads/CAIR-logo-green.png', 'Challenging stereotypes. Defending civil liberties.', 'To enhance understanding of Islam and protect civil rights.', 'CAIR is America’s largest Muslim civil liberties and advocacy organization.', '[\"Civil rights advocacy\", \"Legal defense\", \"Media engagement\", \"Community empowerment\"]', 'CAIR protects the civil rights of American Muslims through advocacy and education.', 'Build stronger relationships with mosques to support civil rights education.', NULL, NULL, 'https://www.cair.com/donate/', 'https://facebook.com/cairnational', 'https://instagram.com/cairnational', 'https://twitter.com/cairnational', 'https://www.linkedin.com/company/cair/', 'https://www.youtube.com/@CAIRNational', '52-1884951', '501c3', '#2E7D32', '#1565C0', 1, 'active', '2026-01-31 12:18:13', '2026-01-31 12:18:13'),
(4, 'Islamic Relief USA', 'nonprofit', '+1-703-370-7202', 'info@irusa.org', 'https://irusa.org', '3655 Wheeler Ave', 'Alexandria', 'VA', '22304', 'https://irusa.org/wp-content/uploads/2021/06/IRUSA-logo.png', 'Working Together for a Better World', 'To alleviate human suffering regardless of race or religion.', 'Islamic Relief USA provides humanitarian aid and development programs domestically and globally.', '[\"Disaster response\", \"Food assistance\", \"Orphan support\", \"Health services\"]', 'Islamic Relief USA delivers life-saving aid and builds resilient communities.', 'Increase mosque-based fundraising and awareness campaigns.', NULL, NULL, 'https://irusa.org/donate/', 'https://facebook.com/islamicreliefusa', 'https://instagram.com/islamicreliefusa', 'https://twitter.com/IRUSA', 'https://www.linkedin.com/company/islamic-relief-usa/', 'https://www.youtube.com/@IslamicReliefUSA', '95-4453134', '501c3', '#E31B23', '#0054A6', 1, 'active', '2026-01-31 12:18:13', '2026-01-31 12:18:13'),
(7, 'testing org', 'nonprofit', '6308008077', 'omar@rushrash.com', 'https://rushrash.com', '24204 Champion drive', 'PLAINFIELD', 'IL', '60585-1297', NULL, 'best in the west', 'no missions is the mission', 'wow what a descriptive description', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', 'none', '#28a745', '#007bff', 1, 'pending', '2026-02-01 02:28:53', '2026-02-01 04:36:40');

-- --------------------------------------------------------

--
-- Table structure for table `outreach_logs`
--

CREATE TABLE `outreach_logs` (
  `id` int(11) NOT NULL,
  `mosque_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `contacted_by_org_id` int(11) DEFAULT NULL,
  `method` varchar(50) DEFAULT NULL,
  `contacted_person_name` varchar(255) DEFAULT NULL,
  `contacted_person_phone` varchar(50) DEFAULT NULL,
  `contacted_person_email` varchar(255) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `result` text DEFAULT NULL,
  `contacted_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `outreach_logs`
--

INSERT INTO `outreach_logs` (`id`, `mosque_id`, `user_id`, `contacted_by_org_id`, `method`, `contacted_person_name`, `contacted_person_phone`, `contacted_person_email`, `notes`, `result`, `contacted_at`) VALUES
(1, 1, 2, 1, 'phone', 'Omar Aldawud', '16308008077', 'oaldawud@clarku.edu', '', '', '2026-01-31 07:46:41'),
(3, 1, 2, 1, 'phone', 'Omar Aldawud', '16308008077', 'oaldawud@clarku.edu', '', '', '2026-01-31 11:33:10'),
(4, 1, 2, 1, 'phone', 'Omar Aldawud', '16308008077', 'oaldawud@clarku.edu', '', '', '2026-01-31 11:33:26'),
(12, 1, 2, 1, 'phone', 'sddc', '16308008077', 'Omar.Aldawud@gmail.com', 'dsc', 'sdcdsc', '2026-01-31 12:12:33'),
(13, 1, 1, NULL, 'phone', 'Omar Aldawud', '16308008077', 'oaldawud@clarku.edu', '', '', '2026-01-31 19:47:47'),
(14, 1, 2, 1, 'visit', '', '', '', '', '', '2026-02-01 13:48:37'),
(15, 1, 2, 1, 'visit', 'Omar Aldawud', '16308008077', 'omar@rushrash.com', '', '', '2026-02-01 15:01:25'),
(16, 1, 2, 1, 'Email', 'Iman Jodeh', '720-608-1882', 'Omar.Aldawud@gmail.com', 'Template: Event Invitation | Subject: You Are Invited – Upcoming Event at Masjid Abu Bakr', 'Email Queued (dry run)', '2026-02-01 15:16:37'),
(17, 1, 2, 1, 'email', 'Omar Aldawud', '16308008077', 'oaldawud@clarku.edu', '', '', '2026-02-01 15:31:27'),
(18, 2, 2, 1, 'visit', 'Omar Aldawud', '16308008077', 'Omar.Aldawud@gmail.com', '', '', '2026-02-01 15:31:52'),
(19, 1, 2, 1, 'phone', 'Omar Aldawud', '16308008077', 'oaldawud@clarku.edu', '', '', '2026-02-01 15:43:41'),
(20, 1, 3, NULL, 'visit', 'Omar Aldawud', '16308008077', 'oaldawud@clarku.edu', '', '', '2026-02-01 16:08:37'),
(21, 1, 3, NULL, 'Email', 'Iman Jodeh', '720-608-1882', 'Omar.Aldawud@gmail.com', 'Template: Event Invitation | Subject: You Are Invited – Upcoming Event at Masjid Abu Bakr', 'Email Queued (dry run)', '2026-02-01 17:00:08'),
(22, 1, 3, NULL, 'Email', 'Iman Jodeh', '720-608-1882', 'Omar.Aldawud@gmail.com', 'Template: Event Invitation | Subject: You Are Invited – Upcoming Event at Masjid Abu Bakr', 'Email Queued (dry run)', '2026-02-01 17:06:29');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `organization_id` int(11) DEFAULT NULL,
  `associated_mosque_id` int(11) DEFAULT NULL,
  `user_name` varchar(255) NOT NULL,
  `role` enum('system_admin','organization_admin','mosque_admin') NOT NULL,
  `user_profile_picture` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_phone` varchar(20) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `email_verified` tinyint(1) DEFAULT 0,
  `failed_login_attempts` int(11) DEFAULT 0,
  `account_locked_until` datetime DEFAULT NULL,
  `last_login_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `organization_id`, `associated_mosque_id`, `user_name`, `role`, `user_profile_picture`, `user_email`, `user_phone`, `password_hash`, `is_active`, `email_verified`, `failed_login_attempts`, `account_locked_until`, `last_login_at`, `created_at`) VALUES
(1, NULL, NULL, 'Omar A.', 'system_admin', '', 'sysadmin@example.com', '', '$2y$10$yHOtUIW7U5codj3RwAWBz.gTy6ZqJvJwAx2hWFrdknJ.zXRTZTkH6', 1, 1, 0, NULL, '2026-02-01 17:10:13', '2026-01-31 14:29:34'),
(2, 1, NULL, 'Sr. Fatima', 'organization_admin', 'https://islaminprison.org/wp-content/uploads/2024/11/IslamInPrison-logo-Final.png', 'orgadmin@example.com', '', '$2y$10$yHOtUIW7U5codj3RwAWBz.gTy6ZqJvJwAx2hWFrdknJ.zXRTZTkH6', 1, 1, 0, NULL, '2026-02-01 17:07:14', '2026-01-31 14:29:34'),
(3, NULL, 1, 'Mosque Admin', 'mosque_admin', 'https://coloradomuslimsociety.org/wp-content/uploads/2018/03/cms-header-1-1024x94.gif', 'mosqueadmin@example.com', '', '$2y$10$yHOtUIW7U5codj3RwAWBz.gTy6ZqJvJwAx2hWFrdknJ.zXRTZTkH6', 1, 1, 0, NULL, '2026-02-01 17:06:12', '2026-01-31 14:29:34'),
(4, 1, NULL, 'ICNA Admin', 'organization_admin', 'https://icna.org/wp-content/uploads/2022/02/ICNA-Logo-Updated-01.png', 'info@icna.org', '', '$2y$10$yHOtUIW7U5codj3RwAWBz.gTy6ZqJvJwAx2hWFrdknJ.zXRTZTkH6', 1, 1, 0, NULL, '2026-01-31 07:50:03', '2026-01-31 14:29:34'),
(5, 7, NULL, 'Omar Aldawud', '', '', 'omar@rushrash.com', '6308008077', '', 1, 0, 0, NULL, NULL, '2026-02-01 02:28:53');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `email_templates`
--
ALTER TABLE `email_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `mosques`
--
ALTER TABLE `mosques`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_state` (`state`);

--
-- Indexes for table `organizations`
--
ALTER TABLE `organizations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `outreach_logs`
--
ALTER TABLE `outreach_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mosque_id` (`mosque_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `contacted_by_org_id` (`contacted_by_org_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `organization_id` (`organization_id`),
  ADD KEY `associated_mosque_id` (`associated_mosque_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `email_templates`
--
ALTER TABLE `email_templates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `mosques`
--
ALTER TABLE `mosques`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=173;

--
-- AUTO_INCREMENT for table `organizations`
--
ALTER TABLE `organizations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `outreach_logs`
--
ALTER TABLE `outreach_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
