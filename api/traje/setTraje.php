<?php
include_once("../headers.php");
require "../model/Traje.php";


$json_data = file_get_contents('php://input');
$inputs = json_decode($json_data, true);


$userid = $inputs['id_user'];
$pecho = $inputs['pecho'];
$pierna = $inputs['pierna'];

$query = new EventoTraje();


$result = $query->MyTraje($userid, $pecho, $pierna);

echo json_encode($result);


?>