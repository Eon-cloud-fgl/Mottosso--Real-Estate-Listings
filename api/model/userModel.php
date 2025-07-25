<?php 
class UserModel {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function createUser($username, $password, $email, $role) {
        $stmt = $this->conn->prepare("CALL sp_insert_user(?, ?, ?, ?)");
        if ($stmt) {
            $stmt->bind_param("ssss", $username, $password, $email, $role);
            $stmt->execute();
            $affected = $stmt->affected_rows;
            $stmt->close();
            return $affected > 0;
        } else {
            return ['error' => 'ERR_DB_CONN'];
        }
    }

    public function getUserData() {
        $stmt = $this->conn->prepare("SELECT * FROM USERS");
        if ($stmt) {
            $stmt->execute();
            $result = $stmt->get_result();
            $data = $result->fetch_all(MYSQLI_ASSOC);
            $stmt->close();
            if (empty($data)) {
                return ['error' => 'ERR_USER_NOT_FOUND'];
            }
            return $data;
        } else {
            return ['error' => 'ERR_DB_CONN'];
        }
    }

    public function getUserDataByEmail($email) {
        $stmt = $this->conn->prepare("SELECT * FROM USERS WHERE email = ?");
        if ($stmt) {
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();
            $data = $result->fetch_all(MYSQLI_ASSOC);
            $stmt->close();
            if (empty($data)) {
                return ['error' => 'ERR_USER_NOT_FOUND'];
            }
            return $data;
        } else {
            return ['error' => 'ERR_DB_CONN'];
        }
    }
}
?>