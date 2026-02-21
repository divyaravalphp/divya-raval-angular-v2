-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Feb 20, 2026 at 12:49 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `angular_portfolio`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `phone`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, Divya Raval, 9725528865, admin@divya.com, $2a$10$7Y49NVouzGF0UGCsg106Puw37KLR7Eu3isfFsRpEBzEiat36mbTHO, 2026-02-13 05:21:19, 2026-02-13 05:21:19);

-- --------------------------------------------------------

--
-- Table structure for table `admins_1`
--

CREATE TABLE `admins_1` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(15) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `education`
--

CREATE TABLE `education` (
  `id` int(11) NOT NULL,
  `degree` varchar(100) NOT NULL,
  `institution` varchar(255) NOT NULL,
  `period` varchar(50) DEFAULT NULL,
  `result` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `education`
--

INSERT INTO `education` (`id`, `degree`, `institution`, `period`, `result`, `created_at`) VALUES
(1, M.Sc. (CA & IT), Gujarat University - K.S.School From Business Management, 2013–2015, 59.04% (Post-Graduation), 2026-02-14 17:12:00),
(2, B.Sc. (CA & IT), Gujarat University - K.S.School From Business Management, 2010–2013, 57.74% (Graduation), 2026-02-14 17:12:00),
(3, H.S.C. (12th Grade), Gujarat Secondary Education Board, March 2010, 84.43% (Distinction), 2026-02-14 17:12:00),
(4, S.S.C. (10th Grade), Gujarat Secondary Education Board, March 2008, 76.46% (Distinction), 2026-02-14 17:12:00);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `submitted_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `reply_text` text DEFAULT NULL,
  `replied_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `name`, `email`, `phone`, `message`, `submitted_at`, `reply_text`, `replied_at`) VALUES
(1, Subramania Bharati, subramania.bharati236@yahoo.com, 7613966783, sdfgsdf, 2026-02-11 12:59:35, NULL, NULL),
(2, Tushar, tushar.pladiya2712@gmail.com, 7433053030, HI deval, 2026-02-11 15:55:41, NULL, NULL),
(3, Tushar, tushar.pladiya2712@gmail.com, 7433053030, HI deval, 2026-02-11 15:55:43, NULL, NULL),
(4, Roodransh Paladiya, roodransh@test.com, 8877558855, Hello Mumma, 2026-02-16 10:51:06, NULL, NULL),
(5, Roodransh Paladiya, roodransh@test.com, 8877558855, Hello Mumma, 2026-02-16 10:51:13, NULL, NULL),
(6, Roodransh Paladiya, roodransh@test.com, 8877558855, Hello Mumma, 2026-02-16 11:01:49, NULL, NULL),
(7, Roodransh Paladiya, roodransh@test.com, 8877558855, Hello Mumma, 2026-02-16 11:02:04, NULL, NULL),
(8, Roodransh Paladiya, roodransh@test.com, 8877558855, Hello Mumma, 2026-02-16 11:02:11, NULL, NULL),
(9, Roodransh Paladiya, roodransh@test.com, 8877558855, Hello Mumma, 2026-02-16 11:02:16, hello roodransh, 2026-02-16 11:51:28),
(10, Roodransh Paladiya, roodransh@test.com, 8877558855, Hello Mumma, 2026-02-16 11:02:42, NULL, NULL),
(11, Roodransh Paladiya, roodransh@test.com, 8877558855, Hello Mumma, 2026-02-16 11:08:32, hello reply, 2026-02-16 11:50:33),
(12, Divya Raval MSG, demo@gmail.com, +919725528865, Heooo, 2026-02-16 11:10:05, NULL, NULL),
(13, Divya Raval dfdsf, dfdsf@gmail.com, +919725528865, asdfsf, 2026-02-16 11:12:10, NULL, NULL),
(14, Roodransh Paladiya, roodransh1505@gmail.com, 9725528865, My portfolio testing, 2026-02-16 11:53:05, my portfolio reply testing, 2026-02-16 11:53:45),
(15, Divya, ravaldivyaks@gmail.com, 7433053030, hello 19 february, 2026-02-19 05:52:36, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `professional_experiences`
--

CREATE TABLE `professional_experiences` (
  `id` int(10) UNSIGNED NOT NULL,
  `role` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `period_start` varchar(25) NOT NULL,
  `period_end` varchar(25) DEFAULT NULL,
  `location` varchar(100) DEFAULT Remote,
  `description` text DEFAULT NULL,
  `projects` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`projects`)),
  `achievements` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`achievements`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `professional_experiences`
