<?php
include_once ("../headers.php");
require "../model/User.php";

$quey = new User();
$Allusers = $quey->getUsers();
echo json_encode($Allusers);




/* 
$json_data = file_get_contents('php://input');
$inputs = json_decode($json_data, true);
$data = [];
$data['success'] = $inputs["tel"];

echo json_encode($data); */


?>