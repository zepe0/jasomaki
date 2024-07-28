<?php
include_once ("../headers.php");
require "../model/User.php";


$json_data = file_get_contents('php://input');
$inputs = json_decode($json_data, true);
$email = $inputs['email'];
$pas = $inputs['password'];
$hashed_password = password_hash($pas, PASSWORD_BCRYPT);

$query= new User();
$result = $query->setNewUser($email,$hashed_password);

echo json_encode($result);


?>