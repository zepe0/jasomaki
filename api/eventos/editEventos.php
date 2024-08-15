<?php
include_once("../headers.php");
require "../model/Eventos.php";
require "../model/Validator.php";

$json_data = file_get_contents('php://input');
$inputs = json_decode($json_data, true);

$id = $inputs['id'];

try {
    Validator::validateStringNotEmptyOrBlank($id); 
    Validator::validateId($id);
    $quey = new EventIns();
    $eventoEditado = $quey->editEvents($id, $nombre, $inicio, $hora, $rol, $user);
} catch (Exception $e) {
    return 'Error: ' . $e->getMessage();
}

return json_encode($eventoEditado);