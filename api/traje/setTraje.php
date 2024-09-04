<?php
include_once("../headers.php");
require "../model/Traje.php";


$json_data = file_get_contents('php://input');
$inputs = json_decode($json_data, true);


$userid = $inputs['id_user'];
$pecho = $inputs['pecho'];
$pierna = $inputs['pierna'];
$sexo = $inputs['traje'];

$query = new EventoTraje();

/* TODO -> crear el edit */
$result = $query->MyTraje($userid, $pecho, $pierna,$sexo);

echo json_encode($result);


?>