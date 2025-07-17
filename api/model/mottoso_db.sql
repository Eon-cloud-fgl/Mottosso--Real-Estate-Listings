-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-07-2025 a las 00:46:44
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mottoso_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inquiries`
--

CREATE TABLE `inquiries` (
  `id` int(11) NOT NULL,
  `property_id` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `properties`
--

CREATE TABLE `properties` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `type` enum('apartment','house','ph','land','store','office','other') NOT NULL,
  `operation` enum('sale','rent') NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `price` decimal(12,2) NOT NULL,
  `bedrooms` int(11) DEFAULT 0,
  `bathrooms` int(11) DEFAULT 0,
  `covered_area` int(11) DEFAULT 0,
  `total_area` int(11) DEFAULT 0,
  `rooms` int(11) DEFAULT 0,
  `garage` tinyint(1) DEFAULT 0,
  `status` enum('published','draft','reserved','sold','rented') DEFAULT 'draft',
  `main_image` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `property_images`
--

CREATE TABLE `property_images` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `caption` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','editor') DEFAULT 'editor',
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `inquiries`
--
ALTER TABLE `inquiries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_inquiry_property` (`property_id`);

--
-- Indices de la tabla `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_property_user` (`user_id`);

--
-- Indices de la tabla `property_images`
--
ALTER TABLE `property_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_image_property` (`property_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `inquiries`
--
ALTER TABLE `inquiries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `properties`
--
ALTER TABLE `properties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `property_images`
--
ALTER TABLE `property_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `inquiries`
--
ALTER TABLE `inquiries`
  ADD CONSTRAINT `fk_inquiry_property` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `properties`
--
ALTER TABLE `properties`
  ADD CONSTRAINT `fk_property_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `property_images`
--
ALTER TABLE `property_images`
  ADD CONSTRAINT `fk_image_property` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
