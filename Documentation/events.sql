-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 18, 2024 at 02:05 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ems`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `eventtimestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `venue` varchar(100) NOT NULL,
  `image` varchar(500) NOT NULL,
  `category` varchar(100) NOT NULL,
  `noparticipants` int(10) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `name`, `description`, `eventtimestamp`, `venue`, `image`, `category`, `noparticipants`, `timestamp`) VALUES
(4, 'NSBM Green Fiesta', 'NSBM Sports Fiesta 2024, an annual sporting extravaganza hosted by NSBM Green University, culminated in its grand finale on February 20th, 2024, at the NSBM Phase 2 Ground.', '2024-11-08 11:15:12', 'NSBM Phase 2 Ground', 'uploads\\image-1729250389109.png', 'music', 1000, '2024-10-18 11:19:49'),
(5, 'Nadagama', 'The Naadha Gama family is coming to Dubai for our most iconic and exclusive concert evening yet, happening this October 26th at the amazing Sahara Desert', '2024-10-31 11:20:21', 'Kandy', 'uploads\\image-1729250497400.png', 'music', 800, '2024-10-18 11:21:37'),
(6, 'TECHNO', 'The Institution of Engineers, Sri Lanka is the successor to the ‘Engineering Association of Ceylon’, which was founded in 1906. In 1968, the Institution of Engineers, Sri Lanka.', '2024-12-27 11:21:43', 'BMHICH', 'uploads\\image-1729250649074.png', 'tech', 10000, '2024-10-18 11:24:09'),
(12, 'Kala Ketha', 'The Museum of Modern and Contemporary Art Sri Lanka is a new education-led initiative that aims to establish a public museum dedicated to the display.', '2024-12-09 11:28:11', 'Nelum Pokuna', 'uploads\\image-1729252002591.png', 'art', 10000, '2024-10-18 11:46:42'),
(7, 'Battle of Golden Lion', 'This is the Official Facebook Page of Battle of Golden Lions, the Cricket encounter between Dharmapala Vidyalaya Pannipitiya and Rahula Vidyalaya Matara.', '2024-12-02 11:21:43', 'DVP Playground', 'uploads\\image-1729250800401.png', 'sport', 3000, '2024-10-18 11:26:40'),
(8, 'Art Cafe', 'Kala Pola is Sri Lanka\'s annual open air art fair showcasing and promoting visual art. It provides opportunities for painters and sculptors to meet.', '2024-10-29 11:28:11', 'Kala Bhawana', 'uploads\\image-1729250992661.png', 'art', 1000, '2024-10-18 11:29:52'),
(9, 'Beach Fiesta', 'The Hikkaduwa nightlife is famous for attracting all the party animals. It has one of the most vibrant party atmospheres.', '2024-10-17 11:28:11', 'Hikkaduwa', 'uploads\\image-1729251360837.png', 'music', 500, '2024-10-18 11:36:00'),
(10, 'Battle of maroons', 'The first Battle of the Maroons was played between Ananda and Nalanda in 1924. Soon the Big Match began to be played with much pride and fanfare.', '2025-01-08 11:28:11', 'R Premadasa', 'uploads\\image-1729251604748.png', 'sport', 5000, '2024-10-18 11:40:04'),
(11, 'Beach Music', 'Beach Party is a 1963 American film and the first of seven beach party films from American International Pictures (AIP) aimed at a teen audience.', '2025-01-28 11:28:11', 'Thalpe', 'uploads\\image-1729251735386.png', 'music', 1000, '2024-10-18 11:42:15'),
(13, 'Tech Mart', 'Upcoming Technology Conferences in Sri Lanka 2024 - 2025 · Agriculture. Animal · Business and Economics. Accounting · Education. Advanced Sociology of Education.', '2024-12-20 11:28:11', 'BMICH', 'uploads\\image-1729252473228.png', 'tech', 2000, '2024-10-18 11:54:33'),
(14, 'Softball Cricket', 'Softball cricket or Soft ball cricket is a short form variation of the sport of cricket, played by women and girls in England and Wales.', '2024-11-12 11:28:11', 'School Ground', 'uploads\\image-1729252841472.png', 'sport', 10, '2024-10-18 12:00:41'),
(15, 'Art Cafe', 'The Sri Lankan Art Gallery provides an opportunity for Sri Lankan artists to display their work free-of-charge throughout the year to a global clientele.', '2024-11-22 11:28:11', 'Kala Bhawana', 'uploads\\image-1729253096866.png', 'art', 1000, '2024-10-18 12:04:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
