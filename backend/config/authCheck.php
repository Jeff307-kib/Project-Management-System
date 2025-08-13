<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['userId'])) {
    http_response_code(401);
    echo json_encode(['error' => 'You are not logged in.']);
    exit;
}