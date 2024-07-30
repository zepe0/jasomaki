-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-07-2024 a las 13:27:56
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
-- Base de datos: `jasomaki`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventins`
--

CREATE TABLE `eventins` (
  `id_event` varchar(255) NOT NULL,
  `id_user` varchar(255) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descr` longtext NOT NULL,
  `inicio` date NOT NULL,
  `fin` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `eventins`
--

INSERT INTO `eventins` (`id_event`, `id_user`, `titulo`, `descr`, `inicio`, `fin`) VALUES
('5f2b6af666a81084a3b8e0.69749233', 'c203617166a7514ce95966.34162410', 'primera', 'as', '2024-07-29', '2024-07-31'),
('ed14b92c66a89f5792cc57.41746357', 'c203617166a7514ce95966.34162410', 'pasada', 'pas', '2024-07-01', '2024-07-30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ins`
--

CREATE TABLE `ins` (
  `ins_id` varchar(255) NOT NULL,
  `id_event` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `tel` int(11) NOT NULL,
  `dni` varchar(255) NOT NULL,
  `fecha_insc` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ins`
--

INSERT INTO `ins` (`ins_id`, `id_event`, `nombre`, `apellido`, `apellidos`, `user_id`, `tel`, `dni`, `fecha_insc`) VALUES
('8717a05866a8c6e98cc123.52803679', '5f2b6af666a81084a3b8e0.69749233', 'Aitor', 'Arpa', 'Mendez', 'c203617166a7514ce95966.34162410', 600887934, '47631520S', '2024-07-30 10:56:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `Alta` datetime NOT NULL DEFAULT current_timestamp(),
  `rol` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `email`, `pass`, `Alta`, `rol`) VALUES
('1', 'zepe', 'zepe', '0000-00-00 00:00:00', 0),
('c203617166a7514ce95966.34162410', 'aitor.zepe@gmail.com', '$2y$10$U1cI5KOuljBDFAdgOvb84u02Cna2U0wp1lhYO1m2wmucg7qUjCu5a', '2024-07-29 10:22:36', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `eventins`
--
ALTER TABLE `eventins`
  ADD PRIMARY KEY (`id_event`),
  ADD KEY `id_user` (`id_user`) USING BTREE;

--
-- Indices de la tabla `ins`
--
ALTER TABLE `ins`
  ADD PRIMARY KEY (`id_event`) USING BTREE,
  ADD UNIQUE KEY `dni` (`dni`),
  ADD KEY `ins_id` (`ins_id`) USING BTREE,
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `emailunico` (`email`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `eventins`
--
ALTER TABLE `eventins`
  ADD CONSTRAINT `eventins_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE NO ACTION;

--
-- Filtros para la tabla `ins`
--
ALTER TABLE `ins`
  ADD CONSTRAINT `ins_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `ins_ibfk_2` FOREIGN KEY (`id_event`) REFERENCES `eventins` (`id_event`) ON DELETE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
