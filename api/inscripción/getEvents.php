<?php
include_once ("../headers.php");
require "../model/Eventins.php";
require "../model/Validator.php";

$quey = new EventIns();
$eventos = $quey->getAllEvents();

echo json_encode($eventos);