<?php
function verifyJwt($jwt, $secret)
{
    // Split the JWT into its parts
    list($headerEncoded, $payloadEncoded, $signatureEncoded) = explode('.', $jwt);

    // Decode the parts
    $header = json_decode(base64UrlDecode($headerEncoded), true);
    $payload = json_decode(base64UrlDecode($payloadEncoded), true);
    $signature = base64UrlDecode($signatureEncoded);

    // Verify the algorithm
    if ($header['alg'] !== 'HS256') {
        throw new Exception('Unsupported algorithm');
    }

    // Verify the signature
    $expectedSignature = hash_hmac('sha256', $headerEncoded . '.' . $payloadEncoded, $secret, true);
    if (!hash_equals($expectedSignature, $signature)) {
        throw new Exception('Invalid signature');
    }

    // Check expiration
    if ($payload['exp'] < time()) {
        throw new Exception('Token has expired');
    }

    return $payload;
}

// Configuración
$secretKey = 'tu_clave_secreta'; // Asegúrate de que coincida con la clave usada para firmar el token

// Token a verificar (deberías obtenerlo de la solicitud)
$jwt = 'aquí_va_tu_token';

try {
    $payload = verifyJwt($jwt, $secretKey);
    echo 'Payload: ';
    print_r($payload);
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
}
?>