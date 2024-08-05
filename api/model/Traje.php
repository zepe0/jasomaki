<?php
require_once 'Db.php';
require_once 'User.php';
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
    private function getAllTrajes()
    {
        $response = [];
        $stmt = $this->con()->prepare("SELECT * FROM traje ");
        $res = $stmt->execute();
        if (!$res) {
            $response['sucess'] = "No se han registrado trajes aun ";
        } else {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

    }
    private function setTrajeUser($iduser, $pecho, $piernas, $fecha)
    {
        Validator::validateId($iduser);
        Validator::validateStringNotEmptyOrBlank($pecho);
        Validator::validateStringNotEmptyOrBlank($piernas);

        $response = [];

        try {

            $stmt = $this->con()->prepare("UPDATE traje SET pecho = ?, piernas = ?, fechaElecion = ? WHERE user_id = ?");


            if ($stmt->execute([$pecho, $piernas, $fecha, $iduser])) {

                $response['status'] = 'success';
                $response['message'] = 'Datos actualizados correctamente.';
            } else {

                $response['status'] = 'error';
                $response['message'] = 'Error al actualizar los datos.';
            }


            $stmt->closeCursor();
        } catch (PDOException $e) {

            $response['status'] = 'error';
            $response['message'] = 'Error en la base de datos: ' . $e->getMessage();
        }


        return $response;
    }
    private function deleteTrajeUser($id_traje)
    {
        Validator::validateId($id_traje);
        $response = [];

        try {

            $stmt = $this->con()->prepare("DELETE FROM traje WHERE id_traje  = ?");

            if ($stmt->execute([$id_traje])) {

                $response['status'] = 'success';
                $response['message'] = 'Traje eliminado correctamente.';
            } else {

                $response['status'] = 'error';
                $response['message'] = 'Error al eliminar el traje.';
            }


            $stmt->closeCursor();
        } catch (PDOException $e) {

            $response['status'] = 'error';
            $response['message'] = 'Error en la base de datos: ' . $e->getMessage();
        }


        return $response;
    }

    /* PUBLICAS */
    public function allTrajes()
    {
        return $this->getAllTrajes();
    }

    public function updateTraje($idAdmin, $iduser, $pecho, $piernas, $fecha)
    {
        $user = new User();

        if ($user->checkAdmin($idAdmin)) {

            return $this->setTrajeUser($iduser, $pecho, $piernas, $fecha);
        } else {
            return ['status' => 'error', 'message' => 'No tienes permisos para realizar esta operación'];
        }



    }
    public function delTraje($idAdmin, $id_traje)
    {
        $user = new User();
        if ($user->checkAdmin($idAdmin)) {

            return $this->deleteTrajeUser($id_traje);
        } else {
            return ['status' => 'error', 'message' => 'No tienes permisos para realizar esta operación'];
        }

    }

}