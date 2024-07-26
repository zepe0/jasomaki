<?php
require_once 'Db.php';
class User extends Db
{

    protected function setUser($username, $password, $email)
    {
        $error = false;
        $stmt = $this->con()->prepare("INSERT INTO users (users_uid, users_pwd, users_email) VALUES (?,?,?)");

        $hashedPwd = password_hash($password, PASSWORD_DEFAULT);

        if (!$stmt->execute(array($username, $hashedPwd, $email))) {
            $error = true;
        }
        $stmt = null;
        return $error;

    }


    protected function checkUser($username, $email)
    {
        $stmt = $this->con()->prepare("SELECT users_uid FROM users WHERE users_uid = ? OR users_email = ?;");

        if (!$stmt->execute(array($username, $email))) {
            $stmt = null;
            header("Location: .../view/signup.html?error=stmtfailed");
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
        $stmt = $this->con()->prepare("SELECT * FROM users ");
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

        $stmt = $this->con()->prepare(" SELECT users_email FROM users  WHERE users_uid = ? ");

        $res = $stmt->execute(array($user));
        if (!$res) {
            return 1;
        } else {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

    }



}
