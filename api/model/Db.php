<?php
require_once 'Env.php';
class Db
{
    private $host;
    private $user;
    private $pass;
    private $dbname;
    private $pdo;
    private $error;
    private $msn;

    public function __construct()
    {
        $this->host = Env::DB_HOST;
        $this->user = Env::DB_USER;
        $this->pass = Env::DB_PASS;
        $this->dbname = Env::DB_NAME;

        // Establecer la conexión a la base de datos
        $dsn = "mysql:host={$this->host};dbname={$this->dbname};charset=utf8";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];

        try {
            $this->pdo = new PDO($dsn, $this->user, $this->pass, $options);
        } catch (PDOException $e) {
            $this->error = $e->getMessage();
            throw new Exception("No se pudo conectar a la base de datos: ");
        }
    }

    public function con()
    {
        return $this->pdo;
    }
}
