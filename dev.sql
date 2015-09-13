-- MySQL dump 10.13  Distrib 5.5.38, for osx10.6 (i386)
--
-- Host: localhost    Database: ezdz_development
-- ------------------------------------------------------
-- Server version	5.5.38

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `photos`
--

DROP TABLE IF EXISTS `photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `caption` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `exhibit_id` int(11) DEFAULT NULL,
  `exhibit_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `imgur_hash` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `imgur_delete` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_photos_on_exhibit_type_and_exhibit_id` (`exhibit_type`,`exhibit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photos`
--

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
INSERT INTO `photos` VALUES (8,'http://i.imgur.com/btWA7cW.jpg',NULL,4,'Post','2015-08-27 23:15:53','2015-09-13 20:15:04','btWA7cW','cm4eLOl12iGD0tL'),(9,'http://i.imgur.com/8oFCfWI.jpg',NULL,5,'Post','2015-09-01 23:57:38','2015-09-13 20:15:05','8oFCfWI','P3NJE2VtDjVJfus'),(10,'http://i.imgur.com/jjghiDj.jpg',NULL,6,'Post','2015-09-06 23:34:32','2015-09-13 20:15:05','jjghiDj','4DQM1BTsbr3nx3l'),(11,'http://i.imgur.com/btWA7cW.jpg',NULL,1,'Post','2015-09-13 20:18:24','2015-09-13 20:19:39','btWA7cW','cm4eLOl12iGD0tL'),(12,'http://i.imgur.com/btWA7cW.jpg',NULL,10,'Post','2015-09-13 20:18:24','2015-09-13 20:25:23','btWA7cW','cm4eLOl12iGD0tL'),(13,'http://i.imgur.com/btWA7cW.jpg',NULL,NULL,'Post','2015-09-13 20:18:24','2015-09-13 20:21:19','btWA7cW','cm4eLOl12iGD0tL'),(14,'http://i.imgur.com/8oFCfWI.jpg',NULL,2,'Post','2015-09-13 20:18:24','2015-09-13 20:21:06','8oFCfWI','P3NJE2VtDjVJfus'),(15,'http://i.imgur.com/8oFCfWI.jpg',NULL,11,'Post','2015-09-13 20:18:24','2015-09-13 20:25:23','8oFCfWI','P3NJE2VtDjVJfus'),(16,'http://i.imgur.com/8oFCfWI.jpg',NULL,5,'Post','2015-09-13 20:18:24','2015-09-13 20:18:24','8oFCfWI','P3NJE2VtDjVJfus'),(17,'http://i.imgur.com/jjghiDj.jpg',NULL,3,'Post','2015-09-13 20:18:24','2015-09-13 20:21:19','jjghiDj','4DQM1BTsbr3nx3l'),(18,'http://i.imgur.com/jjghiDj.jpg',NULL,12,'Post','2015-09-13 20:18:24','2015-09-13 20:25:23','jjghiDj','4DQM1BTsbr3nx3l'),(19,'http://i.imgur.com/jjghiDj.jpg',NULL,6,'Post','2015-09-13 20:18:24','2015-09-13 20:18:24','jjghiDj','4DQM1BTsbr3nx3l');
/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_tags`
--

DROP TABLE IF EXISTS `post_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) DEFAULT NULL,
  `tag_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_post_tags_on_post_id` (`post_id`),
  KEY `index_post_tags_on_tag_id` (`tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_tags`
--

LOCK TABLES `post_tags` WRITE;
/*!40000 ALTER TABLE `post_tags` DISABLE KEYS */;
INSERT INTO `post_tags` VALUES (1,1,1),(2,1,3),(3,1,4),(4,2,1),(5,2,5),(6,3,1),(7,3,6),(8,3,7);
/*!40000 ALTER TABLE `post_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hashid` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `meta` longtext COLLATE utf8_unicode_ci,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_posts_on_hashid` (`hashid`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'jnkKnr','test','Blog','---\n:body: testasekljfsdf sd\n','2015-08-27 23:16:15','2015-08-27 23:16:15'),(2,'1WdxW4','This is another test','Blog','---\n:body: Blah blah blah blah I HATEY OU\n','2015-09-01 23:57:58','2015-09-01 23:57:58'),(3,'Gn9kW2','And another test','Blog','---\n:body: Is this the last one?\n','2015-09-06 23:35:08','2015-09-06 23:35:08'),(4,'EW27MB','test','Writing','---\n:body: testasekljfsdf sd\n','2015-09-13 20:15:04','2015-09-13 20:15:04'),(5,'veXEW8','This is another test','Writing','---\n:body: Blah blah blah blah I HATEY OU\n','2015-09-13 20:15:05','2015-09-13 20:15:05'),(6,'JWl3e4','And another test','Writing','---\n:body: Is this the last one?\n','2015-09-13 20:15:05','2015-09-13 20:15:05'),(7,'0WGbe4','test','Album','---\n:body: testasekljfsdf sd\n','2015-09-13 20:25:22','2015-09-13 20:25:22'),(8,'veYae1','This is another test','Album','---\n:body: Blah blah blah blah I HATEY OU\n','2015-09-13 20:25:22','2015-09-13 20:25:22'),(9,'rMBmWY','And another test','Album','---\n:body: Is this the last one?\n','2015-09-13 20:25:22','2015-09-13 20:25:22'),(10,'Zeogea','test','Deck','---\n:body: testasekljfsdf sd\n','2015-09-13 20:25:23','2015-09-13 20:25:23'),(11,'dnQmnQ','This is another test','Deck','---\n:body: Blah blah blah blah I HATEY OU\n','2015-09-13 20:25:23','2015-09-13 20:25:23'),(12,'bWZxnA','And another test','Deck','---\n:body: Is this the last one?\n','2015-09-13 20:25:23','2015-09-13 20:25:23');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schema_migrations`
--

DROP TABLE IF EXISTS `schema_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schema_migrations` (
  `version` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  UNIQUE KEY `unique_schema_migrations` (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schema_migrations`
--

LOCK TABLES `schema_migrations` WRITE;
/*!40000 ALTER TABLE `schema_migrations` DISABLE KEYS */;
INSERT INTO `schema_migrations` VALUES ('20150607235437'),('20150819232434'),('20150820234825'),('20150827203847');
/*!40000 ALTER TABLE `schema_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'test'),(2,'one'),(3,'first'),(4,'what'),(5,'second'),(6,'third'),(7,'last');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-09-13 16:25:46
