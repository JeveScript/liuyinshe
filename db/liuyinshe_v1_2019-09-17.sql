# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.23)
# Database: liuyinshe_v1
# Generation Time: 2019-09-17 02:35:16 +0000
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
  `status` tinyint(4) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `start_at` date DEFAULT NULL,
  `end_at` date DEFAULT NULL,
  `teacher_id` int(11) DEFAULT NULL COMMENT '老师Id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;

INSERT INTO `class` (`id`, `name`, `description`, `course_id`, `price`, `lesson_count`, `status`, `created_at`, `start_at`, `end_at`, `teacher_id`)
VALUES
	(1,'钢琴二班','学习钢琴',1,1200.00,9,1,'2019-09-02 14:01:30','2019-09-03','2019-09-03',NULL),
	(2,'钢琴二班','钢琴二班',1,999.00,12,1,'2019-09-04 20:47:52','2019-09-28','2019-10-31',NULL),
	(3,'声乐一班','声乐一班',2,8000.00,12,1,'2019-09-05 09:55:18','2019-09-26','2019-12-31',NULL),
	(4,'舞蹈三年2班','舞蹈',4,200.00,10,2,'2019-09-05 15:33:50','2019-09-09','2019-11-11',NULL),
	(5,'民族舞蹈3班','民族舞蹈',4,1200.00,12,0,'2019-09-16 23:34:18','2019-09-17','2019-10-29',1);

/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table course
# ------------------------------------------------------------

DROP TABLE IF EXISTS `course`;

