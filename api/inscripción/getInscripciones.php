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

} catch (PDOException $e) {
    // Captura errores relacionados con la base de datos
    http_response_code(500);
    $response['error'] = 'error';
    $response['message'] = 'Error al conectar con la base de datos: ' . $e->getMessage();
    echo json_encode($response);

} catch (Exception $e) {
    // Captura cualquier otro tipo de error
    http_response_code(400);
    $response['error'] = 'error';
    $response['message'] = $e->getMessage();
    echo json_encode($response);
}
