/*
SQLyog Ultimate v10.00 Beta1
MySQL - 5.5.5-10.4.32-MariaDB : Database - desafio
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`desafio` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `desafio`;

/*Table structure for table `failed_jobs` */

DROP TABLE IF EXISTS `failed_jobs`;

CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `failed_jobs` */

/*Table structure for table `migrations` */

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `migrations` */

insert  into `migrations`(`id`,`migration`,`batch`) values (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_reset_tokens_table',1),(3,'2016_06_01_000001_create_oauth_auth_codes_table',1),(4,'2016_06_01_000002_create_oauth_access_tokens_table',1),(5,'2016_06_01_000003_create_oauth_refresh_tokens_table',1),(6,'2016_06_01_000004_create_oauth_clients_table',1),(7,'2016_06_01_000005_create_oauth_personal_access_clients_table',1),(8,'2019_08_19_000000_create_failed_jobs_table',1),(9,'2019_12_14_000001_create_personal_access_tokens_table',1),(10,'2024_07_21_184254_create_tb_articles',2),(11,'2024_07_21_184432_create_tb_comments',3),(12,'2024_07_23_140028_create_tb_category',4),(13,'2024_07_23_140035_create_tb_tags',4);

/*Table structure for table `oauth_access_tokens` */

DROP TABLE IF EXISTS `oauth_access_tokens`;

CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `client_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `scopes` text DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_access_tokens_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `oauth_access_tokens` */

/*Table structure for table `oauth_auth_codes` */

DROP TABLE IF EXISTS `oauth_auth_codes`;

CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `client_id` bigint(20) unsigned NOT NULL,
  `scopes` text DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_auth_codes_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `oauth_auth_codes` */

/*Table structure for table `oauth_clients` */

DROP TABLE IF EXISTS `oauth_clients`;

CREATE TABLE `oauth_clients` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `secret` varchar(100) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `redirect` text NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_clients_user_id_index` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `oauth_clients` */

insert  into `oauth_clients`(`id`,`user_id`,`name`,`secret`,`provider`,`redirect`,`personal_access_client`,`password_client`,`revoked`,`created_at`,`updated_at`) values (5,NULL,'Laravel Personal Access Client','V8no9GoUhkMoxLHgD3G5XNWpIgC7AXVWvqFg4C4T',NULL,'http://localhost',1,0,0,'2024-07-21 23:34:59','2024-07-21 23:34:59'),(6,NULL,'Laravel Password Grant Client','1qt4RbkckFZcRua0j8PfofjJV7XwnhZHsHTH5zZS','users','http://localhost',0,1,0,'2024-07-21 23:34:59','2024-07-21 23:34:59');

/*Table structure for table `oauth_personal_access_clients` */

DROP TABLE IF EXISTS `oauth_personal_access_clients`;

CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `oauth_personal_access_clients` */

insert  into `oauth_personal_access_clients`(`id`,`client_id`,`created_at`,`updated_at`) values (3,5,'2024-07-21 23:34:59','2024-07-21 23:34:59');

/*Table structure for table `oauth_refresh_tokens` */

DROP TABLE IF EXISTS `oauth_refresh_tokens`;

CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) NOT NULL,
  `access_token_id` varchar(100) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `oauth_refresh_tokens` */

/*Table structure for table `password_reset_tokens` */

DROP TABLE IF EXISTS `password_reset_tokens`;

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `password_reset_tokens` */

/*Table structure for table `personal_access_tokens` */

DROP TABLE IF EXISTS `personal_access_tokens`;

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `personal_access_tokens` */

