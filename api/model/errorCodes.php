<?php
//errores
return [
    'ERR_DB_CONN' => [ 'status' => 'error', 'code' => 1001, 'message' => 'Error de conexión a la base de datos'],
    'ERR_USER_NOT_FOUND' => ['status' => 'error','code' => 1002, 'message' => 'Usuario no encontrado'],
    'ERR_INVALID_PASSWORD' => ['status' => 'error','code' => 1003, 'message' => 'Contraseña incorrecta'],
    'ERR_EMAIL_EXISTS' => ['status' => 'error','code' => 1004, 'message' => 'El correo ya está registrado'],
    'ERR_NOT_EQUAL_PASSWORD' => ['status' => 'error','code' => 1005, 'message' => 'Las Contraseñas no coinciden'],
    'ERR_INVALID_EMAIL' => ['status' => 'error','code' => 1006, 'message' => 'Correo invalido'],
    'ERR_EMPTY_INPUTS' => ['status' => 'error','code' => 1007, 'message' => 'Debes completar todos los campos'],
    'ERR_EMPTY' => ['status' => 'error','code' => 1007, 'message' => 'Campos vacios'],
    'SUCCESS' => ['status' => 'success','code' => 1008, 'message' => 'La operacion se ha realizado correctamente'],
];
?>