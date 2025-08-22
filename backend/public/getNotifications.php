<?php
include_once '../config/headers.php';
include_once '../controllers/notificationController.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {  
    $workspace = new notificationController();
    $workspace->getNotifications();
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
}