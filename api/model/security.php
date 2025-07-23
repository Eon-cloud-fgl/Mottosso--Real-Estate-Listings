<?php
if (!isset($_SESSION['user']['id'])) {
    header("Location: ../View/login.php");
     exit();
} 
?>