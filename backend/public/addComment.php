<?php
include_once('../config/headers.php');
include_once('../controllers/taskController.php');

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $task = new taskController();
    $task->addComment();
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}