<?php
include_once ("../../headers.php");
require "../../model/User.php";
require "../../model/Validator.php";

$quey = new User();
$eventos = $quey->getUsers();

echo json_encode($eventos);