--

INSERT INTO `professional_experiences` (`id`, `role`, `company`, `period_start`, `period_end`, `location`, `description`, `projects`, `achievements`, `created_at`, `updated_at`) VALUES
(1, Senior Laravel Developer - Remote, Dsolution Creation, 2026-01-01, NULL, Telangana, India, Leading the development of complex web architectures with a focus on modern full-stack technologies and advanced CSS styling for high-performance applications., [\"MLM System: Architecting a 6-leg forced matrix MLM platform using Laravel, featuring deterministic placement logic and automated reward calculations.\", \"Custom UI Engineering: Implementing intricate CSS-driven designs to ensure data integrity and clear visual hierarchy in user downline visualizations.\"], [\"Engineered a scalable MLM tree logic supporting infinite depth with robust transaction-based placement.\", \"Optimized data visibility rules for tiered user access and parent-child hierarchy.\"], 2026-02-16 09:00:49, 2026-02-16 09:00:49),
(2, Parental Career Gap (Professional Development), Self-Directed Learning, 2022-05-01, 2025-12-31, Remote, Dedicated time to family responsibilities while actively upskilling in modern web technologies to stay at the forefront of the software engineering industry., [\"Advanced Framework Study: Mastered Laravel 12, Angular, and Vue.js for building reactive frontend interfaces.\", \"Backend & Runtime Environments: Deep-dived into Node.js for asynchronous, event-driven server-side development.\"], [\"Successfully transitioned technical stack from traditional PHP to modern JavaScript frameworks (Angular/Vue) and Node.js.\", \"Completed comprehensive training on Laravel 12 newest features, ensuring mastery of the latest enterprise-grade PHP standards.\"], 2026-02-16 09:00:49, 2026-02-16 09:00:49),
(3, Senior Software Developer, Silver Touch Technologies Ltd., 2021-06-01, 2022-05-31, Ahmedabad, India, Led development of high-performance systems including Land Revenue and E-Learning portals[cite: 25, 29]., [\"Land Revenue Information System\", \"UTIKS for ICCR\", \"National War Memorial\"], [\"Engineered Land Revenue system for stakeholder accessibility [cite: 32].\", \"Architected UTIKS reducing admin overhead[cite: 33].\"], 2026-02-16 09:00:49, 2026-02-16 09:00:49),
(4, Senior Software Developer, Silverwing Technologies Ltd., 2019-10-01, 2021-05-31, Ahmedabad, India, Managed full project lifecycles and refactored core platforms for AI integration[cite: 37, 39]., [\"Zoobiz AI Matching\", \"Chitra-B Publicity\", \"Fincasys Financials\"], [\"Integrated Geo-tagging in Zoobiz [cite: 44].\", \"Streamlined multi-site management for Vishwanath Builders[cite: 45].\"], 2026-02-16 09:00:49, 2026-02-16 09:00:49),
(5, PHP Developer, IDream Technosoft Pvt. Ltd., 2015-06-01, 2019-09-30, Ahmedabad, India, Focused on product standardization and modernization of legacy PHP platforms[cite: 49, 50]., [\"SuperinnPlus Modernization\"], [\"Modernized SuperinnPlus core modules [cite: 53].\", \"Improved platform stability and UX[cite: 51].\"], 2026-02-16 09:00:49, 2026-02-16 09:00:49);

-- --------------------------------------------------------

--
-- Table structure for table `profile_info`
--

CREATE TABLE `profile_info` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `current_title` varchar(150) DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address_line_1` varchar(255) DEFAULT NULL,
  `address_line_2` varchar(255) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `zip_code` varchar(15) DEFAULT NULL,
  `experience_years` float(8,2) DEFAULT NULL,
  `resume` varchar(200) NOT NULL,
  `photo` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profile_info`
--

INSERT INTO `profile_info` (`id`, `full_name`, `current_title`, `summary`, `email`, `phone`, `address_line_1`, `address_line_2`, `city`, `state`, `zip_code`, `experience_years`, `resume`, `photo`, `created_at`, `updated_at`) VALUES
(1, Divya Raval, Senior Software Developer, I am a results-driven Senior Software Developer with over 7 years of experience in delivering high-impact digital solutions. My expertise lies in architecting scalable web applications and RESTful APIs using PHP frameworks like Laravel and CodeIgniter. I have a proven track record of engineering complex systems for both private enterprises and government sectors, focusing on improving system efficiency and user satisfaction., ravaldivyaks@gmail.com, 9725528865, 501, Radhe Nandan Apartments, , Near Suvidha Hospital, Sanand, Sanand,Ahmedabad, Gujarat, 382110, 7.00, resume-1771236130883.pdf, photo-1771237366237.png, 2026-02-13 12:40:37, 2026-02-19 09:31:07);

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `company` varchar(255) DEFAULT NULL,
  `category` varchar(100) NOT NULL,
  `type_class` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`features`)),
  `link` varchar(255) DEFAULT NULL,
  `status` enum(active,development,archived) DEFAULT development,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `company`, `category`, `type_class`, `description`, `features`, `link`, `status`, `created_at`, `updated_at`) VALUES
(1, Indian Naval Placement Agency (INPA), Silver Touch Technologies, Government & Recruitment, gov-project, Developed a specialized recruitment portal for the Indian Navy, facilitating seamless career transitions for naval veterans and retiring personnel into the corporate sector., [\"Advanced job-matching engine for veteran skillsets\",\"Secure registration and verification for ex-servicemen\",\"Employer dashboard for corporate talent acquisition.\"], https://www.indiannavy.nic.in/inpa/, archived, 2026-02-13 17:35:09, 2026-02-19 09:32:03),
(2, Chitra-B Publicity, SilverWing Technologies Pvt. Ltd., Media & Advertising, media-project, Administered the full-scale website and REST API infrastructure for a media organization, optimizing the digital distribution of tailored media bookings across diverse advertising sectors., [\"[\\\"Robust REST API for high-availability data exchange\\\"\",\"\\\"Automated media dissemination in multiple formats (PPT\",\"CSV\",\"PDF)\\\"\",\"\\\"Tailored booking engine for client-specific media area needs\\\"]\"], https://chitra-b-publicity.com/, archived, 2026-02-13 17:35:09, 2026-02-19 09:33:13),
(3, Vishwanath Builders, NULL, Real Estate & ERP, realestate-project, Led the bespoke development of a comprehensive real estate management suite, streamlining multi-site order workflows and administrative operations for high-volume construction projects., [\"Multi-site order and product control management\", \"Automated employee administration and payroll systems\", \"REST API integration for mobile application menus and user roles\"], https://www.vishwanathbuilders.com/, active, 2026-02-13 17:35:09, 2026-02-13 17:35:09),
(4, Zoobiz, NULL, Professional Networking & B2B, networking-project, Lead the comprehensive refactoring and feature engineering of a professional networking platform, significantly boosting user engagement through data-driven matching and location-based services., [\"AI-driven matching for professional networking\", \"Geo-tagging for local business discovery\", \"Digital classifieds and B2B partnership tools\"], https://zoobiz.app/, active, 2026-02-13 17:35:09, 2026-02-13 17:35:09),
(5, Ministry of Ayush, NULL, Government of India, gov-project, Spearheaded the end-to-end development of the official portal for traditional medicine initiatives (AYUSH), ensuring a secure and scalable platform., [\"GIGW-compliant frontend for accessibility\", \"Centralized API Architecture for sub-portals\", \"STQC security audit cleared\"], https://ayush.gov.in/, active, 2026-02-13 17:35:09, 2026-02-13 17:35:09),
(6, InnsAble, NULL, Hospitality SaaS, saas-project, A bespoke Property Management System with a centralized calendar for real-time room management and streamlined booking., [\"GST-compliant invoicing\", \"Housekeeping & facility tracking\", \"Complex guest stay history management\"], https://www.idreamtechnosoft.com/innsable.php, active, 2026-02-13 17:35:09, 2026-02-13 17:35:09),
(7, ICCR Portal, NULL, Government of India, gov-project, Architected the digital face of India\s cultural diplomacy, supporting scholarship tracking across 190+ countries., [\"International student application APIs\", \"Multi-language support for 37 global centers\", \"Encrypted foreign national records\"], https://iccr.gov.in/, active, 2026-02-13 17:35:09, 2026-02-13 17:35:09),
(8, Fincasys, NULL, FinTech / PropTech, saas-project, Automated financial workflows and communication frameworks for residents and gated community gatekeepers., [\"Recurring billing & expense tracking\", \"Digital intercom gatekeeper app\", \"Encrypted payment gateway integration\"], https://www.fincasys.com/, active, 2026-02-13 17:35:09, 2026-02-13 17:35:09),
(9, GDMA Portal, NULL, Industrial Association, enterprise-project, Comprehensive web portal and RESTful API suite managing operations for 1,500+ chemical manufacturing units., [\"Real-time sync with MyAssociation app\", \"Automated membership renewals\", \"Optimized SQL for searchable directories\"], https://gdma.myassociation.app/, active, 2026-02-13 17:35:09, 2026-02-13 17:35:09),
(10, 6-Leg Forced Matrix MLM, Dsolutions, FinTech & Network Marketing, mlm-project, Architecting a deterministic, high-integrity MLM ecosystem with a focus on infinite depth tree structures and automated reward distribution using Laravel 12., [\"\Deterministic placement logic (1 → 6) with no gaps\\",\"\Immediate\",\"sequential earnings calculation with DB transactions\\",\"\Advanced downline visibility and hierarchical UI state management\\"], https://mlmpro.shop/, development, 2026-02-14 16:39:15, 2026-02-14 16:39:15);

-- --------------------------------------------------------

--
-- Table structure for table `social_links`
--

CREATE TABLE `social_links` (
  `id` int(11) NOT NULL,
  `profile_id` int(11) DEFAULT NULL,
  `platform_name` varchar(50) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `icon_class` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `social_links`
--

INSERT INTO `social_links` (`id`, `profile_id`, `platform_name`, `url`, `icon_class`) VALUES
(1, NULL, Linkedin, https://linkedin.com/in/divya-raval-672594149/, fa fa-linkedin),
(2, NULL, GitHub, https://github.com/divyaravalphp, fa fa-github),
(4, NULL, Facebook, https://www.facebook.com/share/1AcnECYd1t/, fa fa-facebook);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admins_email_unique` (`email`);

--
-- Indexes for table `admins_1`
--
ALTER TABLE `admins_1`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `education`
--
ALTER TABLE `education`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `professional_experiences`
--
ALTER TABLE `professional_experiences`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profile_info`
--
ALTER TABLE `profile_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `social_links`
--
ALTER TABLE `social_links`
  ADD PRIMARY KEY (`id`),
  ADD KEY `profile_id` (`profile_id`);

--
-- SERIAL for dumped tables
--

--
-- SERIAL for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(10) UNSIGNED NOT NULL SERIAL, SERIAL=2;

--
-- SERIAL for table `admins_1`
--
ALTER TABLE `admins_1`
  MODIFY `id` int(11) NOT NULL SERIAL;

--
-- SERIAL for table `education`
--
ALTER TABLE `education`
  MODIFY `id` int(11) NOT NULL SERIAL, SERIAL=5;

--
-- SERIAL for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL SERIAL, SERIAL=16;

--
-- SERIAL for table `professional_experiences`
--
ALTER TABLE `professional_experiences`
  MODIFY `id` int(10) UNSIGNED NOT NULL SERIAL, SERIAL=7;

--
-- SERIAL for table `profile_info`
--
ALTER TABLE `profile_info`
  MODIFY `id` int(11) NOT NULL SERIAL, SERIAL=2;

--
-- SERIAL for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL SERIAL, SERIAL=11;

--
-- SERIAL for table `social_links`
--
ALTER TABLE `social_links`
  MODIFY `id` int(11) NOT NULL SERIAL, SERIAL=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `social_links`
--
ALTER TABLE `social_links`
  ADD CONSTRAINT `social_links_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `profile_info` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
