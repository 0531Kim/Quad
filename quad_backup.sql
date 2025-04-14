-- MySQL dump 10.13  Distrib 9.2.0, for macos14.7 (arm64)
--
-- Host: localhost    Database: quad
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_number` int NOT NULL AUTO_INCREMENT COMMENT 'comment Number',
  `user_id` int NOT NULL COMMENT 'user_id',
  `review_number` int NOT NULL COMMENT 'review number',
  `content` text NOT NULL COMMENT 'comment content',
  `write_datetime` datetime NOT NULL COMMENT 'write date time',
  PRIMARY KEY (`comment_number`),
  KEY `FK_users_TO_comment` (`user_id`),
  KEY `FK_review_TO_comment` (`review_number`),
  CONSTRAINT `FK_review_TO_comment` FOREIGN KEY (`review_number`) REFERENCES `review` (`review_number`),
  CONSTRAINT `FK_users_TO_comment` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `course_name` varchar(60) NOT NULL COMMENT 'course name',
  `department_name` varchar(60) NOT NULL COMMENT 'department name',
  `study_name` varchar(60) NOT NULL COMMENT 'study name',
  PRIMARY KEY (`course_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES ('ACADENG','Academic English','Arts'),('BIOSCI','Biological Sciences','Science'),('CHEM','Chemistry','Science'),('COMPSCI 201','Science','Computer Science'),('DANCE','Dance Studies','Creative Arts and Industries'),('EARTHSCI','Earth Sciences','Science'),('FINANCE','Finance','Business and Economics'),('GEOG','Geography','Science'),('HISTORY','History','Arts'),('INFOSYS','Information Systems','Business and Economics'),('JAPANESE','Japanese','Arts'),('KOREAN','Korean','Arts'),('LINGUIST','Linguistics','Arts'),('MATHS','Mathematics','Science'),('NURSING','Nursing','Medical and Health Sciences'),('OPTOM','Optometry and Vision Science','Medical and Health Sciences'),('PHYSICS','Physics','Science'),('QUANBUS','Quantitative Business Methods','Business and Economics'),('RUSSIAN','Russian','Arts'),('SOCWORK','Social Work','Education and Social Work'),('THEOLOGY','Theology','Arts');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `user_id` int NOT NULL COMMENT 'user_id',
  `review_number` int NOT NULL COMMENT 'review number',
  PRIMARY KEY (`user_id`,`review_number`),
  KEY `FK_review_TO_likes` (`review_number`),
  CONSTRAINT `FK_review_TO_likes` FOREIGN KEY (`review_number`) REFERENCES `review` (`review_number`),
  CONSTRAINT `FK_users_TO_likes` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `review_number` int NOT NULL AUTO_INCREMENT COMMENT 'review number',
  `title` text NOT NULL COMMENT 'title',
  `content` text NOT NULL COMMENT 'content',
  `course_name` varchar(20) NOT NULL COMMENT 'course name',
  `like_count` int DEFAULT '0' COMMENT 'like count',
  `comment_count` int DEFAULT '0' COMMENT 'comment count',
  `view_count` int DEFAULT '0' COMMENT 'view count',
  `write_datetime` datetime NOT NULL COMMENT 'write date time',
  `user_id` int NOT NULL COMMENT 'writer upi',
  `difficulty` int DEFAULT '0',
  `leniency` int DEFAULT '0',
  `entertaining` int DEFAULT '0',
  `quality` int DEFAULT '0',
  PRIMARY KEY (`review_number`),
  KEY `FK_users_TO_review` (`user_id`),
  KEY `course_name` (`course_name`),
  CONSTRAINT `FK_course_TO_review` FOREIGN KEY (`course_name`) REFERENCES `course` (`course_name`),
  CONSTRAINT `FK_users_TO_review` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (5,'Great course!','Loved the discussions.','ACADENG',0,0,0,'2025-03-01 10:00:00',30,2,4,5,4),(7,'Great course!','Loved the discussions.','ACADENG',0,0,0,'2025-03-01 10:00:00',30,2,4,5,4),(8,'Tough but rewarding','A lot of material but worth it.','BIOSCI',0,0,74,'2025-03-02 14:15:00',31,5,2,3,5),(9,'Challenging subject','Really made me think.','CHEM',1,0,20,'2025-03-03 09:30:00',32,4,2,2,4),(10,'Fun assignments','Coding was fun.','COMPSCI 201',0,0,0,'2025-03-04 13:20:00',33,3,3,4,5),(11,'Amazing class','The dance studio was great.','DANCE',3,0,35,'2025-03-05 11:00:00',34,2,5,5,4),(12,'Loved the labs','Earth science labs were cool.','EARTHSCI',0,0,0,'2025-03-06 16:45:00',35,3,4,3,5),(13,'Finance 101','Clear and organized content.','FINANCE',0,0,34,'2025-03-07 10:10:00',36,3,3,4,4),(14,'Exploring the world','Geography opened my mind.','GEOG',0,0,0,'2025-03-08 15:30:00',37,2,5,3,3),(15,'History made fun','Interesting stories!','HISTORY',5,0,23,'2025-03-09 09:00:00',38,1,5,5,4),(16,'Info Systems','Good mix of theory and practice.','INFOSYS',0,0,0,'2025-03-10 13:45:00',39,3,3,4,5),(17,'Love the language','Japanese is beautiful.','JAPANESE',11,0,0,'2025-03-11 14:20:00',40,2,5,5,4),(18,'Korean class','Fun and interactive.','KOREAN',1,0,0,'2025-03-12 15:00:00',41,2,4,5,5),(19,'Linguistics Intro','Surprisingly deep subject.','LINGUIST',0,0,0,'2025-03-13 10:10:00',42,3,3,3,4),(20,'Maths is life','Loved solving equations.','MATHS',3,0,0,'2025-03-14 11:30:00',43,5,3,3,5),(21,'Nursing Basics','Great hands-on experience.','NURSING',0,0,36,'2025-03-15 14:00:00',44,4,3,4,5),(22,'Optometry','Very specialized but useful.','OPTOM',0,0,0,'2025-03-16 12:20:00',45,4,2,3,4),(23,'Physics Rocks','So many cool formulas.','PHYSICS',0,0,45,'2025-03-17 15:10:00',46,5,2,2,4),(24,'Business Math','Quantitative but manageable.','QUANBUS',0,0,0,'2025-03-18 13:00:00',47,3,3,3,3),(25,'Russian Class','Challenging pronunciation.','RUSSIAN',9,0,0,'2025-03-19 11:00:00',48,4,2,3,3),(26,'Social Work 101','Very human-centered.','SOCWORK',0,0,85,'2025-03-20 10:00:00',49,2,5,5,4),(27,'Deep insights','Theology was eye-opening.','THEOLOGY',20,0,0,'2025-03-21 16:00:00',50,3,4,3,5),(28,'Creative writing','Loved the poetry unit.','ACADENG',3,0,0,'2025-03-22 09:15:00',51,1,5,5,4),(29,'Bio overload','Labs were great, but tough.','BIOSCI',0,0,14,'2025-03-23 14:30:00',30,4,3,3,4),(30,'Chemical reactions','Interesting practicals.','CHEM',3,0,0,'2025-03-24 12:00:00',31,4,4,4,5),(31,'Solid intro','Well-structured lectures.','COMPSCI 201',0,0,0,'2025-03-25 10:30:00',32,2,4,3,4),(32,'Dance therapy','Moved my soul.','DANCE',4,0,14,'2025-03-26 15:20:00',33,1,5,5,5),(33,'Earth rules','Geology was awesome.','EARTHSCI',0,0,24,'2025-03-27 14:10:00',34,2,4,4,4),(34,'Finance planning','Very applicable!','FINANCE',2,0,0,'2025-03-28 13:00:00',35,3,3,4,5),(35,'Maps and culture','Loved learning about regions.','GEOG',0,0,0,'2025-03-29 10:00:00',36,2,5,4,4),(36,'Hidden gems','HISTORY was more than wars.','HISTORY',0,0,0,'2025-03-30 11:45:00',37,2,4,4,5);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `review_list_view`