CREATE TABLE `course` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `isdeleted` tinyint(3) DEFAULT NULL,
  `course_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;

INSERT INTO `course` (`id`, `name`, `description`, `isdeleted`, `course_image`)
VALUES
	(1,'钢琴','钢琴带你优雅生活',NULL,NULL),
	(2,'声乐','声乐',NULL,NULL),
	(3,'吉他','吉他',NULL,NULL),
	(4,'民族舞蹈','民族舞蹈',NULL,NULL),
	(5,'敲击乐','敲击乐',NULL,NULL),
	(6,'民族音乐','民族音乐',NULL,NULL),
	(7,'民谣','<p>行走在民间的歌手</p>',NULL,'http://pxn8kn6du.bkt.clouddn.com/test/1568652009745_WechatIMG241554386432_.pic_hd.jpg'),
	(8,'民乐','<p><img src=\"http://pxn8kn6du.bkt.clouddn.com/test/1568652086931_WechatIMG481554386457_.pic_hd.jpg\">撩拨人心的器乐</p>',NULL,'http://pxn8kn6du.bkt.clouddn.com/test/1568652074816_WechatIMG331554386445_.pic_hd.jpg'),
	(9,'民乐','<p><img src=\"http://pxn8kn6du.bkt.clouddn.com/test/1568652086931_WechatIMG481554386457_.pic_hd.jpg\">撩拨人心的器乐</p>',NULL,'http://pxn8kn6du.bkt.clouddn.com/test/1568652074816_WechatIMG331554386445_.pic_hd.jpg'),
	(10,'民乐','<p><img src=\"http://pxn8kn6du.bkt.clouddn.com/test/1568652086931_WechatIMG481554386457_.pic_hd.jpg\">撩拨人心的器乐</p>',NULL,'http://pxn8kn6du.bkt.clouddn.com/test/1568652074816_WechatIMG331554386445_.pic_hd.jpg'),
	(11,'民乐','<p><img src=\"http://pxn8kn6du.bkt.clouddn.com/test/1568652086931_WechatIMG481554386457_.pic_hd.jpg\">撩拨人心的器乐</p>',NULL,'http://pxn8kn6du.bkt.clouddn.com/test/1568652074816_WechatIMG331554386445_.pic_hd.jpg'),
	(12,'民乐','<p><img src=\"http://pxn8kn6du.bkt.clouddn.com/test/1568652086931_WechatIMG481554386457_.pic_hd.jpg\">撩拨人心的器乐</p>',NULL,'http://pxn8kn6du.bkt.clouddn.com/test/1568652074816_WechatIMG331554386445_.pic_hd.jpg'),
	(13,'歌唱','<p>以声音来打动人心<img src=\"http://pxn8kn6du.bkt.clouddn.com/test/1568652216382_WechatIMG341554386445_.pic_hd.jpg\"></p>',NULL,'http://pxn8kn6du.bkt.clouddn.com/test/1568652198573_WechatIMG331554386445_.pic_hd.jpg'),
	(14,'歌唱','<p>以声音来打动人心<img src=\"http://pxn8kn6du.bkt.clouddn.com/test/1568652216382_WechatIMG341554386445_.pic_hd.jpg\"></p>',NULL,'http://pxn8kn6du.bkt.clouddn.com/test/1568652198573_WechatIMG331554386445_.pic_hd.jpg'),
	(15,'歌唱','<p>以声音来打动人心<img src=\"http://pxn8kn6du.bkt.clouddn.com/test/1568652216382_WechatIMG341554386445_.pic_hd.jpg\"></p>',NULL,'http://pxn8kn6du.bkt.clouddn.com/test/1568652198573_WechatIMG331554386445_.pic_hd.jpg'),
	(16,'123','<p><img src=\"http://pxn8kn6du.bkt.clouddn.com/test/1568652330214_WechatIMG381554386447_.pic_hd.jpg\"></p>',NULL,'http://pxn8kn6du.bkt.clouddn.com/test/1568652316116_WechatIMG291554386435_.pic.jpg'),
	(17,'123','<p>123123123123123232<img src=\"http://pxn8kn6du.bkt.clouddn.com/test/1568652474461_WechatIMG311554386435_.pic_hd.jpg\"></p>',NULL,'http://pxn8kn6du.bkt.clouddn.com/test/1568652440860_WechatIMG321554386445_.pic_hd.jpg');

/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table leave
# ------------------------------------------------------------

DROP TABLE IF EXISTS `leave`;

CREATE TABLE `leave` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `class_id` int(11) DEFAULT NULL,
  `lesson_id` int(11) DEFAULT NULL,
  `status` tinyint(4) DEFAULT '0' COMMENT '0: 未处理，1: 已确认，2: 已补课',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `leave` WRITE;
/*!40000 ALTER TABLE `leave` DISABLE KEYS */;

INSERT INTO `leave` (`id`, `user_id`, `class_id`, `lesson_id`, `status`)
VALUES
	(1,1,1,2,2),
	(2,1,2,10,1),
	(3,1,2,11,1),
	(4,1,2,12,1),
	(5,1,2,13,1),
	(6,1,2,14,1),
	(7,1,2,15,1),
	(8,1,2,16,1),
	(9,1,2,17,1),
	(10,1,2,18,1),
	(11,1,2,19,1),
	(12,12,4,35,2),
	(13,12,4,36,1),
	(14,12,4,38,0);

/*!40000 ALTER TABLE `leave` ENABLE KEYS */;
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
  `status` tinyint(4) DEFAULT '0',
  `price` decimal(65,2) DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `lesson` WRITE;
/*!40000 ALTER TABLE `lesson` DISABLE KEYS */;

INSERT INTO `lesson` (`id`, `class_id`, `date`, `start_time`, `end_time`, `status`, `price`)
VALUES
	(1,1,'2019-09-03','08:30:00','09:15:00',0,133.33),
	(2,1,'2019-09-04','09:00:00','09:30:00',0,133.33),
	(3,1,'2019-09-26','08:45:00','09:30:00',0,133.33),
	(4,1,'2019-10-10','09:00:00','09:30:00',0,133.33),
	(5,1,'2019-09-11','09:15:00','11:30:00',0,133.33),
	(6,1,'2019-09-20','09:30:00','12:00:00',0,133.33),
	(7,1,NULL,NULL,NULL,0,133.33),
	(8,1,NULL,NULL,NULL,0,133.33),
	(9,1,NULL,NULL,NULL,0,133.33),
	(10,2,'2019-09-26','09:00:00','10:00:00',0,83.25),
	(11,2,'2019-09-19','08:45:00','09:15:00',0,83.25),
	(12,2,'2019-09-09','09:15:00','11:45:00',0,83.25),
	(13,2,'2019-09-09','09:15:00','10:00:00',0,83.25),
	(14,2,'2019-09-17','12:15:00','14:45:00',0,83.25),
	(15,2,'2019-09-25','09:30:00','13:45:00',0,83.25),
	(16,2,'2019-09-16','09:15:00','13:45:00',0,83.25),
	(17,2,'2019-09-19','12:15:00','14:45:00',0,83.25),
	(18,2,'2019-09-25','10:30:00','11:00:00',0,83.25),
	(19,2,'2019-09-17','11:45:00','12:00:00',0,83.25),
	(20,2,'2019-09-19','09:15:00','10:15:00',0,83.25),
	(21,2,'2019-09-16','09:15:00','10:30:00',0,83.25),
	(22,3,NULL,NULL,NULL,0,666.67),
	(23,3,NULL,NULL,NULL,0,666.67),
	(24,3,NULL,NULL,NULL,0,666.67),
	(25,3,NULL,NULL,NULL,0,666.67),
	(26,3,NULL,NULL,NULL,0,666.67),
	(27,3,NULL,NULL,NULL,0,666.67),
	(28,3,NULL,NULL,NULL,0,666.67),
	(29,3,NULL,NULL,NULL,0,666.67),
	(30,3,NULL,NULL,NULL,0,666.67),
	(31,3,NULL,NULL,NULL,0,666.67),
	(32,3,NULL,NULL,NULL,0,666.67),
	(33,3,NULL,NULL,NULL,0,666.67),
	(34,4,'2019-09-10','10:30:00','11:15:00',0,20.00),
	(35,4,'2019-09-11','09:00:00','09:30:00',0,20.00),
	(36,4,'2019-09-04','08:45:00','09:15:00',0,20.00),
	(37,4,'2019-09-05','08:45:00','09:00:00',0,20.00),
	(38,4,'2019-09-04','08:45:00','09:00:00',0,20.00),
	(39,4,'2019-09-16','09:15:00','09:45:00',0,20.00),
	(40,4,'2019-09-17','09:00:00','09:30:00',0,20.00),
	(41,4,'2019-09-09','08:45:00','09:15:00',0,20.00),
	(42,4,'2019-09-16','09:00:00','09:15:00',0,20.00),
	(43,4,'2019-09-09','09:15:00','09:30:00',0,20.00),
	(44,5,NULL,NULL,NULL,0,100.00),
	(45,5,NULL,NULL,NULL,0,100.00),
	(46,5,NULL,NULL,NULL,0,100.00),
	(47,5,NULL,NULL,NULL,0,100.00),
	(48,5,NULL,NULL,NULL,0,100.00),
	(49,5,NULL,NULL,NULL,0,100.00),
	(50,5,NULL,NULL,NULL,0,100.00),
	(51,5,NULL,NULL,NULL,0,100.00),
	(52,5,NULL,NULL,NULL,0,100.00),
	(53,5,NULL,NULL,NULL,0,100.00),
	(54,5,NULL,NULL,NULL,0,100.00),
	(55,5,NULL,NULL,NULL,0,100.00);

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
	(1,'周星驰','123456','13400000000',1),
	(2,'周浩峰','123456','13400000078',NULL),
	(3,'周天成','123456','13490908978',NULL),
	(4,'张青山','123456','13245651234',NULL),
	(5,'赵海','123456','15829892876',NULL),
	(6,'陈丹','123456','13498877786',NULL),
	(7,'周书照','123456','13422341634',NULL),
	(8,'顾念安','123456','13245640987',NULL),
	(9,'兆龙','123456','13209887826',NULL),
	(10,'陈慧佳','123456','13246342311',NULL),
	(11,'黄诗林','123456','13452326475',NULL),
	(12,'赵海城','123456','18187876254',NULL);

/*!40000 ALTER TABLE `manager` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table payment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `payment`;

CREATE TABLE `payment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `status` tinyint(3) DEFAULT '0' COMMENT '1: 充值 2: 消费 3: 赠送',
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
	(1,2,1,-133.33,'用户补课 lesson_id:1','2019-09-02 14:08:56',NULL),
	(2,2,2,-133.33,'用户补课 lesson_id:1','2019-09-02 14:16:04',NULL),
	(3,2,3,-133.33,'用户补课 lesson_id:1','2019-09-02 14:21:10',NULL),
	(4,1,3,20.00,'此为测试充值','2019-09-04 11:12:03',NULL),
	(5,1,3,20.00,'此为测试充值','2019-09-04 11:12:29',NULL),
	(6,1,3,20.00,'此为测试充值','2019-09-04 11:13:43',NULL),
	(7,2,3,-20.00,'此为测试消费','2019-09-04 11:21:33',NULL),
	(8,2,3,-20.00,'此为测试消费','2019-09-04 11:21:59',NULL),
	(9,2,3,-20.00,'此为测试消费','2019-09-04 11:22:24',NULL),
	(10,2,3,-12.00,'此为测试消费','2019-09-04 11:23:06',NULL),
	(11,1,3,12.00,'此为测试消费','2019-09-04 11:25:42',NULL),
	(12,2,3,-12.00,'此为测试消费','2019-09-04 11:25:51',NULL),
	(13,1,3,121.00,'此为测试充值','2019-09-04 11:26:34',NULL),
	(14,1,3,123.00,'此为测试充值','2019-09-04 15:07:08',NULL),
	(15,2,3,-123.00,'此为测试消费','2019-09-04 15:07:44',NULL),
	(16,2,3,-123.12,'此为测试消费','2019-09-04 15:07:55',NULL),
	(17,1,3,1.00,'此为测试充值','2019-09-04 17:46:08',NULL),
	(18,1,3,1.00,'此为测试充值','2019-09-04 17:46:11',NULL),
	(19,1,3,1.00,'此为测试充值','2019-09-04 17:46:13',NULL),
	(20,1,3,1.00,'此为测试充值','2019-09-04 17:46:14',NULL),
	(21,1,3,1.00,'此为测试充值','2019-09-04 17:46:16',NULL),
	(22,1,3,1.00,'此为测试充值','2019-09-04 17:46:19',NULL),
	(23,2,1,-133.33,'用户上课 lesson_id:2','2019-09-04 21:24:16',NULL),
	(24,2,2,-133.33,'用户补课 lesson_id:2','2019-09-05 09:56:34',NULL),
	(25,2,1,-133.33,'用户补课 lesson_id:3','2019-09-05 10:17:06',NULL),
	(26,2,1,-133.33,'用户补课 lesson_id:6','2019-09-05 10:22:24',NULL),
	(27,1,12,500.00,'充值','2019-09-05 15:37:48',NULL),
	(28,1,12,100.00,'赠送','2019-09-05 15:37:59',NULL),
	(29,2,12,-20.00,'用户补课 lesson_id:34','2019-09-05 15:40:57',NULL),
	(30,2,12,-20.00,'用户上课 lesson_id:35','2019-09-05 15:47:24',NULL),
	(31,2,12,-20.00,'用户补课','2019-09-05 15:48:57',NULL);

