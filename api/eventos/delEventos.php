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
    // Validaciones
  /*   Validator::validateStringNotEmptyOrBlank($id);
    Validator::validateId($id); */
    /* Validator::validateNumber($rol); */

    
    $quey = new EventIns();
    $eventoEditado = $quey->delEvents($id, $rol, $user);

    
    echo json_encode($eventoEditado);

} catch (Exception $e) {
 
    echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
};
// TODO revisar respuestas