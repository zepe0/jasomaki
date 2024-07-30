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
    public function addIns($nombre, $apelido, $apellidos, $tel, $dni, $id_event, $id_user)
    {
        return $this->userInscripcion($nombre, $apelido, $apellidos, $tel, $dni, $id_event, $id_user);
    }
}