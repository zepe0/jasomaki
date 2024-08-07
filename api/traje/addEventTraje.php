<?php
include_once ("../headers.php");
require "../model/Traje.php";


$json_data = file_get_contents('php://input');
$inputs = json_decode($json_data, true);


$titulo = $inputs['titulo'];
$ubicacion = $inputs['ubicacion'];
$desc = $inputs['desc'];
$dia = $inputs['dia'];
$inicio = $inputs['inicio'];
$fin = $inputs['fin'];
$userid = $inputs['id'];


$query = new EventoTraje();
$result = $query->addEventoTraje($userid, $titulo, $ubicacion, $desc, $dia, $inicio, $fin);

echo json_encode($result);


?>