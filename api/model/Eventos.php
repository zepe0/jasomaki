<?php
require_once 'Db.php';
require_once '../utils/generateUID.php';



class EventIns extends Db
{
    // PRIVADAS
    private function addEvent($id, $nombre, $fecha, $tipo)
    {
        $response = [];
        $id = generateUID();

        try {
            $stmt = $this->con()->prepare("INSERT INTO eventos (id,nombre,fecha,tipo) VALUES (?,?,?,?)");

            if (!$stmt->execute(array($id, $nombre, $fecha, $tipo))) {
                $response['error'] = "Error al ejecutar la consulta.";
            } else {
                $response['success'] = true;
                $response['msn'] = "Inscrito con éxito.";

            }
        } catch (PDOException $e) {

            if ($e->getCode() == '45000' ) {
                $response['error'] = 'Máximo  de 4 eventos por año y tipo de salida';
            } else if ($e->getCode() == 23000 && strpos($e->getMessage(), '1062') !== false) {
                $response['error'] = "Error en la base de datos   34: " . $e->getMessage();
            } else {

                $response['error'] = "Error en la base de datos: Código" . $e->getCode() . ", Mensaje: " . $e->getMessage();
            }
        }

        $stmt = null;
        return $response;
    }



    private function checkUser($id, $rol)
    {
        $response = [];
        try {
            $stmt = $this->con()->prepare("SELECT COUNT(*)as existe from usuarios WHERE id= ? AND rol = ?");

            if (!$stmt->execute(array($id, $rol))) {
                $response['error'] = "Error al ejecutar la consulta.";
            } else {
                $result = $stmt->fetchColumn();

                if ($result > 0) {
                    $response['error'] = "0"; //es admin
                } else {
                    $response['error'] = "1";
                }

            }
        } catch (PDOException $e) {

            $response['error'] = "Error en la base de datos: Código" . $e->getCode() . ", Mensaje: " . $e->getMessage();

        }

        $stmt = null;
        return $response;

    }
    private function delEvent($id)
    {
        $response = [];
        try {

            $stmt = $this->con()->prepare("DELETE FROM eventos WHERE id = ?");
            $stmt->execute([$id]);


            if ($stmt->rowCount() > 0) {
                $response['success'] = "Evento eliminado con éxito";
            } else {
                $response['error'] = "No se pudo eliminar el evento. Es posible que no exista.";
            }
        } catch (PDOException $e) {

            $response['error'] = "Error en la base de datos: Código " . $e->getCode() . ", Mensaje: " . $e->getMessage();
        }

        return $response;
    }
    private function editEvent($id, $nombre, $fecha, $hora, $rol, $user)
    {

        $response = [];
        try {
            $result = $this->checkUser($user, $rol);

            if ($result['error'] == "1") {
                $response['error'] = "El usuario no tiene permisos para editar eventos";
            } else {
                $stmt = $this->con()->prepare("UPDATE eventos SET nombre = ?, fecha = ?, tipo = ? WHERE id = ?");

                if ($stmt->execute(array($nombre, $fecha, $hora, $id))) {
                    $affectedRows = $stmt->rowCount();
                    if ($affectedRows > 0) {
                        $response['success'] = true;
                        $response['msn'] = "Modificado con éxito";
                    } else {
                        $response['error'] = "Error es posible que el evento no exista o que los datos proporcionados sean los mismos que ya existen.";
                    }
                } else {
                    $response['error'] = "Error al ejecutar la consulta.";
                }
            }
        } catch (PDOException $th) {
            $response['error'] = $th->getMessage();
        }

        return json_encode($response);
    }



    public function addEvents($id, $Titulo, $inicio, $tipo)
    {
        return $this->addEvent($id, $Titulo, $inicio, $tipo);
    }
    public function getAllEvents()
    {
        $response = [];


        try {
            $stmt = $this->con()->prepare("SELECT * FROM eventos");

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
    public function editEvents($id, $nombre, $inicio, $tipo, $rol, $idUser)
    {

        return $this->editEvent($id, $nombre, $inicio, $tipo, $rol, $idUser);
    }
    public function delEvents($id, $rol, $iduser)
    {
        $res = [];


        $admin = $this->checkUser($iduser, $rol);
    

        if ($admin['error'] == 0) {
            $res = $this->delEvent($id);
            return $res;
        } else {
            $res['error'] = "No tienes permisos para hacer esto";
        }

        echo json_encode($res);
    }
}



