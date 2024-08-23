<?php
include_once("../../headers.php");
require "../../model/ins.php";
require "../../model/Validator.php";

$quey = new Inscripcion();
$eventos = $quey->getAllParticipantes();

echo json_encode($eventos);