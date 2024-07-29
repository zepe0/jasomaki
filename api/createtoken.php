<?php
require_once 'model/Env.php';
function base64UrlEncode($data)
{
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64UrlDecode($data)
{
    return base64_decode(strtr($data, '-_', '+/'));
}

function createJwt($payload)
{
    $secret = Env::SECRET_JWT;
    $header = [
        'alg' => 'HS256', // Algoritmo de firma
        'typ' => 'JWT'    // Tipo de token
    ];
    // Encode Header
    $headerEncoded = base64UrlEncode(json_encode($header));

    // Encode Payload
    $payloadEncoded = base64UrlEncode(json_encode($payload));

    // Create Signature
    $signature = hash_hmac('sha256', $headerEncoded . '.' . $payloadEncoded, $secret, true);
    $signatureEncoded = base64UrlEncode($signature);

    // Return JWT
    return $headerEncoded . '.' . $payloadEncoded . '.' . $signatureEncoded;
}



// Header
$header = [
    'alg' => 'HS256',
    'typ' => 'JWT'
];

// Payload



?>