<?php
session_start();
include_once '../models/Notification.php';
include_once '../config/authCheck.php';
include_once '../models/Workspace.php';
include_once '../models/User.php';

class notificationController
{
    private $noti;
    private $workspace;
    private $user;

    public function __construct()
    {
        $this->noti = new Notification();
        $this->workspace = new Workspace();
        $this->user = new User();
    }

    function getNotifications()
    {
        try {
            $userId = $_GET['userId'];

            if (empty($userId)) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing User Id!']);
                return;
            }

            $notifications = $this->noti->fetchNotification($userId);
            echo json_encode([
                'success' => true,
                'message' => "Notifications fetched successfully!",
                'notifications' => $notifications,
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => "An Unexpected error occured: " . $e->getMessage()]);
        }
    }

    function acceptInvitation()
    {
        try {

            $data = json_decode(file_get_contents("php://input"), true);

            if (empty($data['notificationId'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing notification Id!']);
                return;
            }

            $notificationId = $data['notificationId'];

            $notification = $this->noti->fetchNotificationById($notificationId);

            if (!$notification || $notification['invitation_status'] !== 'Pending' || $notification['type'] !== 'Invitation') {
                http_response_code(404);
                echo json_encode(['error' => 'Invitation not found or not pending.']);
                return;
            }

            $userId = $_SESSION['userId'];
            $workspaceId = $notification['related_id'];

            $this->workspace->insertMember($userId, $workspaceId);

            $this->noti->updateNotificationStatus($notificationId, 'Accepted');

            $user = $this->user->fetchUserById($userId);
            $workspace = $this->workspace->fetchWorkspaceById($workspaceId, $userId);

            $invitationReply = "Invitation accepted! " . $user['email'] . " accepted your invitation to " . $workspace['name'] . ".";

            $this->noti->sendReply($notification['sender_id'], $userId, 'Invitation Reply', $workspaceId, $invitationReply);

            $this->noti->dropNotification($notificationId);

            http_response_code(200);
            echo json_encode([
                'success' => true,
                'message' => 'Invitation accepted! You have joined the workspace!',
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => "An Unexpected error occured: " . $e->getMessage()]);
        }
    }

    function declineInvitation()
    {
        try {
            $data = json_decode(file_get_contents("php://input"), true);

            if (empty($data['notificationId'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing Notification Id.']);
            }

            $notificationId = $data['notificationId'];

            $notification = $this->noti->fetchNotificationById($notificationId);

            if (!$notification || $notification['invitation_status'] !== 'Pending' || $notification['type'] !== 'Invitation') {
                http_response_code(404);
                echo json_encode(['error' => 'Invitation not found or not pending.']);
                return;
            }

            $this->noti->updateNotificationStatus($notificationId, 'Declined');

            $notification = $this->noti->fetchNotificationById($notificationId);
            $workspace = $this->workspace->fetchWorkspaceById($notification['related_id'], $notification['sender_id']);
            $user = $this->user->fetchUserById($notification['recipient_id']);

            $invitationReply = "Invitation Declined! " . $user['email'] . " declined your invitation to " . $workspace['name'] . " .";
            $this->noti->sendReply($notification['sender_id'], $notification['recipient_id'], 'Invitation Reply', $workspace['id'], $invitationReply);

            $this->noti->dropNotification($notificationId);

            echo json_encode([
                'success' => true,
                'message' => 'Invitation Declined!',
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Unexpected Error Occured: ' . $e->getMessage()]);
        }
    }

    function deleteNotification()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        try {
            if (empty($data['notificationId'])) {
                http_response_code(400);
                echo json_encode(['error' => "Missing Notification Id!"]);
                return;
            }

            $notificationId = $data['notificationId'];
            $this->noti->dropNotification($notificationId);

            echo json_encode([
                'success' => true,
                'message' => 'Notification successfully deleted!',
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Unexpected error occured: ' . $e->getMessage()]);
        }
    }

    function markNorificationRead() {
        $data = json_decode(file_get_contents("php://input"),true);
        if (empty($data['userId'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing User Id!']);
            return;
        }

        try {
            $userId = $data['userId'];

            $this->noti->markNorificationRead($userId);

            echo json_encode([
                'success' => true,
                'message' => 'Notifications marked as read!',
            ]);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Unexpected Error Occured: ' . $e->getMessage()]);
        }
    }

    function clearAllNotifications() {
        $data = json_decode(file_get_contents("php://input"), true);
        if (empty($data['userId'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing User Id!']);
            return;
        }

        try {
            $userId = $data['userId'];

            $this->noti->clearAllNotification($userId);
            echo json_encode([
                'success' => true,
                'message' => "Messages cleared!",
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Unexpected Error Occured: ' . $e->getMessage()]);
        }
    }
}
