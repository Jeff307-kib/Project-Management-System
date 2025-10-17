-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 17, 2025 at 04:35 PM
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
-- Database: `projectmanagementsystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `attachments`
--

CREATE TABLE `attachments` (
  `id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `uploaded_by` int(11) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_type` varchar(255) NOT NULL,
  `file_size` float NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `uploaded_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attachments`
--

INSERT INTO `attachments` (`id`, `task_id`, `uploaded_by`, `file_name`, `file_type`, `file_size`, `file_path`, `uploaded_at`) VALUES
(21, 89, 25, 'report_diagrams.drawio.png', 'png', 0.12, 'uploads/attachments/68e0c1740080f7.35597965.png', '2025-10-04 13:10:52'),
(22, 89, 25, 'Teacher Appreciation.pdf', 'pdf', 0.16, 'uploads/attachments/68e0c1e6634e74.26611649.pdf', '2025-10-04 13:12:46'),
(23, 90, 18, 'Screenshot 2024-11-18 093317.png', 'png', 0.1, 'uploads/attachments/68e0c31f5ee745.32207080.png', '2025-10-04 13:17:59'),
(24, 60, 18, 'Screenshot 2024-11-18 093317.png', 'png', 0.1, 'uploads/attachments/68e0cc100ce5d0.36445863.png', '2025-10-04 13:56:08'),
(25, 70, 18, 'Screenshot 2024-11-18 093317.png', 'png', 0.1, 'uploads/attachments/68e0cc536bd970.75356416.png', '2025-10-04 13:57:15'),
(26, 92, 18, 'Screenshot 2024-11-18 093317.png', 'png', 0.1, 'uploads/attachments/68e0cd88a1b187.55328426.png', '2025-10-04 14:02:24'),
(27, 93, 18, 'Teacher Appreciation.pdf', 'pdf', 0.16, 'uploads/attachments/68e9093e2e36b8.47092583.pdf', '2025-10-10 19:55:18'),
(28, 93, 18, 'Back End Web Development Autumn 2024 - Summer 2025 Assignment QP [19333].pdf', 'pdf', 0.28, 'uploads/attachments/68e909462c4913.80002677.pdf', '2025-10-10 19:55:26'),
(29, 95, 18, 'P00209992_Sai_Wunaa_Tun_Backend_Web_Development.pdf', 'pdf', 13.83, 'uploads/attachments/68ee55beaf5690.07809864.pdf', '2025-10-14 20:23:02'),
(30, 95, 18, 'Tasty Chicken Shawarma with Creamy Garlic Sauce….jpg', 'jpg', 0.1, 'uploads/attachments/68ee55d698bf98.25082547.jpg', '2025-10-14 20:23:26'),
(31, 95, 18, 'Beginner\'s Guide To Fresh Homemade Pasta Dough….jpg', 'jpg', 0.08, 'uploads/attachments/68ee568063ddd2.21983221.jpg', '2025-10-14 20:26:16'),
(32, 95, 18, 'Food_ER.drawio.png', 'png', 0.32, 'uploads/attachments/68ee83f7044096.52123389.png', '2025-10-14 23:40:15'),
(33, 97, 26, 'P00209992_Sai_Wunaa_Tun_Backend_Web_Development (1).pdf', 'pdf', 13.78, 'uploads/attachments/68f0aaf5f01de8.96741722.pdf', '2025-10-16 14:51:10'),
(34, 97, 26, 'Learn React.pdf', 'pdf', 0.35, 'uploads/attachments/68f0b228c8c3d0.49741625.pdf', '2025-10-16 15:21:52');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `comment_text` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `task_id`, `created_by`, `comment_text`, `created_at`, `updated_at`) VALUES
(11, 54, 18, 'kdisjnfu', '2025-09-11 19:24:54', '2025-09-11 19:24:54'),
(12, 57, 18, 'This is comment', '2025-10-01 17:52:54', '2025-10-01 17:52:54'),
(17, 89, 25, 'This is the first comment.', '2025-10-04 13:11:01', '2025-10-04 13:11:01'),
(18, 89, 25, 'This is another comment.', '2025-10-04 13:12:55', '2025-10-04 13:12:55'),
(19, 90, 18, 'New Comment', '2025-10-04 13:18:06', '2025-10-04 13:18:06'),
(20, 60, 18, 'this is comment', '2025-10-04 13:56:13', '2025-10-04 13:56:13'),
(21, 70, 18, 'This is comment', '2025-10-04 13:57:21', '2025-10-04 13:57:21'),
(22, 92, 18, 'comment', '2025-10-04 14:02:29', '2025-10-04 14:02:29'),
(23, 93, 18, 'This is first comment.', '2025-10-10 19:55:33', '2025-10-10 19:55:33'),
(24, 95, 18, 'This is comment', '2025-10-14 20:23:49', '2025-10-14 20:23:49'),
(25, 95, 18, 'Can you add the attachment of the use case diagram please.', '2025-10-14 20:25:51', '2025-10-14 20:25:51'),
(26, 97, 26, 'I\'ve added the attachment in the task.', '2025-10-16 14:57:19', '2025-10-16 14:57:19');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `recipient_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `related_id` int(11) NOT NULL,
  `invitation_status` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `created_at` datetime NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `recipient_id`, `sender_id`, `type`, `related_id`, `invitation_status`, `message`, `created_at`, `is_read`) VALUES
