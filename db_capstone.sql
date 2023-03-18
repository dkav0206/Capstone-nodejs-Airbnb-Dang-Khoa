-- Adminer 4.8.1 MySQL 8.0.32 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `binh_luan`;
CREATE TABLE `binh_luan` (
  `nguoi_dung_id` int NOT NULL,
  `hinh_id` int NOT NULL,
  `ngay_binh_luan` datetime NOT NULL,
  `noi_dung` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`nguoi_dung_id`,`hinh_id`,`ngay_binh_luan`),
  KEY `ngay_binh_luan` (`ngay_binh_luan`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `binh_luan_ibfk_2` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `binh_luan_ibfk_4` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `hinh_anh`;
CREATE TABLE `hinh_anh` (
  `hinh_id` int NOT NULL AUTO_INCREMENT,
  `ten_hinh` varchar(255) DEFAULT NULL,
  `duong_dan` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `nguoi_dung_id` int NOT NULL,
  PRIMARY KEY (`hinh_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `hinh_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `luu_anh`;
CREATE TABLE `luu_anh` (
  `nguoi_dung_id` int NOT NULL,
  `hinh_id` int NOT NULL,
  `ngay_luu` datetime DEFAULT NULL,
  PRIMARY KEY (`nguoi_dung_id`,`hinh_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `luu_anh_ibfk_3` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `luu_anh_ibfk_4` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `nguoi_dung`;
CREATE TABLE `nguoi_dung` (
  `nguoi_dung_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `ho_ten` varchar(255) DEFAULT NULL,
  `tuoi` int DEFAULT NULL,
  `anh_dai_dien` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`nguoi_dung_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(2,	'abcde@gmail.com',	'$2b$10$N6iZ6knxUXNk6sE/c4PMtO4KiHxfB.VSa43UX21y6Q8iZDkI5hJVy',	'khoa',	9,	'1678938156630-book3.png'),
(3,	'd@gmail.com',	'$2b$10$py5FT34WTxk7yCq0uloMNOFZ9gNT.yMpB28.qLpeEOW3qhK7RjHra',	'khoa',	9,	'1679142132452-book3.png'),
(4,	'abc1@gmail.com',	'$2b$10$Lgval9iPSLtEIQ5W66KtyeWsEeIaTlu09vd.nlkylcs90FprvFnOG',	'khoa',	2,	NULL),
(5,	'abc12@gmail.com',	'$2b$10$VNhCkK1eL8CSmS9mcPo.buWcTa9UMghn0bhG57fK8vV1GHdXbBbVC',	'khoa',	2,	'[object Object]'),
(7,	'a@gmail.com',	'$2b$10$FP1iQXJ4ZqyWHm/5/mbHA.CTQL/ps8XbfonGRGhqbixf/QBM1np4.',	'khoaá',	2,	'1679140773984-CAT2.PNG'),
(8,	'abc@gmail.com',	'$2b$10$7V/TgfXtLNMz5/XtjOxefO8fs.NX2ag/.DIpFIUe9tRcvhTC4MLg.',	'khoaá',	2,	'1679140978141-CAT2.PNG'),
(9,	'b@gmail.com',	'$2b$10$SeyDIi7HiBmA91T1ZOB75uW3eVpaxjex2n./GB1YGxrChzwfgstv.',	'khoaá',	2,	'1679141398906-CAT2.PNG'),
(10,	'c@gmail.com',	'$2b$10$OOZE00Eb1Tjjpis3M0zmn.ahQi9HZFn8tT0SXPDeyJKPQPm93fUvq',	'khoaá',	2,	'1679141666818-CAT2.PNG'),
(11,	'm@gmail.com',	'$2b$10$SYynICjkQr3oOlKdY9mwOOJtZGWrBI8dHEdq6fJtNquhx6IZTpZt2',	'khoaabc',	2,	'1679142667929-book3.png');
