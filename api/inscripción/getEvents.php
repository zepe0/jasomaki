<?php
include_once ("../headers.php");
require "../model/Eventos.php";
require "../model/Validator.php";

$quey = new EventIns();
$eventos = $quey->getAllEvents();

echo json_encode($eventos);