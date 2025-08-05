<?php

class EstateModel
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    function getAllEstates($filters = [], $includeDrafts = false)
    {
        $query = "SELECT * FROM properties WHERE 1=1";
        $params = [];
        $type = '';

        if (!$includeDrafts) {
            $query .= " AND status != 'draft'"; // Excluye propiedades en borrador por defecto
        }

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
        $estates = $result->fetch_all(MYSQLI_ASSOC);
        $stmt->close();
        foreach ($estates as &$estate) {
            $propertyId = $estate['id'];

            $imgStmt = $this->conn->prepare("SELECT id AS id_imagen, image_url AS ruta_imagen FROM property_images WHERE property_id = ?");
            $imgStmt->bind_param('i', $propertyId);
            $imgStmt->execute();
            $imgResult = $imgStmt->get_result();
            $estate['property_images'] = $imgResult->fetch_all(MYSQLI_ASSOC);
            $imgStmt->close();
        }

        return $estates;
    }

    function modifyEstate($estateId, $estateData)
    {
        $query = "UPDATE properties SET ";
        $params = [];
        $type = '';

        foreach ($estateData as $key => $value) {
            if ($key !== 'Id') {
                $query .= "$key = ?, ";
                $params[] = $value;
                $type .= is_numeric($value) ? 'd' : 's'; // Determina el tipo de dato
            }
        }

        $query = rtrim($query, ', ') . " WHERE Id = ?";
        $params[] = $estateId;
        $type .= 'i'; // El ID es un entero

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param($type, ...$params);
        return $stmt->execute();
    }

    function addEstate($estateData)
    {
        $query = "INSERT INTO properties (city, type, operation, rooms, bedrooms, bathrooms, garage, price, description, address, state, title, main_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param(
            'sssiiiddsssss',
            $estateData['city'],
            $estateData['type'],
            $estateData['operation'],
            $estateData['rooms'],
            $estateData['bedrooms'],
            $estateData['bathrooms'],
            $estateData['garage'],
            $estateData['price'],
            $estateData['description'],
            $estateData['address'],
            $estateData['state'],
            $estateData['title'],
            $estateData['main_image']
        );
        if ($stmt->execute()) {
            return $this->conn->insert_id; 
        } else {
            return false;
        }
    }

    function deleteEstate($estateId)
    {
        $query = "UPDATE properties SET status = 'draft' WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param('i', $estateId);
        return $stmt->execute();

    }

    function getEstateById($estateId)
    {
        $query = "SELECT * FROM properties WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param('i', $estateId);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        return $result->fetch_assoc();
    }

    function getEstateByOutstanding()
    {
        $query = "SELECT * FROM properties WHERE status = 'outstanding' ORDER BY RAND() LIMIT 4";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    function getNewsEstate(){
        $query = "SELECT * FROM properties WHERE status = 'outstanding' OR status = 'new' OR status = 'sale' ORDER BY RAND()";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getStatusList() {
        $query = "SELECT DISTINCT status FROM properties ORDER BY status ASC";
        $result = $this->conn->query($query);

        $statusList = [];

        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $statusList[] = $row['status'];
            }
        }

        return $statusList;
    }
    function getImagesByEstateId($estateId) 
    {
        $query = "SELECT * FROM property_images WHERE property_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param('i', $estateId);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        return $result->fetch_all(MYSQLI_ASSOC);
    }
    function deleteImageById($imageId) 
    {
        $query = "DELETE FROM property_images WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param('i', $imageId);
        return $stmt->execute();
    }
    function updateImage($imageId, $imagePath) 
    {
        $query = "UPDATE property_images SET image_url = ? WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param('si', $imagePath, $imageId);
        return $stmt->execute();
    }
    function addImage($estateId, $imagePath) 
    {
        $query = "INSERT INTO property_images (property_id, image_url) VALUES (?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param('is', $estateId, $imagePath);
        return $stmt->execute();
    }

}
?>