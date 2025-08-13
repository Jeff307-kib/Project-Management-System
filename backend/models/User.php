<?php
include_once '../config/db.php';

class User
{
    private $conn, $stmt;

    public function insertUser($name, $email, $password, $profile)
    {
        $this->conn = Connection::connect();
        $sql = "SELECT * FROM users WHERE email = :em";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam(":em", $email);
        $this->stmt->execute();

        if ($this->stmt->rowCount() > 0) {
            throw new Exception("This email is already in use. Please try Logging In!");
        }

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
            throw new Exception("Database insertion failed.");
        }
    }

    public function fetchUser($credential, $password)
    {
        $this->conn = Connection::connect();
        $sql = "SELECT * FROM users WHERE username = :un OR email = :em";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam("un", $credential);
        $this->stmt->bindParam("em", $credential);

        if (!$this->stmt->execute()) {
            throw new Exception("Database query failed.");
        }

        $row = $this->stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row || !password_verify($password, $row['password'])) {
            throw new Exception("Incorrect email, username or password.");
        }

        return $row;
    }
}
