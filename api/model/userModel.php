<?php 

class UserModel{
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

}
?>