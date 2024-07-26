<?php
// Agrega los encabezados CORS
header('Access-Control-Allow-Origin: http://localhost:5173'); // Permite solicitudes desde tu frontend
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');