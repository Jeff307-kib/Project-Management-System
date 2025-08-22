<?php
session_start();
include_once '../models/Notification.php';
include_once '../config/authCheck.php';

class notificationController {
    private $noti;

    public function __construct()
    {
        $this->noti = new Notification();
    }

    function getNotifications() {
        try {
            $userId = $_SESSION['userId'];

            $notifications = $this->noti->fetchNotification($userId);
            if ($notifications) {
                echo json_encode([
                    'success' => true,
                    'message' => "Notifications fetched successfully!",
                    'notifications' => $notifications,
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => "An Unexpected error occured: " . $e->getMessage()]);
        }
    }
}