<?php
include_once '../config/db.php';

class Notification {
    private $conn, $stmt;

    public function createNotification(array $data) {
        $this->conn = Connection::connect();

        $sql = "INSERT INTO notifications (recipient_id, sender_id, type, related_id, invitation_status, message, created_at) VALUES (:ri, :si, :ty, :re, :st, :me,NOW())";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam(':ri', $data['recipient_id']);
        $this->stmt->bindParam(':si', $data['sender_id']);
        $this->stmt->bindParam(':ty', $data['type']);
        $this->stmt->bindParam(':re', $data['related_id']);
        $this->stmt->bindParam(':st', $data['invitation_status']);
        $this->stmt->bindParam(':me', $data['message']);

        if($this->stmt->execute()) {
            return true;
        }

        return false;
    }

    public function fetchNotification($userId) {
        $this->conn = Connection::connect();

        $sql = "SELECT id, type, invitation_status, message, created_at, is_read FROM notifications WHERE recipient_id = :ri ORDER BY created_at DESC";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam(":ri", $userId);

        if ($this->stmt->execute()) {
            return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        return [];
    }

    public function fetchNotificationById($notificationId) {
        $this->conn = COnnection::connect();

        $sql = "SELECT * FROM notifications WHERE id = :ni";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam(":ni", $notificationId);

        if ($this->stmt->execute()) {
            return $this->stmt->fetch(PDO::FETCH_ASSOC);
        }

        return false;
    }

    public function updateNotificationStatus($notificationId, $status) {
        $this->conn = Connection::connect();

        $sql = "UPDATE notifications SET invitation_status = :st WHERE id = :ni";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam(":st", $status);
        $this->stmt->bindParam(":ni", $notificationId);

        if ($this->stmt->execute()) {
            return true;
        }

        return false;
    }

    public function sendReply($recipientId, $senderId, $type, $relatedId, $message) {
        $this->conn = Connection::connect();

        $sql = "INSERT INTO notifications (recipient_id, sender_id, type, related_id, message, created_at) VALUES (:ri, :si, :ty, :re, :me, NOW())";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam(":ri", $recipientId);
        $this->stmt->bindParam(":si", $senderId);
        $this->stmt->bindParam(":ty", $type);
        $this->stmt->bindParam(":re", $relatedId);
        $this->stmt->bindParam(":me", $message);

        if ($this->stmt->execute()) {
            return true;
        }

        return false;
    }

    public function dropNotification($notificationId) {
        $this->conn = Connection::connect();

        $sql = "DELETE FROM notifications WHERE id = :ni";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam(":ni", $notificationId);

        if ($this->stmt->execute()) {
            return true;
        }

        return false;
    }

    public function markNorificationRead($userId) {
        $this->conn = Connection::connect();
        $isRead = true;
        $sql = "UPDATE notifications SET is_read = :ir WHERE recipient_id = :ui AND is_read = FALSE";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam(":ui", $userId);
        $this->stmt->bindParam(":ir", $isRead);

        if ($this->stmt->execute()) {
            return true;
        }

        return false;
    }
}