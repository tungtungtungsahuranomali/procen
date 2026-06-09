-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 13, 2023 at 11:19 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `web_tv`
--

-- --------------------------------------------------------

--
-- Table structure for table `about`
--

CREATE TABLE `about` (
  `id_about` int(11) NOT NULL,
  `judul_about` varchar(255) NOT NULL,
  `deskripsi_about` varchar(255) NOT NULL,
  `gambar_about` varchar(255) NOT NULL,
  `nama_hotel` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `about`
--

INSERT INTO `about` (`id_about`, `judul_about`, `deskripsi_about`, `gambar_about`, `nama_hotel`) VALUES
(1, 'tauzia hotel test judul', 'tauzia hotel test deksripsi', 'gambartesttauzia.jpg', 'Tauzia Hotel'),
(2, 'harris hotel test judul', 'harris hotel test deksripsi', 'gambartesttauzia.jpg', 'Harris Hotel');

-- --------------------------------------------------------

--
-- Table structure for table `channel`
--

CREATE TABLE `channel` (
  `id_channel` int(11) NOT NULL,
  `nama_channel` varchar(255) NOT NULL,
  `ip_channel` varchar(255) NOT NULL,
  `kategori_channel` varchar(255) NOT NULL,
  `status_channel` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `channel`
--

INSERT INTO `channel` (`id_channel`, `nama_channel`, `ip_channel`, `kategori_channel`, `status_channel`) VALUES
(2, 'Channel News Asia', '228.110.3.10', 'Entertainment', 'Online'),
(3, 'TVRI Nasional', '228.110.3.10', 'News', 'Online'),
(4, 'Metro TV HD', '228.110.3.11', 'News', 'Online'),
(5, 'RCTI', '228.110.3.12', 'Entertainment', 'Online'),
(6, 'Global TV', '228.110.3.13', 'Entertainment', 'Online'),
(7, 'MNC TV', '228.110.3.14', 'Entertainment', 'Online'),
(8, 'SURIA TV', '228.110.3.18', 'Entertainment', 'Online'),
(9, 'PUNJAB TV', '228.110.3.3', 'News', 'Online'),
(10, 'VAS HD', '228.110.3.7', 'Entertainment', 'Online'),
(11, 'Trans TV', '228.110.3.8', 'Entertainment', 'Online'),
(12, 'TRANS 7', '228.110.3.9', 'Entertainment', 'Online'),
(13, 'Phoenix Info News', '228.110.4.1', 'News', 'Online'),
(14, 'TVRI World', '228.110.4.12', 'News', 'Online'),
(15, 'SCTV', '228.110.4.13', 'Entertainment', 'Online'),
(16, 'INDOSIAR', '228.110.4.14', 'Entertainment', 'Online'),
(17, 'NET TV', '228.110.4.16', 'Entertainment', 'Online'),
(18, 'XING KONG', '228.110.4.17', 'Entertainment', 'Online'),
(19, 'CHANNEL V CHINA', '228.110.4.18', 'Entertainment', 'Online'),
(20, 'I-NEWS', '228.110.4.19', 'News', 'Online'),
(21, 'PHOENIX CHINESE HD', '228.110.4.2', 'News', 'Online'),
(22, 'SINEMA INDONESIA', '228.110.4.21', 'Entertainment', 'Online'),
(23, 'TVRI SPORT', '228.110.4.22', 'News', 'Online'),
(24, 'OMAN TV', '228.110.4.23', 'Entertainment', 'Online'),
(25, 'PHOENIX HONGKONG HD', '228.110.4.3', 'News', 'Online'),
(26, 'QATAR TV', '228.110.4.30', 'Entertainment', 'Online'),
(27, 'EMARAT TV', '228.110.4.31', 'Entertainment', 'Online'),
(28, 'AL ARABIYA', '228.110.4.32', 'Entertainment', 'Online'),
(29, 'KOMPAS TV', '228.110.4.5', 'Sports', 'Online'),
(30, 'ANTV', '228.110.4.7', 'Entertainment', 'Online'),
(31, 'TV ONE', '228.110.4.8', 'News', 'Online'),
(32, 'ALJAZERA', '228.110.6.108', 'News', 'Online'),
(33, 'MONDE ', '228.110.6.109', 'Entertainment', 'Online'),
(34, 'DW', '228.110.6.110', 'Entertainment', 'Online'),
(35, 'TRT WORDL', '228.110.6.111', 'News', 'Online'),
(36, 'SUN TV HK', '228.110.6.112', 'Entertainment', 'Online'),
(37, 'PROMO HOTEL', '228.110.6.122', 'News', 'Online'),
(38, 'RUSSIA TODAY', '228.110.6.18', 'News', 'Online'),
(39, 'TV3', '228.110.6.24', 'Entertainment', 'Online'),
(40, 'KBS WORLD', '228.110.7.1', 'Entertainment', 'Online'),
(41, 'CNN', '228.110.7.10', 'News', 'Online'),
(42, 'NAT GEOGRAPHIC', '228.110.7.11', 'Documentation', 'Online'),
(43, 'AXN', '228.110.7.12', 'Entertainment', 'Online'),
(44, 'HBO', '228.110.7.13', 'Entertainment', 'Online'),
(45, 'CN', '228.110.7.14', 'Kids', 'Online'),
(46, 'FOX MOVIE PREMIUM', '228.110.7.15', 'Entertainment', 'Online'),
(47, 'FASHION TV', '228.110.7.16', 'Entertainment', 'Online'),
(48, 'USEE SPORT', '228.110.7.17', 'Sports', 'Online'),
(49, 'BEIN SPORTS 1', '228.110.7.18', 'Sports', 'Online'),
(50, 'FOX CRIME', '228.110.7.19', 'Entertainment', 'Online'),
(51, 'FOX', '228.110.7.2', 'Entertainment', 'Online'),
(52, 'NAT GEO PEOPLE', '228.110.7.20', 'Documentation', 'Online'),
(53, 'NHK WORLD JAPAN', '228.110.7.3', 'News', 'Online'),
(54, 'BEIN SPOTS 2', '228.110.7.4', 'Sports', 'Online'),
(55, 'FOX LIFE', '228.110.7.5', 'Entertainment', 'Online'),
(56, 'DISNEY JR', '228.110.7.6', 'Kids', 'Online'),
(57, 'GALAXY PREMIUM', '228.110.7.8', 'Entertainment', 'Online'),
(68, 'test', '228.110.7.13', 'Entertainment', 'Online');

-- --------------------------------------------------------

--
-- Table structure for table `channelcic`
--

CREATE TABLE `channelcic` (
  `id` varchar(255) NOT NULL,
  `ip4` varchar(255) NOT NULL,
  `ip` varchar(255) NOT NULL,
  `ip2` varchar(255) NOT NULL,
  `ip3` varchar(255) NOT NULL,
  `port` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `prioritas` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `channelcic`
--

INSERT INTO `channelcic` (`id`, `ip4`, `ip`, `ip2`, `ip3`, `port`, `name`, `prioritas`, `img`) VALUES
('16', '228.110.6.122', '@228.110.6.122', 'udp://228.110.6.122:1234', '', '1234', 'PROMO HOTEL', '0', 'promo_hotel.png'),
('62', '228.110.7.5', '@228.110.7.5', 'udp://228.110.7.5:1234', '', '1234', 'FOX LIFE', '1', 'fox_life.png'),
('99', '228.110.7.12', '@228.110.7.12', 'udp://228.110.7.12:1234', '', '1234', 'AXN', '2', 'axn.png'),
('17', '228.110.7.3', '@228.110.7.3', 'udp://228.110.7.3:1234', '', '1234', 'NHK WORLD JAPAN', '4', 'nhk_world.png'),
('56', '228.110.7.7', '@228.110.7.7', 'udp://228.110.7.7:1234', '', '1234', 'CCTV 4', '6', 'cctv4.png'),
('63', '228.110.7.2', '@228.110.7.2', 'udp://228.110.7.2:1234', '', '1234', 'FOX', '7', 'fox.png'),
('74', '228.110.7.8', '@228.110.7.8', 'udp://228.110.7.8:1234', '', '1234', 'GALAXY Premium', '8', 'fx.png'),
('53', '228.110.7.11', '@228.110.7.11', 'udp://228.110.7.11:1234', '', '1234', 'NAT GEOGRAPHIC', '9', 'national_geographic.png'),
('106', '228.110.7.20', '@228.110.7.20', 'udp://228.110.7.20:1234', '', '1234', 'NAT GEO PEOPLE', '10', 'nat_geo_people.png'),
('107', '228.110.7.16', '@228.110.7.16', 'udp://228.110.7.16:1234', '', '1234', 'FASHION TV', '11', 'fashion_tv.png'),
('32', '228.110.7.9', '@228.110.7.9', 'udp://228.110.7.9:1234', '', '1234', 'CHANNEL V', '12', 'channel_v.png'),
('114', '228.110.7.14', '@228.110.7.14', 'udp://228.110.7.14:1234', '', '1234', 'CN', '13', 'cartoon_network.png'),
('117', '228.110.7.6', '@228.110.7.6', 'udp://228.110.7.6:1234', '', '1234', 'DISNEY JR', '14', 'disney_jr.png'),
('52', '228.110.7.15', '@228.110.7.15', 'udp://228.110.7.15:1234', '', '1234', 'Fox Movie Premium', '15', 'fox_movie_premium.png'),
('65', '228.110.7.13', '@228.110.7.13', 'udp://228.110.7.13:1234', '', '1234', 'HBO', '16', 'hbo.png'),
('34', '228.110.7.18', '@228.110.7.18', 'udp://228.110.7.18:1234', '', '1234', 'beIN Sports 1', '18', 'bein_sports1.png'),
('35', '228.110.7.4', '@228.110.7.4', 'udp://228.110.7.4:1234', '', '1234', 'beIN Sports 2', '19', 'bein_sports2.png'),
('123', '228.110.7.17', '@228.110.7.17', 'udp://228.110.7.17:1234', '', '1234', 'Usee Sport', '20', 'fox_sports.png'),
('20', '228.110.3.1', '@228.110.3.1', 'udp://228.110.3.1:1234', '', '1234', 'Channel News Asia', '21', 'cna.png'),
('23', '228.110.3.4', '@228.110.3.4', 'udp://228.110.3.4:1234', '', '1234', 'CHANNEL 5 HD', '22', 'channel_5.png'),
('18', '228.110.3.6', '@228.110.3.6', 'udp://228.110.3.6:1234', '', '1234', 'CHANNEL 8 HD', '23', 'channel_8.png'),
('60', '228.110.3.18', '@228.110.3.18', 'udp://228.110.3.18:1234', '', '1234', 'SURIA', '24', 'suria.png'),
('19', '228.110.3.7', '@228.110.3.7', 'udp://228.110.3.7:1234', '', '1234', 'VAS HD', '25', 'vasantham.png'),
('21', '228.110.3.2', '@228.110.3.2', 'udp://228.110.3.2:1234', '', '1234', 'CHANNEL U HD', '26', 'channel_u.png'),
('24', '228.110.4.1', '@228.110.4.1', 'udp://228.110.4.1:1234', '', '1234', 'Phoenix Info News HD', '29', 'phoenix_info_news.png'),
('25', '228.110.4.2', '@228.110.4.2', 'udp://228.110.4.2:1234', '', '1234', 'Phoenix Chinese HD', '30', 'phoenix_cn.png'),
('26', '228.110.4.3', '@228.110.4.3', 'udp://228.110.4.3:1234', '', '1234', 'Phoenix Hongkong HD', '31', 'phoenix_hk.png'),
('139', '228.110.6.111', '@228.110.6.111', 'udp://228.110.6.111:1234', '', '1234', 'TRT World', '32', 'trt_world.png'),
('119', '228.110.6.108', '@228.110.6.108', 'udp://228.110.6.108:1234', '', '1234', 'Aljazera', '36', 'aljazeera.png'),
('133', '228.110.4.30', '@228.110.4.30', 'udp://228.110.4.30:1234', '', '1234', 'QATAR TV', '37', 'qatar.png'),
('135', '228.110.4.32', '@228.110.4.32', 'udp://228.110.4.32:1234', '', '1234', 'AL ARABIYA', '39', 'al_arabiya.png'),
('73', '228.110.4.23', '@228.110.4.23', 'udp://228.110.4.23:1234', '', '1234', 'OMAN TV', '40', 'oman.png'),
('121', '228.110.6.110', '@228.110.6.110', 'udp://228.110.6.110:1234', '', '1234', 'DW', '43', 'dw.png'),
('3', '228.110.4.8', '@228.110.4.8', 'udp://228.110.4.8:1234', 'rtmp://202.129.216.27/tvone/tvone3', '1234', 'TV ONE', '45', 'tvone.png'),
('4', '228.110.3.11', '@228.110.3.11', 'udp://228.110.3.11:1234', '', '1234', 'METRO TV HD', '46', 'metro_tv.png'),
('14', '228.110.4.5', '@228.110.4.5', 'udp://228.110.4.5:1234', 'rtmp://202.137.11.52:1935/jakarta/offair.sdp', '1234', 'KOMPAS TV', '48', 'kompas_tv.png'),
('61', '228.110.4.16', '@228.110.4.16', 'udp://228.110.4.16:1234', '', '1234', 'Net TV', '49', 'net_tv.png'),
('1', '228.110.3.8', '@228.110.3.8', 'udp://228.110.3.8:1234', 'http://live.mytrans.com/live/transtv.sdp/playlist.m3u8', '1234', 'TRANS TV', '53', 'trans_tv.png'),
('2', '228.110.3.9', '@228.110.3.9', 'udp://228.110.3.9:1234', 'http://live.mytrans.com/live/trans7.sdp/playlist.m3u8', '1234', 'TRANS 7', '54', 'trans_7.png'),
('6', '228.110.4.13', '@228.110.4.13', 'udp://228.110.4.13:1234', 'http://www.vidio.com/clips/199758/playlist.m3u8', '1234', 'SCTV', '55', 'sctv.png'),
('7', '228.110.4.14', '@228.110.4.14', 'udp://228.110.4.14:1234', 'http://livestreaming-a.production.liputan6.static6.com/i/indosiar_1@137568/master.m3u8', '1234', 'Indosiar', '56', 'indosiar.png'),
('5', '228.110.4.7', '@228.110.4.7', 'udp://228.110.4.7:1234', 'rtmp://202.129.216.27/antv/antv1', '1234', 'ANTV', '57', 'antv.png'),
('11', '228.110.3.10', '@228.110.3.10', 'udp://228.110.3.10:1234', 'rtmp://118.97.50.102/digital/nasional', '1234', 'TVRI Nasional', '60', 'tvri.png'),
('141', '228.110.4.12', '@228.110.4.12', 'udp://228.110.4.12:1234', '', '1234', 'TVRI World', '79', 'tvri.png'),
('140', '228.110.4.22', '@228.110.4.22', 'udp://228.110.4.22:1234', '', '1234', 'TVRI Sport', '80', 'tvri.png');

-- --------------------------------------------------------

--
-- Table structure for table `channelnew`
--

CREATE TABLE `channelnew` (
  `id` varchar(255) NOT NULL,
  `ip4` varchar(255) NOT NULL,
  `ip` varchar(255) NOT NULL,
  `ip2` varchar(255) NOT NULL,
  `ip3` varchar(255) NOT NULL,
  `port` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `prioritas` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `channelnew`
--

INSERT INTO `channelnew` (`id`, `ip4`, `ip`, `ip2`, `ip3`, `port`, `name`, `prioritas`, `img`) VALUES
('1', '228.110.7.1', '@228.110.3.8', 'udp://228.110.3.8:1234', 'http://live.mytrans.com/live/transtv.sdp/playlist.m3u8', '1234', 'KBS WORLD', '3', 'kbsworld.png'),
('106', '228.110.3.3', '@228.110.7.20', 'udp://228.110.7.20:1234', '', '1234', 'PUNJAB TV', '27', 'punjabtv.png'),
('107', '228.110.3.7', '@228.110.7.16', 'udp://228.110.7.16:1234', '', '1234', 'VAS HD', '25', 'fashion_tv.png'),
('11', '228.110.7.14', '@228.110.3.10', 'udp://228.110.3.10:1234', 'rtmp://118.97.50.102/digital/nasional', '1234', 'CN', '13', 'cn.png'),
('114', '228.110.3.9', '@228.110.7.14', 'udp://228.110.7.14:1234', '', '1234', 'TRANS 7', '54', 'trans7.jpg'),
('117', '228.110.4.1', '@228.110.7.6', 'udp://228.110.7.6:1234', '', '1234', 'PHOENIX INFO NEWS', '29', 'phoenixinfonews.png'),
('119', '228.110.4.5', '@228.110.6.108', 'udp://228.110.6.108:1234', '', '1234', 'KOMPAS TV', '48', 'kompastv.png'),
('121', '228.110.6.109', '@228.110.6.110', 'udp://228.110.6.110:1234', '', '1234', 'MONDE TV', '42', 'mondetv.png'),
('123', '228.110.4.17', '@228.110.7.17', 'udp://228.110.7.17:1234', '', '1234', 'XING KONG', '34', 'xingkong.png'),
('133', '228.110.4.7', '@228.110.4.30', 'udp://228.110.4.30:1234', '', '1234', 'ANTV', '48', 'antv.jpg'),
('135', '228.110.4.8', '@228.110.4.32', 'udp://228.110.4.32:1234', '', '1234', 'TV ONE', '45', 'tvone.jpg'),
('139', '228.110.4.32', '@228.110.6.111', 'udp://228.110.6.111:1234', '', '1234', 'AL ARABIYA', '39', 'alarabiya.png'),
('14', '228.110.6.112', '@228.110.4.5', 'udp://228.110.4.5:1234', 'rtmp://202.137.11.52:1935/jakarta/offair.sdp', '1234', 'SUN TV HK', '33', 'suntv.png'),
('140', '228.110.7.16', '@228.110.4.22', 'udp://228.110.4.22:1234', '', '1234', 'FASHION TV', '11', 'fashiontv.png'),
('141', '228.110.7.15', '@228.110.4.12', 'udp://228.110.4.12:1234', '', '1234', 'FOX PREMIUM', '15', 'foxpremium.png'),
('16', '228.110.6.122', '@228.110.6.122', 'udp://228.110.6.122:1234', '', '1234', 'PROMO HOTEL', '0', 'promo_hotel.png'),
('17', '228.110.3.11', '@228.110.7.3', 'udp://228.110.7.3:1234', '', '1234', 'METRO TV HD', '46', 'metrotv.jpg'),
('18', '228.110.4.2', '@228.110.3.6', 'udp://228.110.3.6:1234', '', '1234', 'PHOENIX  CHINESE HD', '30', 'phoenixchinesehd.jpg'),
('19', '228.110.4.22', '@228.110.3.7', 'udp://228.110.3.7:1234', '', '1234', 'TVRI SPORT', '80', 'tvrisport.png'),
('2', '228.110.7.10', '@228.110.3.9', 'udp://228.110.3.9:1234', 'http://live.mytrans.com/live/trans7.sdp/playlist.m3u8', '1234', 'CNN', '5', 'cnn.png'),
('20', '228.110.4.18', '@228.110.3.1', 'udp://228.110.3.1:1234', '', '1234', 'CHANNEL V CHINA', '35', 'channelvchina.png'),
('21', '228.110.4.23', '@228.110.3.2', 'udp://228.110.3.2:1234', '', '1234', 'OMAN TV', '40', 'omantv.png'),
('23', '228.110.4.19', '@228.110.3.4', 'udp://228.110.3.4:1234', '', '1234', 'I-NEWS', '47', 'inews.png'),
('24', '228.110.4.3', '@228.110.4.1', 'udp://228.110.4.1:1234', '', '1234', 'PHOENIX HONGKONG', '31', 'phoenixhongkonghd.png'),
('25', '228.110.4.30', '@228.110.4.2', 'udp://228.110.4.2:1234', '', '1234', 'QATAR TV', '37', 'qatartv.png'),
('26', '228.110.4.31', '@228.110.4.3', 'udp://228.110.4.3:1234', '', '1234', 'EMARAT TV', '38', 'emarattv.png'),
('3', '228.110.6.110', '@228.110.4.8', 'udp://228.110.4.8:1234', 'rtmp://202.129.216.27/tvone/tvone3', '1234', 'DW', '43', 'dwtv.png'),
('32', '228.110.3.8', '@228.110.7.9', 'udp://228.110.7.9:1234', '', '1234', 'TRANS TV', '53', 'transtv.png'),
('34', '228.110.4.14', '@228.110.7.18', 'udp://228.110.7.18:1234', '', '1234', 'INDOSIAR', '56', 'indosiar.png'),
('35', '228.110.4.16', '@228.110.7.4', 'udp://228.110.7.4:1234', '', '1234', 'NET TV', '49', 'nettv.jpeg'),
('4', '228.110.6.111', '@228.110.3.11', 'udp://228.110.3.11:1234', '', '1234', 'TRT WORLD', '32', 'trtworld.png'),
('5', '228.110.7.13', '@228.110.4.7', 'udp://228.110.4.7:1234', 'rtmp://202.129.216.27/antv/antv1', '1234', 'HBO', '16', 'hbo.png'),
('52', '228.110.4.12', '@228.110.7.15', 'udp://228.110.7.15:1234', '', '1234', 'TVRI WORLD', '79', 'tvriworld.png'),
('53', '228.110.3.18', '@228.110.7.11', 'udp://228.110.7.11:1234', '', '1234', 'SURIA TV', '24', 'suria.jpg'),
('56', '228.110.3.12', '@228.110.7.7', 'udp://228.110.7.7:1234', '', '1234', 'RCTI', '51', 'rcti.png'),
('6', '228.110.7.11', '@228.110.4.13', 'udp://228.110.4.13:1234', 'http://www.vidio.com/clips/199758/playlist.m3u8', '1234', 'NAT GEOGRAPHIC', '9', 'natgeo.png'),
('60', '228.110.4.21', '@228.110.3.18', 'udp://228.110.3.18:1234', '', '1234', 'SINEMA INDONESIA', '59', 'sinemaindonesia.jpg'),
('61', '228.110.6.18', '@228.110.4.16', 'udp://228.110.4.16:1234', '', '1234', 'RUSIA TODAY', '41', 'russiatoday.png'),
('62', '228.110.3.1', '@228.110.7.5', 'udp://228.110.7.5:1234', '', '1234', 'CHANNEL NEWS ASIA', '21', 'channelnewsasia.jpg'),
('63', '228.110.3.13', '@228.110.7.2', 'udp://228.110.7.2:1234', '', '1234', 'GLOBAL TV', '52', 'globaltv.png'),
('65', '228.110.4.13', '@228.110.7.13', 'udp://228.110.7.13:1234', '', '1234', 'SCTV', '55', 'sctv.png'),
('7', '228.110.7.12', '@228.110.4.14', 'udp://228.110.4.14:1234', 'http://livestreaming-a.production.liputan6.static6.com/i/indosiar_1@137568/master.m3u8', '1234', 'AXN', '2', 'axn.png'),
('73', '228.110.6.108', '@228.110.4.23', 'udp://228.110.4.23:1234', '', '1234', 'AL JAZERA', '36', 'aljazeratv.png'),
('74', '228.110.3.14', '@228.110.7.8', 'udp://228.110.7.8:1234', '', '1234', 'MNC TV', '50', 'mnc.jpg'),
('99', '228.110.3.10', '@228.110.7.12', 'udp://228.110.7.12:1234', '', '1234', 'TVRI NASIONAL', '60', 'tvri.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `promotion`
--

CREATE TABLE `promotion` (
  `id_promotion` int(11) NOT NULL,
  `judul_gambar` varchar(255) NOT NULL,
  `waktu` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `promotion`
--

INSERT INTO `promotion` (`id_promotion`, `judul_gambar`, `waktu`) VALUES
(27, 'img1.jpg', '2023-01-12 12:36:06'),
(28, 'img2.jpg', '2023-01-12 12:36:19'),
(29, 'img3.jpg', '2023-01-12 13:24:13');

-- --------------------------------------------------------

--
-- Table structure for table `reflexology`
--

CREATE TABLE `reflexology` (
  `id_reflexology` int(11) NOT NULL,
  `kategori` varchar(255) NOT NULL,
  `gambar` varchar(255) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `deskripsi` varchar(255) NOT NULL,
  `harga` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reflexology`
--

INSERT INTO `reflexology` (`id_reflexology`, `kategori`, `gambar`, `judul`, `deskripsi`, `harga`) VALUES
(3, 'Lawana_Simplicity', 'img1.jpg', 'test judul', 'test deskripsi', '435346535356');

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `id_room` int(11) NOT NULL,
  `no_room` varchar(255) NOT NULL,
  `guest_name` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`id_room`, `no_room`, `guest_name`, `gender`) VALUES
(1, '501', 'herdo', 'Male');

-- --------------------------------------------------------

--
-- Table structure for table `tv`
--

CREATE TABLE `tv` (
  `id_tv` int(11) NOT NULL,
  `mac_address` varchar(255) NOT NULL,
  `room_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tv`
--

INSERT INTO `tv` (`id_tv`, `mac_address`, `room_name`) VALUES
(1, '00:1B:44:11:3A:B7', 'sakura'),
(2, '00:1B:44:11:3A:B7', 'dodododo');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_admin` varchar(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_admin`, `username`, `password`) VALUES
('adm002', 'herdo33', 'ecc3c606c6ff632a45c9cbb2904cde03a151d9cd');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about`
--
ALTER TABLE `about`
  ADD PRIMARY KEY (`id_about`);

--
-- Indexes for table `channel`
--
ALTER TABLE `channel`
  ADD PRIMARY KEY (`id_channel`);

--
-- Indexes for table `channelnew`
--
ALTER TABLE `channelnew`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `promotion`
--
ALTER TABLE `promotion`
  ADD PRIMARY KEY (`id_promotion`);

--
-- Indexes for table `reflexology`
--
ALTER TABLE `reflexology`
  ADD PRIMARY KEY (`id_reflexology`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id_room`);

--
-- Indexes for table `tv`
--
ALTER TABLE `tv`
  ADD PRIMARY KEY (`id_tv`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_admin`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about`
--
ALTER TABLE `about`
  MODIFY `id_about` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `channel`
--
ALTER TABLE `channel`
  MODIFY `id_channel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `promotion`
--
ALTER TABLE `promotion`
  MODIFY `id_promotion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `reflexology`
--
ALTER TABLE `reflexology`
  MODIFY `id_reflexology` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `id_room` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tv`
--
ALTER TABLE `tv`
  MODIFY `id_tv` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
