<?php
include_once ("../headers.php");
require "../model/Eventins.php";
require "../model/Validator.php";

$json_data = file_get_contents('php://input');
$inputs = json_decode($json_data, true);

$id = $inputs['id'];
$Titulo = $inputs['Titulo'];
$Descripcion = $inputs['Descripcion'];
$inicio = $inputs['inicio'];
$fin = $inputs['fin'];


try {
    Validator::validateStringNotEmptyNoSpaces($Titulo);
    Validator::validateStringNotEmptyNoSpaces($Descripcion);
    Validator::validateStringNotEmptyNoSpaces($id);
    Validator::validateStringNotEmptyNoSpaces($inicio);
    Validator::validateStringNotEmptyNoSpaces($fin);
    Validator::validateId($id);
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
}

$quey = new EventIns();
$inscripcion = $quey->addEventIns($id, $Titulo, $Descripcion, $inicio, $fin);

echo json_encode($inscripcion);