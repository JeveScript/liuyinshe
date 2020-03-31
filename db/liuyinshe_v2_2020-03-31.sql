# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.23)
# Database: liuyinshe_v2
# Generation Time: 2020-03-31 03:35:14 +0000
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
  `start_at` date DEFAULT NULL COMMENT '开始时间 -- 也是课程名称',
  `created_at` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  `index` int(11) DEFAULT NULL COMMENT '单节课数量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table combo
# ------------------------------------------------------------

DROP TABLE IF EXISTS `combo`;

CREATE TABLE `combo` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `course_id` int(11) DEFAULT NULL COMMENT '科目ID',
  `combo_name` varchar(255) DEFAULT NULL COMMENT '套餐名称',
  `description` text COMMENT '套餐描述',
  `isdeleted` int(3) DEFAULT NULL COMMENT 'null：存在；0: 软删除',
  `created_at` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table combo_plan
# ------------------------------------------------------------

DROP TABLE IF EXISTS `combo_plan`;

CREATE TABLE `combo_plan` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `combo_id` int(11) DEFAULT NULL COMMENT '套餐id',
  `plan_name` varchar(255) DEFAULT NULL COMMENT '计划名称',
  `description` text COMMENT '计划描述',
  `isdeleted` int(3) DEFAULT NULL COMMENT 'null：存在；0: 软删除',
  `created_at` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table course
# ------------------------------------------------------------

DROP TABLE IF EXISTS `course`;

CREATE TABLE `course` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '科目名称',
  `description` text COMMENT '描述',
  `isdeleted` int(3) DEFAULT NULL COMMENT 'null：存在；0: 软删除',
  `course_image` text COMMENT '封面',
  `created_at` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table leave
# ------------------------------------------------------------

DROP TABLE IF EXISTS `leave`;

CREATE TABLE `leave` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_lesson_id` int(11) DEFAULT NULL COMMENT '用户关联课程id',
  `status` int(11) DEFAULT NULL COMMENT '1:批准，2:拒绝',
  `created_at` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  `end_at` int(11) DEFAULT NULL COMMENT '结束时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table lesson
# ------------------------------------------------------------

DROP TABLE IF EXISTS `lesson`;

CREATE TABLE `lesson` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  `start_at` time DEFAULT NULL COMMENT '上课时间',
  `end_at` time DEFAULT NULL COMMENT '下课时间',
  `class_id` int(11) DEFAULT NULL COMMENT '日期课程id',
  `teacher_id` int(11) DEFAULT NULL COMMENT '老师id',
  `status` int(11) DEFAULT NULL COMMENT 'null: 进行中，1:已结束',
  `type` int(11) DEFAULT NULL COMMENT '1:一对一 ，2:公开课',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table manager
# ------------------------------------------------------------

DROP TABLE IF EXISTS `manager`;

CREATE TABLE `manager` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '管理员名称',
  `phone` varchar(255) DEFAULT NULL COMMENT '管理员手机号码',
  `password` varchar(255) DEFAULT NULL COMMENT '密码',
  `isdeleted` int(3) DEFAULT NULL COMMENT 'null：存在；0: 软删除',
  `status` int(3) DEFAULT NULL COMMENT '0: 管理员 ； 1:前台',
  `created_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table payment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `payment`;

CREATE TABLE `payment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL COMMENT '消费者id',
  `total` decimal(65,2) DEFAULT NULL COMMENT '金额',
  `description` text COMMENT '来源',
  `created_at` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  `manager_id` int(11) DEFAULT NULL COMMENT '管理员id',
  `status` int(11) DEFAULT NULL COMMENT '1:消费 2:充值',
  `teacher_id` int(11) DEFAULT NULL COMMENT '老师id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table teacher
# ------------------------------------------------------------

DROP TABLE IF EXISTS `teacher`;

CREATE TABLE `teacher` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `open_id` varchar(255) DEFAULT NULL,
  `desc` text,
  `image` text,
  `created_at` timestamp NULL DEFAULT NULL,
  `isdeleted` int(3) DEFAULT NULL COMMENT 'null：存在；0: 软删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '学生姓名',
  `phone` varchar(255) DEFAULT '' COMMENT '手机号码',
  `open_id` varchar(255) DEFAULT NULL COMMENT '微信唯一id',
  `sex` int(3) DEFAULT NULL COMMENT '性别 1:男 2: 女',
  `birthday` date DEFAULT NULL COMMENT '出生时间',
  `sms_name` varchar(255) DEFAULT '' COMMENT '紧急联系人',
  `sms_phone` varchar(255) DEFAULT '' COMMENT '紧急联系号码',
  `balance` decimal(65,2) DEFAULT NULL COMMENT '金额',
  `created_at` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  `status` int(3) DEFAULT NULL COMMENT '状态：1在学，2退学',
  `site` varchar(255) DEFAULT '' COMMENT '地址',
  `school` varchar(255) DEFAULT '' COMMENT '学校',
  `integral` int(255) DEFAULT NULL COMMENT '用户积分',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user_lesson
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_lesson`;

CREATE TABLE `user_lesson` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL COMMENT '学生id',
  `lesson_id` int(11) DEFAULT NULL COMMENT '单节课id',
  `status` int(3) DEFAULT NULL COMMENT '1:签到 ；2：请假 ；3:旷课',
  `created_at` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  `end_at` timestamp NULL DEFAULT NULL COMMENT '结束时间',
  `user_plan_id` int(11) DEFAULT NULL COMMENT '套餐计划与学生关联 id',
  `class_name` int(11) DEFAULT NULL COMMENT '1课程总次数，2:完全一对一授课(根据这个值消课时)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user_plan
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_plan`;

CREATE TABLE `user_plan` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL COMMENT '学生id',
  `plan_id` int(11) DEFAULT NULL COMMENT '套餐计划id',
  `plan_price` decimal(65,2) DEFAULT NULL COMMENT '套餐计划总价格',
  `extra_charge` decimal(65,2) DEFAULT NULL COMMENT '另外收费',
  `Class_index` int(11) DEFAULT NULL COMMENT '课程次数',
  `theOne_index` int(11) DEFAULT NULL COMMENT '完全一对一次数',
  `price` decimal(65,2) DEFAULT NULL COMMENT '每一节课的价格',
  `status` int(3) DEFAULT NULL COMMENT 'null：进行中；1: 结束',
  `description` text COMMENT '描述',
  `created_at` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  `manager_id` int(11) DEFAULT NULL COMMENT '管理员id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
