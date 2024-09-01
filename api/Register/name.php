<?php
include_once ("../headers.php");
require "../model/User.php";


$json_data = file_get_contents('php://input');
$inputs = json_decode($json_data, true);
$id = $inputs['id'];



$query= new User();
$result = $query->getName($id);

echo json_encode($result);


?>