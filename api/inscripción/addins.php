<?php
include_once ("../headers.php");
require "../model/Eventos.php";
require "../model/Validator.php";

$json_data = file_get_contents('php://input');
$inputs = json_decode($json_data, true);

$id = $inputs['id'];
$Titulo = $inputs['Titulo'];
$inicio = $inputs['inicio'];
$hora = $inputs['hora'];


try {
    Validator::validateStringNotEmptyOrBlank($Titulo);
    /* Validator::validateStringNotEmptyOrBlank($id); */
    Validator::validateStringNotEmptyOrBlank($inicio);//TODO mirar como enviar datos

    Validator::validateId($id);
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
}

$quey = new EventIns();
$inscripcion = $quey->addEvents($id, $Titulo, $inicio, $hora);

echo json_encode($inscripcion);