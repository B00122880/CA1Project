-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               5.7.24 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping data for table test.customerorders: ~19 rows (approximately)
/*!40000 ALTER TABLE `customerorders` DISABLE KEYS */;
INSERT INTO `customerorders` (`id`, `orderby`, `orderstatus`, `items`, `orderdate`, `deliveryaddress`) VALUES
	(52, 'customer', 'GETTING READY', 'ChocolateDoughnut_qty-4-1', '2021-04-12 18:12:05', '1 Customer Street'),
	(53, 'customer', 'COMPLETE', 'ChocolateDoughnut_qty-3-1', '2021-04-13 12:13:52', '1 Customer Street'),
	(70, 'customer', 'GETTING READY', 'ChocolateDoughnut_qty-2-1,IcedDoughnut_qty-2-2', '2021-04-18 10:34:41', '1 Customer Street'),
	(72, 'customer', 'GETTING READY', 'IcedDoughnut_qty-2-2', '2021-04-18 11:00:46', '1 Customer Street'),
	(73, 'customer2', 'GETTING READY', 'ChocolateDoughnut_qty-2-1', '2021-04-18 11:01:30', '2 Customer Street'),
	(74, 'customer2', 'GETTING READY', 'ChocolateDoughnut_qty-2-1', '2021-04-18 11:14:24', '2 Customer Street'),
	(81, 'customer', 'COMPLETE', 'ChocolateDoughnut_qty-1-1', '2021-04-18 12:24:53', '1 Customer Street'),
	(86, 'customer', 'COMPLETE', 'ChocolateDoughnut_qty-2-1,PlainRingDoughnut_qty-3-1', '2021-04-18 13:28:05', '1 Customer Street'),
	(88, 'customer', 'COMPLETE', 'ChocolateDoughnut_qty-2-1', '2021-04-18 16:32:58', '1 Customer Street'),
	(89, 'customer', 'COMPLETE', 'ChocolateDoughnut_qty-2-1', '2021-04-18 17:15:19', '1 Customer Street'),
	(94, 'customer2', 'COMPLETE', 'ChocolateDoughnut_qty-2-1', '2021-04-18 17:21:24', '2 Customer Street'),
	(100, 'customer2', 'COMPLETE', 'ChocolateDoughnut_qty-2-1', '2021-04-18 17:30:18', '2 Customer Street'),
	(103, 'customer', 'COMPLETE', 'ChocolateDoughnut_qty-1-1', '2021-04-18 20:46:08', '1 Customer Street'),
	(104, 'customer2', 'COMPLETE', 'Sprite330ml_qty-3-1', '2021-04-18 20:46:52', '2 Customer Street'),
	(109, 'customer', 'COMPLETE', 'Sprite330ml_qty-2-1', '2021-04-20 19:18:16', '1 Customer Street'),
	(111, 'customer', 'COMPLETE', 'Sprite330ml_qty-1-1,IcedDoughnut_qty-2-2', '2021-04-21 21:42:41', '1 Customer Street'),
	(114, 'customer5', 'COMPLETE', 'ChocolateDoughnut_qty-1-1,PlainRingDoughnut_qty-2-1,Sprite330ml_qty-2-1', '2021-04-23 00:41:14', '5 Customer Street'),
	(115, 'customer', 'GETTING READY', 'ChocolateDoughnut_qty-1-1,JamDoughnut_qty-2-2', '2021-04-23 00:51:54', '1 Customer Street'),
	(116, 'customer', 'GETTING READY', 'ChocolateDoughnut_qty-2-1', '2021-04-23 07:42:13', '1 Customer Street');
/*!40000 ALTER TABLE `customerorders` ENABLE KEYS */;

-- Dumping data for table test.products: ~8 rows (approximately)
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` (`product_id`, `productname`, `picturepath`, `cost`) VALUES
	(1, 'ChocolateDoughnut', '/images/chocolate.jpg', 1),
	(3, 'PlainRingDoughnut', '/images/ring.jpg', 1),
	(2, 'SprinkleDoughnut', '/images/sprinkle.jpg', 2),
	(4, 'JamDoughnut', '/images/jam.jpg', 2),
	(5, 'LemonDoughnut', '/images/lemon.jpg', 1),
	(6, 'IcedDoughnut', '/images/iced.jpg', 2),
	(7, 'Fanta330ml', '/images/fanta.jpg', 1),
	(8, 'Sprite330ml', '/images/sprite.jpg', 1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;

-- Dumping data for table test.users: ~7 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `username`, `email`, `password`, `address`, `acctype`) VALUES
	(37, 'customer', 'customer@domain.com', '1', 'Number 1 Customer Street', 'customer'),
	(39, 'manager', 'manager@domain.com', '1', 'Manager Street', 'manager'),
	(41, 'driver', 'driver@domain.com', '1', 'Driver Street', 'driver'),
	(56, 'Kyle', 'customer@gmail.com', '1', 'TU Blancharstown Street', 'customer'),
	(65, 'customer2', 'customer2@gmail.com', '1', 'Number 2 Customer Street', 'customer'),
	(69, 'customer5', 'customer5@gmail.com', '1', '5 Customer Street', 'customer'),
	(70, 'customer7', 'customer7@gmail.com', '1', '7 Customer Street', 'customer');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
