<?php
require_once 'Db.php';

function generateUID()
{

    return uniqid(bin2hex(random_bytes(4)), true);
}
class EventIns extends Db
{
    private function addEvent($id, $nombre, $fecha, $hora)
    {
        $response = [];
        $id = generateUID();

        try {
            $stmt = $this->con()->prepare("INSERT INTO eventos (id,nombre,fecha,hora) VALUES (?,?,?,?)");

            if (!$stmt->execute(array($id, $nombre, $fecha, $hora))) {
                $response['error'] = "Error al ejecutar la consulta.";
            } else {


                $response['success'] = true;
                $response['msn'] = "Inscrito con éxito.";

            }
        } catch (PDOException $e) {

            if ($e->getCode() == '45000' && strpos($e->getMessage(), 'No se pueden crear más de 3 eventos en la misma fecha') !== false) {
                $response['error'] = 'No se pueden crear más de 3 eventos en la misma fecha';
            } else if ($e->getCode() == 23000 && strpos($e->getMessage(), '1062') !== false) {
                $response['error'] = "Error en la base de datos   34: " . $e->getMessage();
            } else {

                $response['error'] = "Error en la base de datos: Código" . $e->getCode() . ", Mensaje: " . $e->getMessage();
            }
        }

        $stmt = null;
        return $response;
    }

    public function addEvents($id, $Titulo, $inicio, $hora)
    {
        return $this->addEvent($id, $Titulo, $inicio, $hora);
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

}