<?php
require __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__, '.env.api');
$dotenv->load();


require_once 'models/Db.php';


$db = new Db();
$pdo = $db->con();

if ($pdo) {
    echo "Conexión exitosa a la base de datos.";
} else {
    echo "No se pudo conectar a la base de datos.";
}