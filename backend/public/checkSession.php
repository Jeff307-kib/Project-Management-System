<?php
include_once '../config/headers.php';
include_once '../controllers/userController.php';

$user = new UserController();
$user->checkSession();