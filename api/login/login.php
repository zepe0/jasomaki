<?php
include_once ("../headers.php");
require "../model/User.php";

$json_data = file_get_contents('php://input');
$inputs = json_decode($json_data, true);
$email = $inputs['email'];
$pas = $inputs['pass'];

$quey = new User();
$Allusers = $quey->login($email,$pas);
echo json_encode($Allusers);


?>