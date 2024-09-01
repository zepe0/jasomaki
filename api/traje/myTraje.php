<?php
include_once("../headers.php");
require "../model/Traje.php";
$json_data = file_get_contents('php://input');
$inputs = json_decode($json_data, true);


$id_user = $inputs['id'];
$query = new EventoTraje();
$result = $query->GetMyTrajes($id_user);

echo json_encode($result);


?>