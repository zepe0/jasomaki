<?php
include_once("../headers.php");
require "../model/Eventos.php";
require "../model/Validator.php";

$json_data = file_get_contents('php://input');
$inputs = json_decode($json_data, true);

$id = $inputs['id'];

$nombre = $inputs['titulo'];
$inicio = $inputs['fecha'];
$tipo = $inputs['tipo'];
$rol = $inputs['rol'];
$user = $inputs['user'];

try {
    /*    Validator::validateStringNotEmptyOrBlank($id);
       Validator::validateId($id); */
    $quey = new EventIns();
    $eventoEditado = $quey->editEvents($id, $nombre, $inicio, $tipo, $rol, $user);

    echo $eventoEditado;
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
}
