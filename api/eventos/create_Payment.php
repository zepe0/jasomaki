<?php
include_once("../headers.php");
require '../../vendor/autoload.php';
require_once '../model/Env.php';

$stripeConfig = Env::STRIPE_KEY;

\Stripe\Stripe::setApiKey($stripeConfig);


try {
    // Obtener el monto desde la solicitud (por ejemplo, desde tu frontend)
    $input = @file_get_contents("php://input");
    $data = json_decode($input);

    // Crear un PaymentIntent
    $paymentIntent = \Stripe\PaymentIntent::create([
        'amount' => $data->amount, // Monto en centavos (1000 = $10.00)
        'currency' => 'eur',
        'payment_method_types' => ['bizum'],
    ]);

    // Devolver el client_secret al frontend
    echo json_encode(['clientSecret' => $paymentIntent->client_secret]);
} catch (Error $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
