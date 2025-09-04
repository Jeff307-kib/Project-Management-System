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
        $sql = "SELECT * FROM users WHERE email = :em";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam("em", $credential);

        if (!$this->stmt->execute()) {
            throw new Exception("Database query failed.");
        }

        $row = $this->stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row || !password_verify($password, $row['password'])) {
            throw new Exception("Incorrect email or password.");
        }

        return $row;
    }

    public function fetchUserById($userId)
    {
        $this->conn = Connection::connect();
        $sql = "SELECT id, username, email, profile_url FROM users WHERE id = :ui";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam(":ui", $userId);
        $this->stmt->execute();
        $row = $this->stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            return $row;
        }

        return false;
    }

    public function updateProfile($name, $email, $profile, $userId, $currentPassword = null, $newPassword = null)
    {
        $this->conn = Connection::connect();

        $sqlCheckEmail = "SELECT id FROM users WHERE email = :em AND id != :ui";
        $stmtCheckEmail = $this->conn->prepare($sqlCheckEmail);
        $stmtCheckEmail->bindParam(":em", $email);
        $stmtCheckEmail->bindParam(":ui", $userId);
        $stmtCheckEmail->execute();

        if ($stmtCheckEmail->rowCount() > 0) {
            throw new Exception("This email is already in use.");
        }

        $passwordUpdate = "";
        if ($currentPassword && $newPassword) {
            $sqlPassword = "SELECT password FROM users WHERE id = :ui";
            $stmtPassword = $this->conn->prepare($sqlPassword);
            $stmtPassword->bindParam(":ui", $userId);
            $stmtPassword->execute();
            $hashedPasswordFromDb = $stmtPassword->fetchColumn();

            if (!password_verify($currentPassword, $hashedPasswordFromDb)) {
                throw new Exception("Incorrect current password.");
            }

            $hashedNewPassword = password_hash($newPassword, PASSWORD_DEFAULT);
            $passwordUpdate = ", password = :pw";
        }

        $sqlUpdate = "UPDATE users SET username = :un, email = :em, profile_url = :pu, updated_at = NOW() {$passwordUpdate} WHERE id = :ui";
        $this->stmt = $this->conn->prepare($sqlUpdate);
        $this->stmt->bindParam(":un", $name);
        $this->stmt->bindParam(":em", $email);
        $this->stmt->bindParam(":pu", $profile);
        $this->stmt->bindParam(":ui", $userId);
        if (isset($hashedNewPassword)) {
            $this->stmt->bindParam(":pw", $hashedNewPassword);
        }

        if ($this->stmt->execute()) {
            return true;
        }

        return false;
    }

    public function fetchUserByEmail($email)
    {
        $this->conn = Connection::connect();

        $sql = "SELECT * FROM users WHERE email = :em";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam(":em", $email);
        $this->stmt->execute();
        $row = $this->stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            return $row;
        }

        return false;
    }

    public function saveResetToken($userId, $token, $expires)
    {
        $this->conn = Connection::connect();

        $sql = "INSERT INTO password_resets (user_id, token, expires_at) VALUES (:ui, :tk, :ep)";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam(":ui", $userId);
        $this->stmt->bindParam(":tk", $token);
        $this->stmt->bindParam(":ep", $expires);

        if ($this->stmt->execute()) {
            return true;
        }

        return false;
    }

    public function fetchRestTokenData($token)
    {
        $this->conn = Connection::connect();

        $sql = "SELECT * FROM password_resets WHERE token = :tk";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam(":tk", $token);
        $this->stmt->execute();
        $row = $this->stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            return $row;
        }

        return false;
    }

    public function deleteResetTokens($userId)
    {
        $this->conn = Connection::connect();

        $sql = "DELETE FROM password_resets WHERE user_id = :ui ";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam(":ui", $userId);

        if ($this->stmt->execute()) {
            return true;
        }

        return false;
    }

    public function updatePassword($password, $userId)
    {
        $this->conn = Connection::connect();

        $sql = "UPDATE users SET password = :pw WHERE id = :ui";
        $this->stmt = $this->conn->prepare($sql);
        $this->stmt->bindParam(":pw", $password);
        $this->stmt->bindParam(":ui", $userId);

        if ($this->stmt->execute()) {
            return true;
        }

        return false;
    }
}
