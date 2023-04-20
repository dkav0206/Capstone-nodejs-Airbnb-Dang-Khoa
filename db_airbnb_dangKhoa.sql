-- Adminer 4.8.1 MySQL 8.0.32 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

CREATE DATABASE `db_airbnb_dangKhoa` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_airbnb_dangKhoa`;

CREATE TABLE `BinhLuan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_phong` int NOT NULL,
  `ma_nguoi_binh_luan` int NOT NULL,
  `ngay_binh_luan` datetime NOT NULL,
  `noi_dung` varchar(255) DEFAULT NULL,
  `sao_binh_luan` int DEFAULT NULL,
  PRIMARY KEY (`id`,`ma_phong`,`ma_nguoi_binh_luan`,`ngay_binh_luan`),
  KEY `Binh_luan_Phong` (`ma_phong`),
  KEY `ma_nguoi_binh_luan` (`ma_nguoi_binh_luan`),
  CONSTRAINT `Binh_luan_Phong` FOREIGN KEY (`ma_phong`) REFERENCES `Phong` (`id`),
  CONSTRAINT `BinhLuan_ibfk_1` FOREIGN KEY (`ma_nguoi_binh_luan`) REFERENCES `NguoiDung` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `BinhLuan` (`id`, `ma_phong`, `ma_nguoi_binh_luan`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`) VALUES
(4,	2,	1,	'2023-04-17 06:22:37',	'dsa',	1),
(5,	2,	1,	'2023-04-17 06:22:39',	'3dsa',	1),
(6,	2,	1,	'2023-04-17 06:22:42',	'312dsa',	1);

CREATE TABLE `DatPhong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_phong` int NOT NULL,
  `ngay_den` datetime NOT NULL,
  `ngay_di` datetime NOT NULL,
  `so_luong_khach` int DEFAULT NULL,
  `ma_nguoi_dat` int NOT NULL,
  PRIMARY KEY (`id`,`ma_phong`,`ma_nguoi_dat`),
  KEY `ma_nguoi_dat` (`ma_nguoi_dat`),
  KEY `ma_phong` (`ma_phong`),
  CONSTRAINT `DatPhong_ibfk_1` FOREIGN KEY (`ma_nguoi_dat`) REFERENCES `NguoiDung` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `DatPhong_ibfk_2` FOREIGN KEY (`ma_phong`) REFERENCES `Phong` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `DatPhong` (`id`, `ma_phong`, `ngay_den`, `ngay_di`, `so_luong_khach`, `ma_nguoi_dat`) VALUES
(3,	2,	'2023-06-03 14:00:00',	'2231-06-04 14:00:00',	2,	1),
(4,	2,	'2023-06-03 14:00:00',	'2231-06-04 14:00:00',	2,	1),
(5,	2,	'2023-06-03 14:00:00',	'2231-06-04 14:00:00',	2,	1),
(8,	2,	'2023-06-03 14:00:00',	'2023-06-04 14:00:00',	2,	13);

CREATE TABLE `NguoiDung` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `pass_word` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `birth_day` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `NguoiDung` (`id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `avatar`) VALUES
(1,	'khoa',	'abc@gmail.com',	'$2b$10$LwVxJETy8xWBKiaU5zNLf.2WklkjnCYhI.I0LXp2t7aVqOCkhNaxO',	'123',	'12/12',	'male',	'ADMIN',	'1681987604826-a22.jpg'),
(8,	'khoa',	'abcd@gmail.com',	'$2b$10$.UM.ulyizadbvQqzYtc2aeNkndG9CKO0ANoTcncFKXY.a1.aZYdTW',	'123',	'12/12',	'male',	'?',	NULL),
(9,	'string',	'a',	'$2b$10$qj4I2QKX4K4FGjoXxi0qTeAArW8QG6cqQmf71po6ODY5k0TpYCti6',	'string',	'string',	'string',	'string',	NULL),
(10,	'string',	'string',	'$2b$10$aDGclV8zH7CFwCgXNH1Gn.j/i9IjeswCymFw6ZNIskmhhUBXxWzya',	'string',	'string',	'string',	'string',	NULL),
(13,	'khoa',	'g@gmail.com',	'$2b$10$mciiLehZiUGre8lhLTktm.fSVi7.DE7/dyx3O6nimrMvOkMLQtvP2',	'123',	'12/12',	'male',	'Customer',	NULL),
(14,	'khoa',	'e@gmail.com',	'$2b$10$UKyYA24MgRjPJhMZl.2iReTLpkqu5WtlkHCml4GxNJO2UQPFDO6SC',	'123',	'12/12',	'male',	'?',	NULL);

CREATE TABLE `Phong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_phong` varchar(255) DEFAULT NULL,
  `khach` int DEFAULT NULL,
  `phong_ngu` int DEFAULT NULL,
  `giuong` int DEFAULT NULL,
  `phong_tam` int DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `gia_tien` tinyint(1) DEFAULT '0',
  `may_giat` tinyint(1) DEFAULT '0',
  `ban_la` tinyint(1) DEFAULT '0',
  `tivi` tinyint(1) DEFAULT '0',
  `dieu_hoa` tinyint(1) DEFAULT '0',
  `wifi` tinyint(1) DEFAULT '0',
  `bep` tinyint(1) DEFAULT '0',
  `do_xe` tinyint(1) DEFAULT '0',
  `ho_boi` tinyint(1) DEFAULT '0',
  `ban_ui` tinyint(1) DEFAULT '0',
  `hinh_anh` varchar(255) DEFAULT '0',
  `ma_vi_tri` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`,`ma_vi_tri`),
  KEY `ma_vi_tri` (`ma_vi_tri`),
  CONSTRAINT `Phong_ibfk_14` FOREIGN KEY (`ma_vi_tri`) REFERENCES `ViTri` (`id`) ON DELETE SET DEFAULT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Phong` (`id`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `ban_ui`, `hinh_anh`, `ma_vi_tri`) VALUES
(2,	'das',	10,	10,	10,	10,	'',	2,	1,	1,	1,	1,	1,	1,	1,	1,	1,	'1681987701695-cat-3-final.png',	1);

CREATE TABLE `ViTri` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_vi_tri` varchar(255) DEFAULT NULL,
  `tinh_thanh` varchar(255) DEFAULT NULL,
  `quoc_gia` varchar(255) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `ViTri` (`id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`) VALUES
(1,	' 231',	'3213',	'213 ',	'1681870112918-CAT2.PNG'),
(2,	' 231',	'3213',	'213 ',	'1681987799512-CAT2.PNG');

-- 2023-04-20 11:23:18