<?php
include_once("../headers.php");
require "../model/ins.php";
require "../model/Validator.php";

$json_data = file_get_contents('php://input');
$inputs = json_decode($json_data, true);

$id = $inputs['id'];
$nombre = $inputs['nombre'];
$apellido = $inputs['Apellido'];
$apellidos = $inputs['Apellidos'];
$tel = $inputs['tel'];
$dni = $inputs['dni'];
$id_evento = $inputs['id_evento'];

try {
    Validator::validateStringNotEmptyNoSpaces($id);
    Validator::validateStringNotEmptyNoSpaces($id_evento);
    Validator::validateStringNotEmptyNoSpaces($nombre);
    Validator::validateStringNotEmptyNoSpaces($apellido);
    Validator::validateStringNotEmptyNoSpaces($apellidos);
    Validator::validateStringNotEmptyNoSpaces($tel);
    Validator::validateStringNotEmptyNoSpaces($dni);
    Validator::validateTel($tel);
    Validator::validateTel($tel);
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
}

$quey = new Inscripcion();
$inscripcion = $quey->addIns($nombre, $apellido, $apellidos, $tel, $dni, $id_evento, $id);
echo json_encode($inscripcion);