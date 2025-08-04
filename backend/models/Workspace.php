    <?php
    include_once '../config/db.php';

    class Workspace {
        private $conn, $stmt;

        public function fetchWorkspaces($userId) {
            $this->conn = Connection::connect();
            $sql = "
                    SELECT w.id, w.name, w.created_at
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
    }