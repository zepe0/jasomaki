<?php
include_once("../../headers.php");
require "../../model/ins.php";
require "../../model/Validator.php";
$json_data = file_get_contents('php://input');
$inputs = json_decode($json_data, true);


$user = $inputs['idUser'];
$event = $inputs['idParticipante'];

$quey = new Inscripcion();
$usuarioeliminado = $quey->delParticipante($user, $event);

echo json_encode($usuarioeliminado);