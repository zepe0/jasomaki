<?php

class Validator
{
    const EMAIL_REGEX = '/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';

    public static function validateString($string, $explain = "string")
    {
        if (!is_string($string)) {
            throw new TypeError("$explain is not a string");
        }
    }

    public static function validateStringNotEmptyOrBlank($string, $explain = "Campo")
    {
        self::validateString($string, $explain);

        if (empty($string)) {
            throw new Exception("$explain vacío");
        }

        if (trim($string) === '') {
            throw new Exception("$explain is blank");
        }
    }

    public static function validateStringNotEmptyNoSpaces($string, $explain = "campo")
    {
        self::validateString($string, $explain);

        if (empty($string)) {
            throw new Exception("$explain sin rellenar");
        }

        if (strpos($string, ' ') !== false) {
            throw new Exception("$explain has spaces");
        }
    }

    public static function validateJwt($token)
    {
        self::validateString($token, "token");

        $parts = explode('.', $token);

        if (
            count($parts) !== 3 || !array_reduce($parts, function ($carry, $part) {
                return $carry && !empty($part);
            }, true)
        ) {
            throw new Exception("invalid token format");
        }

        list(, $b64Payload) = $parts;

        $jsonPayload = base64_decode($b64Payload);
        $payload = json_decode($jsonPayload, true);

        if (!$payload) {
            throw new Exception("invalid token payload");
        }

        $exp = $payload['exp'] ?? 0;
        $now = time();

        if ($now > $exp) {
            throw new Exception("token expired");
        }
    }

    public static function isJwtValid($token)
    {
        try {
            self::validateJwt($token);
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    public static function validatePassword($password, $explain = "Contraseña")
    {
        self::validateStringNotEmptyNoSpaces($password, $explain);

        if (strlen($password) < 4) {
            throw new Exception("la $explain debe tener al menos 4 caracteres");
        }
    }

    public static function validateUsername($username)
    {
        self::validateStringNotEmptyNoSpaces($username, "username");

        if (strlen($username) < 4) {
            throw new Exception("username debe tener al menos 4 caracteres");
        }
    }

    public static function validateFunction($func, $explain = "function")
    {
        if (!is_callable($func)) {
            throw new TypeError("$explain is not a function");
        }
    }

    public static function validateDate($date, $explain = "date")
    {
        if (!($date instanceof DateTime)) {
            throw new TypeError("$explain is not Date");
        }
    }

    public static function validateNumber($number, $explain = "number")
    {
        if (!is_numeric($number)) {
            throw new TypeError("$explain is not a number");
        }
    }

    public static function validatePositiveInteger($number, $explain = "number")
    {
        self::validateNumber($number, $explain);

        if (!is_int($number) || $number < 0 || $number > 150) {
            throw new RangeError("$explain is lower than 0 or greater than 150");
        }
    }

    public static function validateEmail($email, $explain = "email")
    {
        if (!preg_match(self::EMAIL_REGEX, $email)) {
            throw new Exception("$explain no es un email");
        }
    }

    public static function validateId($id, $explain = "id")
    {
        self::validateString($id, $explain);

        if (strlen($id) !== 31 && strlen($id) !== 24) {
            throw new Exception("tu id no es un id valido");
        }
    }

    public static function validateTel($phone)
    {
        $phoneRegex = '/^\+?[1-9]\d{8,14}$/'; 
    // Ejemplo de regex para formato E.164 internacional
        if (!preg_match($phoneRegex, $phone) ) {
            throw new Exception("El número de teléfono no es válido");
        }
    }

    public static function validateDNI($dni)
    {
        $dniRegex = '/^\d{8}[A-Z]$/'; // Ejemplo de regex para DNI español
        if (!preg_match($dniRegex, $dni)) {
            throw new Exception("El DNI no es válido");
        }
    }
}

?>