--

DROP TABLE IF EXISTS `review_list_view`;
/*!50001 DROP VIEW IF EXISTS `review_list_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `review_list_view` AS SELECT 
 1 AS `review_number`,
 1 AS `title`,
 1 AS `content`,
 1 AS `course_name`,
 1 AS `like_count`,
 1 AS `comment_count`,
 1 AS `view_count`,
 1 AS `write_datetime`,
 1 AS `difficulty`,
 1 AS `leniency`,
 1 AS `entertaining`,
 1 AS `quality`,
 1 AS `username`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT COMMENT 'unique user id',
  `email` varchar(255) NOT NULL COMMENT 'user email',
  `password` varchar(100) NOT NULL COMMENT 'password',
  `username` varchar(20) NOT NULL COMMENT 'username',
  `type` varchar(20) NOT NULL COMMENT 'signup type',
  `role` varchar(10) NOT NULL COMMENT 'user role',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (30,'kkim360@aucklanduni.ac.nz','\"P!SSW0RD777\"','ewrefrd1','google','ROLE_USER'),(31,'douknowmath@gmail.com','\"P!SSW0RD777\"','default_douk1941','google','ROLE_USER'),(32,'alice@example.com','passAlice1','Alice','email','ROLE_USER'),(33,'bob@example.com','passBob1','Bob','email','ROLE_USER'),(34,'carol@example.com','passCarol1','Carol','email','ROLE_USER'),(35,'dave@example.com','passDave1','Dave','email','ROLE_USER'),(36,'eve@example.com','passEve1','Eve','email','ROLE_USER'),(37,'frank@example.com','passFrank1','Frank','email','ROLE_USER'),(38,'grace@example.com','passGrace1','Grace','email','ROLE_USER'),(39,'heidi@example.com','passHeidi1','Heidi','email','ROLE_USER'),(40,'ivan@example.com','passIvan1','Ivan','email','ROLE_USER'),(41,'judy@example.com','passJudy1','Judy','email','ROLE_USER'),(42,'karl@example.com','passKarl1','Karl','email','ROLE_USER'),(43,'laura@example.com','passLaura1','Laura','email','ROLE_USER'),(44,'mike@example.com','passMike1','Mike','email','ROLE_USER'),(45,'nina@example.com','passNina1','Nina','email','ROLE_USER'),(46,'oliver@example.com','passOliver1','Oliver','email','ROLE_USER'),(47,'peggy@example.com','passPeggy1','Peggy','email','ROLE_USER'),(48,'quinn@example.com','passQuinn1','Quinn','email','ROLE_USER'),(49,'rachel@example.com','passRachel1','Rachel','email','ROLE_USER'),(50,'sam@example.com','passSam1','Sam','email','ROLE_USER'),(51,'tina@example.com','passTina1','Tina','email','ROLE_USER'),(52,'jbac208@aucklanduni.ac.nz','$2a$10$8ZsQzcEoMws3nY0MMjmmaujwAjRlq6lJ9Ti2oZp9TS1F2d4J9kSc2','hdfghdfghg','app','ROLE_USER'),(53,'layer7@kakao.com','$2a$10$wxJrwPRv7aHlGTuqv3kkWuBhes5awK9EYSc20g0Kw8IgnRhZAtagm','hggjhgj','app','ROLE_USER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verification`
--

DROP TABLE IF EXISTS `verification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verification` (
  `email` varchar(255) NOT NULL COMMENT 'email',
  `verification_code` varchar(4) NOT NULL COMMENT 'verification number',
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verification`
--

LOCK TABLES `verification` WRITE;
/*!40000 ALTER TABLE `verification` DISABLE KEYS */;
INSERT INTO `verification` VALUES ('ki270023730@gmai','0537'),('ki270023730@gmail.com','4771'),('ki27002ss3730@gmai','0572'),('kkim360@aucklanduni.ac.nz','0206'),('no-reply@quadnz.com','6719'),('stian.skevig@outlook.com','8981');
/*!40000 ALTER TABLE `verification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `review_list_view`
--

/*!50001 DROP VIEW IF EXISTS `review_list_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `review_list_view` AS select `R`.`review_number` AS `review_number`,`R`.`title` AS `title`,`R`.`content` AS `content`,`R`.`course_name` AS `course_name`,`R`.`like_count` AS `like_count`,`R`.`comment_count` AS `comment_count`,`R`.`view_count` AS `view_count`,`R`.`write_datetime` AS `write_datetime`,`R`.`difficulty` AS `difficulty`,`R`.`leniency` AS `leniency`,`R`.`entertaining` AS `entertaining`,`R`.`quality` AS `quality`,`U`.`username` AS `username` from (`review` `R` join `users` `U` on((`R`.`user_id` = `U`.`user_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-10 18:57:51
