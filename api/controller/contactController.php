<?php
require_once __DIR__ . '/cors.php';
session_start();
require_once '../Model/connection.php';
// require_once '../Model/contactModel.php';

require __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$envPath = dirname(__DIR__, 2) . '/.env';


if (file_exists($envPath)) {
    $envVars = parse_ini_file($envPath);

    if ($envVars === false) {
        die(json_encode(['error' => 'No se pudo parsear el archivo .env']));
    }
} else {
    die(json_encode(['error' => 'Archivo .env no encontrado']));
}


header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
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
        case 'appraisalsMail':
            if (isset($data['email'])) {
                $email = $data['email'];

                $mail = new PHPMailer(true);

                try {
                    // Configuración del servidor SMTP
                    $mail->isSMTP();
                    $mail->Host = 'smtp.gmail.com';
                    $mail->SMTPAuth = true;
                    $mail->Username = $envVars['SMTP_MAIL'];
                    $mail->Password = $envVars['SMTP_PASSWORD'];
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Habilitar STARTTLS
                    $mail->Port = 587; // Puerto SMTP para STARTTLS

                    $mail->setFrom($envVars['SMTP_MAIL'], 'MOTTOSO Propiedades');
                    $mail->addAddress($email, $username);

                    // Contenido del correo
                    $mail->isHTML(true);
                    $mail->Subject = 'Verificacion de pedido de Tasacion - MOTTOSO Propiedades';
                    $mail->Body = "
                                    <html>
                                        <head>
                                        <meta charset='UTF-8'>
                                    <style>
                                        .content p{
                                        color:black;
                                        }
                                        body {
                                        background-color: #f4f4f4;
                                        font-family: 'Roboto', sans-serif;
                                        margin: 0;
                                        padding: 0;
                                        }
                                        .container {
                                        max-width: 600px;
                                        margin: 30px auto;
                                        background-color: #fff;
                                        border-radius: 8px;
                                        overflow: hidden;
                                        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
                                        padding: 30px;
                                        color: #333;
                                        border: 1px solid #D3D3D3;
                                        border-radius:14px;
                                        }
                                        .header {
                                        background-color: #ffffff;
                                        text-align: center;
                                        padding: 20px 0 10px;
                                        border-bottom: 1px solid #eee;
                                        }
                                        .header img {
                                        max-height: 60px;
                                        }
                                        .content h2 {
                                        color: #1a73e8;
                                        margin-top: 0;
                                        font-size: 24px;
                                        margin-bottom: 20px;
                                        }
                                        .content p {
                                        font-size: 16px;
                                        line-height: 1.6;
                                        margin: 10px 0;
                                        color:black;
                                        }
                                        .footer {
                                        background-color: #ffffffff;
                                        text-align: center;
                                        font-size: 12px;
                                        padding: 20px;
                                        color: #888;
                                        justify-content: center;
                                        }
                                        .content{
                                        text-align:center;
                                        }
                                        #titule{
                                        font-weight:normal;
                                        }
                                    </style>
                                        </head>
                                        <body>
                                        <div class='container'>
                                            <div class='header'>
                                            <img src='http://localhost/Mottosso--Real-Estate-Listings/public/MottosoLogoPuro.png' alt='Mottoso Logo' />
                                            </div>
                                            <h2 id='title'>¡Gracias por tu solicitud!</h2>
                                            <div class='content'>
                                            <p>Hola,</p>
                                            <p>Recibimos tu pedido de tasación correctamente. Nuestro equipo lo revisará y se pondrá en contacto contigo a la brevedad con una respuesta personalizada.</p>
                                            <p>Este mensaje es automático. No es necesario que respondas.</p>
                                            <p>Saludos cordiales,<br><strong>El equipo de MOTTOSO Propiedades</strong></p>
                                            </div>
                                            <div class='footer'>
                                            Este correo ha sido enviado automáticamente. Por favor, no respondas a este mensaje. <br>
                                            © 2025 Mottoso. Todos los derechos reservados.
                                            </div>
                                        </div>
                                        </body>
                                        </html>";

                    $mail->AltBody = "Hemos recibido tu pedido de tasación. Pronto nos pondremos en contacto contigo.";


                    $mail->send();

                    echo json_encode(['success' => true, 'message' => 'Correo enviado correctamente']);
                    http_response_code(200); // Establece el código de estado HTTP a 200git

                    exit();
                } catch (Exception $e) {
                    echo json_encode(['error' => 'Error al enviar el correo de verificación: ' . $mail->ErrorInfo]);
                    http_response_code(500); // Establece el código de estado HTTP a 500
                    exit();
                }

                // // Simulación de éxito
                // echo json_encode(['success' => true, 'message' => 'Correo enviado correctamente']);

            } else {
                http_response_code(400);
                echo json_encode(['error' => 'Datos incompletos']);
            }
            break;
            case 'FormContacto':
            $nombre = $data['name'] ?? '';
            $email = $data['email'] ?? '';
            $telefono = $data['phone'] ?? '';
            $direccion = $data['address'] ?? '';
            $tipoConsulta = $data['typeofq'] ?? '';
            $mensaje = $data['message'] ?? '';

            $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = $envVars['SMTP_MAIL'];
            $mail->Password = $envVars['SMTP_PASSWORD'];
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            $mail->setFrom($email, $nombre);
            $mail->addAddress('correoprueba@gmail.com');
            $mail->Subject = 'Nuevo mensaje desde el formulario de contacto';
            $mail->Body = $mail->Body = "
                                    <html>
                                    <head>
                                    <meta charset='UTF-8'>
                                    <style>
                                        .content p{
                                        color:black;
                                        }
                                        body {
                                        background-color: #f4f4f4;
                                        font-family: 'Roboto', sans-serif;
                                        margin: 0;
                                        padding: 0;
                                        }
                                        .container {
                                        max-width: 600px;
                                        margin: 30px auto;
                                        background-color: #fff;
                                        border-radius: 8px;
                                        overflow: hidden;
                                        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
                                        padding: 30px;
                                        color: #333;
                                        border: 1px solid #D3D3D3;
                                        border-radius:14px;
                                        }
                                        .header {
                                        background-color: #ffffff;
                                        text-align: center;
                                        padding: 20px 0 10px;
                                        border-bottom: 1px solid #eee;
                                        }
                                        .header img {
                                        max-height: 60px;
                                        }
                                        .content h2 {
                                        color: #1a73e8;
                                        margin-top: 0;
                                        font-size: 24px;
                                        margin-bottom: 20px;
                                        }
                                        .content p {
                                        font-size: 16px;
                                        line-height: 1.6;
                                        margin: 10px 0;
                                        }
                                        .footer {
                                        background-color: #ffffffff;
                                        text-align: center;
                                        font-size: 12px;
                                        padding: 20px;
                                        color: #888;
                                        justify-content: center;
                                        }
                                        #descripcion{
                                        text-align:center;
                                        color:#D3D3D3;
                                        }
                                        #titule{
                                        font-weight:normal;
                                        }
                                    </style>
                                    </head>
                                    <body>
                                    <div class='container'>
                                        <div class='header'>
                                        <img src='http://localhost/Mottosso--Real-Estate-Listings/public/MottosoLogoPuro.png' alt='Mottoso Logo' />
                                        <h1 id='titule'>Consulta por $nombre</h1>
                                        </div>
                                        <div class='content'>
                                        <p id='descripcion'>Este mensaje a sido enviado por un usuario</p>
                                        <p><strong>Nombre:</strong> $nombre</p>
                                        <p><strong>Email:</strong> $email</p>
                                        <p><strong>Teléfono:</strong> $telefono</p>
                                        <p><strong>Dirección:</strong> $direccion</p>
                                        <p><strong>Tipo de consulta:</strong> $tipoConsulta</p>
                                        <p><strong>Mensaje:</strong><br>$mensaje</p>
                                        </div>
                                    </div>
                                        <div class='footer'>
                                        Este correo ha sido enviado automáticamente. Por favor, no respondas a este mensaje. <br>
                                        © 2025 Mottoso. Todos los derechos reservados.
                                        </div>
                                    </body>
                                    </html>";

            $mail->AltBody = "Mensaje de consulta enviado por un usuario.";

            $mail->send();

            echo json_encode(['success' => true, 'message' => 'Consulta enviada correctamente']);
            http_response_code(200);
    }   catch (Exception $e) {
            echo json_encode(['error' => 'Error al enviar el correo: ' . $mail->ErrorInfo]);
            http_response_code(500);
    }
    exit();
    }

}
      


?>
