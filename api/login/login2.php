<?php
// Agrega los encabezados CORS
header('Access-Control-Allow-Origin: http://localhost:5173'); // Permite solicitudes desde tu frontend
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Maneja la solicitud OPTIONS para solicitudes preflight
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204); // No Content
    exit;
}
$json_data = file_get_contents('php://input');
$inputs = json_decode($json_data, true);
$data = [];
$data['success'] = $inputs;




// El resto de tu código PHP
header('Content-Type: application/json');
echo json_encode($data);
;
?>