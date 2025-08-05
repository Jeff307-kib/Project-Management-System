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
    }