insert  into `personal_access_tokens`(`id`,`tokenable_type`,`tokenable_id`,`name`,`token`,`abilities`,`last_used_at`,`expires_at`,`created_at`,`updated_at`) values (1,'App\\Models\\User',1,'LaravelPassportToken','47a43fc613663b551b4758b8d98a6f9d77b4dd0204b6c402886e82c2fbfa6ab0','[\"*\"]',NULL,NULL,'2024-07-21 17:32:18','2024-07-21 17:32:18'),(2,'App\\Models\\User',1,'LaravelPassportToken','89a00026f0fcfb06528f23a098f664c12c8a831f3129613ee33d1929190cef50','[\"*\"]',NULL,NULL,'2024-07-21 17:35:02','2024-07-21 17:35:02'),(3,'App\\Models\\User',1,'Personal Access Token','42db71f8cf9b3dfed765d0aa51791ac23ecc7d42a6e31654fb6e2f78d5a507e5','[\"*\"]',NULL,NULL,'2024-07-21 18:03:36','2024-07-21 18:03:36'),(4,'App\\Models\\User',1,'Personal Access Token','21bdf372387dfd06e60ddc56a95c84f1e3876e1360b722c7c484ccb03bd83825','[\"*\"]',NULL,NULL,'2024-07-21 18:18:32','2024-07-21 18:18:32'),(5,'App\\Models\\User',1,'Personal Access Token','847e2723225eed130a61e10423527e627e1626c8ccccf09fbf4ddd084a1aa050','[\"*\"]',NULL,NULL,'2024-07-21 18:19:54','2024-07-21 18:19:54'),(6,'App\\Models\\User',1,'Personal Access Token','c137a3890f17a380ab7b021fbb145ead580d198dd9707f90893460d03dc7236e','[\"*\"]',NULL,NULL,'2024-07-21 18:21:43','2024-07-21 18:21:43'),(7,'App\\Models\\User',1,'Personal Access Token','6fd4c6865e50f600f81d1bd31f99a7d6b609d2f828bfe2e42ce1964bf6a5730f','[\"*\"]',NULL,NULL,'2024-07-21 18:23:05','2024-07-21 18:23:05'),(8,'App\\Models\\User',1,'Personal Access Token','1601a94a69c67c1e5fc9210a677e4d0aed0b7db476aec04915681462d6f47a68','[\"*\"]',NULL,NULL,'2024-07-21 18:24:59','2024-07-21 18:24:59'),(9,'App\\Models\\User',1,'Personal Access Token','c9fdca7aa014665f95de2d3ab380311f809c8e8a293e5608c2925131183232af','[\"*\"]',NULL,NULL,'2024-07-21 18:25:19','2024-07-21 18:25:19'),(10,'App\\Models\\User',1,'Personal Access Token','a4bf59080d88ee0f517ccce7f2de2e33a1243eb384db6ea90fce88672d107aa6','[\"*\"]',NULL,NULL,'2024-07-21 18:27:02','2024-07-21 18:27:02'),(11,'App\\Models\\User',1,'Personal Access Token','9321d88cb2cff744c4f068e4d30fa1971cf8b3fd3506db898d6fbe0e36180425','[\"*\"]',NULL,NULL,'2024-07-21 20:30:39','2024-07-21 20:30:39'),(12,'App\\Models\\User',1,'Personal Access Token','0567b407b481f186b6914390521882e0eb32d5383413a0a3395a08d0a9db4022','[\"*\"]',NULL,NULL,'2024-07-21 21:08:47','2024-07-21 21:08:47'),(13,'App\\Models\\User',1,'Personal Access Token','9a534efe10e37e85dcc1d1d57b27eda0cfd5abf204bd7b596a95adda29f14e86','[\"*\"]',NULL,NULL,'2024-07-21 21:22:28','2024-07-21 21:22:28'),(14,'App\\Models\\User',1,'Personal Access Token','9a1775afb1b843591ccae2125bfa7ab1faaea4bef0c07daada77e4c54a50d054','[\"*\"]',NULL,NULL,'2024-07-21 21:50:38','2024-07-21 21:50:38'),(15,'App\\Models\\User',1,'Personal Access Token','a4b981897cc36cfe7acb368d2f2f1c184f202a46d35e868176c0d258a3a70121','[\"*\"]',NULL,NULL,'2024-07-21 21:53:47','2024-07-21 21:53:47'),(16,'App\\Models\\User',1,'Personal Access Token','bb323ae621a113c5f24fe6e6fc806ec3a757ce14d4066ed93fa6f5605807458d','[\"*\"]',NULL,NULL,'2024-07-21 23:24:33','2024-07-21 23:24:33'),(17,'App\\Models\\User',1,'Personal Access Token','62e9ca45569df5b8b1cc5ff9bd9ca60a8a7c0be3fe830cf1d0454d02929cbbf1','[\"*\"]',NULL,NULL,'2024-07-21 23:25:04','2024-07-21 23:25:04'),(18,'App\\Models\\User',1,'Personal Access Token','78bb6e6619cbaeeebc1fca29256f584ceb1f93b275769499e8a3661585a78165','[\"*\"]',NULL,NULL,'2024-07-21 23:45:39','2024-07-21 23:45:39'),(19,'App\\Models\\User',1,'Personal Access Token','da270d0fc9db571b60927012cfb297ea48a5a7c0a100ce64757226ab7fafb51e','[\"*\"]',NULL,NULL,'2024-07-22 23:08:02','2024-07-22 23:08:02');

/*Table structure for table `tb_article_tags` */

DROP TABLE IF EXISTS `tb_article_tags`;

