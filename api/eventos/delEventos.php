<?php
include_once("../headers.php");
require "../model/Eventos.php";
require "../model/Validator.php";

$json_data = file_get_contents('php://input');
$inputs = json_decode($json_data, true);

$id = $inputs['id'];
$rol = $inputs['rol'];
$user = $inputs['user'];


try {

    Validator::validateStringNotEmptyOrBlank($id);
    Validator::validateId($id);
    /* Validator::validateNumber($rol); */

    $quey = new EventIns();
    $eventoEditado = $quey->delEvents($id, $rol, $user);
} catch (Exception $e) {
    return 'Error: ' . $e->getMessage();
}

return json_encode($eventoEditado);
// TODO revisar respuestas