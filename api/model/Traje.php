<?php
require_once 'Db.php';
require_once 'User.php';
require_once 'Validator.php';
require_once '../utils/generateUID.php';
require_once "Eventos.php";


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
        $stmt = $this->con()->prepare("SELECT idEventoTraje, dia,inicio,fin,ubicacion,descr FROM traje ");
        $res = $stmt->execute();
        if (!$res) {
            $response['sucess'] = "No se han registrado trajes aun ";
        } else {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

    }
    private function getAllEventsTrajes()
    {
        $response = [];
        $stmt = $this->con()->prepare("SELECT * FROM eventostraje ");
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
    private function checkUserEvent($id_user, $id_event)
    {
        Validator::validateId($id_event);
        Validator::validateId($id_user);

    }
    private function SetMyTraje($id_user, $pecho, $pierna, $sexo)
    {
        $id_traje = generateUID();
        $response = [];


        try {
            $stmt = $this->con()->prepare("INSERT INTO trajes (id,pecho,pierna,sexo,participante_id) values (?,?,?,?,(SELECT id FROM participantes WHERE usuario_id = ?))");
            if ($stmt->execute([$id_traje, $pecho, $pierna, $sexo, $id_user]))
                $response['success'] = true;
            $response['message'] = 'Traje Asignado correctamente.';
        } catch (PDOException $e) {
            if ($e->getCode() == 45000) {
                if (preg_match('/1644\s+(.*)$/', $e->getMessage(), $matches)) {
                    $customMessage = $matches[1];
                    $response['error'] = $customMessage;
                } else {
                    $response['error'] = $e->getMessage();
                }

            } else {

                $response['error'] = 'Error en la base de datos: ' . $e->getMessage();
            }
        }

        return $response;
    }

    private function getmytraje($id)
    {
        Validator::validateId($id);
        $response = [];


        try {
            $stmt = $this->con()->prepare("SELECT pecho,pierna,sexo,anio from trajes where participante_id= (SELECT id FROM participantes WHERE usuario_id = ?)");
            if ($stmt->execute([$id]))
                $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            if ($e->getCode() == 23000) {

                $response['error'] = 'No tienes permisos para modificar el Traje Ponte en contacto con un administrador';
            } else {

                $response['error'] = 'Error en la base de datos: ' . $e->getMessage();
            }
        }

        return $response;
    }

    /* PUBLICAS */
    public function addEventoTraje($userid, $titulo, $ubicacion, $des, $dia, $inicio, $fin)
    {
        return $this->addEventTraje($userid, $titulo, $ubicacion, $des, $dia, $inicio, $fin);
    }
    public function allTrajes()
    {
        return $this->getAllEventsTrajes();
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
    public function MyTraje($iduser, $pecho, $piernas, $sexo)
    {
        return $this->SetMyTraje($iduser, $pecho, $piernas, $sexo);
    }
    public function GetMyTrajes($id)
    {
        return $this->getmytraje($id);
    }

}