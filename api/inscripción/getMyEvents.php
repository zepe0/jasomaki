<?php
include_once ("../headers.php");
require "../model/ins.php";
require "../model/Validator.php";
$json_data = file_get_contents('php://input');
$inputs = json_decode($json_data, true);

$id_user = $inputs['id_user'];
try {
  /*   Validator::validateId($id_user); */
    $quey = new Inscripcion();
    $eventos = $quey->getMyEvents($id_user);
    echo json_encode($eventos);


} catch (Exception $e) {
    $response['error'] = 'error';
    $response['message'] = $e->getMessage();
    header('Content-Type: application/json');
    echo json_encode($response);
}
