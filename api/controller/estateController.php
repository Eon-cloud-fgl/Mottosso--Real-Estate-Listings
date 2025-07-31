<?php
require_once __DIR__ . '/cors.php';
session_start();
require_once '../Model/connection.php';
require_once '../Model/estateModel.php';

// if (!isset($_SESSION['user_id'])) {
//     header("Location: ../View/login.php");
//     exit();
// } // Esto asegura que el usuario esté autenticado antes de acceder a las funciones del controlador.

header('Content-Type: application/json'); // Establece el tipo de contenido a JSON para la respuesta.

$estateModel = new EstateModel($conn); // Crea una instancia del modelo de propiedades con la conexión a la base de datos.
// $userId = $_SESSION['user_id']; // Obtiene el ID del usuario autenticado desde la sesión.

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $data = json_decode(file_get_contents('php://input'), true);
    $action = isset($data['action']) ? $data['action'] : (isset($_GET['action']) ? $_GET['action'] : '');

    switch ($action) {
        case 'getAllEstates':
            $filters = [
                'query' => isset($_GET['query']) ? $_GET['query'] : '',
                'type' => isset($_GET['type']) ? $_GET['type'] : '',
                'operation' => isset($_GET['operation']) ? $_GET['operation'] : '',

                // FILTROS AVANZADOS
                'rooms' => $_GET['rooms'] ?? '',
                'bedrooms' => $_GET['bedrooms'] ?? '',
                'bathrooms' => $_GET['bathrooms'] ?? '',
                'garage' => $_GET['garage'] ?? '',
                'priceMin' => $_GET['priceMin'] ?? '',
                'priceMax' => $_GET['priceMax'] ?? ''
            ];

            $estates = $estateModel->getAllEstates($filters, true); // Llama al método del modelo para obtener todas las propiedades, incluyendo draft.
            echo json_encode($estates); // Devuelve las propiedades en formato JSON.
            break;

        case 'getPublishedEstates':
            $filters = [
                'query' => isset($_GET['query']) ? $_GET['query'] : '',
                'type' => isset($_GET['type']) ? $_GET['type'] : '',
                'operation' => isset($_GET['operation']) ? $_GET['operation'] : '',

                // FILTROS AVANZADOS
                'rooms' => $_GET['rooms'] ?? '',
                'bedrooms' => $_GET['bedrooms'] ?? '',
                'bathrooms' => $_GET['bathrooms'] ?? '',
                'garage' => $_GET['garage'] ?? '',
                'priceMin' => $_GET['priceMin'] ?? '',
                'priceMax' => $_GET['priceMax'] ?? ''
            ];

            $estates = $estateModel->getAllEstates($filters); // Llama al método del modelo para obtener todas las propiedades.
            echo json_encode($estates); // Devuelve las propiedades en formato JSON.
            break;

        case 'getProperty':
            if (isset($_GET['id'])) {
                $estateId = $_GET['id'];
                $estate = $estateModel->getEstateById($estateId); // Llama al método del modelo para obtener una propiedad por su ID.
                echo json_encode($estate); // Devuelve la propiedad en formato JSON.
                break;
            } else {
                http_response_code(400); // Establece el código de estado HTTP a 400 si falta el ID.
                echo json_encode(['error' => 'ID de propiedad no proporcionado']); // Envía un mensaje de error indicando que falta el ID.
                break;
            }
            
        default:
            http_response_code(400); // Establece el código de estado HTTP a 400 si la acción no es válida.
            echo json_encode(['error' => 'Acción no válida']); // Envía un mensaje de error indicando que la acción no es válida.
            break;
    }




} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data) {
        $data = $_POST;

        // Si viene como string JSON en estateData, lo decodificamos
        if (isset($data['estateData']) && is_string($data['estateData'])) {
            $data['estateData'] = json_decode($data['estateData'], true);
        }
    }

    $action = $data['action'] ?? '';

    switch ($action) {
        case 'modifyEstate':
            if (isset($data['id'])) {
                $estateId = $data['id'];
                $estateData = $_POST;
                unset($estateData['action'], $estateData['id']);

                $result = $estateModel->modifyEstate($estateId, $estateData); // Llama al método del modelo para modificar una propiedad.
                echo json_encode(['success' => $result === true]);
            } else {
                http_response_code(400); // Establece el código de estado HTTP a 400 si faltan datos.
                echo json_encode(['error' => 'Datos incompletos']); // Envía un mensaje de error indicando que los datos están incompletos.
            }

            break;

        case 'addEstate':
            if (!empty($_POST['title']) && !empty($_POST['description'])) { // Verifica que los campos necesarios estén presentes.
                $estateData = $_POST;
                unset($estateData['action']); // Eliminar campos que no son necesarios para la inserción.
                $result = $estateModel->addEstate($estateData);
                echo json_encode(['success' => $result === true]);
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'Datos incompletos']);
            }
            break;

        case 'deleteEstate':
            if (isset($data['id'])) {
                $estateId = $data['id'];
                $result = $estateModel->deleteEstate($estateId); // Llama al método del modelo para eliminar una propiedad.
                echo json_encode(['success' => $result === true]);
            } else {
                http_response_code(400); // Establece el código de estado HTTP a 400 si faltan datos.
                echo json_encode(['error' => 'Datos incompletos']); // Envía un mensaje de error indicando que los datos están incompletos.
            }
            break;


        default:
            http_response_code(400); // Establece el código de estado HTTP a 400 si la acción no es válida.
            echo json_encode(['error' => 'Acción no válida']); // Envía un mensaje de error indicando que la acción no es válida.
            break;
    }

} else {
    http_response_code(405); // Establece el código de estado HTTP a 405 si el método no está permitido.
    echo json_encode(['error' => 'Método no permitido']); // Envía un mensaje de error indicando que el método no está permitido.
}


?>