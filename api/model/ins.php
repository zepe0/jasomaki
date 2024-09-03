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
        $participante_id = generateUID();
        $fecha = new DateTime();

        try {
            $this->con()->beginTransaction();

            // Verificar si ya estás inscrito en el evento
            $stmt = $this->con()->prepare("SELECT EXISTS (
                SELECT 1
                FROM participantes_eventos
                WHERE participante_id = (
                    SELECT id
                    FROM participantes
                    WHERE usuario_id = ?
                ) AND evento_id = ?
            )");
            $stmt->execute([$id_user, $id_event]);
            $result = $stmt->fetchColumn();

            if ($result == 1) {
                $response['error'] = 'Ya estás inscrito en este evento.';
            } else {
                $estaInscrito = $this->con()->prepare("SELECT EXISTS (
                    SELECT 1
                    FROM participantes
                    WHERE usuario_id = ?
                )");
                $estaInscrito->execute([$id_user]);
                $result = $estaInscrito->fetchColumn();

                if ($result == 0) {

                    $stmt1 = $this->con()->prepare("INSERT INTO participantes (id, nombre, apellido, apellidodos, dni, tel, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?)");
                    if ($stmt1->execute([$participante_id, $nombre, $apellido, $apellidos, $dni, $tel, $id_user])) {



                        $añadeevento = $this->con()->prepare("INSERT INTO participantes_eventos (id, participante_id, evento_Id) VALUES (?, ?, ?)");
                        if ($añadeevento->execute([$idins, $participante_id, $id_event])) {
                            $response['success'] = true;
                            $response['msn'] = "Inscripción exitosa.";
                            $this->con()->commit();
                        } else {
                            $response['error'] = "Error al insertar en participantes_eventos.";
                        }
                    } else {
                        $response['error'] = "Error al insertar en inscripciones.";
                    }

                } else {


                    $suparticipante_id = $this->con()->prepare("SELECT id FROM participantes WHERE usuario_id = ?");
                    if ($suparticipante_id->execute([$id_user])) {
                        $fo = $suparticipante_id->fetch(PDO::FETCH_ASSOC);
                        if ($fo) {
                            $id_participante = $fo['id'];


                            $stmt4 = $this->con()->prepare("INSERT INTO participantes_eventos (id, participante_id, evento_id) VALUES (?, ?, ?)");
                            if ($stmt4->execute([$idins, $id_participante, $id_event])) {


                                $response['success'] = true;
                                $response['msn'] = "Inscripción exitosa.";
                                $this->con()->commit();
                            } else {
                                $response['error'] = "Error al insertar en participantes_eventos.";
                            }
                        } else {
                            $response['error'] = "No se encontró el participante.";
                        }
                    } else {
                        $response['error'] = "Error al consultar el participante.";
                    }
                }
            }
        } catch (PDOException $e) {
            if ($e->getCode() == 23000) {
                $response['error'] = "su DNI ya esta regristado ";
            } else {

                $this->con()->rollBack();
                $response['error'] = "Error en la base de datos: " . $e->getMessage() . $e->getLine() . $e->getCode();
            }
        }
        // Revertir la transacción si hay un error

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

    protected function getInscripciones($event_id)
    {
        $response = [];


        try {
            $stmt = $this->con()->prepare("SELECT p.id, p.nombre,p.apellido,p.apellidodos, p.tel, p.dni, e.nombre AS evento_nombre
                FROM participantes p
                JOIN participantes_eventos pe ON p.id = pe.participante_id
                JOIN eventos e ON pe.evento_id = e.id
                WHERE e.id = ?; ");

            if (!$stmt->execute([$event_id])) {
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
                $response['error'] = "Error en la base de datos : " . $e->getMessage();
            }
        }

        // Liberar el recurso del statement
        $stmt = null;

        // Devolver la respuesta con datos o error
        return $response;
    }

    private function getAllParticipante($tipo, $fecha)
    {
        $response = [];

        


        try {
             $stmt = $this->con()->prepare("SELECT p.id, p.nombre, p.apellido, p.tel, p.dni, e.tipo, EXTRACT(YEAR FROM e.fecha) AS anio, t.pecho, t.pierna, t.fecha as fechaTraje,t.sexo
FROM participantes p
JOIN participantes_eventos pe ON p.id = pe.participante_id
JOIN eventos e ON pe.evento_id = e.id
LEFT JOIN  trajes t ON p.id = t.participante_id AND EXTRACT(YEAR FROM t.fecha) = EXTRACT(YEAR FROM e.fecha)
WHERE e.tipo = ? AND EXTRACT(YEAR FROM e.fecha) = ?"); 
/* $stmt = $this->con()->prepare("SELECT p.id, p.nombre, p.apellido, p.tel, p.dni, e.tipo, EXTRACT(YEAR FROM e.fecha) AS anio
FROM participantes p
JOIN participantes_eventos pe ON p.id = pe.participante_id
JOIN eventos e ON pe.evento_id = e.id

WHERE e.tipo = ? AND EXTRACT(YEAR FROM e.fecha) = ?"); */
        
            if (!$stmt->execute([$tipo, (int) $fecha])) {
                $response['error'] = "Error al ejecutar la consulta.";
            } else {
                $response['data'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
        } catch (PDOException $e) {
           
            if ($e->getCode() == 23000 && strpos($e->getMessage(), '1062') !== false) {
                $response['error'] = "Registro duplicado: " . $e->getMessage();
            } else {
                $response['error'] = "Error en la base de datos: " . $e->getMessage();
            }
           

        }

      
        $stmt = null;

     
        return $response;
    }
    private function delParticipantes($id)
    {

        try {
            $stmt = $this->con()->prepare("DELETE from participantes WHERE id=?");

            if (!$stmt->execute([$id])) {

                $response['error'] = "Error al ejecutar la consulta.";
            } else {

                $response['data'] = $stmt->rowCount();
            }
        } catch (PDOException $e) {

            if ($e->getCode() == 23000 && strpos($e->getMessage(), '1062') !== false) {
                $response['error'] = "Registro duplicado: " . $e->getMessage();
            } else {
                $response['error'] = "Error en la base de datos : " . $e->getMessage();
            }
        }

        // Liberar el recurso del statement
        $stmt = null;

        // Devolver la respuesta con datos o error
        return $response;

    }

    public function getInscripcionesAdmin($rol, $event_id)
    {
        $response = [];
        if ($rol = 1) {

            return $this->getInscripciones($event_id);
        }
        return $response['error'] = "No tienes permisos para la acción seleccionada";
    }
    public function getMyEvents($userid)
    {
        $response = [];


        try {
            $stmt = $this->con()->prepare("SELECT evento_id FROM participantes_eventos  WHERE participante_id = (SELECT id from participantes where usuario_id=?)");

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
    public function getAllParticipantes($rol, $tipo, $fecha)
    {

        if ($rol == 1)
            return $this->getAllParticipante($tipo, $fecha);
    }
    public function delParticipante($rol, $idevento)
    { {
            $response = [];
            if ($rol = 1) {

                return $this->delParticipantes($idevento);
            }
            return $response['error'] = "No tienes permisos para la acción seleccionada";
        }
    }
}