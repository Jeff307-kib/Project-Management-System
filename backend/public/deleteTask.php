<?php
include_once '../config/headers.php';
include_once '../controllers/taskController.php';

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $task = new taskController();
    $task->deleteTask();
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}