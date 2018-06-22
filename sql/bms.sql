-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 22, 2018 at 03:23 PM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bms`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking_cart`
--

CREATE TABLE `booking_cart` (
  `id` int(11) NOT NULL,
  `cart_id` varchar(255) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `slot_id` int(10) NOT NULL,
  `price` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `studio_id` int(10) NOT NULL,
  `booking_time` varchar(250) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `booking_cart`
--

INSERT INTO `booking_cart` (`id`, `cart_id`, `order_id`, `slot_id`, `price`, `user_id`, `studio_id`, `booking_time`, `created_at`, `updated_at`) VALUES
(28, '1529576148120', '', 1, 2000, 2, 1, '8pm', '2018-06-21 03:15:48.165688', '2018-06-21 03:15:48.165688'),
(29, '1529576148120', '', 2, 2500, 2, 1, '9pm', '2018-06-21 03:15:48.165688', '2018-06-21 03:15:48.165688'),
(30, '1529576148120', '', 1, 2000, 2, 1, '8pm', '2018-06-22 04:32:17.639894', '2018-06-22 04:32:17.639894'),
(31, '1529576148120', '', 2, 2500, 2, 1, '9pm', '2018-06-22 04:32:17.639894', '2018-06-22 04:32:17.639894'),
(32, '1529576148120', '', 1, 2000, 2, 1, '8pm', '2018-06-22 04:34:31.015173', '2018-06-22 04:34:31.015173'),
(33, '1529576148120', '', 2, 2500, 2, 1, '9pm', '2018-06-22 04:34:31.015173', '2018-06-22 04:34:31.015173'),
(34, '1529576148120', '', 1, 2000, 2, 1, '8pm', '2018-06-22 04:35:43.200242', '2018-06-22 04:35:43.200242'),
(35, '1529576148120', '', 2, 2500, 2, 1, '9pm', '2018-06-22 04:35:43.200242', '2018-06-22 04:35:43.200242');

-- --------------------------------------------------------

--
-- Table structure for table `booking_service_cart`
--

CREATE TABLE `booking_service_cart` (
  `id` int(11) NOT NULL,
  `cart_id` varchar(255) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `service_id` varchar(250) NOT NULL,
  `price` varchar(250) NOT NULL,
  `service_count` int(10) NOT NULL,
  `required_slots` varchar(250) NOT NULL,
  `user_id` varchar(250) NOT NULL,
  `studio_id` int(10) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `booking_service_cart`
--

INSERT INTO `booking_service_cart` (`id`, `cart_id`, `order_id`, `service_id`, `price`, `service_count`, `required_slots`, `user_id`, `studio_id`, `created_at`, `updated_at`) VALUES
(48, '1529576148120', '', '1', '3000', 3, '1', '2', 1, '2018-06-22 05:15:36.368162', '2018-06-22 05:15:36.368162'),
(49, '1529576148120', '', '2', '2000', 1, '0', '2', 1, '2018-06-22 05:15:36.368162', '2018-06-22 05:15:36.368162'),
(50, '1529576148120', '', '1', '3000', 3, '1', '2', 1, '2018-06-22 05:17:27.928893', '2018-06-22 05:17:27.928893'),
(51, '1529576148120', '', '2', '2000', 1, '0', '2', 1, '2018-06-22 05:17:27.928893', '2018-06-22 05:17:27.928893');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `cartid` varchar(250) NOT NULL,
  `orderid` varchar(250) NOT NULL,
  `total` int(10) NOT NULL,
  `status` varchar(250) NOT NULL,
  `user_id` varchar(250) NOT NULL,
  `recorddate` datetime(6) NOT NULL,
  `luta` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `studio_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `comments_reply_id` int(10) NOT NULL,
  `comments` text NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `holiday_list_master`
--

CREATE TABLE `holiday_list_master` (
  `id` int(11) NOT NULL,
  `studio_id` int(10) NOT NULL,
  `date` date NOT NULL,
  `remarks` varchar(250) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `holiday_list_master`
--

INSERT INTO `holiday_list_master` (`id`, `studio_id`, `date`, `remarks`, `created_at`, `updated_at`) VALUES
(1, 1, '2018-06-24', 'closed for sunday', '2018-06-12 22:30:15.000000', '2018-06-12 22:30:15.000000'),
(2, 1, '2018-06-30', '', '2018-06-12 22:30:15.000000', '2018-06-12 22:30:15.000000');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `cart_id` varchar(250) NOT NULL,
  `status` varchar(250) NOT NULL,
  `total` int(10) NOT NULL,
  `user_id` varchar(250) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `service_master`
--

CREATE TABLE `service_master` (
  `id` int(11) NOT NULL,
  `service_name` varchar(250) NOT NULL,
  `slots_required` int(10) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `service_master`
--

INSERT INTO `service_master` (`id`, `service_name`, `slots_required`, `created_at`, `updated_at`) VALUES
(1, 'Sound Recording', 1, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(2, 'Voice Over Artist', 1, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(3, 'Background Score', 0, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(4, 'Music Composition', 0, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(5, 'Mixing track', 0, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(6, 'Mastering track', 0, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(7, 'Lyrics', 0, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(8, 'Audiography', 0, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(9, 'Film Dubbing', 0, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(10, 'Audio Dubbing', 0, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(11, 'Audio Mixing', 0, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(12, 'Location Sound', 0, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(13, 'Movie/Film Making', 0, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(14, 'TV/Radio Spots', 1, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(15, 'Acoustics', 1, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(16, 'Foleys', 0, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(17, 'Beat Making', 0, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(18, 'Devotional Music', 0, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(19, 'Jingles', 0, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(20, 'Adv Slogans', 0, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(21, 'Youtube Audio/Video', 1, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(22, 'Vocal Recording', 1, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(23, 'live Instruments', 1, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(24, 'Jampad', 1, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(25, 'Audio Books', 1, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(26, 'Audio Engineering', 0, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(27, 'Song Writer', 0, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(28, 'Gurbani', 1, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(29, 'Audio Designing', 0, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(30, 'Album Making', 0, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(31, '3D Sound', 0, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(32, 'Sampling', 1, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412'),
(33, 'Karaoke', 1, '2018-06-12 22:11:32.419412', '2018-06-12 22:11:32.419412');

-- --------------------------------------------------------

--
-- Table structure for table `studio`
--

CREATE TABLE `studio` (
  `studio_id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `address` varchar(250) NOT NULL,
  `zip` varchar(250) NOT NULL,
  `user_id` int(10) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `studio`
--

INSERT INTO `studio` (`studio_id`, `name`, `address`, `zip`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 'Neelam Studios', 'mumbai', '785254', 1, '2018-06-12 06:10:07.000000', '2018-06-12 06:10:07.000000'),
(2, 'Mumbai studio', 'mumbai', '785254', 1, '2018-06-12 06:10:07.000000', '2018-06-12 06:10:07.000000');

-- --------------------------------------------------------

--
-- Table structure for table `studio_ratings`
--

CREATE TABLE `studio_ratings` (
  `id` int(11) NOT NULL,
  `studio_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `ratings` int(10) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `studio_ratings`
--

INSERT INTO `studio_ratings` (`id`, `studio_id`, `user_id`, `ratings`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 4, '2018-06-12 22:12:10.297567', '2018-06-12 22:12:10.297567');

-- --------------------------------------------------------

--
-- Table structure for table `studio_service`
--

CREATE TABLE `studio_service` (
  `id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `slots_required` varchar(250) NOT NULL,
  `studio_id` varchar(250) NOT NULL,
  `price` int(10) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `studio_service`
--

INSERT INTO `studio_service` (`id`, `service_id`, `slots_required`, `studio_id`, `price`, `created_at`, `updated_at`) VALUES
(1, 1, '1', '1', 3000, '2018-06-12 00:00:00.000000', '2018-06-12 06:25:10.000000'),
(2, 3, '0', '1', 2000, '2018-06-12 00:00:00.000000', '2018-06-12 06:25:10.000000');

-- --------------------------------------------------------

--
-- Table structure for table `studio_timeslots`
--

CREATE TABLE `studio_timeslots` (
  `id` int(11) NOT NULL,
  `studio_id` int(10) NOT NULL,
  `8am` varchar(250) NOT NULL,
  `9am` varchar(250) NOT NULL,
  `10am` varchar(250) NOT NULL,
  `11am` varchar(250) NOT NULL,
  `12pm` varchar(250) NOT NULL,
  `1pm` varchar(250) NOT NULL,
  `2pm` varchar(250) NOT NULL,
  `3pm` varchar(250) NOT NULL,
  `4pm` varchar(250) NOT NULL,
  `5pm` varchar(250) NOT NULL,
  `6pm` varchar(250) NOT NULL,
  `7pm` varchar(250) NOT NULL,
  `8pm` varchar(250) NOT NULL,
  `9pm` varchar(250) NOT NULL,
  `10pm` varchar(250) NOT NULL,
  `11pm` varchar(250) NOT NULL,
  `12am` varchar(250) NOT NULL,
  `1am` varchar(250) NOT NULL,
  `2am` varchar(250) NOT NULL,
  `3am` varchar(250) NOT NULL,
  `4am` varchar(250) NOT NULL,
  `5am` varchar(250) NOT NULL,
  `6am` varchar(250) NOT NULL,
  `7am` varchar(250) NOT NULL,
  `date` date NOT NULL,
  `created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `studio_timeslots`
--

INSERT INTO `studio_timeslots` (`id`, `studio_id`, `8am`, `9am`, `10am`, `11am`, `12pm`, `1pm`, `2pm`, `3pm`, `4pm`, `5pm`, `6pm`, `7pm`, `8pm`, `9pm`, `10pm`, `11pm`, `12am`, `1am`, `2am`, `3am`, `4am`, `5am`, `6am`, `7am`, `date`, `created_at`, `updated_at`) VALUES
(1, 1, '1000', '1000', '1000', '1000', '1000', '1000', '1000', '0', '1000', '1000', '1000', '0', '2000', '2500', '3000', '0', '1000', '0', '1000', '4000', '4000', '0', '4000', '4000', '2018-06-26', '2018-06-12 22:14:01.000000', '2018-06-12 22:14:01.000000'),
(2, 1, '1000', '0', '0', '1000', '0', '0', '1000', '0', '0', '0', '1000', '0', '2000', '2500', '3000', '0', '0', '1000', '0', '4000', '4000', '0', '4000', '4000', '2018-06-27', '2018-06-12 22:14:28.000000', '2018-06-12 22:14:28.000000'),
(3, 1, '0', '1000', '0', '0', '1000', '0', '1000', '0', '1000', '0', '1000', '0', '2000', '2500', '3000', '0', '0', '1000', '0', '4000', '4000', '0', '4000', '4000', '2018-06-28', '2018-06-12 22:14:56.000000', '2018-06-12 22:14:56.000000'),
(4, 1, '0', '1000', '0', '0', '1000', '0', '1000', '0', '0', '1000', '0', '0', '2000', '2500', '3000', '0', '0', '1000', '0', '4000', '4000', '0', '4000', '4000', '2018-06-29', '2018-06-12 22:14:56.000000', '2018-06-12 22:14:56.000000');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(250) NOT NULL,
  `lastname` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `address` varchar(250) NOT NULL,
  `zip` varchar(250) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `password` varchar(250) NOT NULL,
  `usertype` enum('user','vendor','admin','') NOT NULL,
  `status` enum('true','false','','') NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `address`, `zip`, `phone`, `password`, `usertype`, `status`, `created_at`, `updated_at`) VALUES
(1, 'ujjal', 'sannyal', 'ujjal.sannyal@softvision.com', 'bangalore', '752154', 8013219151, 'password123', 'vendor', 'true', '2018-06-12 05:56:55.000000', '2018-06-12 05:56:55.000000'),
(2, 'zend', 'Chhapgar', 'zend.Chhapgar@softvision.com', 'bangalore', '700004', 985421354, 'password123', 'user', 'true', '2018-06-12 05:57:08.000000', '2018-06-12 05:57:08.000000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking_cart`
--
ALTER TABLE `booking_cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booking_service_cart`
--
ALTER TABLE `booking_service_cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `holiday_list_master`
--
ALTER TABLE `holiday_list_master`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studio_id` (`studio_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service_master`
--
ALTER TABLE `service_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `studio`
--
ALTER TABLE `studio`
  ADD PRIMARY KEY (`studio_id`);

--
-- Indexes for table `studio_ratings`
--
ALTER TABLE `studio_ratings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `studio_service`
--
ALTER TABLE `studio_service`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_id` (`service_id`);

--
-- Indexes for table `studio_timeslots`
--
ALTER TABLE `studio_timeslots`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking_cart`
--
ALTER TABLE `booking_cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `booking_service_cart`
--
ALTER TABLE `booking_service_cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `holiday_list_master`
--
ALTER TABLE `holiday_list_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `service_master`
--
ALTER TABLE `service_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `studio`
--
ALTER TABLE `studio`
  MODIFY `studio_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `studio_ratings`
--
ALTER TABLE `studio_ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `studio_service`
--
ALTER TABLE `studio_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `studio_timeslots`
--
ALTER TABLE `studio_timeslots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `holiday_list_master`
--
ALTER TABLE `holiday_list_master`
  ADD CONSTRAINT `holiday_list_master_ibfk_1` FOREIGN KEY (`studio_id`) REFERENCES `studio` (`studio_id`);

--
-- Constraints for table `studio_service`
--
ALTER TABLE `studio_service`
  ADD CONSTRAINT `studio_service_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `service_master` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
