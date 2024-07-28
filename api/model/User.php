<?php
require_once 'Db.php';
function generateUID()
{

    return uniqid(bin2hex(random_bytes(4)), true);
}
class User extends Db
{

    protected function setUser($email, $password)
    {
        $response = [];
        $id = generateUID();

        try {
            $stmt = $this->con()->prepare("INSERT INTO user (id, pass, email) VALUES (?,?,?)");

            if (!$stmt->execute(array($id, $password, $email))) {
                $response['error'] = "Error al ejecutar la consulta.";
            } else {
                require_once '../createtoken.php';
                $payload['id'] = $id;
                $payload['email'] = $email;
                $token = createJwt($payload);
                $response['success'] = "Usuario registrado con éxito.";
                $response['token'] = $token;
            }
        } catch (PDOException $e) {
            if ($e->getCode() == 23000 && strpos($e->getMessage(), '1062') !== false) {
                $response['error'] = "El correo electrónico ya está registrado.";
            } else {
                $response['error'] = "Error en la base de datos: " . $e->getMessage();
            }
        }

        $stmt = null;
        return $response;
    }


    protected function checkUser($userid, $email)
    {
      
        $stmt = $this->con()->prepare("SELECT id FROM users WHERE users_uid = ? OR users_email = ?;");

        if (!$stmt->execute(array($userid, $email))) {
            $stmt = null;
           
            exit();
        }
        $resultCheck = false;
        if ($stmt->rowCount() > 0) {
            $resultCheck = true;
        }

        return $resultCheck;
    }

    protected function verifyLoginUser($username, $password)
    {
        $error = 0;
        $stmt = $this->con()->prepare("SELECT users_pwd,users_id from users WHERE users_uid = ? ");

        if (!$stmt->execute(array($username))) {
            $error = 1;
        }

        if ($stmt->rowCount() > 0) {
            $res = $stmt->fetchAll();
            $hashedPwd = $res[0]['users_pwd'];
            if (password_verify($password, $hashedPwd) == false) {
                $error = 2;
            } else {
                print_r($res);
                $_SESSION['userid'] = $res[0]['users_id'];
                $_SESSION["username"] = $username;
            }
        } else {
            $error = 2;
        }
        $stmt = null;
        return $error;

    }
    protected function UpdatePass($userid, $password)
    {
        $error = 0;

        $stmt = $this->con()->prepare(" UPDATE users SET users_pwd = ? WHERE users_id  = ? ");

        if (!$stmt->execute()) {
            $error = 1;
        }

        if ($stmt->rowCount() > 0) {
            echo "echo";
        } else {
            $error = 2;
        }
        $stmt = null;
        return $error;

    }
    public function getUsers()
    {
        $stmt = $this->con()->prepare("SELECT * FROM user ");
        $res = $stmt->execute();
        if (!$res) {
            return 1;
        } else {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

    }
    public function setToken($token, $email)
    {
        $error = 0;

        $stmt = $this->con()->prepare(" UPDATE users SET token=? WHERE users_email = ? ");

        if (!$stmt->execute(array($token, $email))) {
            $error = 1;
        }

        if ($stmt->rowCount() > 0) {
            return $error;
        } else {
            $error = 2;
        }
        $stmt = null;
        return $error;

    }

    public function getEmail($user)
    {

        $stmt = $this->con()->prepare(" SELECT email FROM users  WHERE users_uid = ? ");

        $res = $stmt->execute(array($user));
        if (!$res) {
            return 1;
        } else {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

    }
    public function setNewUser($email, $pas)
    {
        return $this->setUser($email, $pas);
    }



}
