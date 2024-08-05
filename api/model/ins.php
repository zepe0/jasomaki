<?php
require_once 'Db.php';

function generateUID()
{

    return uniqid(bin2hex(random_bytes(4)), true);
}
class Inscripcion extends Db
{
    protected function userInscripcion($nombre, $apelido, $apellidos, $tel, $dni, $id_event, $id_user)
    {
        $response = [];
        $idins = generateUID();

        try {
            $stmt = $this->con()->prepare("INSERT INTO ins (ins_id,nombre,apellido,apellidos,tel,dni,id_event,user_id) VALUES (?,?,?,?,?,?,?,?)");

            if (!$stmt->execute(array($idins, $nombre, $apelido, $apellidos, $tel, $dni, $id_event, $id_user))) {
                $response['error'] = "Error al ejecutar la consulta.";
            } else {


                $response['success'] = true;
                $response['msn'] = "Inscrito con éxito.";

            }
        } catch (PDOException $e) {
            if ($e->getCode() == 23000 && strpos($e->getMessage(), '1062') !== false) {
                $response['error'] = "Ya estas inscrito";
            } else {
                $response['error'] = "Error en la base de datos: " . $e->getMessage();
            }
        }

        $stmt = null;
        return $response;
    }
   
    private function setInsUser($insid, $nombre, $apellido, $apellidos,$tel,$dni,$fecha)
    {
        Validator::validateId($insid);
        Validator::validateStringNotEmptyOrBlank($nombre);
        Validator::validateStringNotEmptyOrBlank($apellido);
        Validator::validateStringNotEmptyOrBlank($apellidos);
        Validator::validateStringNotEmptyOrBlank($tel);
        Validator::validateStringNotEmptyOrBlank($dni);
        Validator::validateTel($tel);
        Validator::validateStringNotEmptyOrBlank($fecha);
        Validator::validateDNI($dni);


        $response = [];

        try {

            $stmt = $this->con()->prepare("UPDATE ins SET nombre = ?, apellido = ?, apellidos = ?,tel =?,dni=?,fecha_ins WHERE ins_id = ?");


            if ($stmt->execute([$nombre, $apellido, $apellidos, $tel,$dni,$fecha,$insid])) {

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
    private function deleteIns($idIns)
    {
        Validator::validateId($idIns);
        $response = [];

        try {

            $stmt = $this->con()->prepare("DELETE FROM ins WHERE id_ins  = ?");

            if ($stmt->execute([$idIns])) {

                $response['status'] = 'success';
                $response['message'] = 'Inscripción eliminado correctamente.';
            } else {

                $response['status'] = 'error';
                $response['message'] = 'Error al eliminar el inscripción.';
            }


            $stmt->closeCursor();
        } catch (PDOException $e) {

            $response['status'] = 'error';
            $response['message'] = 'Error en la base de datos: ' . $e->getMessage();
        }


        return $response;
    }

    protected function getInscripciones()
    {
        $response = [];


        try {
            $stmt = $this->con()->prepare("SELECT * FROM ins ");

            if (!$stmt->execute(array())) {
                $response['error'] = "Error al ejecutar la consulta.";

            } else {

                return $stmt->fetchAll(PDO::FETCH_ASSOC);

            }
        } catch (PDOException $e) {
            if ($e->getCode() == 23000 && strpos($e->getMessage(), '1062') !== false) {
                $response['error'] = $e->getMessage();
                ;
            } else {
                $response['error'] = "Error en la base de datos: " . $e->getMessage();
            }
        }

        $stmt = null;
        return $response;

    }
    public function getInscripcionesAdmin($rol)
    {
        $response = [];
        if ($rol = 1) {

            return $this->getInscripciones();
        }
        return $response['error'] = "No tienes permisos para la acción seleccionada";
    }
    public function getMyEvents($userid)
    {
        $response = [];


        try {
            $stmt = $this->con()->prepare("SELECT id_event FROM ins  WHERE user_id = ?");

            if (!$stmt->execute(array($userid))) {
                $response['error'] = "Error al ejecutar la consulta.";

            } else {

                return $stmt->fetchAll(PDO::FETCH_ASSOC);

            }
        } catch (PDOException $e) {
            if ($e->getCode() == 23000 && strpos($e->getMessage(), '1062') !== false) {
                $response['error'] = $e->getMessage();
                ;
            } else {
                $response['error'] = "Error en la base de datos: " . $e->getMessage();
            }
        }

        $stmt = null;
        return $response;

    }
    
    public function addIns($nombre, $apelido, $apellidos, $tel, $dni, $id_event, $id_user)
    {
        return $this->userInscripcion($nombre, $apelido, $apellidos, $tel, $dni, $id_event, $id_user);
    }
}