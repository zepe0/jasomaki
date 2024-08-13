<?php
require_once 'Db.php';

function generateUID()
{

    return uniqid(bin2hex(random_bytes(4)), true);
}
class Inscripcion extends Db
{
    protected function userInscripcion($nombre, $apellido, $apellidos, $tel, $dni, $id_event, $id_user)
    {
        $response = [];
        $idins = generateUID();

        try {

            $stmt = $this->con()->prepare("SELECT COUNT(*) FROM ins WHERE dni = ? AND id_event = ?");
            $stmt->execute([$dni, $id_event]);
            $count = $stmt->fetchColumn();

            if ($count > 0) {

                $response['message'] = "Ya estás inscrito en este evento.";
            } else {

                $stmt = $this->con()->prepare("INSERT INTO ins (ins_id, nombre, apellido, apellidos, tel, dni, id_event, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                if (!$stmt->execute([$idins, $nombre, $apellido, $apellidos, $tel, $dni, $id_event, $id_user])) {
                    $response['error'] = "Error al ejecutar la consulta.";
                } else {
                    $response['success'] = true;
                    $response['msn'] = "Inscrito con éxito.";
                }
            }
        } catch (PDOException $e) {
            $response['error'] = "Error en la base de datos: " . $e->getMessage();
        }

        $stmt = null;
        return $response;
    }

    private function setInsUser($insid, $nombre, $apellido, $apellidos, $tel, $dni, $fecha)
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


            if ($stmt->execute([$nombre, $apellido, $apellidos, $tel, $dni, $fecha, $insid])) {

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
        $response = ['error' => null, 'data' => null];

        try {
            $stmt = $this->con()->prepare("SELECT i.ins_id, i.id_event, i.nombre, i.apellido, i.apellidos, i.dni, i.tel, i.fecha_insc, e.titulo 
                                           FROM ins as i 
                                           INNER JOIN eventins as e on i.id_event = e.id_event");

            if (!$stmt->execute()) {
                // Si la ejecución falla por alguna razón que no sea una excepción, capturamos aquí.
                $response['error'] = "Error al ejecutar la consulta.";
            } else {
                // Si la consulta fue exitosa, devolvemos los datos.
                $response['data'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
        } catch (PDOException $e) {
            // Manejamos diferentes tipos de errores según el código de error o el mensaje.
            if ($e->getCode() == 23000 && strpos($e->getMessage(), '1062') !== false) {
                $response['error'] = "Registro duplicado: " . $e->getMessage();
            } else {
                $response['error'] = "Error en la base de datos: " . $e->getMessage();
            }
        }

        // Liberar el recurso del statement
        $stmt = null;

        // Devolver la respuesta con datos o error
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