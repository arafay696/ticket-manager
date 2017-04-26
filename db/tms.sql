-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 26, 2017 at 10:07 AM
-- Server version: 5.7.9
-- PHP Version: 5.6.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tms`
--

-- --------------------------------------------------------

--
-- Table structure for table `issue`
--

DROP TABLE IF EXISTS `issue`;
CREATE TABLE IF NOT EXISTS `issue` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `category_id` int(11) NOT NULL,
  `description` text,
  `status` int(11) NOT NULL DEFAULT '2' COMMENT '1 = Processed, 2- Pending, 3- Under Process',
  PRIMARY KEY (`id`),
  KEY `issues_category_id_issue_idx` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `issue`
--

INSERT INTO `issue` (`id`, `name`, `email`, `category_id`, `description`, `status`) VALUES
(1, 'Rafay', 'arafay@gmail.com', 1, 'The TeamSupport ticket management system integrates all the tools necessary to ensure prompt and seamless resolution of customer inquiries. The more you automate, the more your service reps can focus on what is important – creating exceptional customer relationships. \nSubmit your issue here..!', 2),
(2, 'Abdul Rafay', 'abdul.rafay@plutuscommerce.com', 1, 'Never Lose Tickets Again with Easy To Use Help Desk Ticketing System.\n\nThe TeamSupport ticket management system integrates all the tools necessary to ensure prompt and seamless resolution of customer inquiries. The more you automate, the more your service reps can focus on what is important – creating exceptional customer relationships.\nSubmit your issue here..!', 2),
(3, 'Abdul Rafay', 'abdul.rafay@plutuscommerce.com', 1, 'The TeamSupport ticket management system integrates all the tools necessary to ensure prompt and seamless resolution of customer inquiries. The more you automate, the more your service reps can focus on what is important – creating exceptional customer relationships.\nSubmit your issue here..!', 2),
(4, 'Abdul Rafay', 'abdul.rafay@plutuscommerce.com', 1, 'Never Lose Tickets Again with Easy To Use Help Desk Ticketing System.\n\nThe TeamSupport ticket management system integrates all the tools necessary to ensure prompt and seamless resolution of customer inquiries. The more you automate, the more your service reps can focus on what is important – creating exceptional customer relationships.\nSubmit your issue here..!', 2);

-- --------------------------------------------------------

--
-- Table structure for table `issues_category`
--

DROP TABLE IF EXISTS `issues_category`;
CREATE TABLE IF NOT EXISTS `issues_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `issues_category`
--

INSERT INTO `issues_category` (`id`, `name`, `description`) VALUES
(1, 'General', 'general problems'),
(2, 'Technical Problem', 'technical problem');

-- --------------------------------------------------------

--
-- Table structure for table `worker`
--

DROP TABLE IF EXISTS `worker`;
CREATE TABLE IF NOT EXISTS `worker` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(150) NOT NULL,
  `is_logged_in` int(11) NOT NULL DEFAULT '4' COMMENT '1 = Online\n2 = Busy,\n3 = Away,\n4 = Offline',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `issue`
--
ALTER TABLE `issue`
  ADD CONSTRAINT `issues_category_id_issue` FOREIGN KEY (`category_id`) REFERENCES `issues_category` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
