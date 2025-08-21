<?php
class Connection {
    static $host = 'localhost';
    static $dbname = 'projectmanagementsystem';
    static $username = 'root';
    static $password = '';
    static $conn;

    public static function connect() {
        try {
            if (self::$conn == null) {
                self::$conn = new PDO("mysql:host=" . self::$host . ";port=3306;dbname=" . self::$dbname, self::$username, self::$password);
            }
            return self::$conn;

        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    public static function disconnect() {
        self::$conn = null;
    }
}