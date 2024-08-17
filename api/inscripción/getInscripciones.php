<?php
include_once("../headers.php");
require "../model/ins.php";
require "../model/Validator.php";
$json_data = file_get_contents('php://input');
$inputs = json_decode($json_data, true);

$rol = $inputs['rol'];
try {

    Validator::validateNumber($rol);
    $quey = new Inscripcion();
    $inscripciones = $quey->getInscripcionesAdmin($rol,$inputs['event_id']);
    $response = $inscripciones;

} catch (PDOException $e) {
    http_response_code(500);
    $response['error'] = 'Error al conectar con la base de datos: ' . $e->getMessage();
} catch (Exception $e) {
    http_response_code(400);
    $response['error'] = $e->getMessage();
}

echo json_encode($response);