CREATE TABLE `tb_article_tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `article_id` int(10) unsigned NOT NULL,
  `tag_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `article_id` (`article_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `tb_article_tags_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `tb_articles` (`id`),
  CONSTRAINT `tb_article_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tb_tags` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `tb_article_tags` */

insert  into `tb_article_tags`(`id`,`article_id`,`tag_id`,`created_at`,`updated_at`) values (5,5,4,'2024-07-23 16:50:34','2024-07-23 16:50:34'),(6,5,3,'2024-07-23 16:50:35','2024-07-23 16:50:35'),(9,18,4,'2024-07-23 19:41:52','2024-07-23 19:41:52'),(10,18,3,'2024-07-23 19:41:52','2024-07-23 19:41:52');

/*Table structure for table `tb_articles` */

DROP TABLE IF EXISTS `tb_articles`;

CREATE TABLE `tb_articles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category_id` int(10) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tb_articles_user_id_foreign` (`user_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `tb_articles_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `tb_category` (`id`),
  CONSTRAINT `tb_articles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `tb_articles` */

insert  into `tb_articles`(`id`,`title`,`description`,`user_id`,`image`,`category_id`,`created_at`,`updated_at`) values (1,'teste teste teste 3 3','teste teste teste 3 3',1,'/uploads/articles/1721739222_e5e5e5.png',NULL,'2024-07-22 00:05:55','2024-07-23 12:53:42'),(5,'teste teste teste 5 5','teste teste teste 5 5',1,'/uploads/articles/1721753434_hs5df6.png',2,'2024-07-23 02:40:20','2024-07-23 16:50:35'),(7,'teste teste teste 5 5','teste teste teste 5 5',1,'/uploads/articles/1721751504_hs5df6.png',2,'2024-07-23 16:18:24','2024-07-23 16:18:24'),(8,'teste teste teste 5 5','teste teste teste 5 5',1,'/uploads/articles/1721751584_hs5df6.png',2,'2024-07-23 16:19:44','2024-07-23 16:19:44'),(9,'teste artigo','teste descricao',1,'/uploads/articles/1721752841_e5e5e5.png',2,'2024-07-23 16:40:41','2024-07-23 16:40:41'),(10,'teste artigo','teste descricao',1,'/uploads/articles/1721753585_e5e5e5.png',2,'2024-07-23 16:53:05','2024-07-23 16:53:05'),(11,'teste artigo','teste descricao',1,'/uploads/articles/1721753612_e5e5e5.png',2,'2024-07-23 16:53:32','2024-07-23 16:53:32'),(12,'teste artigo','teste descricao',1,'/uploads/articles/1721753653_e5e5e5.png',2,'2024-07-23 16:54:13','2024-07-23 16:54:13'),(13,'teste artigo','teste descricao',1,'/uploads/articles/1721753663_e5e5e5.png',2,'2024-07-23 16:54:23','2024-07-23 16:54:23'),(14,'teste teste teste 88','teste teste teste 88',1,'/uploads/articles/1721753843_hs5df6.png',NULL,'2024-07-23 16:57:23','2024-07-23 16:57:23'),(15,'tste teste teste 89','tste teste teste 89',1,'/uploads/articles/1721753977_hs5df6.png',NULL,'2024-07-23 16:59:37','2024-07-23 16:59:37'),(17,'tste tste teste 90','tste tste teste 90',1,'/uploads/articles/1721754162_698513.png',2,'2024-07-23 17:02:42','2024-07-23 17:02:42'),(18,'tste tste teste 90','tste tste teste 90',1,'/uploads/articles/1721763712_hs5df6.png',2,'2024-07-23 17:04:14','2024-07-23 19:41:52');

/*Table structure for table `tb_category` */

DROP TABLE IF EXISTS `tb_category`;

CREATE TABLE `tb_category` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `tb_category` */

insert  into `tb_category`(`id`,`title`,`created_at`,`updated_at`) values (1,'categoria c','2024-07-23 15:07:14','2024-07-23 15:07:14'),(2,'categoria d','2024-07-23 15:08:09','2024-07-23 15:08:09');

/*Table structure for table `tb_comments` */

DROP TABLE IF EXISTS `tb_comments`;

CREATE TABLE `tb_comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `article_id` int(10) unsigned NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tb_comments_article_id_foreign` (`article_id`),
  CONSTRAINT `tb_comments_article_id_foreign` FOREIGN KEY (`article_id`) REFERENCES `tb_articles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `tb_comments` */

insert  into `tb_comments`(`id`,`article_id`,`content`,`created_at`,`updated_at`) values (3,1,'teste 3','2024-07-23 01:22:22','2024-07-23 01:22:22'),(4,17,'teste comentario item 90','2024-07-23 18:44:01','2024-07-23 18:44:01'),(6,17,'teste comentario','2024-07-23 19:43:59','2024-07-23 19:43:59');

/*Table structure for table `tb_tags` */

DROP TABLE IF EXISTS `tb_tags`;

CREATE TABLE `tb_tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `tb_tags` */

insert  into `tb_tags`(`id`,`title`,`created_at`,`updated_at`) values (3,'tag A','2024-07-23 15:02:42','2024-07-23 15:02:42'),(4,'tag b','2024-07-23 15:07:54','2024-07-23 15:07:54');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`email`,`email_verified_at`,`password`,`remember_token`,`created_at`,`updated_at`) values (1,'desafio User','desafio@desafio.com',NULL,'$2y$10$SxaK74d52OQ4sjunaIz5fuxpxnxfHhk8BEyT1DaimozAkhktBuACm',NULL,'2024-07-21 17:32:18','2024-07-21 17:32:18');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
