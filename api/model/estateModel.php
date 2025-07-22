<?php 

class EstateModel{
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    function getAllEstates() {
        $query = "SELECT * FROM properties ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

}
?>