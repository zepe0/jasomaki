<?php

include_once("../headers.php");
require '../../vendor/autoload.php';
require_once '../model/Env.php';

// Clave secreta de Stripe
\Stripe\Stripe::setApiKey(Env::STRIPE_KEY);

header('Content-Type: application/json');

try {
    // Crea un PaymentIntent
    $paymentIntent = \Stripe\PaymentIntent::create([
        'amount' => 1999, // Monto en centavos (por ejemplo, $19.99)
        'currency' => 'eur', // Moneda (asegúrate de que Bizum esté disponible para la moneda que usas)
        'automatic_payment_methods' => [
            'enabled' => true, // Habilitar todos los métodos de pago automáticos
        ],
    ]);

    $response = [
        'clientSecret' => $paymentIntent->client_secret,
    ];

    echo json_encode($response);

} catch (Error $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
