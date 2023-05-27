-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 22, 2023 lúc 04:38 PM
-- Phiên bản máy phục vụ: 10.4.27-MariaDB
-- Phiên bản PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `database`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `isAdmin` bool DEFAULT 0,
  `lock` bool DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`id`, `name`, `email`, `password`,`isAdmin`) VALUES
(1,'admin','admin@gmail.com','$2b$10$n29LF9D4I0JBT3sY7T9/ruFDr7iOg.kjRjDdJuq4e/kg6LZeOuaie',1),-- account: admin@gmail.com password:123456 
(9, 'Nguyễn Duy Ben', 'duybendc@gmai.com', '$2b$10$biyodofnw2knPvYUOmpwaeiE8rCusZmHuCNN0iUTymrfLMirp1Qr2',0),
(10, 'Nguyễn Thị Anh Thư', 'anhthu@gmail.com', '$2b$10$KCKO3pPDXKH5OU42qwwBzO0akzSwoYrXp8Bnpo3xAl.uQ7XioGkqC',0),
(11, 'Nguyễn Thị Mỹ Linh', 'mylinhdc@gmail.com', '$2b$10$UwDicuR2TqIcdNHfV7GPuOh0RyjsXnk2BcrKIUtlAyIP/ZgH.OX1m',0),
(12, 'Trần Hạo Nhiên', 'haonhien@gmail.com', '$2b$10$b/4ZERFnKM4SWdDeHU95C.WL55WAZpgNWcoSnTe/Y3dHDm9.gjsfW',0),
(13, 'Nguyễn Thị Linh Chi', 'linhchi@gmail.com', '$2b$10$JfbCPEofN4hEu8DGYqQ6ouYtK378gGuStDH5zk6Jk6JgNrqfhZUJu',0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bookings`
--

CREATE TABLE `bookings` (
  `id` char(5) NOT NULL DEFAULT concat(ucase(substr(md5(uuid_short()),1,5)),'-',uuid_short()),
  `adults` int(11) NOT NULL,
  `children` int(11) NOT NULL,
  `infants` int(11) NOT NULL,
  `total` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `bookings`
--

INSERT INTO `bookings` (`id`, `adults`, `children`, `infants`, `total`, `fullname`, `gender`, `email`, `phone`, `created_at`) VALUES
('83D7E', 2, 1, 0, '3500000', 'Nguyễn Thị Ánh', 'Female', 'nguyen.anh@gmail.com', '0901234567', '2023-04-22 12:48:19'),
('7D375', 1, 0, 0, '1500000', 'Trần Văn Nam', 'Male', 'tran.nam@gmail.com', '0912345678', '2023-04-22 12:48:19'),
('21747', 2, 2, 1, '6200000', 'Lê Thị Lan Anh', 'Female', 'le.lananh@gmail.com', '0987654321', '2023-04-22 12:48:19'),
('1B8AD', 3, 1, 0, '4800000', 'Phạm Thị Ngọc Trâm', 'Female', 'pham.ngoctram@gmail.com', '0909123456', '2023-04-22 12:48:19'),
('74823', 1, 0, 0, '800000', 'Hoàng Văn Toàn', 'Male', 'hoang.toan@gmail.com', '0967890123', '2023-04-22 12:48:19'),
('05D69', 2, 2, 1, '5800000', 'Ngô Thị Hải Yến', 'Female', 'ngo.haiyen@gmail.com', '0912123456', '2023-04-22 12:48:19'),
('37637', 1, 1, 0, '2500000', 'Đinh Minh Anh', 'Male', 'dinh.minhanh@gmail.com', '0987654321', '2023-04-22 12:48:19'),
('CEF73', 4, 0, 1, '7900000', 'Vũ Thị Hồng Nga', 'Female', 'vu.hongnga@gmail.com', '0909876543', '2023-04-22 12:48:19'),
('41196', 2, 0, 0, '2400000', 'Trần Thị An', 'Female', 'tran.an@gmail.com', '0912345678', '2023-04-22 12:48:19'),
('93F91', 3, 1, 1, '5400000', 'Lý Thị Trang', 'Female', 'ly.trang@gmail.com', '0967890123', '2023-04-22 12:48:19');

--
-- Bẫy `bookings`
--
DELIMITER $$
CREATE TRIGGER `bookings_insert_trigger` AFTER INSERT ON `bookings` FOR EACH ROW INSERT INTO `contact_info` (`id_bookings`, `fullname`, `gender`, `email`, `phone`)
VALUES (NEW.id, NEW.fullname, NEW.gender, NEW.email, NEW.phone)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `ticket_insert_trigger` AFTER INSERT ON `bookings` FOR EACH ROW INSERT INTO `ticket` (`id_booking`, `adults`, `children`, `infants`, `total`)
VALUES (NEW.id, NEW.adults, NEW.children, NEW.infants, NEW.total)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `contact_info`
--

CREATE TABLE `contact_info` (
  `id` int(11) NOT NULL,
  `id_bookings` char(5) DEFAULT NULL,
  `fullname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `contact_info`
--

INSERT INTO `contact_info` (`id`, `id_bookings`, `fullname`, `gender`, `email`, `phone`) VALUES
(1, 'a5c5f', 'Nguyễn Thị Ánh', 'Female', 'nguyen.anh@gmail.com', '0901234567'),
(2, '78d5a', 'Trần Văn Nam', 'Male', 'tran.nam@gmail.com', '0912345678'),
(3, '727d3', 'Lê Thị Lan Anh', 'Female', 'le.lananh@gmail.com', '0987654321'),
(4, '6a9ad', 'Phạm Thị Ngọc Trâm', 'Female', 'pham.ngoctram@gmail.com', '0909123456'),
(5, '18b19', 'Hoàng Văn Toàn', 'Male', 'hoang.toan@gmail.com', '0967890123'),
(6, '4d6f1', 'Ngô Thị Hải Yến', 'Female', 'ngo.haiyen@gmail.com', '0912123456'),
(7, 'dc288', 'Đinh Minh Anh', 'Male', 'dinh.minhanh@gmail.com', '0987654321'),
(8, 'f5393', 'Vũ Thị Hồng Nga', 'Female', 'vu.hongnga@gmail.com', '0909876543'),
(9, '7dc0d', 'Trần Thị An', 'Female', 'tran.an@gmail.com', '0912345678'),
(10, '449c6', 'Lý Thị Trang', 'Female', 'ly.trang@gmail.com', '0967890123');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `flights`
--

CREATE TABLE `flights` (
  `flight_id` int(11) NOT NULL,
  `airline` varchar(255) DEFAULT NULL,
  `departure_date` date DEFAULT NULL,
  `departure_time` time DEFAULT NULL,
  `arrival_date` date DEFAULT NULL,
  `arrival_time` time DEFAULT NULL,
  `departure_location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `arrival_location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `economy_price` float DEFAULT NULL,
  `business_price` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `flights`
--

INSERT INTO `flights` (`flight_id`, `airline`, `departure_date`, `departure_time`, `arrival_date`, `arrival_time`, `departure_location`, `arrival_location`, `economy_price`, `business_price`) VALUES
(0, 'VJ132', '2023-03-16', '08:45:57', '2023-03-29', '09:45:57', 'Nội Bài - Hà Nội (HAN)', 'Đà Nẵng - Đà Nẵng (DAD)', 650000, 989000),
(1, 'VJ133', '2023-03-16', '09:00:00', '2023-03-29', '11:00:00', 'Nội Bài - Hà Nội (HAN)', 'Đà Nẵng - Đà Nẵng (DAD)', 660000, 988000),
(2, 'VJ134', '2023-03-16', '11:00:00', '2023-03-30', '13:00:00', 'Nội Bài - Hà Nội (HAN)', 'Đà Nẵng - Đà Nẵng (DAD)', 620000, 997000),
(3, 'VJ135', '2023-03-16', '19:00:00', '2023-03-28', '21:00:00', 'Nội Bài - Hà Nội (HAN)', 'Đà Nẵng - Đà Nẵng (DAD)', 450000, 980000),
(4, 'VJ136', '2023-03-16', '10:30:00', '2023-03-26', '12:30:00', 'Nội Bài - Hà Nội (HAN)', 'Đà Lạt - Lâm Đồng (DLI)', 800000, 1200000),
(5, 'VJ137', '2023-03-16', '14:00:00', '2023-03-25', '16:00:00', 'Nội Bài - Hà Nội (HAN)', 'Nội Bài - Hà Nội (HAN)', 500000, 1000000),
(6, 'VJ138', '2023-03-16', '07:30:00', '2023-03-24', '08:45:00', 'Tân Sơn Nhất - Thành phố Hồ Chí Minh (SGN)', 'Phú Quốc - Kiên Giang (PQC)', 700000, 900000),
(7, 'VJ139', '2023-03-16', '12:00:00', '2023-03-23', '13:45:00', 'Tân Sơn Nhất - Thành phố Hồ Chí Minh (SGN)', 'Cam Ranh - Khánh Hòa (CXR)', 700000, 1100000),
(8, 'VJ140', '2023-03-13', '11:00:00', '2023-03-27', '13:00:00', 'Tân Sơn Nhất - Thành phố Hồ Chí Minh (SGN)', 'Cam Ranh - Khánh Hòa (CXR)', 700000, 9000000),
(9, 'VJ141', '2023-03-16', '12:00:00', '2023-03-23', '15:45:00', 'Tân Sơn Nhất - Thành phố Hồ Chí Minh (SGN)', 'Cam Ranh - Khánh Hòa (CXR)', 700000, 950000),
(10, 'VJ142', '2023-03-16', '12:00:00', '2023-03-26', '17:45:00', 'Tân Sơn Nhất - Thành phố Hồ Chí Minh (SGN)', 'Cam Ranh - Khánh Hòa (CXR)', 700000, 8600000),
(11, 'VJ143', '2023-03-18', '12:00:00', '2023-03-23', '18:45:00', 'Tân Sơn Nhất - Thành phố Hồ Chí Minh (SGN)', 'Cam Ranh - Khánh Hòa (CXR)', 700000, 880000),
(12, 'VJ144', '2023-03-17', '12:00:00', '2023-03-24', '13:00:00', 'Nội Bài - Hà Nội (HAN)', 'Cam Ranh - Khánh Hòa (CXR)', 700000, 995000),
(13, 'VN101', '2023-03-16', '07:30:00', '2023-03-25', '08:45:00', 'Tân Sơn Nhất - Thành phố Hồ Chí Minh (SGN)', 'Phú Quốc - Kiên Giang (PQC)', 650000, 950000),
(14, 'VN102', '2023-03-16', '14:00:00', '2023-03-25', '15:30:00', 'Phú Quốc - Kiên Giang (PQC)', 'Tân Sơn Nhất - Thành phố Hồ Chí Minh (SGN)', 700000, 1000000),
(15, 'VN103', '2023-03-16', '10:00:00', '2023-03-26', '13:45:00', 'Tân Sơn Nhất - Thành phố Hồ Chí Minh (SGN)', 'Cát Bi - Hải Phòng (HPH)', 700000, 1200000),
(16, 'VN104', '2023-03-16', '10:00:00', '2023-03-26', '13:45:00', 'Cát Bi - Hải Phòng (HPH)', 'Tân Sơn Nhất - Thành phố Hồ Chí Minh (SGN)', 750000, 1300000),
(17, 'VN105', '2023-03-16', '13:30:00', '2023-03-25', '15:30:00', 'Tân Sơn Nhất - Thành phố Hồ Chí Minh (SGN)', 'Nội Bài - Hà Nội (HAN)', 900000, 1500000),
(18, 'VN106', '2023-03-16', '07:00:00', '2023-03-25', '09:00:00', 'Nội Bài - Hà Nội (HAN)', 'Tân Sơn Nhất - Thành phố Hồ Chí Minh (SGN)', 800000, 1400000),
(19, 'VN107', '2023-03-16', '10:30:00', '2023-03-24', '12:45:00', 'Nội Bài - Hà Nội (HAN)', 'Cát Bi - Hải Phòng (HPH)', 950000, 1600000),
(20, 'VN108', '2023-03-16', '12:00:00', '2023-03-23', '14:15:00', 'Tân Sơn Nhất - Thành phố Hồ Chí Minh (SGN)', 'Cát Bi - Hải Phòng (HPH)', 850000, 1300000),
(21, 'VJ145', '2023-05-01', '10:00:00', '2023-05-01', '12:00:00', 'Nội Bài - Hà Nội (HAN)', 'Tân Sơn Nhất - Thành phố Hồ Chí Minh (SGN)', 900000, 1400000),
(22, 'VJ146', '2023-05-03', '13:30:00', '2023-05-03', '15:30:00', 'Nội Bài - Hà Nội (HAN)', 'Phú Quốc - Kiên Giang (PQC)', 850000, 1250000),
(23, 'VN102', '2023-05-05', '08:00:00', '2023-05-05', '10:00:00', 'Phú Quốc - Kiên Giang (PQC)', 'Nội Bài - Hà Nội (HAN)', 1200000, 2000000),
(24, 'VN103', '2023-05-07', '09:00:00', '2023-05-07', '11:30:00', 'Cam Ranh - Khánh Hòa (CXR)', 'Tân Sơn Nhất - Thành phố Hồ Chí Minh (SGN)', 700000, 1100000),
(25, 'VJ147', '2023-05-09', '15:00:00', '2023-05-09', '17:00:00', 'Đà Nẵng - Đà Nẵng (DAD)', 'Nội Bài - Hà Nội (HAN)', 780000, 1300000),
(26, 'VJ148', '2023-05-11', '11:30:00', '2023-05-11', '13:30:00', 'Tân Sơn Nhất - Thành phố Hồ Chí Minh (SGN)', 'Cam Ranh - Khánh Hòa (CXR)', 950000, 1450000),
(27, 'VJ149', '2023-05-13', '07:45:00', '2023-05-13', '09:30:00', 'Nội Bài - Hà Nội (HAN)', 'Cam Ranh - Khánh Hòa (CXR)', 700000, 1000000),
(28, 'VN104', '2023-05-15', '14:00:00', '2023-05-15', '16:00:00', 'Phú Quốc - Kiên Giang (PQC)', 'Tân Sơn Nhất - Thành phố Hồ Chí Minh (SGN)', 1100000, 1800000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ticket`
--

CREATE TABLE `ticket` (
  `id` int(11) NOT NULL,
  `id_booking` char(5) NOT NULL,
  `adults` int(11) NOT NULL,
  `children` int(11) NOT NULL,
  `infants` int(11) NOT NULL,
  `total` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `ticket`
--

INSERT INTO `ticket` (`id`, `id_booking`, `adults`, `children`, `infants`, `total`) VALUES
(1, 'a5c5f', 2, 1, 0, '3'),
(2, '78d5a', 1, 0, 1, '2'),
(3, '727d3', 2, 2, 0, '4'),
(4, '6a9ad', 1, 0, 0, '1'),
(5, '18b19', 3, 0, 1, '4'),
(6, '4d6f1', 2, 1, 0, '3'),
(7, 'dc288', 2, 2, 1, '5'),
(8, 'f5393', 1, 1, 0, '2'),
(9, '7dc0d', 2, 1, 1, '4'),
(10, '449c6', 1, 0, 0, '1');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Chỉ mục cho bảng `contact_info`
--
ALTER TABLE `contact_info`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `flights`
--
ALTER TABLE `flights`
  ADD PRIMARY KEY (`flight_id`);

--
-- Chỉ mục cho bảng `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `contact_info`
--
ALTER TABLE `contact_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `ticket`
--
ALTER TABLE `ticket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
