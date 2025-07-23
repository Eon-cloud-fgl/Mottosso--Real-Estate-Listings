<?php

class EstateModel
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    function getAllEstates($filters = [])
    {
        $query = "SELECT * FROM properties WHERE 1=1";
        $params = [];
        $type = '';

        if (!empty($filters['query'])) {
            $query .= " AND city = ?";
            $params[] = $filters['query'];
            $type .= 's';
        }

        if (!empty($filters['type'])) {
            $query .= " AND type = ?";
            $params[] = $filters['type'];
            $type .= 's';
        }

        if (!empty($filters['operation'])) {
            $query .= " AND operation = ?";
            $params[] = $filters['operation'];
            $type .= 's';
        }

        // FILTROS AVANZADOS
        if (!empty($filters['rooms'])) {
            $query .= " AND rooms >= ?";
            $params[] = $filters['rooms'];
            $type .= 'i';
        }

        if (!empty($filters['bedrooms'])) {
            $query .= " AND bedrooms >= ?";
            $params[] = $filters['bedrooms'];
            $type .= 'i';
        }

        if (!empty($filters['bathrooms'])) {
            $query .= " AND bathrooms >= ?";
            $params[] = $filters['bathrooms'];
            $type .= 'i';
        }

        if (!empty($filters['garage'])) {
            $query .= " AND garage >= ?";
            $params[] = $filters['garage'];
            $type .= 'i';
        }

        if (!empty($filters['priceMin'])) {
            $query .= " AND price >= ?";
            $params[] = $filters['priceMin'];
            $type .= 'd';
        }

        if (!empty($filters['priceMax'])) {
            $query .= " AND price <= ?";
            $params[] = $filters['priceMax'];
            $type .= 'd';
        }


        $query .= " ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);

        if (!empty($params)) {
            $stmt->bind_param($type, ...$params);
        }

        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

}
?>