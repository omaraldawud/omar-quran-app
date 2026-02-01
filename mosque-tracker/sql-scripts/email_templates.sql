-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 01, 2026 at 09:42 AM
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
  `template_organization_id` int(11) DEFAULT NULL,
  `template_mosque_id` int(11) DEFAULT NULL,
  `template_name` varchar(100) NOT NULL,
  `template_purpose` varchar(50) NOT NULL,
  `template_subject` varchar(255) NOT NULL,
  `template_body` text NOT NULL,
  `template_placeholders` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ;

--
-- Dumping data for table `email_templates`
--

INSERT INTO `email_templates` (`id`, `template_organization_id`, `template_mosque_id`, `template_name`, `template_purpose`, `template_subject`, `template_body`, `template_placeholders`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, 'Welcome', 'Welcome', 'Welcome to Our Program', 'Hello, we are reaching out to connect with your organization. We look forward to collaborating with you.', '[]', '2026-02-01 16:42:25', '2026-02-01 16:42:25'),
(2, 1, NULL, 'Event', 'Event', 'Join Our Upcoming Event', 'Dear Partner, we are hosting an event soon. We would love for your organization to participate.', '[]', '2026-02-01 16:42:25', '2026-02-01 16:42:25'),
(3, 2, NULL, 'Welcome', 'Welcome', 'Welcome to Our Program', 'Greetings! We are excited to start this journey together with your organization.', '[]', '2026-02-01 16:42:25', '2026-02-01 16:42:25'),
(4, 2, NULL, 'Thank You', 'ThankYou', 'Thank You for Your Support', 'We sincerely appreciate your support and look forward to our continued partnership.', '[]', '2026-02-01 16:42:25', '2026-02-01 16:42:25'),
(5, 3, NULL, 'Welcome', 'Welcome', 'Welcome to Our Program', 'Hello, we are happy to have your organization on board.', '[]', '2026-02-01 16:42:25', '2026-02-01 16:42:25'),
(6, 3, NULL, 'Event', 'Event', 'Join Our Upcoming Event', 'You are invited to our upcoming event. Details inside.', '[]', '2026-02-01 16:42:25', '2026-02-01 16:42:25'),
(7, 4, NULL, 'Welcome', 'Welcome', 'Welcome to Our Program', 'Dear Friend, welcome to our network. Let’s achieve great things together.', '[]', '2026-02-01 16:42:25', '2026-02-01 16:42:25'),
(8, 4, NULL, 'Thank You', 'ThankYou', 'Thank You for Your Support', 'Your support is invaluable to our mission. Thank you!', '[]', '2026-02-01 16:42:25', '2026-02-01 16:42:25'),
(9, NULL, 1, 'Welcome', 'Welcome', 'Welcome to Our Mosque', 'Hello, we are excited to connect with your mosque community.', '[]', '2026-02-01 16:42:25', '2026-02-01 16:42:25'),
(10, NULL, 1, 'Event', 'Event', 'Join Our Upcoming Event', 'Dear Community, we invite you to our mosque event this weekend.', '[]', '2026-02-01 16:42:25', '2026-02-01 16:42:25'),
(11, NULL, 2, 'Welcome', 'Welcome', 'Welcome to Our Mosque', 'Greetings! We are happy to have your mosque engaged with our programs.', '[]', '2026-02-01 16:42:25', '2026-02-01 16:42:25'),
(12, NULL, 2, 'Thank You', 'ThankYou', 'Thank You for Your Support', 'We appreciate your support and involvement in our mosque activities.', '[]', '2026-02-01 16:42:25', '2026-02-01 16:42:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `email_templates`
--
ALTER TABLE `email_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_template_org_mosque` (`template_organization_id`,`template_mosque_id`,`template_name`),
  ADD KEY `mosque_id` (`template_mosque_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `email_templates`
--
ALTER TABLE `email_templates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `email_templates`
--
ALTER TABLE `email_templates`
  ADD CONSTRAINT `email_templates_ibfk_1` FOREIGN KEY (`template_organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `email_templates_ibfk_2` FOREIGN KEY (`template_mosque_id`) REFERENCES `mosques` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
