<?php
include_once ("../headers.php");
require "../model/Traje.php";

$query = new EventoTraje();
$result = $query->allTrajes();

echo json_encode($result);


?>