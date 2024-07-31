<?php
include_once ("../headers.php");
require "../model/ins.php";
require "../model/Validator.php";
$json_data = file_get_contents('php://input');
$inputs = json_decode($json_data, true);

$rol = $inputs['rol'];
try {
    Validator::validateNumber($rol);
    $quey = new Inscripcion();
    $inscripciones = $quey->getInscripcionesAdmin($rol);
    echo json_encode($inscripciones);


} catch (Exception $e) {
    $response['error'] = 'error';
    $response['message'] = $e->getMessage();
    header('Content-Type: application/json');
    echo json_encode($response);
}
