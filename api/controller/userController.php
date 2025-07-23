<?php
require_once __DIR__ . '/cors.php'; 
require_once '../model/userModel.php';
require_once '../model/connection.php';
$errorCodes = require_once '../model/errorCodes.php';

$user = new UserModel($conn);

header('Content-Type: application/json');

// Funcion reutilizable para enviar errores
function sendError($codeKey, $errorCodes) {
    if (!isset($errorCodes[$codeKey])) {
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'code' => 9999,
            'message' => 'Error interno desconocido'
        ]);
        exit;
    }
    $error = $errorCodes[$codeKey];
    http_response_code(400); 
    echo json_encode($error);
    exit;
}

// Funcion para enviar exito
function sendSuccess($codeKey, $errorCodes) {
    $success = $errorCodes[$codeKey] ?? [
        'status' => 'success',
        'code' => 200,
        'message' => 'Operación exitosa'
    ];
    echo json_encode($success);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

switch($method){
    case "POST":
        $raw = file_get_contents('php://input');
        $datos = json_decode($raw, true);

        if (!$datos || !is_array($datos)) {
            sendError('ERR_EMPTY', $errorCodes);
        }

        $action = $datos['action'] ?? '';

        switch($action){
            case "LoginForm":
                $name = htmlspecialchars(trim($datos['name'] ?? ''));
                $email = filter_var(trim($datos['email'] ?? ''), FILTER_SANITIZE_EMAIL);
                $password = $datos['password'] ?? '';
                $rememberme = $datos['rememberme'] ?? false;

                if (empty($name) || empty($email) || empty($password)) {
                    sendError('ERR_EMPTY_INPUTS', $errorCodes);
                }

                if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    sendError('ERR_INVALID_EMAIL', $errorCodes);
                }

                $data_user = $user->getUserDataByEmail($email);

                if (isset($data_user['error'])) {
                    sendError($data_user['error'], $errorCodes); 
                }

                $db_password = $data_user[0]["password"] ?? null;

                if (!$db_password || !password_verify($password, $db_password)) {
                    sendError('ERR_INVALID_PASSWORD', $errorCodes);
                }

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

                session_start();

                $_SESSION['user'] = [
                    "id" => $data_user[0]['id'],
                    "name" => $data_user[0]['name'],
                    "email" => $email,
                    "id_rol" => $data_user[0]['rol']
                ];

                sendSuccess('SUCCESS', $errorCodes);
                break;

            case "formulario2":
                // otro formulario
                break;

            default:
                echo json_encode([
                    'status' => 'error',
                    'code' => 9999,
                    'message' => 'Opción incorrecta'
                ]);
                break;
        }
        break;

    case "GET":
        // otros formularios tipo GET
        break;

    default:
        http_response_code(405);
        echo json_encode([
            'status' => 'error',
            'code' => 9998,
            'message' => 'Método HTTP no permitido'
        ]);
        break;
}
?>