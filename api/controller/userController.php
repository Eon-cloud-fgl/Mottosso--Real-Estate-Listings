<?php
require_once '../model/userModel.php';
require_once '../model/connection.php';
//errorCodes.php es para el manejo de exepciones
$errorCodes = require_once '../model/errorCodes.php';

$user = new UserModel($conn);

header('Content-Type: application/json');

//tipo de metodo server
$method = $_SERVER['REQUEST_METHOD'];

switch($method){
    case "POST":
    $raw = file_get_contents('php://input');
    $datos = json_decode($raw, true);

    if (!$datos || !is_array($datos)) {
        $error = $errorCodes['ERR_EMPTY'];
        http_response_code(400);
        echo json_encode([
            'status' =>  $error['status'],
            'error_code' => $error['code'],
            'error' => $error['message']
        ]);
        exit;
    }
    //la variable que se carga con los datos del input hidden
    $action = $datos['action'] ?? '';

        switch($action){
            case "LoginForm":
                //declarar variables y cargarlas con sus respectivos datos
                $name = htmlspecialchars(trim($datos['name'] ?? ''));
                $email = filter_var(trim($datos['email'] ?? ''), FILTER_SANITIZE_EMAIL);
                $password = $datos['password'] ?? '';
                $repeatpassword = $datos['repeatpassword'] ?? '';
                $rememberme = $datos['rememberme'] ?? false;
                //validaciones
                if (empty($name) || empty($email) || empty($password) || empty($repeatpassword)) {
                    $error = $errorCodes['ERR_EMPTY_INPUTS'];
                    http_response_code(400);
                    echo json_encode([
                        'error_code' => $error['code'],
                        'error' => $error['message']
                    ]);
                    exit;
                }
                if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    $error = $errorCodes['ERR_INVALID_EMAIL'];
                    http_response_code(400);
                    echo json_encode([
                        'error_code' => $error['code'],
                        'error' => $error['message']
                    ]);
                    exit;
                }
                if ($password !== $repeatpassword) {
                    $error = $errorCodes['ERR_NOT_EQUAL_PASSWORD'];
                    http_response_code(400);
                    echo json_encode([
                        'error_code' => $error['code'],
                        'error' => $error['message']
                    ]);
                    exit;
                }
                $data_user = $user->getUserDataByEmail($email);
                if (isset($data_user['error'])) {
                    $error = $errorCodes[$data_user['error']];
                    http_response_code(400);
                    echo json_encode([
                        'error_code' => $error['code'],
                        'error' => $error['message']
                    ]);
                    exit;
                }
                $db_password = $data_user[0]["password"];
                if (!password_verify($password, $db_password)) {
                $error = $errorCodes['ERR_INVALID_PASSWORD'];
                http_response_code(400);
                echo json_encode([
                    'error_code' => $error['code'],
                    'error' => $error['message']
                ]);
                exit;
                }
                //setear las cookies
                if ($rememberme) {
                $lifetime = 7 * 24 * 60 * 60; 
                session_set_cookie_params([
                    'lifetime' => $lifetime,
                    'path' => '/',
                    'secure' => false,   
                    'httponly' => true,
                    'samesite' => 'Lax'
                ]);
                }
                //empezar la session
                session_start();

                $_SESSION['usuario'] = [
                    "id" => $data_user[0]['id'],
                    "nombre" => $data_user[0]['name'],
                    "email" => $email,
                    "id_rol" => $data_user[0]['rol']
                ];
                //mensaje success si todo procede correctamente
                echo json_encode([
                'success' => $errorCodes['success'],
                'user' => [
                    'id' => $_SESSION['usuario']['id'],
                    'name' => $_SESSION['usuario']['nombre']
                ]
            ]);
            break;
            case "formulario2":
            //otro formulario
            break;

            default :
            //caso por si no existe el form
            echo json_encode(['error' => 'opcion incorrecta']);
            break;
        }
    break;
    case "GET":
    //formularios tipo GET
    break;
    //por si recibe otro tipo que no esta
    default:
    http_response_code(405); 
    echo json_encode(['error' => 'Método HTTP no permitido']);
    break;
}

?>