<?php
include_once '../config/db.php';

class Notification {
    private $conn, $stmt;

    public function createNotification(array $data) {
        $this->conn = Connection::connect();

        $sql = "INSERT INTO notifications (recipient_id, sender_id, type, related_id, status, message, created_at) VALUES (:ri, :si, :ty, :re, :st, :me,NOW())";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam(':ri', $data['recipient_id']);
        $this->stmt->bindParam(':si', $data['sender_id']);
        $this->stmt->bindParam(':ty', $data['type']);
        $this->stmt->bindParam(':re', $data['related_id']);
        $this->stmt->bindParam(':st', $data['status']);
        $this->stmt->bindParam(':me', $data['message']);

        if($this->stmt->execute()) {
            return true;
        }

        return false;
    }

    public function fetchNotification($userId) {
        $this->conn = Connection::connect();

        $sql = "SELECT type, status, message, created_at FROM notifications WHERE recipient_id = :ri";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam(":ri", $userId);

        if ($this->stmt->execute()) {
            return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        return false;
    }
}