/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table teacher
# ------------------------------------------------------------

DROP TABLE IF EXISTS `teacher`;

CREATE TABLE `teacher` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `teacher_name` varchar(255) DEFAULT NULL,
  `teacher_phone` varchar(255) DEFAULT NULL,
  `teacher_intro` text COMMENT '老师简介',
  `isdeleted` int(3) DEFAULT NULL COMMENT '软删除',
  `imageUrl` varchar(255) DEFAULT NULL,
  `teacher_intro_html` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;

INSERT INTO `teacher` (`id`, `teacher_name`, `teacher_phone`, `teacher_intro`, `isdeleted`, `imageUrl`, `teacher_intro_html`)
VALUES
	(1,'邹子博','13400001234','<p><strong>舞蹈老师123</strong></p>',NULL,'http://pxn8kn6du.bkt.clouddn.com/test/1568619056002_WechatIMG321554386445_.pic_hd.jpg',NULL),
	(2,'曲子洋','13409098989','<p>古琴专家</p>',NULL,'http://pxn8kn6du.bkt.clouddn.com/test/1568618991861_WechatIMG291554386435_.pic.jpg',NULL),
	(3,'杨左使','13456787658','<p>古琴专家</p>',NULL,'http://pxn8kn6du.bkt.clouddn.com/test/1568619014733_WechatIMG341554386445_.pic_hd.jpg',NULL);

