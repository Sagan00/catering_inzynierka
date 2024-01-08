-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sty 08, 2024 at 08:38 PM
-- Wersja serwera: 10.4.28-MariaDB
-- Wersja PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ctering`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `addresses`
--

CREATE TABLE `addresses` (
  `id` int(11) NOT NULL,
  `streetName` varchar(255) NOT NULL,
  `houseNumber` varchar(255) NOT NULL,
  `apartmentNumber` varchar(255) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `postalCode` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`id`, `streetName`, `houseNumber`, `apartmentNumber`, `city`, `postalCode`) VALUES
(4, 'Traugutta', '8', '4C', 'Łódź', '90-105'),
(5, 'liczny', '7', '4', 'ugugu', 'siema');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `forms`
--

CREATE TABLE `forms` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `topic` varchar(255) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `forms`
--

INSERT INTO `forms` (`id`, `email`, `topic`, `description`) VALUES
(1, 'sagan@gmail.com', 'Sportowa dieta', 'Czy mają państwo diety powyżej 4000 kcal?');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `meals`
--

CREATE TABLE `meals` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `image` varchar(255) NOT NULL,
  `protein` float NOT NULL,
  `carbo` float NOT NULL,
  `fat` float NOT NULL,
  `calories` float NOT NULL,
  `portion` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `meals`
--

INSERT INTO `meals` (`id`, `name`, `description`, `category`, `price`, `image`, `protein`, `carbo`, `fat`, `calories`, `portion`) VALUES
(1, 'Owsianka z bananem', 'Pożywne śniadanie', 'Dieta Classic', 14.99, 'owsianka_1.jpg', 20, 80, 10, 350, 150),
(2, 'Sałatka z kurczakiem', 'Pomaga uzupełnić siły', 'Dieta Classic', 20.99, 'salatka_kurczak.jpg', 20, 30, 10, 250, 100),
(3, 'Filet z łososia', 'Lekki i pożywny', 'Dieta Classic', 32.99, 'filet_losos.jpg', 40, 60, 20, 450, 200),
(4, 'Kotlet Schabowy 4', 'Smaczny kotlet', 'Dieta Premium', 32.99, 'kotlet_schabowy_1.jpg', 20, 90, 60, 600, 200),
(5, 'Kotlet Schabowy 5', 'Smaczny kotlet', 'Dieta Premium', 32.99, 'kotlet_schabowy_1.jpg', 20, 90, 60, 600, 200),
(6, 'Kotlet Schabowy 6', 'Smaczny kotlet', 'Dieta Premium', 32.99, 'kotlet_schabowy_1.jpg', 20, 90, 60, 600, 200),
(7, 'Gulasz Wołowy', 'Świetnie odżywia', 'Dieta Classic', 25.99, 'gulasz_wolowy.jpg', 20, 80, 50, 550, 200),
(8, 'Sałatka', 'Smaczna Sałatka', 'Dieta 2500+', 32.99, 'kotlet_schabowy_2.jpg', 10, 40, 10, 250, 150),
(9, 'Sałatka 2', 'Smaczna Sałatka', 'Dieta 2500+', 32.99, 'kotlet_schabowy_2.jpg', 10, 40, 10, 250, 150),
(10, 'Sałatka 3', 'Smaczna Sałatka', 'Dieta 2500+', 32.99, 'kotlet_schabowy_2.jpg', 10, 40, 10, 250, 150),
(11, 'Sałatka 4', 'Smaczna Sałatka', 'Dieta 2500+', 32.99, 'kotlet_schabowy_2.jpg', 10, 40, 10, 250, 150),
(12, 'Sałatka 5', 'Smaczna Sałatka', 'Dieta 2500+', 32.99, 'kotlet_schabowy_2.jpg', 10, 40, 10, 250, 150),
(13, 'Tosty francuskie', 'Lekka kolacja', 'Dieta Classic', 32.99, 'tosty_franc.jpg', 10, 50, 10, 400, 150);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `menus`
--

CREATE TABLE `menus` (
  `id` int(11) NOT NULL,
  `dietName` varchar(255) NOT NULL,
  `id_breakfast` int(11) NOT NULL,
  `id_seccond_breakfast` int(11) NOT NULL,
  `id_lunch` int(11) NOT NULL,
  `id_dinner` int(11) NOT NULL,
  `id_supper` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menus`
