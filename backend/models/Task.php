<?php
include_once '../config/db.php';

class Task {
    private $conn, $stmt;

    public function fetchTasks($workspaceId) {
        $this->conn = Connection::connect();
        $sql = "SELECT * FROM tasks WHERE workspace_id = :wid";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam(":wid", $workspaceId);
        $this->stmt->execute();
        $row = $this->stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($row) {
            return $row;
        }

        return [];
    }
}