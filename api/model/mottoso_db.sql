-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-07-2025 a las 03:12:07
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
  `listing_id` int(11) NOT NULL,
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
  `status` enum('published','draft','reserved','sold','rented','outstanding','new') DEFAULT 'new',
  `main_image` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `properties`
--

INSERT INTO `properties` (`id`, `listing_id`, `title`, `description`, `type`, `operation`, `address`, `city`, `state`, `price`, `bedrooms`, `bathrooms`, `covered_area`, `total_area`, `rooms`, `garage`, `status`, `main_image`, `created_at`, `user_id`) VALUES
(0, 0, 'Departamento moderno con amenities', '2 ambientes con balcón, pileta, gimnasio y seguridad 24hs.', 'apartment', 'sale', 'Av. Santa Fe 3345', 'Recoleta', 'CABA', 110000.00, 1, 1, 50, 55, 2, 1, 'draft', 'dpto-recoleta.jpg', '2025-07-29 09:52:32', 1),
(1, 0, 'Casa moderna en Palermo', 'Hermosa casa reciclada a nueva con patio y parrilla.', 'house', 'sale', 'Calle Falsa 123', 'Palermo', 'CABA', 250000.00, 3, 2, 150, 200, 5, 1, 'published', 'house-palermo.jpg', '2025-07-22 16:05:26', 1),
(2, 0, 'Departamento con vista al río', 'Excelente departamento de 2 ambientes en el centro de Rosario.', 'apartment', 'rent', 'Av. Libertad 456', 'Rosario', 'Santa Fe', 85000.00, 1, 1, 65, 65, 2, 0, 'published', 'depto-rosario.jpg', '2025-07-22 16:58:20', 1),
(3, 0, 'Casa familiar en barrio tranquilo', 'Hermosa casa de 3 dormitorios con amplio jardín y garage para 2 autos.', 'house', 'sale', 'Calle Falsa 123', 'Córdoba', 'Córdoba', 350000.00, 3, 2, 120, 300, 5, 2, 'published', 'casa-cordoba.jpg', '2025-07-22 16:59:48', 1),
(4, 0, 'Apartamento moderno en zona céntrica', 'Apartamento de 1 dormitorio, ideal para estudiantes o parejas, cerca de todo.', 'apartment', 'rent', 'Av. San Martín 789', 'Mendoza', 'Mendoza', 45000.00, 1, 1, 50, 50, 3, 0, 'published', 'apt-mendoza.jpg', '2025-07-22 16:59:48', 1),
(5, 0, 'Terreno para construir en barrio residencial', 'Lote de 500 m² listo para construir la casa de tus sueños.', 'land', 'sale', 'Ruta 9 km 12', 'Santa Fe', 'Santa Fe', 150000.00, 0, 0, 0, 500, 0, 0, 'published', 'terreno-santafe.jpg', '2025-07-22 16:59:48', 1),
(6, 0, 'Casa estilo colonial en San Isidro', 'Amplia casa con jardín, pileta y quincho. Excelente ubicación residencial.', 'house', 'sale', 'Av. Libertador 1450', 'San Isidro', 'Buenos Aires', 320000.00, 4, 3, 180, 250, 6, 2, 'published', 'casa-sanisidro.jpg', '2025-07-29 09:52:14', 1),
(7, 0, 'Casa con vista al mar', 'Ubicada a metros de la playa, esta propiedad cuenta con terraza, garage doble y parrilla.', 'house', 'rent', 'Calle del Mar 678', 'Mar del Plata', 'Buenos Aires', 1200.00, 3, 2, 140, 300, 5, 2, 'published', 'casa-mar.jpg', '2025-07-29 09:52:14', 1),
(9, 0, 'Monoambiente amoblado en zona céntrica', 'Ideal para estudiante o profesional. Edificio con laundry.', 'apartment', 'rent', 'Tucumán 1450', 'Centro', 'CABA', 320.00, 0, 1, 35, 40, 1, 0, 'published', 'monoambiente-centro.jpg', '2025-07-29 09:52:32', 1),
(10, 0, 'Lote amplio en zona residencial', 'Terreno ideal para construcción de vivienda familiar o dúplex.', 'land', 'sale', 'Calle 12 entre 3 y 4', 'La Plata', 'Buenos Aires', 65000.00, 0, 0, 0, 500, 0, 0, 'draft', 'terreno-laplata.jpg', '2025-07-29 09:52:41', 1),
(11, 0, 'Terreno en alquiler para uso cotidiano', 'Espacio abierto ideal para depósito o estacionamiento. Acceso directo desde autopista.', 'land', 'rent', 'Ruta 8 km 52', 'Pilar', 'Buenos Aires', 700.00, 0, 0, 0, 1000, 0, 0, 'reserved', 'terreno-pilar.jpg', '2025-07-29 09:52:41', 1);

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
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'Admin', 'admin@mottoso.com', 'hashed_password', 'editor', '2025-07-22 16:05:11');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `property_images`
--
ALTER TABLE `property_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
