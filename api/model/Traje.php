<?php
require_once 'Db.php';
require_once 'Validator.php';

function generateUID()
{

    return uniqid(bin2hex(random_bytes(4)), true);
}
class EventoTraje extends Db
{

    private function addEventTraje($userid, $titulo, $ubicacion, $des, $dia, $inicio, $fin)
    {
        $response = [];
        $id = generateUID();


        try {
            Validator::validateId($userid);
            Validator::validateStringNotEmptyOrBlank($titulo);
            Validator::validateStringNotEmptyOrBlank($ubicacion);
            Validator::validateStringNotEmptyOrBlank($des);
            Validator::validateStringNotEmptyOrBlank($dia);
            Validator::validateStringNotEmptyOrBlank($inicio);
            Validator::validateStringNotEmptyOrBlank($fin);

            $stmt = $this->con()->prepare("INSERT INTO eventostraje (idEventoTraje ,user_uid,titulo,ubicacion,descr,dia,inicio,fin) VALUES (?,?,?,?,?,?,?,?  )");

            if (!$stmt->execute(array($id, $userid, $titulo, $ubicacion, $des, $dia, $inicio, $fin))) {
                $response['error'] = "Error al ejecutar la consulta.";
            } else {
                $response['success'] = true;
                $response['msn'] = "Evento creado";

            }
            return $response;

        } catch (PDOException $e) {
            if ($e->getCode() == 23000 && strpos($e->getMessage(), '1062') !== false) {
                $response['error'] = "Ya hay un evento para el mismo dia";
                return $response;
            } else {
                $response['error'] = "Error en la base de datos: " . $e->getMessage();
                return $response;
            }
        }
    }
    public function addEvent($userid, $titulo, $ubicacion, $des, $dia, $inicio, $fin)
    {
        return $this->addEventTraje($userid, $titulo, $ubicacion, $des, $dia, $inicio, $fin);
    }
}