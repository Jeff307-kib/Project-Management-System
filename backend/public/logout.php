<?php
include_once '../config/headers.php';
include_once '../controllers/userController.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $user = new UserController();
    $user->logoutUser();
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    return;
}