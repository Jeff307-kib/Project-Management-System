<?php
include_once '../config/db.php';

class Task
{
    private $conn, $stmt;

    public function fetchTasks($workspaceId)
    {
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

    public function checkDuplicate($title, $workspaceId, $taskId = null)
    {
        $this->conn = Connection::connect();

        $sql = "SELECT * FROM tasks WHERE title = :tt AND workspace_id = :wid";

        $params = [
            ":tt" => $title,
            ":wid" => $workspaceId,
        ];

        if ($taskId !== null) {
            $sql .= " AND id != :ti";
            $params[':ti'] = $taskId;
        }

        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->execute($params);
        return $this->stmt->rowCount() > 0;
    }

    public function insertTask($title, $description, $status, $dueDate, $priorityLevel, $creatorId, $workspaceId)
    {
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

    public function insertTaskAssignees($taskId, $userId)
    {
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

    public function fetchTaskAssignees($taskId)
    {
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

    public function fetchTaskById($taskId)
    {
        $this->conn = Connection::connect();

        $sql = "SELECT * FROM tasks WHERE id = :ti";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam(":ti", $taskId);
        $this->stmt->execute();
        $row = $this->stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            return $row;
        }

        return false;
    }

    public function updateTask($title, $description, $dueDate, $priorityLevel, $taskId)
    {
        $this->conn = Connection::connect();

        try {
            $this->conn->beginTransaction();

            $sql = "DELETE FROM task_assignees WHERE task_id = :ti";
            $this->stmt = $this->conn->prepare($sql);
            $this->stmt->bindParam(":ti", $taskId);
            $this->stmt->execute();

            $sql2 = "UPDATE tasks SET title = :tt, description = :de, due_date = :dd, updated_at = NOW(), priority_level = :pl WHERE id = :ti";
            $stmt2 = $this->conn->prepare($sql2);
            $stmt2->bindParam(":tt", $title);
            $stmt2->bindParam(":de", $description);
            $stmt2->bindParam(":dd", $dueDate);
            $stmt2->bindParam(":pl", $priorityLevel);
            $stmt2->bindParam(":ti", $taskId);
            $stmt2->execute();

            $this->conn->commit();
            return true;
        } catch (Exception $e) {
            $this->conn->rollBack();
            return false;
        }

        if ($this->stmt->execute()) {
            return true;
        }

        return false;
    }

    public function dropTask($taskId)
    {
        $this->conn = Connection::connect();

        try {
            $this->conn->beginTransaction();

            $sql = "DELETE FROM task_assignees WHERE task_id = :ti";
            $this->stmt = $this->conn->prepare($sql);
            $this->stmt->bindParam(":ti", $taskId);
            $this->stmt->execute();

            $sql2 = "DELETE FROM tasks WHERE id = :ti";
            $stmt2 = $this->conn->prepare($sql2);
            $stmt2->bindParam(":ti", $taskId);
            $stmt2->execute();

            $this->conn->commit();
            return true;
        } catch (Exception $e) {
            $this->conn->rollBack();
            return false;
        }
    }

    public function updateStatus($taskId, $status, $rejectionReason = null)
    {
        $this->conn = Connection::connect();

        $sql = "UPDATE tasks 
                SET status = :st, rejection_reason = :rs 
                WHERE id = :ti";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam(":rs", $rejectionReason);
        $this->stmt->bindParam(":st", $status);
        $this->stmt->bindParam(":ti", $taskId);

        if ($this->stmt->execute()) {
            return true;
        }

        return false;
    }


    public function insertAttachment($taskId, $userId, $fileName, $fileType, $fileSize, $filepath)
    {
        $this->conn = Connection::connect();

        $sql = "INSERT INTO attachments (task_id, uploaded_by, file_name, file_type, file_size, file_path, uploaded_at) VALUES (:ti, :ub, :fn, :ft, :fs, :fp, NOW())";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam(":ti", $taskId);
        $this->stmt->bindParam(":ub", $userId);
        $this->stmt->bindParam(":fn", $fileName);
        $this->stmt->bindParam(":ft", $fileType);
        $this->stmt->bindParam(":fs", $fileSize);
        $this->stmt->bindParam(":fp", $filepath);

        if ($this->stmt->execute()) {
            return true;
        }

        return false;
    }

    public function fetchAttachment($taskId)
    {
        $this->conn = Connection::connect();

        $sql = "SELECT * FROM attachments WHERE task_id = :ti";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam(":ti", $taskId);
        $this->stmt->execute();
        $row = $this->stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($row) {
            return $row;
        }

        return [];
    }

    public function insertComment($taskId, $userId, $commentText)
    {
        $this->conn = Connection::connect();

        $sql = "INSERT INTO comments (task_id, created_by, comment_text, created_at, updated_at) VALUES (:ti, :cb, :ct, NOW(), NOW())";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam(":ti", $taskId);
        $this->stmt->bindParam(":cb", $userId);
        $this->stmt->bindParam(":ct", $commentText);

        if ($this->stmt->execute()) {
            return true;
        }

        return false;
    }

    public function fetchComments($taskId)
    {
        $this->conn = Connection::connect();

        $sql = "SELECT id, task_id, created_by, comment_text, updated_at FROM comments WHERE task_id = :ti";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam(":ti", $taskId);
        $this->stmt->execute();
        $row = $this->stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($row) {
            return $row;
        }

        return [];
    }

    public function fetchUserTasks($userId) {
        $this->conn = Connection::connect();

        $sql = "
            SELECT * FROM tasks t
            JOIN task_assignees ta ON ta.task_id = t.id
            WHERE ta.user_id = :ui
        ";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam(":ui", $userId);
        $this->stmt->execute();
        $row = $this->stmt->fetchALL(PDO::FETCH_ASSOC);

        if ($row) {
            return $row;
        }

        return[];
    }
}
