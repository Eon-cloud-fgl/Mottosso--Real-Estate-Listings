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
                                <style>
                                    body {
                                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                                        background-color: #f5f5f5;
                                        margin: 0;
                                        padding: 2rem;
                                        color: #333;
                                    }

                                    .container {
                                        max-width: 600px;
                                        margin: 0 auto;
                                        background-color: #ffffff;
                                        padding: 2rem;
                                        border-radius: 8px;
                                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                                    }

                                    .header {
                                        text-align: center;
                                        margin-bottom: 2rem;
                                    }

                                    .header h2 {
                                        color: #1c77bc;
                                        margin: 0;
                                    }

                                    .content {
                                        font-size: 1rem;
                                        line-height: 1.6;
                                    }

                                    .footer {
                                        margin-top: 2rem;
                                        font-size: 0.9rem;
                                        text-align: center;
                                        color: #888;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class='container'>
                                    <div class='header'>
                                        <h2>¡Hemos recibido tu solicitud!</h2>
                                    </div>
                                    <div class='content'>
                                        <p>Hola,</p>
                                        <p>Gracias por confiar en nosotros. Hemos registrado correctamente tu pedido de tasación. Nuestro equipo lo revisará y se pondrá en contacto contigo a la brevedad para brindarte una respuesta personalizada.</p>
                                        <p>No responder a este correo.</p>
                                        <p>Saludos cordiales,</p>
                                        <p><strong>El equipo de MOTTOSO propiedades</strong></p>
                                    </div>
                                    <div class='footer'>
                                        Este es un mensaje automático. Por favor, no respondas a este correo si no se indica lo contrario.
                                    </div>
                                </div>
                            </body>
                        </html>
                    ";

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
    }

}
?>