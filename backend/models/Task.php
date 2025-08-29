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

    public function checkDuplicate($title, $workspaceId, $taskId = null) {
        $this->conn = Connection::connect();

        $sql = "SELECT * FROM tasks WHERE title = :tt AND workspace_id = :wid";
        
        $params = [
            ":tt" => $title,
            ":wid" => $workspaceId,
        ];

        if($taskId !== null) {
            $sql .= " AND id != :ti";
            $params[':ti'] = $taskId;
        }

        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->execute($params);
        return $this->stmt->rowCount() > 0;
    }

    public function insertTask($title, $description, $status, $dueDate, $priorityLevel, $creatorId, $workspaceId) {
        $this->conn = Connection::connect();

        $sql = "
            INSERT INTO tasks 
            (title, description, status, due_date, created_at, updated_at, priority_level, created_by, workspace_id) 
            VALUES 
            (:tt, :de, :st, :dd, NOW(), NOW(), :pl, :cb, :wi)
        ";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam(":tt", $title);
        $this->stmt->bindParam(":de", $description);
        $this->stmt->bindParam(":st", $status);
        $this->stmt->bindParam(":dd", $dueDate);
        $this->stmt->bindParam(":pl", $priorityLevel);
        $this->stmt->bindParam(":cb", $creatorId);
        $this->stmt->bindParam(":wi", $workspaceId);

        if ($this->stmt->execute()) {
            return $this->conn->lastInsertId();
        }

        return false;
    }

    public function insertTaskAssignees($taskId, $userId) {
        $this->conn = Connection::connect();

        $sql = "INSERT INTO task_assignees  (task_id, user_id) VALUES (:ti, :ui)";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam(":ti", $taskId);
        $this->stmt->bindParam(":ui", $userId);

        if ($this->stmt->execute()) {
            return true;
        }

        return false;
    }

    public function fetchTaskAssignees($taskId) {
        $this->conn = Connection::connect();

        $sql = "SELECT user_id FROM task_assignees WHERE task_id = :ti";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam(":ti", $taskId);
        $this->stmt->execute();
        $row = $this->stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($row) {
            return $row;
        }

        return [];
    }
}