/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `open_id` varchar(255) DEFAULT NULL COMMENT '微信 open_id',
  `name` varchar(255) DEFAULT NULL COMMENT '姓名',
  `phone` varchar(255) DEFAULT NULL COMMENT '电话',
  `sex` tinyint(3) DEFAULT NULL COMMENT '性别：1 男 2 女',
  `birthday` date DEFAULT NULL COMMENT '出生',
  `sms_name` varchar(255) DEFAULT NULL COMMENT '紧急联系人',
  `sms_phone` varchar(255) DEFAULT NULL COMMENT '紧急联系人',
  `balance` decimal(65,2) DEFAULT '0.00' COMMENT '金额',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(3) DEFAULT NULL COMMENT '状态：1在学，2退学',
  `site` varchar(255) DEFAULT NULL COMMENT '地址',
  `school` varchar(255) DEFAULT NULL COMMENT '学校',
  `integral` int(255) DEFAULT NULL COMMENT '用户积分',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `open_id`, `name`, `phone`, `sex`, `birthday`, `sms_name`, `sms_phone`, `balance`, `created_at`, `status`, `site`, `school`, `integral`)
VALUES
	(1,'','张学友','13409078562',1,'1996-01-08','张家辉','13421311235',-533.32,'2019-09-02 13:03:26',1,NULL,NULL,NULL),
	(2,NULL,'张国辉','13409009090',1,'2019-09-03','张佳丽','13409009089',-266.66,'2019-09-02 14:14:28',1,NULL,NULL,NULL),
	(3,NULL,'张圣衣','13409877867',2,'2019-09-11','张惠敏','13123133456',-141.45,'2019-09-02 14:15:13',1,NULL,NULL,NULL),
	(4,NULL,'虎兰幽','15829082398',2,'2011-09-22','虎建业','13989782671',0.00,'2019-09-04 19:53:19',1,NULL,NULL,NULL),
	(5,NULL,'陈墨生','13490998768',1,'2010-01-05','陈州','13490098876',0.00,'2019-09-04 20:01:26',1,NULL,NULL,NULL),
	(6,NULL,'周胜升','13209897687',1,'2012-09-14','周濠州','13246986823',0.00,'2019-09-04 20:02:11',1,NULL,NULL,NULL),
	(7,NULL,'旷胜','13239082398',1,'2011-09-08','旷元','13987862387',0.00,'2019-09-04 20:03:23',1,NULL,NULL,NULL),
	(8,NULL,'墨舟','13409078561',1,'2015-09-24','墨山','13203820832',0.00,'2019-09-04 20:08:49',1,NULL,NULL,NULL),
	(9,NULL,'姜浩云','13209897832',1,'2012-09-12','姜昊晟','13490897690',0.00,'2019-09-04 20:15:12',1,NULL,NULL,NULL),
	(10,NULL,'姜禹','13297872873',1,'2009-08-07','姜寿','13232098976',0.00,'2019-09-04 20:15:50',1,NULL,NULL,NULL),
	(11,NULL,'蒋禹','13092389892',1,'2007-09-03','蒋炯','13289789987',0.00,'2019-09-04 20:17:20',1,NULL,NULL,NULL),
	(12,'o3V8Y44tSHOCP3ZFvmb42B8JXiZc','阿涛','13409088989',1,'2019-09-05','金','13009909898',540.00,'2019-09-05 15:36:41',1,'中国广东省广州市增城区','增城小学1',NULL),
	(13,NULL,'陈海生','13209893899',1,'2012-05-10','陈关海','13298902398',0.00,'2019-09-06 17:37:29',1,'','',NULL);

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
	(1,1,1,'2019-09-02 14:07:05',NULL),
	(2,2,1,'2019-09-02 14:15:36',NULL),
	(3,3,1,'2019-09-02 14:15:53',NULL),
	(4,11,2,'2019-09-04 20:57:30',NULL),
	(5,9,2,'2019-09-04 21:01:21',NULL),
	(6,10,2,'2019-09-04 21:02:14',NULL),
	(7,3,2,'2019-09-04 21:45:46',NULL),
	(8,7,2,'2019-09-04 21:45:49',NULL),
	(9,8,2,'2019-09-04 21:45:51',NULL),
	(10,1,2,'2019-09-05 10:23:25',NULL),
	(11,12,4,'2019-09-05 15:40:04',NULL),
	(12,9,4,'2019-09-05 15:40:22',NULL);

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
  `status` tinyint(11) DEFAULT '0' COMMENT '0: 未上课，1:已上课，2: 请假',
  `finish_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `user_lesson` WRITE;
/*!40000 ALTER TABLE `user_lesson` DISABLE KEYS */;

INSERT INTO `user_lesson` (`id`, `user_id`, `class_id`, `lesson_id`, `status`, `finish_at`)
VALUES
	(1,1,1,1,1,'2019-09-02 14:08:56'),
	(2,1,1,2,1,'2019-09-04 21:24:17'),
	(3,1,1,3,1,'2019-09-05 10:17:06'),
	(4,1,1,4,0,NULL),
	(5,1,1,5,0,NULL),
	(6,1,1,6,1,'2019-09-05 10:22:24'),
	(7,1,1,7,0,NULL),
	(8,1,1,8,0,NULL),
	(9,1,1,9,0,NULL),
	(10,2,1,1,1,'2019-09-02 14:16:04'),
	(11,2,1,2,1,'2019-09-05 09:56:34'),
	(12,2,1,3,0,NULL),
	(13,2,1,4,0,NULL),
	(14,2,1,5,0,NULL),
	(15,2,1,6,0,NULL),
	(16,2,1,7,0,NULL),
	(17,2,1,8,0,NULL),
	(18,2,1,9,0,NULL),
	(19,3,1,1,1,'2019-09-02 14:21:11'),
	(20,3,1,2,0,NULL),
	(21,3,1,3,0,NULL),
	(22,3,1,4,0,NULL),
	(23,3,1,5,0,NULL),
	(24,3,1,6,0,NULL),
	(25,3,1,7,0,NULL),
	(26,3,1,8,0,NULL),
	(27,3,1,9,0,NULL),
	(28,11,2,10,0,NULL),
	(29,11,2,11,0,NULL),
	(30,11,2,12,0,NULL),
	(31,11,2,13,0,NULL),
	(32,11,2,14,0,NULL),
	(33,11,2,15,0,NULL),
	(34,11,2,16,0,NULL),
	(35,11,2,17,0,NULL),
	(36,11,2,18,0,NULL),
	(37,11,2,19,0,NULL),
	(38,11,2,20,0,NULL),
	(39,11,2,21,0,NULL),
	(40,9,2,10,0,NULL),
	(41,9,2,11,0,NULL),
	(42,9,2,12,0,NULL),
	(43,9,2,13,0,NULL),
	(44,9,2,14,0,NULL),
	(45,9,2,15,0,NULL),
	(46,9,2,16,0,NULL),
	(47,9,2,17,0,NULL),
	(48,9,2,18,0,NULL),
	(49,9,2,19,0,NULL),
	(50,9,2,20,0,NULL),
	(51,9,2,21,0,NULL),
	(52,10,2,10,0,NULL),
	(53,10,2,11,0,NULL),
	(54,10,2,12,0,NULL),
	(55,10,2,13,0,NULL),
	(56,10,2,14,0,NULL),
	(57,10,2,15,0,NULL),
	(58,10,2,16,0,NULL),
	(59,10,2,17,0,NULL),
	(60,10,2,18,0,NULL),
	(61,10,2,19,0,NULL),
	(62,10,2,20,0,NULL),
	(63,10,2,21,0,NULL),
	(64,3,2,10,0,NULL),
	(65,3,2,11,0,NULL),
	(66,3,2,12,0,NULL),
	(67,3,2,13,0,NULL),
	(68,3,2,14,0,NULL),
	(69,3,2,15,0,NULL),
	(70,3,2,16,0,NULL),
	(71,3,2,17,0,NULL),
	(72,3,2,18,0,NULL),
	(73,3,2,19,0,NULL),
	(74,3,2,20,0,NULL),
	(75,3,2,21,0,NULL),
	(76,7,2,10,0,NULL),
	(77,7,2,11,0,NULL),
	(78,7,2,12,0,NULL),
	(79,7,2,13,0,NULL),
	(80,7,2,14,0,NULL),
	(81,7,2,15,0,NULL),
	(82,7,2,16,0,NULL),
	(83,7,2,17,0,NULL),
	(84,7,2,18,0,NULL),
	(85,7,2,19,0,NULL),
	(86,7,2,20,0,NULL),
	(87,7,2,21,0,NULL),
	(88,8,2,10,0,NULL),
	(89,8,2,11,0,NULL),
	(90,8,2,12,0,NULL),
	(91,8,2,13,0,NULL),
	(92,8,2,14,0,NULL),
	(93,8,2,15,0,NULL),
	(94,8,2,16,0,NULL),
	(95,8,2,17,0,NULL),
	(96,8,2,18,0,NULL),
	(97,8,2,19,0,NULL),
	(98,8,2,20,0,NULL),
	(99,8,2,21,0,NULL),
	(100,1,2,10,2,NULL),
	(101,1,2,11,2,NULL),
	(102,1,2,12,2,NULL),
	(103,1,2,13,2,NULL),
	(104,1,2,14,2,NULL),
	(105,1,2,15,2,NULL),
	(106,1,2,16,2,NULL),
	(107,1,2,17,2,NULL),
	(108,1,2,18,2,NULL),
	(109,1,2,19,2,NULL),
	(110,1,2,20,0,NULL),
	(111,1,2,21,0,NULL),
	(112,12,4,34,1,'2019-09-05 15:40:58'),
	(113,12,4,35,1,'2019-09-05 15:47:25'),
	(114,12,4,36,2,NULL),
	(115,12,4,37,0,NULL),
	(116,12,4,38,2,NULL),
	(117,12,4,39,0,NULL),
	(118,12,4,40,0,NULL),
	(119,12,4,41,0,NULL),
	(120,12,4,42,0,NULL),
	(121,12,4,43,0,NULL),
	(122,9,4,34,0,NULL),
	(123,9,4,35,0,NULL),
	(124,9,4,36,0,NULL),
	(125,9,4,37,0,NULL),
	(126,9,4,38,0,NULL),
	(127,9,4,39,0,NULL),
	(128,9,4,40,0,NULL),
	(129,9,4,41,0,NULL),
	(130,9,4,42,0,NULL),
	(131,9,4,43,0,NULL);

/*!40000 ALTER TABLE `user_lesson` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
