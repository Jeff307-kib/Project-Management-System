    <?php
    include_once '../config/db.php';

    class Workspace
    {
        private $conn, $stmt;

        public function fetchWorkspaces($userId)
        {
            $this->conn = Connection::connect();
            $sql = "
                    SELECT w.id, w.name, w.created_at, w.description
                    FROM workspaces w
                    JOIN user_workspace uw ON w.id = uw.workspace_id
                    WHERE uw.user_id = ?
            ";
            $this->stmt = $this->conn->prepare($sql);

            if ($this->stmt->execute([$userId])) {
                return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
            }

            return [];
        }

        public function insertWorkspace($userId, $name, $description)
        {
            $this->conn = Connection::connect();
            $sql = "
                    INSERT INTO Workspaces (name, created_by, created_at, updated_at, description) VALUES (:na, :cb, NOW(), NOW(), :de)
            ";
            $this->stmt = $this->conn->prepare($sql);
            $this->stmt->bindParam(":na", $name);
            $this->stmt->bindParam(":cb", $userId);
            $this->stmt->bindParam(":de", $description);

            if ($this->stmt->execute()) {
                $workspaceId = $this->conn->lastInsertId();

                $sqlPivot = "INSERT INTO user_workspace (user_id, workspace_id, role, joined_at) VALUES (:uid, :wid, 'admin', NOW())";
                $stmtPivot = $this->conn->prepare($sqlPivot);
                $stmtPivot->bindParam(":uid", $userId);
                $stmtPivot->bindParam(":wid", $workspaceId);
                $stmtPivot->execute();

                return true;
            }

            return false;
        }

        public function checkDuplicate($name, $userId, $excludeId = null)
        {
            $this->conn = Connection::connect();
            $sql = "SELECT id FROM workspaces WHERE created_by = :ui AND name = :na";

            $params = [
                ":ui" => $userId,
                ":na" => $name,
            ];

            if ($excludeId !== null) {
                $sql .= " AND id != :ei";
                $params[':ei'] = $excludeId;
            }

            $this->stmt = $this->conn->prepare($sql);
            $this->stmt->execute($params);
            return $this->stmt->rowCount() > 0;
        }

        public function fetchWorkspaceById($workspaceId, $userId)
        {
            $this->conn = Connection::connect();
            $sql = "
                SELECT w.id, w.name, w.created_at, w.description,
                uw.role, uw.joined_at
                FROM workspaces w
                JOIN user_workspace uw ON w.id = uw.workspace_id
                WHERE w.id = :wid AND uw.user_id = :uid
            ";
            $this->stmt = $this->conn->prepare($sql);
            $this->stmt->bindParam(':wid', $workspaceId);
            $this->stmt->bindParam(':uid', $userId);

            if ($this->stmt->execute()) {
                return $this->stmt->fetch(PDO::FETCH_ASSOC);
            }

            return false;
        }

        public function updateWorkspace($name, $description, $workspaceId)
        {
            $this->conn = Connection::connect();
            $sql = "
                UPDATE workspaces
                SET name = :na, description = :de, updated_at = NOW()
                WHERE id = :wid
            ";
            $this->stmt = $this->conn->prepare($sql);
            $this->stmt->bindParam(":na", $name);
            $this->stmt->bindParam(":de", $description);
            $this->stmt->bindParam(":wid", $workspaceId);

            if ($this->stmt->execute()) {
                return true;
            }

            return false;
        }

        public function dropWorkspace($workspaceId)
        {
            $this->conn = Connection::connect();

            try {
                $this->conn->beginTransaction();

                $sql = "DELETE FROM user_workspace WHERE workspace_id = :wid";
                $this->stmt = $this->conn->prepare($sql);
                $this->stmt->bindParam(":wid", $workspaceId);
                $this->stmt->execute();

                $sql2 = "DELETE FROM workspaces WHERE id = :wid";
                $stmt2 = $this->conn->prepare($sql2);
                $stmt2->bindParam(":wid", $workspaceId);
                $stmt2->execute();

                $this->conn->commit();
                return true;
            } catch (Exception $e) {
                $this->conn->rollBack();
                return false;
            }
        }

        public function isNotMember($workspaceId, $inviteeId)
        {
            $this->conn = Connection::connect();

            $sql = "SELECT * FROM user_workspace WHERE user_id = :ui AND workspace_id = :wi";
            $this->stmt = $this->conn->prepare($sql);
            $this->stmt->bindParam(":ui", $inviteeId);
            $this->stmt->bindParam(":wi", $workspaceId);
            $this->stmt->execute();

            if (!$this->stmt->rowCount() > 0) {
                return true;
            }

            return false;
        }

        public function insertMember($userId, $workspaceId)
        {
            $this->conn = Connection::connect();

            $sql = "INSERT INTO user_workspace (user_id, workspace_id, role, joined_at) VALUES (:ui, :wi, 'member', NOW())";
            $this->stmt = $this->conn->prepare($sql);
            $this->stmt->bindParam(":ui", $userId);
            $this->stmt->bindParam(":wi", $workspaceId);

            if ($this->stmt->execute()) {
                return true;
            }

            return false;
        }

        public function fetchMembers($workspaceId)
        {
            $this->conn = Connection::connect();

            $sql = "
                SELECT u.id, u.username, u.email, u.profile_url, uw.role, uw.joined_at FROM users u
                JOIN user_workspace uw ON uw.user_id = u.id
                WHERE uw.workspace_id = :wi
            ";
            $this->stmt = $this->conn->prepare($sql);
            $this->stmt->bindParam(":wi", $workspaceId);
            $this->stmt->execute();
            $row = $this->stmt->fetchAll(PDO::FETCH_ASSOC);

            if ($row) {
                return $row;
            }

            return [];
        }

        public function updateMemberRole($workspaceId, $memberId, $role)
        {
            $this->conn = Connection::connect();

            $sql = "UPDATE user_workspace SET role = :ro WHERE workspace_id = :wi AND user_id = :mi";
            $this->stmt = $this->conn->prepare($sql);
            $this->stmt->bindParam(":ro", $role);
            $this->stmt->bindParam(":wi", $workspaceId);
            $this->stmt->bindParam(":mi", $memberId);

            if ($this->stmt->execute()) {
                return true;
            }

            return false;
        }

        public function dropMember($workspaceId, $memberId)
        {
            $this->conn = Connection::connect();

            try {
                $this->conn->beginTransaction();

                $sql = "DELETE FROM user_workspace WHERE workspace_id = :wid AND user_id = :mi";
                $this->stmt = $this->conn->prepare($sql);
                $this->stmt->bindParam(":wid", $workspaceId);
                $this->stmt->bindParam(":mi", $memberId);
                $this->stmt->execute();

                $this->conn->commit();
                return true;
            } catch (Exception $e) {
                $this->conn->rollBack();
                return false;
            }
        }

        public function getMemberPerformance($workspaceId)
        {
            $this->conn = Connection::connect();

            $sql = "
                SELECT 
                    u.id,
                    u.username AS MemberName,
                    COUNT(DISTINCT t.id) AS TasksAssigned,
                    SUM(CASE WHEN t.status='Completed' THEN 1 ELSE 0 END) AS TasksCompleted,
                    SUM(CASE WHEN t.status='Needs Revision' THEN 1 ELSE 0 END) AS TasksRejected,
                    ROUND(SUM(CASE WHEN t.status='completed' THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(DISTINCT t.id),0),2) AS CompletionRate
                FROM users u
                JOIN task_assignees ta ON u.id = ta.user_id
                JOIN tasks t ON ta.task_id = t.id
                WHERE t.workspace_id = :wid
                GROUP BY u.id, u.username
                ORDER BY TasksAssigned DESC;
            ";
            $this->stmt = $this->conn->prepare($sql);
            $this->stmt->bindParam(":wid", $workspaceId);
            $this->stmt->execute();
            $row = $this->stmt->fetchAll(PDO::FETCH_ASSOC);

            if ($row) {
                return $row;
            }

            return[];
        }
    }