(189, 20, 17, 'Task Assign', 44, NULL, 'Admin assigned you a new task in Food Fusion : Task noti red dot', '2025-09-11 22:09:29', 0),
(191, 20, 18, 'Task Update', 44, NULL, 'The status of your Task \'Task noti red dot\' from Workspace: \'Food Fusion\' has been updated to In Progress', '2025-09-11 22:12:59', 0),
(193, 20, 18, 'Task Update', 44, NULL, 'The status of your Task \'Task new\' from Workspace: \'Food Fusion\' has been updated to Needs Revision', '2025-09-11 22:13:16', 0),
(196, 20, 17, 'Task Assign', 44, NULL, 'Admin assigned you a new task in Food Fusion : New ', '2025-09-11 22:13:51', 0),
(198, 20, 17, 'Task Assign', 44, NULL, 'Admin assigned you a new task in Food Fusion : Red', '2025-09-11 22:14:25', 0),
(199, 20, 17, 'Task Assign', 44, NULL, 'Admin assigned you a new task in Food Fusion : Red Testing', '2025-09-11 22:14:46', 0),
(204, 20, 18, 'Task Update', 44, NULL, 'The status of your Task \'Task new\' from Workspace: \'Food Fusion\' has been updated to Pending', '2025-09-13 14:03:11', 0),
(206, 20, 18, 'Task Update', 44, NULL, 'The status of your Task \'new comment\' from Workspace: \'Food Fusion\' has been updated to Pending', '2025-09-13 14:03:50', 0),
(209, 20, 18, 'Task Update', 44, NULL, 'The status of your Task \'Task new\' from Workspace: \'Food Fusion\' has been updated to Completed', '2025-09-13 14:03:55', 0),
(211, 20, 18, 'Task Update', 44, NULL, 'The status of your Task \'new comment\' from Workspace: \'Food Fusion\' has been updated to Completed', '2025-09-13 14:03:56', 0),
(213, 20, 18, 'Task Update', 44, NULL, 'The status of your Task \'Test after rejection\' from Workspace: \'Food Fusion\' has been updated to Pending', '2025-09-13 19:36:03', 0),
(215, 20, 17, 'Task Assign', 48, NULL, 'Admin assigned you a new task in Invitation : Report', '2025-09-13 20:26:28', 0),
(217, 20, 18, 'Task Update', 44, NULL, 'The status of your Task \'Test after rejection\' from Workspace: \'Food Fusion\' has been updated to Needs Revision', '2025-09-17 14:48:01', 0),
(221, 20, 18, 'Task Update', 44, NULL, 'The status of your Task \'Test after rejection\' from Workspace: \'Food Fusion\' has been updated to Pending', '2025-09-18 23:45:09', 0),
(223, 20, 17, 'Task Assign', 44, NULL, 'Admin assigned you a new task in Food Fusion : Another task testing', '2025-09-28 12:09:13', 0),
(225, 20, 18, 'Task Update', 44, NULL, 'The status of your Task \'Test after rejection\' from Workspace: \'Food Fusion\' has been updated to Needs Revision', '2025-09-28 14:12:38', 0),
(227, 20, 18, 'Task Update', 44, NULL, 'The status of your Task \'Test after rejection\' from Workspace: \'Food Fusion\' has been updated to Pending', '2025-09-28 18:03:29', 0),
(229, 20, 18, 'Task Update', 44, NULL, 'The status of your Task \'Test after rejection\' from Workspace: \'Food Fusion\' has been updated to Completed', '2025-09-28 18:05:59', 0),
(230, 20, 18, 'Task Update', 45, NULL, 'The status of your Task \'Trio\' from Workspace: \'SE Mini Project\' has been updated to In Progress', '2025-10-01 15:21:10', 0),
(232, 20, 18, 'Task Update', 45, NULL, 'The status of your Task \'Trio\' from Workspace: \'SE Mini Project\' has been updated to Pending', '2025-10-01 15:21:12', 0),
(234, 22, 17, 'Role Change', 44, NULL, 'You have been remove from the Workspace: Food Fusion.', '2025-10-01 15:35:24', 0),
(235, 15, 17, 'Role Change', 44, NULL, 'You have been remove from the Workspace: Food Fusion.', '2025-10-01 15:44:28', 0),
(237, 20, 18, 'Task Update', 44, NULL, 'A new comment was posted in the task \'Task noti red dot\' from Food Fusion.', '2025-10-01 17:52:54', 0),
(274, 20, 18, 'Task Update', 44, NULL, 'The status of your Task \'Another task testing\' from Workspace: \'Food Fusion\' has been updated to In Progress', '2025-10-04 13:01:01', 0),
(295, 20, 18, 'Task Update', 44, NULL, 'The status of your Task \'Red Testing\' from Workspace: \'Food Fusion\' has been updated to In Progress', '2025-10-04 13:55:59', 0),
(297, 20, 18, 'Task Update', 44, NULL, 'A new attachment was added to the task \'Red Testing\' from Food Fusion.', '2025-10-04 13:56:08', 0),
(299, 20, 18, 'Task Update', 44, NULL, 'A new comment was posted in the task \'Red Testing\' from Food Fusion.', '2025-10-04 13:56:13', 0),
(301, 20, 18, 'Task Update', 44, NULL, 'The status of your Task \'Red Testing\' from Workspace: \'Food Fusion\' has been updated to Pending', '2025-10-04 13:56:19', 0),
(303, 20, 18, 'Task Update', 44, NULL, 'The status of your Task \'Red Testing\' from Workspace: \'Food Fusion\' has been updated to Completed', '2025-10-04 13:56:38', 0),
(306, 20, 17, 'Task Assign', 44, NULL, 'Admin assigned you a new task in Food Fusion : New Task 001', '2025-10-04 14:01:51', 0),
(307, 21, 17, 'Task Assign', 44, NULL, 'Admin assigned you a new task in Food Fusion : New Task 001', '2025-10-04 14:01:51', 0),
(308, 23, 17, 'Task Assign', 44, NULL, 'Admin assigned you a new task in Food Fusion : New Task 001', '2025-10-04 14:01:51', 0),
(310, 20, 18, 'Task Update', 44, NULL, 'The status of your Task \'New Task 001\' from Workspace: \'Food Fusion\' has been updated to In Progress', '2025-10-04 14:02:16', 0),
(311, 21, 18, 'Task Update', 44, NULL, 'The status of your Task \'New Task 001\' from Workspace: \'Food Fusion\' has been updated to In Progress', '2025-10-04 14:02:16', 0),
(312, 23, 18, 'Task Update', 44, NULL, 'The status of your Task \'New Task 001\' from Workspace: \'Food Fusion\' has been updated to In Progress', '2025-10-04 14:02:16', 0),
(314, 20, 18, 'Task Update', 44, NULL, 'A new attachment was added to the task \'New Task 001\' from Food Fusion.', '2025-10-04 14:02:24', 0),
(315, 21, 18, 'Task Update', 44, NULL, 'A new attachment was added to the task \'New Task 001\' from Food Fusion.', '2025-10-04 14:02:24', 0),
(316, 23, 18, 'Task Update', 44, NULL, 'A new attachment was added to the task \'New Task 001\' from Food Fusion.', '2025-10-04 14:02:24', 0),
(318, 20, 18, 'Task Update', 44, NULL, 'A new comment was posted in the task \'New Task 001\' from Food Fusion.', '2025-10-04 14:02:29', 0),
(319, 21, 18, 'Task Update', 44, NULL, 'A new comment was posted in the task \'New Task 001\' from Food Fusion.', '2025-10-04 14:02:29', 0),
(320, 23, 18, 'Task Update', 44, NULL, 'A new comment was posted in the task \'New Task 001\' from Food Fusion.', '2025-10-04 14:02:29', 0),
(322, 20, 18, 'Task Update', 44, NULL, 'The status of your Task \'New Task 001\' from Workspace: \'Food Fusion\' has been updated to Pending', '2025-10-04 14:02:36', 0),
(323, 21, 18, 'Task Update', 44, NULL, 'The status of your Task \'New Task 001\' from Workspace: \'Food Fusion\' has been updated to Pending', '2025-10-04 14:02:36', 0),
(324, 23, 18, 'Task Update', 44, NULL, 'The status of your Task \'New Task 001\' from Workspace: \'Food Fusion\' has been updated to Pending', '2025-10-04 14:02:36', 0),
(326, 20, 18, 'Task Update', 44, NULL, 'The status of your Task \'New Task 001\' from Workspace: \'Food Fusion\' has been updated to Completed', '2025-10-04 14:03:01', 0),
(327, 21, 18, 'Task Update', 44, NULL, 'The status of your Task \'New Task 001\' from Workspace: \'Food Fusion\' has been updated to Completed', '2025-10-04 14:03:01', 0),
(328, 23, 18, 'Task Update', 44, NULL, 'The status of your Task \'New Task 001\' from Workspace: \'Food Fusion\' has been updated to Completed', '2025-10-04 14:03:01', 0),
(330, 20, 17, 'Task Assign', 44, NULL, 'Admin assigned you a new task in Food Fusion : Implement OAuth', '2025-10-10 19:54:19', 0),
(331, 21, 17, 'Task Assign', 44, NULL, 'Admin assigned you a new task in Food Fusion : Implement OAuth', '2025-10-10 19:54:19', 0),
(332, 23, 17, 'Task Assign', 44, NULL, 'Admin assigned you a new task in Food Fusion : Implement OAuth', '2025-10-10 19:54:19', 0),
(334, 20, 18, 'Task Update', 44, NULL, 'The status of your Task \'Implement OAuth\' from Workspace: \'Food Fusion\' has been updated to In Progress', '2025-10-10 19:54:44', 0),
(335, 21, 18, 'Task Update', 44, NULL, 'The status of your Task \'Implement OAuth\' from Workspace: \'Food Fusion\' has been updated to In Progress', '2025-10-10 19:54:44', 0),
(336, 23, 18, 'Task Update', 44, NULL, 'The status of your Task \'Implement OAuth\' from Workspace: \'Food Fusion\' has been updated to In Progress', '2025-10-10 19:54:44', 0),
(338, 20, 18, 'Task Update', 44, NULL, 'A new attachment was added to the task \'Implement OAuth\' from Food Fusion.', '2025-10-10 19:55:18', 0),
(339, 21, 18, 'Task Update', 44, NULL, 'A new attachment was added to the task \'Implement OAuth\' from Food Fusion.', '2025-10-10 19:55:18', 0),
(340, 23, 18, 'Task Update', 44, NULL, 'A new attachment was added to the task \'Implement OAuth\' from Food Fusion.', '2025-10-10 19:55:18', 0),
(342, 20, 18, 'Task Update', 44, NULL, 'A new attachment was added to the task \'Implement OAuth\' from Food Fusion.', '2025-10-10 19:55:26', 0),
(343, 21, 18, 'Task Update', 44, NULL, 'A new attachment was added to the task \'Implement OAuth\' from Food Fusion.', '2025-10-10 19:55:26', 0),
(344, 23, 18, 'Task Update', 44, NULL, 'A new attachment was added to the task \'Implement OAuth\' from Food Fusion.', '2025-10-10 19:55:26', 0),
(346, 20, 18, 'Task Update', 44, NULL, 'A new comment was posted in the task \'Implement OAuth\' from Food Fusion.', '2025-10-10 19:55:33', 0),
(347, 21, 18, 'Task Update', 44, NULL, 'A new comment was posted in the task \'Implement OAuth\' from Food Fusion.', '2025-10-10 19:55:33', 0),
(348, 23, 18, 'Task Update', 44, NULL, 'A new comment was posted in the task \'Implement OAuth\' from Food Fusion.', '2025-10-10 19:55:33', 0),
(349, 23, 17, 'Role Change', 44, NULL, 'You are now a member of Workspace: Food Fusion.', '2025-10-10 20:19:24', 0),
(373, 20, 18, 'Task Update', 44, NULL, 'The status of your Task \'Implement OAuth\' from Workspace: \'Food Fusion\' has been updated to Pending', '2025-10-15 13:30:40', 0),
(374, 21, 18, 'Task Update', 44, NULL, 'The status of your Task \'Implement OAuth\' from Workspace: \'Food Fusion\' has been updated to Pending', '2025-10-15 13:30:40', 0),
(375, 23, 18, 'Task Update', 44, NULL, 'The status of your Task \'Implement OAuth\' from Workspace: \'Food Fusion\' has been updated to Pending', '2025-10-15 13:30:40', 0);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `password_resets`
--

