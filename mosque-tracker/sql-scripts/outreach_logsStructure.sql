-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 29, 2026 at 12:25 AM
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `outreach_logs`
--
ALTER TABLE `outreach_logs`
  ADD CONSTRAINT `outreach_logs_ibfk_1` FOREIGN KEY (`mosque_id`) REFERENCES `mosques` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `outreach_logs_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
