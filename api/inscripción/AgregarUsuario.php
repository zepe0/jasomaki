<?php
include_once ("../headers.php");
require "../model/ins.php";
require "../model/Validator.php";

$json_data = file_get_contents('php://input');
$inputs = json_decode($json_data, true);

$nombre = $inputs['nombre'];
$Apellido = $inputs['Apellido'];
$Apellidos = $inputs['Apellidos'];
$tel = $inputs['tel'];
$dni = $inputs['dni'];
$id_user = $inputs['id_user'];
$id_event = $inputs['id_event'];


try {
    Validator::validateStringNotEmptyNoSpaces($nombre);
    Validator::validateStringNotEmptyNoSpaces($Apellido);
    Validator::validateStringNotEmptyNoSpaces($Apellidos);
    Validator::validateStringNotEmptyNoSpaces($tel);
    Validator::validateStringNotEmptyNoSpaces($dni);
    Validator::validateDNI($dni);
    Validator::validateTel($tel);
 /*    Validator::validateId($id_user);
    Validator::validateId($id_event); */

    $quey = new Inscripcion();
    $inscripcion = $quey->addIns($nombre, $Apellido, $Apellidos, $tel, $dni, $id_event, $id_user);
    echo json_encode($inscripcion);

} catch (Exception $e) {
    $response['message'] = 'error';
    $response['message'] = $e->getMessage();
    header('Content-Type: application/json');
    echo json_encode($response);
}



