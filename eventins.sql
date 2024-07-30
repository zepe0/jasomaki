-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-07-2024 a las 08:49:26
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `jasomaki`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventins`
--

CREATE TABLE `eventins` (
  `ins_id` varchar(255) NOT NULL,
  `id_user` varchar(255) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descr` longtext NOT NULL,
  `inicio` date NOT NULL,
  `fin` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `eventins`
--

INSERT INTO `eventins` (`ins_id`, `id_user`, `titulo`, `descr`, `inicio`, `fin`) VALUES
('5f2b6af666a81084a3b8e0.69749233', 'c203617166a7514ce95966.34162410', 'primera', 'as', '2024-07-29', '2024-07-31');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `eventins`
--
ALTER TABLE `eventins`
  ADD PRIMARY KEY (`ins_id`),
  ADD KEY `id_user` (`id_user`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `eventins`
--
ALTER TABLE `eventins`
  ADD CONSTRAINT `eventins_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `ins` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
