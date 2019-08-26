# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.24)
# Database: liuyinshe_v1
# Generation Time: 2019-08-26 03:22:44 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table class
# ------------------------------------------------------------

DROP TABLE IF EXISTS `class`;

CREATE TABLE `class` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `course_id` int(11) DEFAULT NULL,
  `price` decimal(65,2) DEFAULT '0.00',
  `lesson_count` int(11) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `start_at` date DEFAULT NULL,
  `end_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;

INSERT INTO `class` (`id`, `name`, `description`, `course_id`, `price`, `lesson_count`, `status`, `created_at`, `start_at`, `end_at`)
VALUES
	(1,'三年二班23','124',2,120.00,5,1,'2019-08-06 14:56:31','2019-08-22','2019-09-22'),
	(2,'三年二班2','xxxxx',2,120.00,5,NULL,'2019-08-06 15:05:19','2019-08-21','2019-09-21'),
	(3,'三年二班3','xxxxx',2,120.00,5,NULL,'2019-08-06 15:05:56','2019-08-21','2019-09-21'),
	(4,'测试一班','xxx',2,800.00,8,1,'2019-08-22 08:44:18','2019-08-22','2019-09-19'),
	(5,'测试 2 班','aaa',3,800.00,5,NULL,'2019-08-22 15:35:45','2019-08-22','2019-08-16'),
	(6,'测试2班','啦啦',2,800.00,5,2,'2019-08-22 15:43:24','2019-08-22','2019-09-13');

/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table course
# ------------------------------------------------------------

DROP TABLE IF EXISTS `course`;

CREATE TABLE `course` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `teacher` varchar(255) DEFAULT NULL,
  `teacher_phone` varchar(255) DEFAULT NULL,
  `isdeleted` tinyint(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;

INSERT INTO `course` (`id`, `name`, `description`, `teacher`, `teacher_phone`, `isdeleted`)
VALUES
	(1,'声乐','xxxxx11','zhou11','13511111122',1),
	(2,'舞蹈','ccc','chou','13511111113',NULL),
	(3,'钢琴','xxxxx','zhou','13511111111',NULL),
	(4,'声乐','哈哈哈','kitty','13511111111',NULL);

/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table lesson
# ------------------------------------------------------------

DROP TABLE IF EXISTS `lesson`;

CREATE TABLE `lesson` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `class_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL COMMENT '1: 已完成；2: 已请假',
  `price` decimal(65,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `lesson` WRITE;
/*!40000 ALTER TABLE `lesson` DISABLE KEYS */;

INSERT INTO `lesson` (`id`, `class_id`, `date`, `start_time`, `end_time`, `status`, `price`)
VALUES
	(1,3,'2019-08-26','08:30:00','16:00:00',1,24.00),
	(2,3,'2019-08-28','09:00:00','10:30:00',NULL,24.00),
	(3,3,'2019-08-24','09:00:00','09:15:00',NULL,24.00),
	(4,3,NULL,NULL,NULL,NULL,24.00),
	(5,3,NULL,NULL,NULL,NULL,24.00),
	(6,4,NULL,NULL,NULL,1,100.00),
	(7,5,'2019-08-28','09:00:00','10:30:00',NULL,160.00),
	(8,6,'2019-08-26','08:45:00','09:15:00',NULL,160.00),
	(9,6,'2019-08-30','09:00:00','09:30:00',1,160.00),
	(10,6,NULL,NULL,NULL,NULL,160.00),
	(11,6,NULL,NULL,NULL,NULL,160.00),
	(12,6,NULL,NULL,NULL,NULL,160.00);

/*!40000 ALTER TABLE `lesson` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table manager
# ------------------------------------------------------------

DROP TABLE IF EXISTS `manager`;

CREATE TABLE `manager` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '姓名',
  `password` varchar(255) DEFAULT NULL COMMENT '密码',
  `phone` varchar(255) DEFAULT NULL COMMENT '手机',
  `isdeleted` tinyint(3) DEFAULT NULL COMMENT '删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `manager` WRITE;
/*!40000 ALTER TABLE `manager` DISABLE KEYS */;

INSERT INTO `manager` (`id`, `name`, `password`, `phone`, `isdeleted`)
VALUES
	(1,'周杰伦2','123456','13511111111',NULL),
	(2,'财讯通2','54321','1352222222',1),
	(3,'周杰伦333','1234567','1351111111',1),
	(4,'周杰伦33','1234568','13511111111',NULL),
	(5,'周杰伦3333','1234569','13511111111',NULL),
	(6,'测试','1234','13566666666',1),
	(7,'ceshi','123456','13544444444',NULL),
	(8,'asdfasdfxxxx','123456','13544444444',NULL);

/*!40000 ALTER TABLE `manager` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table payment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `payment`;

CREATE TABLE `payment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `status` tinyint(3) DEFAULT NULL COMMENT '1: 充值 2: 消费 3: 赠送',
  `user_id` int(11) DEFAULT NULL,
  `total` decimal(65,2) DEFAULT '0.00',
  `remark` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `manager_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;

INSERT INTO `payment` (`id`, `status`, `user_id`, `total`, `remark`, `created_at`, `manager_id`)
VALUES
	(1,1,1,0.00,'','2019-08-01 21:46:21',NULL),
	(2,1,2,0.00,'','2019-08-02 00:00:00',NULL),
	(3,1,1,10.00,'','2019-08-03 21:46:59',NULL),
	(4,2,1,-100.00,'','2019-08-04 00:00:00',NULL),
	(5,1,2,0.00,'','2019-08-04 21:50:05',NULL),
	(6,2,3,0.00,'xxx','2019-08-04 21:51:24',NULL),
	(7,2,1,10.00,'xxx','2019-08-05 21:51:32',NULL),
	(8,3,1,10.00,'xxx','2019-08-04 22:43:35',NULL),
	(9,1,1,100.00,'xxx','2019-08-05 09:38:36',NULL),
	(10,2,1,-10.00,'xxx','2019-08-05 09:39:06',NULL),
	(11,2,1,-24.00,'用户上课 lesson_id:1','2019-08-07 10:21:03',NULL),
	(12,2,1,-24.00,'用户上课 lesson_id:1','2019-08-07 10:23:20',NULL),
	(13,2,3,-24.00,'用户上课 lesson_id:1','2019-08-26 11:07:59',NULL),
	(14,2,2,-24.00,'用户上课 lesson_id:1','2019-08-26 11:07:59',NULL),
	(15,2,1,-24.00,'用户上课 lesson_id:2','2019-08-26 11:13:51',NULL),
	(16,2,2,-24.00,'用户上课 lesson_id:2','2019-08-26 11:13:51',NULL),
	(17,2,3,-24.00,'用户上课 lesson_id:2','2019-08-26 11:13:51',NULL),
	(18,2,11,-160.00,'用户上课 lesson_id:8','2019-08-26 11:17:47',NULL),
	(19,2,13,-160.00,'用户上课 lesson_id:8','2019-08-26 11:17:47',NULL),
	(20,2,12,-160.00,'用户上课 lesson_id:8','2019-08-26 11:17:47',NULL),
	(21,2,11,-160.00,'用户上课 lesson_id:9','2019-08-26 11:19:45',NULL),
	(22,2,13,-160.00,'用户上课 lesson_id:9','2019-08-26 11:19:55',NULL);

/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '姓名',
  `phone` varchar(255) DEFAULT NULL COMMENT '电话',
  `sex` tinyint(3) DEFAULT NULL COMMENT '性别：1 男 2 女',
  `birthday` date DEFAULT NULL COMMENT '出生',
  `sms_name` varchar(255) DEFAULT NULL COMMENT '紧急联系人',
  `sms_phone` varchar(255) DEFAULT NULL COMMENT '紧急联系人',
  `balance` decimal(65,2) DEFAULT '0.00' COMMENT '金额',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `name`, `phone`, `sex`, `birthday`, `sms_name`, `sms_phone`, `balance`, `created_at`)
VALUES
	(1,'周杰伦1','13511111112',1,'1990-07-14','周妈妈','13522222222',-28.00,'2019-08-02 16:24:33'),
	(2,'周杰伦2','13511111111',1,'1990-07-14','周妈妈2','13522222222',-48.00,'2019-08-02 16:44:19'),
	(3,'周杰伦3','13511111111',1,'1990-07-14','周妈妈3','13522222222',-48.00,'2019-08-02 16:53:04'),
	(4,'周杰伦4','13511111111',1,'1990-07-14','周妈妈2','13522222222',0.00,'2019-08-04 18:23:29'),
	(5,'周杰伦5','13511111111',1,'1990-07-14','周妈妈2','13522222222',0.00,'2019-08-04 18:23:30'),
	(6,'周杰伦6','13511111111',1,'1990-07-14','周妈妈2','13522222222',0.00,'2019-08-04 18:23:31'),
	(7,'周杰伦7','13511111111',1,'1990-07-14','周妈妈2','13522222222',0.00,'2019-08-04 18:23:32'),
	(8,'周杰伦8','13511111111',1,'1990-07-14','周妈妈2','13522222222',0.00,'2019-08-04 18:23:32'),
	(9,'周杰伦9','13511111111',1,'1990-07-14','周妈妈2','13522222222',0.00,'2019-08-04 18:23:33'),
	(10,'周杰伦10','13511111111',1,'1990-07-14','周妈妈2','13522222222',0.00,'2019-08-04 18:23:34'),
	(11,'周杰伦11','13511111111',1,'1990-07-14','周妈妈2','13522222222',-320.00,'2019-08-04 18:23:34'),
	(12,'周杰伦12','13511111111',1,'1990-07-14','周妈妈2','13522222222',-160.00,'2019-08-04 18:23:35'),
	(13,'周杰伦13','13511111111',1,'1990-07-14','周妈妈2','13522222222',-320.00,'2019-08-04 18:23:35'),
	(14,'周杰伦14','13511111111',1,'1990-07-15','周妈妈2','13522222222',0.00,'2019-08-04 18:23:36'),
	(15,'周杰伦15','13511111111',1,'1990-07-16','周妈妈2','13522222222',0.00,'2019-08-04 18:23:36'),
	(16,'周杰伦16','13511111111',1,'1990-07-16','周妈妈2','13522222222',0.00,'2019-08-04 18:23:37'),
	(17,'周杰伦17','13511111111',1,'1990-07-14','周妈妈2','13522222222',0.00,'2019-08-04 18:23:38'),
	(18,'周杰伦18','13522222222',1,'1990-07-14','周妈妈2','13522222222',0.00,'2019-08-04 18:23:38'),
	(19,'周杰伦19','13511111111',1,'1990-07-14','周妈妈2','13522222222',0.00,'2019-08-04 18:23:39'),
	(20,'想23','13511111112',1,'2019-08-06','粉丝','13522222222',0.00,'2019-08-20 09:47:34');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_class
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_class`;

CREATE TABLE `user_class` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `class_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `manager_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `user_class` WRITE;
/*!40000 ALTER TABLE `user_class` DISABLE KEYS */;

INSERT INTO `user_class` (`id`, `user_id`, `class_id`, `created_at`, `manager_id`)
VALUES
	(1,1,3,'2019-08-07 09:30:59',NULL),
	(2,2,3,'2019-08-07 09:31:29',NULL),
	(3,3,3,'2019-08-07 09:37:15',NULL),
	(4,11,6,'2019-08-24 18:47:25',NULL),
	(5,12,6,'2019-08-24 18:49:26',NULL),
	(6,13,6,'2019-08-24 18:50:29',NULL);

/*!40000 ALTER TABLE `user_class` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_lesson
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_lesson`;

CREATE TABLE `user_lesson` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `class_id` int(11) DEFAULT NULL,
  `lesson_id` int(11) DEFAULT NULL,
  `status` tinyint(11) DEFAULT NULL,
  `finish_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `user_lesson` WRITE;
/*!40000 ALTER TABLE `user_lesson` DISABLE KEYS */;

INSERT INTO `user_lesson` (`id`, `user_id`, `class_id`, `lesson_id`, `status`, `finish_at`)
VALUES
	(1,1,3,1,1,NULL),
	(2,1,3,2,2,'2019-08-26 11:13:51'),
	(3,1,3,3,NULL,NULL),
	(4,1,3,4,NULL,NULL),
	(5,1,3,5,NULL,NULL),
	(6,2,3,1,2,'2019-08-26 11:07:59'),
	(7,2,3,2,2,'2019-08-26 11:13:51'),
	(8,2,3,3,NULL,NULL),
	(9,2,3,4,NULL,NULL),
	(10,2,3,5,NULL,NULL),
	(11,3,3,1,2,'2019-08-26 11:07:59'),
	(12,3,3,2,2,'2019-08-26 11:13:51'),
	(13,3,3,3,NULL,NULL),
	(14,3,3,4,NULL,NULL),
	(15,3,3,5,NULL,NULL),
	(16,11,6,8,2,'2019-08-26 11:17:48'),
	(17,11,6,9,2,'2019-08-26 11:19:46'),
	(18,11,6,10,NULL,NULL),
	(19,11,6,11,NULL,NULL),
	(20,11,6,12,NULL,NULL),
	(21,12,6,8,2,'2019-08-26 11:17:48'),
	(22,12,6,9,1,NULL),
	(23,12,6,10,NULL,NULL),
	(24,12,6,11,NULL,NULL),
	(25,12,6,12,NULL,NULL),
	(26,13,6,8,2,'2019-08-26 11:17:48'),
	(27,13,6,9,2,'2019-08-26 11:19:55'),
	(28,13,6,10,NULL,NULL),
	(29,13,6,11,NULL,NULL),
	(30,13,6,12,NULL,NULL);

/*!40000 ALTER TABLE `user_lesson` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
