<?php
include_once ("../headers.php");
require "../model/Traje.php";

$query = new EventoTraje();
$result = $query->MyTraje($id_traje, $fecha, $prcho, $pierna, $id_user, $rol);

echo json_encode($result);


?>