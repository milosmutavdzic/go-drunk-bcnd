CREATE DATABASE IF NOT EXISTS godrunk;
USE godrunk;
CREATE TABLE `users` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `username` varchar(255) NOT NULL UNIQUE,
 `email` varchar(255) NOT NULL UNIQUE,
`phone` varchar(255) NOT NULL,
`firstName`  varchar(255) NOT NULL,
`lastName`  varchar(255) NOT NULL,
`address`  varchar(255) NOT NULL,
`city`  varchar(255) NOT NULL,
`country`  varchar(255) NOT NULL,
 `password` varchar(255) NOT NULL,
 `created_at` datetime NOT NULL,
 `updated_at` datetime NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

CREATE TABLE `locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `lat` decimal(9,6) DEFAULT NULL,
  `lng` decimal(9,6) DEFAULT NULL,
  `active` tinyint(4) DEFAULT '1',
  `patrol_type` tinyint(4) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `locations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `votes` (
  `location_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `valid_location` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`location_id`,`user_id`),
  KEY `location_id` (`location_id`),
  CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `votes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;