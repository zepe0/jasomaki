<?php
require_once 'Db.php';

function generateUID()
{

    return uniqid(bin2hex(random_bytes(4)), true);
}
class EventIns extends Db
{
    private function addEvent($iduser, $titulo, $des, $inicio, $fin)
    {
        $response = [];
        $idins = generateUID();

        try {
            $stmt = $this->con()->prepare("INSERT INTO eventins (ins_id,id_user,titulo,descr,inicio,fin) VALUES (?,?,?,?,?,?)");

            if (!$stmt->execute(array($idins, $iduser, $titulo, $des, $inicio, $fin))) {
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

    public function addEventIns($id, $Titulo, $Descripcion, $inicio, $fin)
    {
        return $this->addEvent($id, $Titulo, $Descripcion, $inicio, $fin);
    }
    public function getAllEvents()
    {
        $response = [];


        try {
            $stmt = $this->con()->prepare("SELECT * FROM eventins");

            if (!$stmt->execute(array())) {
                $response['error'] = "Error al ejecutar la consulta.";

            } else {

                return $stmt->fetchAll(PDO::FETCH_ASSOC);

            }
        } catch (PDOException $e) {
            if ($e->getCode() == 23000 && strpos($e->getMessage(), '1062') !== false) {
                $response['error'] = $e->getMessage();;
            } else {
                $response['error'] = "Error en la base de datos: " . $e->getMessage();
            }
        }

        $stmt = null;
        return $response;

    }
   
}