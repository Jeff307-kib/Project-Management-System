<?php
include_once '../config/db.php';

class User {
    private $conn, $stmt;

    public function insertUser($name, $email, $password, $profile) {
        $this->conn = Connection::connect();
        $sql = "INSERT INTO users (username, email, password, profile_url, created_at, updated_at) VALUES (:un, :em, :pa, :pu, NOW(), NOW())";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam(":un", $name);
        $this->stmt->bindParam(":em", $email);
        $this->stmt->bindParam(":pa", $password);
        $this->stmt->bindParam(":pu", $profile);

        if ($this->stmt->execute()) {
            $userId = $this->conn->lastInsertId();
            return $userId;
        } else {
            return false;
        }
    }
}