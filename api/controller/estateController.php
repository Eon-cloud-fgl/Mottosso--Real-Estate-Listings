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

        case 'getEstateByOutstanding':
            $estate = $estateModel->getEstateByOutstanding();
            echo json_encode($estate);
            break;

        case 'getNewsEstate':
            $estate = $estateModel->getNewsEstate();
            echo json_encode($estate);
            break;


        case 'getImagesById':
            if (isset($_GET['id'])) {
                $images = $estateModel->getImagesByEstateId($_GET['id']);
                echo json_encode($images);
            } else {
                echo json_encode(['error' => 'Falta el ID de la propiedad']);
            }
            break;

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

                if (isset($_FILES['main_image']) && $_FILES['main_image']['error'] === 0) {
                    $nombreArchivo = uniqid() . '_' . basename($_FILES['main_image']['name']);
                    $rutaDestino = __DIR__ . '/../upload/' . $nombreArchivo;

                    if (move_uploaded_file($_FILES['main_image']['tmp_name'], $rutaDestino)) {
                        $estateData['main_image'] = 'api/upload/' . trim($nombreArchivo);
                    } else {
                        echo json_encode(['error' => 'Error al subir la imagen']);
                        exit;
                    }
                }

                //esto se fija que la galeria de imagenes( el input que sube las imagenes no este vacio y procede )
                if (isset($_FILES['gallery_images'])) {
                    $files = $_FILES['gallery_images'];

                    for ($i = 0; $i < count($files['name']); $i++) {
                        if ($files['error'][$i] === UPLOAD_ERR_OK) {
                            $tmpName = $files['tmp_name'][$i];
                            $name = basename($files['name'][$i]);
                            $targetDir = __DIR__ . '/../upload/';
                            $uniqueName = uniqid() . '-' . $name;
                            $targetFile = $targetDir . $uniqueName;

                            if (move_uploaded_file($tmpName, $targetFile)) {
                                $imagePath = 'api/upload/' . $uniqueName;

                                $estateModel->addImage($estateId, $imagePath);
                            } else {

                                echo json_encode(['error' => 'Error al subir una imagen de la galería']);
                                exit;
                            }
                        }
                    }
                }

                $result = $estateModel->modifyEstate($estateId, $estateData);
                echo json_encode(['success' => $result === true]);
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'Datos incompletos']);
            }

            break;

        case 'addEstate':
            if (!empty($_POST['title']) && !empty($_POST['description'])) {
                $estateData = $_POST;
                unset($estateData['action']);


                if (isset($_FILES['main_image']) && $_FILES['main_image']['error'] === 0) {
                    $nombreArchivo = uniqid() . '_' . basename($_FILES['main_image']['name']);
                    $rutaDestino = __DIR__ . '/../upload/' . $nombreArchivo;

                    if (move_uploaded_file($_FILES['main_image']['tmp_name'], $rutaDestino)) {
                        $estateData['main_image'] = 'api/upload/' . trim($nombreArchivo);
                    } else {
                        echo json_encode(['error' => 'Error al subir la imagen principal']);
                        exit;
                    }
                }


                $newEstateId = $estateModel->addEstate($estateData);
                if ($newEstateId) {

                    if (isset($_FILES['gallery_images'])) {
                        $files = $_FILES['gallery_images'];

                        for ($i = 0; $i < count($files['name']); $i++) {
                            if ($files['error'][$i] === UPLOAD_ERR_OK) {
                                $tmpName = $files['tmp_name'][$i];
                                $name = basename($files['name'][$i]);
                                $targetDir = __DIR__ . '/../upload/';
                                $uniqueName = uniqid() . '-' . $name;
                                $targetFile = $targetDir . $uniqueName;

                                if (move_uploaded_file($tmpName, $targetFile)) {
                                    $imagePath = 'api/upload/' . $uniqueName;
                                    $estateModel->addImage($newEstateId, $imagePath);
                                }
                            }
                        }
                    }

                    echo json_encode([
                        'success' => true,
                        'estate_id' => $newEstateId
                    ]);
                } else {
                    echo json_encode(['error' => 'No se pudo guardar la propiedad']);
                }
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'Datos incompletos']);
            }
            break;

        case 'deleteEstate':
            if (isset($data['id'])) {
                $estateId = $data['id'];
                $result = $estateModel->deleteEstate($estateId);
                echo json_encode(['success' => $result === true]);
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'Datos incompletos']);
            }
            break;
        case 'replaceImage':
            if (isset($data["id_imagen"]) && isset($_FILES['new_image'])) {
                $imageId = $data["id_imagen"];
                $nombreArchivo = uniqid() . '_' . basename($_FILES['new_image']['name']);
                $rutaDestino = __DIR__ . '/../upload/' . $nombreArchivo;

                if (move_uploaded_file($_FILES['new_image']['tmp_name'], $rutaDestino)) {
                    $imagePath = 'api/upload/' . $nombreArchivo;
                    $result = $estateModel->updateImage($imageId, $imagePath);
                    echo json_encode(['success' => $result]);
                } else {
                    echo json_encode(['error' => 'Error al subir imagen']);
                }
            } else {
                echo json_encode(['error' => 'Faltan datos']);
            }
            break;
        case 'deleteImage':
            if (isset($data["id_imagen"])) {
                $result = $estateModel->deleteImageById($data["id_imagen"]);
                echo json_encode(['success' => $result]);
            } else {
                echo json_encode(['error' => 'ID de imagen no proporcionado']);
            }
            break;

        case 'getImagesByProperty':
            if (isset($_GET['estateId'])) {
                $images = $estateModel->getImagesByEstateId($_GET['estateId']);
                echo json_encode($images);
            } else {
                echo json_encode(['error' => 'Falta el ID de la propiedad']);
            }
            break;

        default:
            http_response_code(400);
            echo json_encode(['error' => 'Acción no válida']);
            break;

    }

} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
}


?>