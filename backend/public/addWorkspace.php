<?php
include_once '../config/headers.php';
include_once '../controllers/workspaceController.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $workspace = new workspaceController();
    $workspace->addWorkspace();
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}