INSERT INTO `password_resets` (`id`, `user_id`, `token`, `expires_at`) VALUES
(24, 18, '431b4f0df21fff75c115ed7c7da2ba690a36d3eaea93d162676e9cae26f262a8', '2025-10-10 21:09:04');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `due_date` date NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `priority_level` varchar(255) NOT NULL,
  `created_by` int(11) NOT NULL,
  `workspace_id` int(11) NOT NULL,
  `rejection_reason` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `description`, `status`, `due_date`, `created_at`, `updated_at`, `priority_level`, `created_by`, `workspace_id`, `rejection_reason`) VALUES
(23, 'Assign', 'test', 'Completed', '2025-09-04', '2025-08-28 15:26:37', '2025-08-28 15:26:37', 'low', 18, 48, NULL),
(26, 'Test', 'Test', 'To Do', '2025-08-31', '2025-08-29 19:34:19', '2025-08-29 19:34:19', 'low', 18, 49, NULL),
(27, 'Backend Dynamic Project', 'About Food Recipe', 'To Do', '2025-10-10', '2025-08-29 22:45:24', '2025-08-29 22:45:24', 'high', 19, 45, NULL),
(28, 'Trio', 'Description Test for trio', 'Pending', '2025-08-30', '2025-08-29 22:52:14', '2025-08-29 22:52:14', 'moderate', 18, 45, NULL),
(29, 'test', 'dladfj;alkdsfj;alksdfj;alkj', 'To Do', '2025-08-31', '2025-08-29 22:54:24', '2025-08-29 22:54:24', 'low', 18, 45, NULL),
(34, 'New Task Tonight', 'Task', 'Completed', '2025-09-08', '2025-09-04 20:12:51', '2025-09-04 20:12:51', 'moderate', 18, 44, NULL),
(45, 'Add Task ', 'Task add', 'To Do', '2025-09-11', '2025-09-10 20:14:23', '2025-09-10 20:14:23', 'moderate', 22, 64, NULL),
(49, 'Summary', 'sum', 'Completed', '2025-09-25', '2025-09-11 14:59:11', '2025-09-11 14:59:11', 'low', 18, 44, NULL),
(50, 'Another', '', 'Completed', '2025-09-25', '2025-09-11 15:20:04', '2025-09-11 15:20:04', 'moderate', 18, 44, NULL),
(51, 'Task new', '', 'Completed', '2025-09-18', '2025-09-11 15:20:14', '2025-09-11 15:20:14', 'low', 18, 44, NULL),
(52, 'Report', '', 'Completed', '2025-09-12', '2025-09-11 15:20:26', '2025-09-11 15:20:26', 'low', 18, 44, NULL),
(53, 'report another', '', 'Completed', '2025-09-17', '2025-09-11 15:20:43', '2025-09-11 15:20:43', 'moderate', 18, 44, NULL),
(54, 'new comment', '', 'Completed', '2025-09-13', '2025-09-11 19:24:14', '2025-09-11 19:24:14', 'moderate', 18, 44, NULL),
(55, 'Test after rejection', 'Desc', 'Completed', '2025-09-19', '2025-09-11 19:53:53', '2025-09-11 19:53:53', 'moderate', 18, 44, NULL),
(56, 'tot', '', 'In Progress', '2025-09-23', '2025-09-11 21:00:38', '2025-09-11 21:00:38', 'moderate', 18, 44, NULL),
(57, 'Task noti red dot', 'red dot', 'In Progress', '2025-09-12', '2025-09-11 22:09:29', '2025-09-11 22:09:29', 'high', 18, 44, NULL),
(58, 'New ', 'new', 'To Do', '2025-09-18', '2025-09-11 22:13:51', '2025-09-11 22:13:51', 'moderate', 18, 44, NULL),
(59, 'Red', 'red', 'To Do', '2025-09-25', '2025-09-11 22:14:25', '2025-09-11 22:14:25', 'low', 18, 44, NULL),
(60, 'Red Testing', 'Red', 'Completed', '2025-09-18', '2025-09-11 22:14:46', '2025-09-11 22:14:46', 'moderate', 18, 44, NULL),
(61, 'Task 1', 'Description for task 1', 'Completed', '2025-01-10', '2025-01-01 09:00:00', '2025-01-01 09:00:00', 'low', 18, 44, NULL),
(62, 'Task 2', 'Description for task 2', 'Completed', '2025-01-25', '2025-01-05 10:30:00', '2025-01-05 10:30:00', 'moderate', 18, 44, NULL),
(63, 'Task 3', 'Description for task 3', 'Completed', '2025-02-05', '2025-01-20 14:00:00', '2025-01-20 14:00:00', 'high', 18, 44, NULL),
(64, 'Task 4', 'Description for task 4', 'In Progress', '2025-02-18', '2025-02-01 08:45:00', '2025-02-01 08:45:00', 'low', 18, 44, NULL),
(65, 'Task 5', 'Description for task 5', 'Completed', '2025-03-07', '2025-02-15 13:15:00', '2025-02-15 13:15:00', 'moderate', 18, 44, NULL),
(66, 'Task 6', 'Description for task 6', 'Completed', '2025-03-25', '2025-03-01 11:10:00', '2025-03-01 11:10:00', 'high', 18, 44, NULL),
(67, 'Task 7', 'Description for task 7', 'In Progress', '2025-04-05', '2025-03-18 16:20:00', '2025-03-18 16:20:00', 'low', 18, 44, NULL),
(68, 'Task 8', 'Description for task 8', 'Completed', '2025-04-28', '2025-04-01 09:00:00', '2025-04-01 09:00:00', 'moderate', 18, 44, NULL),
(69, 'Task 9', 'Description for task 9', 'Completed', '2025-05-10', '2025-04-15 12:30:00', '2025-04-15 12:30:00', 'high', 18, 44, NULL),
(70, 'Task 10', 'Description for task 10', 'Completed', '2025-05-22', '2025-05-01 14:40:00', '2025-05-01 14:40:00', 'low', 18, 44, NULL),
(71, 'Task 11', 'Description for task 11', 'Completed', '2025-06-06', '2025-05-20 10:00:00', '2025-05-20 10:00:00', 'moderate', 18, 44, NULL),
(72, 'Task 12', 'Description for task 12', 'Completed', '2025-06-25', '2025-06-01 11:25:00', '2025-06-01 11:25:00', 'high', 18, 44, NULL),
(73, 'Task 13', 'Description for task 13', 'In Progress', '2025-07-08', '2025-06-20 09:15:00', '2025-06-20 09:15:00', 'low', 18, 44, NULL),
(74, 'Task 14', 'Description for task 14', 'Completed', '2025-07-20', '2025-07-01 13:40:00', '2025-07-01 13:40:00', 'moderate', 18, 44, NULL),
(75, 'Task 15', 'Description for task 15', 'Completed', '2025-08-05', '2025-07-18 15:00:00', '2025-07-18 15:00:00', 'high', 18, 44, NULL),
(76, 'Task 16', 'Description for task 16', 'In Progress', '2025-08-22', '2025-08-01 09:50:00', '2025-08-01 09:50:00', 'low', 18, 44, NULL),
(77, 'Task 17', 'Description for task 17', 'Completed', '2025-09-04', '2025-08-20 11:45:00', '2025-08-20 11:45:00', 'moderate', 18, 44, NULL),
(78, 'Task 18', 'Description for task 18', 'In Progress', '2025-09-25', '2025-09-01 10:30:00', '2025-09-01 10:30:00', 'high', 18, 44, NULL),
(79, 'Task 19', 'Description for task 19', 'Completed', '2025-10-12', '2025-09-20 08:00:00', '2025-09-20 08:00:00', 'moderate', 18, 44, NULL),
(80, 'Task 20', 'Description for task 20', 'In Progress', '2025-10-30', '2025-10-01 09:15:00', '2025-10-01 09:15:00', 'low', 18, 44, NULL),
(81, 'Report', 'testing', 'To Do', '2025-09-19', '2025-09-13 20:26:28', '2025-09-13 20:26:28', 'high', 18, 48, NULL),
(82, 'New PHP', 'React', 'To Do', '2025-09-26', '2025-09-18 14:49:16', '2025-09-18 14:49:16', 'moderate', 18, 65, NULL),
(83, 'New Aung Phyo Khant', 'Testing', 'To Do', '2025-10-09', '2025-09-18 14:50:49', '2025-09-18 14:50:49', 'moderate', 18, 65, NULL),
(84, 'Another task testing', 'Description is optional', 'In Progress', '2025-09-29', '2025-09-28 12:09:13', '2025-09-28 12:09:13', 'high', 18, 44, NULL),
(87, 'New Task would be deleted', 'Des', 'To Do', '2025-10-22', '2025-10-03 15:16:31', '2025-10-03 15:16:31', 'moderate', 18, 68, NULL),
(89, 'Task One ', 'Testing Task', 'Completed', '2025-10-10', '2025-10-04 13:09:44', '2025-10-04 13:09:44', 'moderate', 25, 70, NULL),
(90, 'Task Two', 'Testing assign', 'Completed', '2025-10-06', '2025-10-04 13:17:18', '2025-10-04 13:17:18', 'high', 25, 70, NULL),
(91, 'Task Testing', 'Testing', 'To Do', '2025-10-08', '2025-10-04 13:54:58', '2025-10-04 13:54:58', 'moderate', 18, 70, NULL),
(92, 'New Task 001', '', 'Completed', '2025-10-08', '2025-10-04 14:01:51', '2025-10-04 14:01:51', 'moderate', 18, 44, NULL),
(93, 'Implement OAuth', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis quae ut a tempora. Ab odio, fugiat atque ipsam necessitatibus placeat voluptate temporibus neque laboriosam dolorum eaque, doloremque quisquam cupiditate itaque earum error voluptates voluptat', 'Pending', '2025-10-13', '2025-10-10 19:54:19', '2025-10-10 19:54:19', 'high', 18, 44, NULL),
(95, 'User Account Creation', 'Implement user account creation function with OAuth.', 'Completed', '2025-10-20', '2025-10-14 20:09:29', '2025-10-14 20:09:29', 'high', 18, 72, NULL),
(96, 'Test the Registration Flow for User and Admin', 'Registration should be test in any possible way. Please do urgently.', 'Completed', '2025-10-18', '2025-10-16 12:52:18', '2025-10-16 13:04:23', 'high', 18, 73, NULL),
(97, 'Test the Workspace Creation Flow', 'Please test in every possible way', 'Completed', '2025-10-20', '2025-10-16 13:51:24', '2025-10-16 13:51:24', 'low', 18, 73, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `task_assignees`
--

CREATE TABLE `task_assignees` (
  `id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task_assignees`
--

INSERT INTO `task_assignees` (`id`, `task_id`, `user_id`) VALUES
(4, 23, 18),
(7, 26, 18),
(8, 27, 20),
(11, 28, 20),
(12, 28, 18),
(13, 29, 18),
(57, 34, 18),
(75, 45, 22),
(86, 49, 18),
(87, 50, 18),
(88, 51, 18),
(89, 51, 20),
(90, 52, 18),
(91, 52, 20),
(92, 53, 18),
(93, 53, 20),
(94, 54, 18),
(95, 54, 20),
(96, 55, 18),
(97, 55, 20),
(98, 56, 20),
(99, 56, 18),
(100, 57, 18),
(101, 57, 20),
(102, 58, 18),
(103, 58, 20),
(104, 59, 18),
(105, 59, 20),
(106, 60, 20),
(107, 60, 18),
(108, 81, 18),
(109, 81, 20),
(110, 82, 18),
(111, 83, 18),
(112, 84, 18),
(113, 84, 20),
(118, 87, 18),
(120, 89, 25),
(121, 90, 18),
(122, 91, 25),
(123, 91, 18),
(124, 92, 18),
(125, 92, 20),
(126, 92, 21),
(127, 92, 23),
(128, 93, 18),
(129, 93, 20),
(130, 93, 21),
(131, 93, 23),
(134, 95, 18),
(137, 96, 18),
(138, 96, 26),
(139, 97, 26);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile_url` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `profile_url`, `created_at`, `updated_at`) VALUES
(1, 'John Doe', 'john@gmail.com', 'John@1234', NULL, '2025-08-04 14:58:00', '2025-08-04 14:58:00'),
(15, 'JeffGoat', 'j3fforg@gmail.com', '$2y$10$lxuZQ4mstEzfwIjgClcLou4bWwwHeF0ZS4L65mm/dmZ.7bvBDjhZG', 'uploads/profiles/68a5db7360e016.40548692.png', '2025-08-20 20:17:29', '2025-08-21 20:02:54'),
(17, 'System', 'no-reply@pms.com', '', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(18, 'Sai Wunna Tun', 'wunnatunsai940@gmail.com', '$2y$10$p9kzbumKS/Ajcf/xPbQR7uf5o0rI50rzAi1JERgkeTfi02Eiq84t6', 'uploads/profiles/68ee0b6de78f52.25589044.jpg', '2025-08-22 20:44:40', '2025-10-14 15:23:49'),
(19, 'Pa Pa', 'ppa398401@gmail.com', '$2y$10$UgcoXTcsGbOJXsOHNBgkh.RJRTg9r6U7QMFvDo0KOqL.p48cPTDi.', 'uploads/profiles/68b1d1e732fe45.05197737.jpg', '2025-08-24 20:41:38', '2025-08-29 22:44:31'),
(20, 'Nay Chi', 'nona792005@gmail.com', '$2y$10$3eO.x2GlW05ZcD/7PzqeoOvBxwGp/61SxQGzwILWu4thZX6ZLccva', 'uploads/profiles/68b1d320e97043.77344995.jpg', '2025-08-24 20:43:14', '2025-08-29 22:49:44'),
(21, 'Pyae Phyo', 'ppk116319@gmail.com', '$2y$10$rmOF83yiXzfJIszq90qndetlRtQfaTxowKff5mKm3O5BcfjKDtO9C', 'uploads/profiles/68ad6b1f75b156.71019407.jpg', '2025-08-26 14:36:55', '2025-08-26 14:36:55'),
(22, 'Gloo', 'Gloo2@gmail.com', '$2y$10$ph3cGF2GEf1vP/t6MFXcyu/ZIERVDKMB/mZ0ETuqXv3vNVM.CJrI.', NULL, '2025-09-10 14:47:36', '2025-09-10 14:47:36'),
(23, 'David', 'david@gmail.com', '$2y$10$GkzpnDtQChlQYT4anYwnIuj5IrPMsawXS5jgEZOa2X6JseNa3iDD.', NULL, '2025-10-02 14:56:04', '2025-10-02 14:56:04'),
(25, 'Will', 'will@gmail.com', '$2y$10$Y6cKpstt8ZYtD4nVbdO5fuSQpWtXVAU2xjwypj2tTOOLWxOW6Tbpa', 'uploads/profiles/68e0c0a7abc5f4.56003762.jpg', '2025-10-04 13:06:10', '2025-10-04 13:07:27'),
(26, 'Simon', 'simon@gmail.com', '$2y$10$oMBhISOAxG32M8FwdPfSOOr.rOmEPUBYy5YdPYcscwhav0iv4RBiO', NULL, '2025-10-10 23:07:14', '2025-10-10 23:07:14');

-- --------------------------------------------------------

--
-- Table structure for table `user_workspace`
--

CREATE TABLE `user_workspace` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `workspace_id` int(11) NOT NULL,
  `role` enum('admin','member') NOT NULL,
  `joined_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_workspace`
--

INSERT INTO `user_workspace` (`id`, `user_id`, `workspace_id`, `role`, `joined_at`) VALUES
(1, 1, 1, 'admin', '2025-08-04 15:43:56'),
(8, 1, 11, 'admin', '2025-08-08 12:16:35'),
(9, 1, 12, 'admin', '2025-08-08 13:20:15'),
(10, 1, 13, 'admin', '2025-08-08 13:20:22'),
(11, 1, 14, 'admin', '2025-08-08 16:45:20'),
(12, 1, 15, 'admin', '2025-08-08 16:46:24'),
(13, 1, 16, 'admin', '2025-08-08 16:55:43'),
(14, 1, 17, 'admin', '2025-08-08 16:56:02'),
(15, 1, 18, 'admin', '2025-08-08 16:56:46'),
(28, 1, 31, 'admin', '2025-08-13 15:07:31'),
(40, 15, 43, 'admin', '2025-08-21 20:05:25'),
(41, 18, 44, 'admin', '2025-08-22 20:45:01'),
(49, 19, 45, 'admin', '2025-08-24 20:42:05'),
(54, 20, 46, 'admin', '2025-08-24 21:01:18'),
(55, 20, 45, 'member', '2025-08-24 21:21:13'),
(56, 20, 47, 'admin', '2025-08-24 21:27:19'),
(57, 18, 48, 'admin', '2025-08-24 21:28:58'),
(58, 20, 48, 'member', '2025-08-24 21:29:42'),
(60, 21, 49, 'admin', '2025-08-26 14:38:25'),
(61, 18, 49, 'member', '2025-08-26 14:43:45'),
(63, 20, 44, 'member', '2025-08-27 09:50:25'),
(64, 18, 45, 'member', '2025-08-29 22:51:33'),
(76, 22, 56, 'admin', '2025-09-10 14:48:35'),
(80, 18, 56, 'member', '2025-09-10 14:54:41'),
(87, 22, 64, 'admin', '2025-09-10 20:14:03'),
(88, 18, 65, 'admin', '2025-09-18 14:48:46'),
(91, 21, 44, 'member', '2025-10-01 11:14:00'),
(92, 23, 66, 'admin', '2025-10-02 14:56:25'),
(93, 18, 66, 'member', '2025-10-02 15:02:50'),
(96, 23, 44, 'member', '2025-10-02 15:20:08'),
(97, 18, 68, 'admin', '2025-10-02 18:46:01'),
(99, 25, 70, 'admin', '2025-10-04 13:06:44'),
(100, 18, 70, 'member', '2025-10-04 13:16:27'),
(102, 18, 72, 'admin', '2025-10-14 19:32:08'),
(104, 18, 73, 'admin', '2025-10-16 11:54:24'),
(106, 26, 73, 'member', '2025-10-16 13:50:26');

-- --------------------------------------------------------

--
-- Table structure for table `workspaces`
--

CREATE TABLE `workspaces` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_at` datetime NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workspaces`
--

INSERT INTO `workspaces` (`id`, `name`, `created_at`, `created_by`, `updated_at`, `description`) VALUES
(1, 'Updated Workspace Name after testing Update feature and Testing substring for name of the workspace', '2025-08-04 14:58:43', 1, '2025-08-07 13:02:32', 'This is Updated Description'),
(11, 'This is the newest workspace after Workspace Module', '2025-08-08 12:16:35', 1, '2025-08-08 12:33:54', 'What a Week 1, WP'),
(12, 'A new One Baby', '2025-08-08 13:20:15', 1, '2025-08-08 13:20:15', ''),
(13, 'One and Only Zilong', '2025-08-08 13:20:22', 1, '2025-08-08 14:03:24', ''),
(14, 'Tested for alert', '2025-08-08 16:45:20', 1, '2025-08-08 16:45:20', ''),
(15, 'Second Test', '2025-08-08 16:46:24', 1, '2025-08-08 16:46:24', ''),
(16, 'Third Test', '2025-08-08 16:55:43', 1, '2025-08-08 16:55:43', ''),
(17, 'Timing Test', '2025-08-08 16:56:02', 1, '2025-08-08 16:56:02', ''),
(18, '2 Timing Testing', '2025-08-08 16:56:46', 1, '2025-08-08 17:42:49', ''),
(31, 'New Workspace', '2025-08-13 15:07:31', 1, '2025-08-13 15:07:31', ''),
(43, 'Computing Project (Lv5-first-semester)', '2025-08-21 20:05:25', 15, '2025-08-21 20:05:48', 'Project Management System with React'),
(44, 'Food Fusion', '2025-08-22 20:45:01', 18, '2025-08-22 20:45:01', 'Backend Web Development Assignment'),
(45, 'SE Mini Project', '2025-08-24 20:42:05', 19, '2025-08-24 20:42:05', 'Tr Dr. Aye Aye\'s Subject'),
(46, 'Nay Chi Shoe Shop', '2025-08-24 21:01:18', 20, '2025-08-24 21:01:18', '1 year Computing Project'),
(47, 'Notification Time Test', '2025-08-24 21:27:19', 20, '2025-08-24 21:27:19', 'Testing'),
(48, 'Invitation', '2025-08-24 21:28:58', 18, '2025-08-24 21:28:58', NULL),
(49, 'Level 5 project', '2025-08-26 14:38:25', 21, '2025-08-26 14:38:25', 'Wunna\'s class'),
(56, 'MPL', '2025-09-10 14:48:35', 22, '2025-09-10 14:48:35', 'come to play'),
(64, 'Workspace Delete', '2025-09-10 20:14:03', 22, '2025-09-10 20:14:03', NULL),
(65, 'Aung Phyo Khant', '2025-09-18 14:48:46', 18, '2025-09-18 14:48:46', 'Name'),
(66, 'PMP', '2025-10-02 14:56:25', 23, '2025-10-02 14:56:25', NULL),
(67, 'Infrastructure', '2025-10-02 15:11:39', 23, '2025-10-02 15:11:39', NULL),
(68, 'New Workspace For final testing', '2025-10-02 18:46:01', 18, '2025-10-02 18:46:01', 'Test option'),
(70, 'Venture Base Hackathon', '2025-10-04 13:06:44', 25, '2025-10-04 13:06:44', 'Description blah blah blah'),
(72, 'Project Management System', '2025-10-14 19:32:08', 18, '2025-10-14 19:32:08', NULL),
(73, 'Final Product Testing (PMS)', '2025-10-16 11:54:24', 18, '2025-10-16 13:00:59', 'This testing could take up to a month.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attachments`
--
ALTER TABLE `attachments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uploaded_by` (`uploaded_by`),
  ADD KEY `attachments_ibfk_1` (`task_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `comments_ibfk_2` (`task_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `notifications_ibfk_1` (`recipient_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `password_resets_ibfk_1` (`user_id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `tasks_ibfk_2` (`workspace_id`);

--
-- Indexes for table `task_assignees`
--
ALTER TABLE `task_assignees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `task_assignees_ibfk_1` (`task_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_workspace`
--
ALTER TABLE `user_workspace`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `user_workspace_ibfk_2` (`workspace_id`);

--
-- Indexes for table `workspaces`
--
ALTER TABLE `workspaces`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attachments`
--
ALTER TABLE `attachments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=411;

--
-- AUTO_INCREMENT for table `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT for table `task_assignees`
--
ALTER TABLE `task_assignees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `user_workspace`
--
ALTER TABLE `user_workspace`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `workspaces`
--
ALTER TABLE `workspaces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attachments`
--
ALTER TABLE `attachments`
  ADD CONSTRAINT `attachments_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `attachments_ibfk_2` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`recipient_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD CONSTRAINT `password_resets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`workspace_id`) REFERENCES `workspaces` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `task_assignees`
--
ALTER TABLE `task_assignees`
  ADD CONSTRAINT `task_assignees_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `task_assignees_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `user_workspace`
--
ALTER TABLE `user_workspace`
  ADD CONSTRAINT `user_workspace_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_workspace_ibfk_2` FOREIGN KEY (`workspace_id`) REFERENCES `workspaces` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `workspaces`
--
ALTER TABLE `workspaces`
  ADD CONSTRAINT `workspaces_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
