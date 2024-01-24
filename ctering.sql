-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sty 24, 2024 at 02:39 PM
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
(5, 'Fajna', '7', '4', 'Chełm', '22-100'),
(6, 'siema', '3', '2', 'ubabab', '22-100'),
(8, 'Przyjazna', '7', '12', 'Lublin', '20-581');

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
(1, 'sagan@gmail.com', 'Sportowa dieta', 'Czy mają państwo diety powyżej 4000 kcal?'),
(2, 'siema@siema', 'niema', 'krótki');

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
(1, 'Owsianka z bananem', 'Pożywne śniadanie', 'Dieta Classic', 24.99, 'owsianka_1.jpg', 20, 80, 10, 350, 150),
(2, 'Sałatka z kurczakiem', 'Pomaga uzupełnić siły', 'Dieta Classic', 20.99, 'salatka_kurczak.jpg', 20, 30, 10, 250, 100),
(3, 'Filet z łososia', 'Lekki i pożywny', 'Dieta Classic', 32.99, 'filet_losos.jpg', 40, 60, 20, 450, 200),
(4, 'Truflowe Złote Jajka', 'Jajka przepiórcze z dodatkiem prawdziwych trufli. Podawane z delikatnym sosem koperkowym.', 'Dieta Premium', 62.99, 'jajka_trufle.jpg', 15, 5, 20, 300, 150),
(5, 'Sałatka Króla Morza', 'Soczyste krewetki połączone z kawałkami awokado, rukolą i pomidorkami koktajlowymi. Skropione delikatnym sosem cytrusowym.', 'Dieta Premium', 99.99, 'krewetka.jpg', 25, 15, 10, 350, 200),
(6, 'Kaczka w Borówkowym Majonezie', 'Soczyste kacze piersi podane z sosikiem z dzikich borówek, podgrzane w delikatnym majonezie.', 'Dieta Premium', 81.99, 'kaczka_borowka.jpg', 30, 20, 15, 450, 300),
(7, 'Gulasz Wołowy', 'Świetnie odżywia', 'Dieta Classic', 25.99, 'gulasz_wolowy.jpg', 20, 80, 50, 550, 200),
(8, 'Omlet z Warzywami', 'Omlet z trzech jajek, nadziewany kawałkami pomidora, papryki, szpinaku i sera feta. Podawany z plasterkami avocado.', 'Dieta 2500+', 21.99, 'omlet.jpg', 20, 80, 10, 500, 350),
(9, 'Kanapki z Avocado i Indykiem', 'Grube kromki chleba pełnoziarnistego z pastą z avocado, kawałkami gotowanego indyka, pomidorem i rukolą.', 'Dieta 2500+', 32.99, 'kanapka_avocado.jpg', 30, 60, 15, 550, 300),
(10, 'Kurczak w Sosie Pomarańczowym z Kaszą Jaglaną', 'Soczyste kawałki kurczaka w sosie pomarańczowym podane z kaszą jaglaną i parmezanem.', 'Dieta 2500+', 40.99, 'kurczak_pomarancza.jpg', 40, 70, 20, 700, 450),
(11, 'Koktajl Proteinowy z Owocami', 'Koktajl proteinowy z białkiem serwatkowym, mlekiem, bananem, truskawkami i łyżką masła orzechowego.', 'Dieta 2500+', 28.99, 'koktail.jpg', 25, 40, 15, 450, 150),
(12, 'Sałatka z łososiem i Awokado', 'Sałatka z łososiem wędzonym, awokado, jajkiem gotowanym na miękko, szpinakiem, i orzechami włoskimi. Skropiona sosem jogurtowym ziołowym.', 'Dieta 2500+', 45.99, 'salatka_losos.jpg', 35, 50, 25, 800, 450),
(13, 'Tosty francuskie', 'Lekka kolacja', 'Dieta Classic', 32.99, 'tosty_franc.jpg', 10, 50, 10, 400, 150),
(16, 'Carpaccio Royal z Łososia', 'Cienko pokrojone plastry łososia podane z oliwą z oliwek, kaparami, koperkiem i plastrami cytryny.', 'Dieta Premium', 70.99, 'carpacio_losos.jpg', 20, 5, 12, 300, 150),
(17, 'Filet Mignion z Pieczonymi Warzywami', 'Soczysty filet mignion podany z pieczonymi warzywami (bataty, szparagi, pomidory koktajlowe) i sosem z czerwonego wina.', 'Dieta Premium', 70.99, 'filet_mignion.jpg', 35, 25, 18, 550, 300);

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
(1, 'Dieta Classic', 1, 2, 3, 7, 13, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Dieta Premium', 4, 5, 6, 17, 16, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Dieta 2500+', 8, 9, 11, 10, 12, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

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
  `is_active` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderspaids`
--

INSERT INTO `orderspaids` (`id`, `id_menu`, `id_user`, `total_cost`, `start_date`, `end_date`, `is_active`, `createdAt`, `updatedAt`) VALUES
(4, 1, 2, 827.70, '2024-01-19 05:00:00', '2024-01-24 05:00:00', 'ACTIVE', '2024-01-18 17:54:21', '2024-01-18 17:54:21'),
(5, 1, 4, 275.90, '2024-01-19 05:00:00', '2024-01-20 05:00:00', 'ACTIVE', '2024-01-18 18:08:13', '2024-01-18 18:08:13');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `roleName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `roleName`) VALUES
(1, 'User'),
(2, 'Admin');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `roleId` int(11) NOT NULL,
  `addressId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `phoneNumber`, `password`, `roleId`, `addressId`) VALUES
(2, 'Krzysztof', 'Broniewski', 'kbron90@gmail.com', NULL, '$2b$10$4W4q9zJj/BnWeUc2mAKQLOenm2s0nKR02mDBh9m2x7VxFDPenyRPW', 2, 8),
(4, 'Tomasz', 'Biedroński', 'tomaszb333@gmail.com', NULL, '$2b$10$laK2KZBhe8pMucM83VXOI.rxTQffzySw9NvpSLa7tFcuwnDmsHj6m', 1, NULL);

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
-- Indeksy dla tabeli `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roleId` (`roleId`),
  ADD KEY `addressId` (`addressId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `forms`
--
ALTER TABLE `forms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `meals`
--
ALTER TABLE `meals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `orderspaids`
--
ALTER TABLE `orderspaids`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  ADD CONSTRAINT `orderspaids_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`addressId`) REFERENCES `addresses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