--

INSERT INTO `menus` (`id`, `dietName`, `id_breakfast`, `id_seccond_breakfast`, `id_lunch`, `id_dinner`, `id_supper`, `createdAt`, `updatedAt`) VALUES
(1, 'Dieta Classic', 1, 2, 3, 7, 13, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `id_menu` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `total_cost` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `orderspaids`
--

CREATE TABLE `orderspaids` (
  `id` int(11) NOT NULL,
  `id_menu` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `total_cost` decimal(10,2) NOT NULL,
  `start_date` datetime NOT NULL DEFAULT (curdate() + interval 1 day),
  `end_date` datetime NOT NULL DEFAULT (curdate() + interval 1 day),
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderspaids`
--

INSERT INTO `orderspaids` (`id`, `id_menu`, `id_user`, `total_cost`, `start_date`, `end_date`, `createdAt`, `updatedAt`) VALUES
(19, 1, 2, 511.80, '2024-01-07 05:00:00', '2024-01-10 05:00:00', '2024-01-06 20:46:04', '2024-01-06 20:46:04'),
(20, 1, 2, 383.85, '2024-01-09 05:00:00', '2024-01-11 05:00:00', '2024-01-08 19:16:14', '2024-01-08 19:16:14');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `addressId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `addressId`) VALUES
(1, 'Wojciech', 'Saganowski', 'sagan@gmail.com', '$2b$10$shT.QRrE3HJRHS2ok1H3Zu8CjKjc1/FHFZ6ptaCgXjGk3Utd3b/Na', 4),
(2, 'test', 'testowy', 'test@gmail.com', '$2b$10$GrZREqXvSmBUeNxOPNQedOsHisceIhaHJpP2fokcrI6tDDDsLC.K2', 5);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `forms`
--
ALTER TABLE `forms`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `meals`
--
ALTER TABLE `meals`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_breakfast` (`id_breakfast`),
  ADD KEY `id_seccond_breakfast` (`id_seccond_breakfast`),
  ADD KEY `id_lunch` (`id_lunch`),
  ADD KEY `id_dinner` (`id_dinner`),
  ADD KEY `id_supper` (`id_supper`);

--
-- Indeksy dla tabeli `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_menu` (`id_menu`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeksy dla tabeli `orderspaids`
--
ALTER TABLE `orderspaids`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_menu` (`id_menu`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `addressId` (`addressId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `forms`
--
ALTER TABLE `forms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `meals`
--
ALTER TABLE `meals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orderspaids`
--
ALTER TABLE `orderspaids`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `menus`
--
ALTER TABLE `menus`
  ADD CONSTRAINT `menus_ibfk_1` FOREIGN KEY (`id_breakfast`) REFERENCES `meals` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `menus_ibfk_2` FOREIGN KEY (`id_seccond_breakfast`) REFERENCES `meals` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `menus_ibfk_3` FOREIGN KEY (`id_lunch`) REFERENCES `meals` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `menus_ibfk_4` FOREIGN KEY (`id_dinner`) REFERENCES `meals` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `menus_ibfk_5` FOREIGN KEY (`id_supper`) REFERENCES `meals` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`id_menu`) REFERENCES `menus` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `orderspaids`
--
ALTER TABLE `orderspaids`
  ADD CONSTRAINT `orderspaids_ibfk_1` FOREIGN KEY (`id_menu`) REFERENCES `menus` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `orderspaids_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`addressId`) REFERENCES `addresses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
