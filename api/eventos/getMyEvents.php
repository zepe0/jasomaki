<?php
include_once("../headers.php");
require "../model/ins.php";
require "../model/Validator.php";

try {
  $json_data = file_get_contents('php://input');
  $inputs = json_decode($json_data, true);

  if (is_null($inputs)) {
    throw new Exception('Error con tus eventos.');
  }
  $id_user = $inputs['id_user'];
  Validator::validateStringNotEmptyOrBlank($id_user);
  Validator::validateId($id_user);
  $quey = new Inscripcion();
  $eventos = $quey->getMyEvents($id_user);
  echo json_encode($eventos);


} catch (Exception $e) {
  $response['error'] = 'error';
  $response['message'] = $e->getMessage();
  header('Content-Type: application/json');
  echo json_encode($response);
}
