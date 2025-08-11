<?php
session_start();
include_once '../models/User.php';
class UserController
{
    private $user;

    public function __construct()
    {
        $this->user = new User();
    }

    function registerUser()
    {
        try {
            if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['password'])) {
                http_response_code(400);
                echo json_encode(['error' => "Please fill in required fields!"]);
                return;
            }

            $name = trim($_POST['name']);
            $email = trim($_POST['email']);
            $password = $_POST['password']; 

            $profileImage = null;
            
            if (isset($_FILES['profileImage']) && $_FILES['profileImage']['error'] === 0) {
                $uploadDir = __DIR__ . '/../public/uploads/profiles/'; // Correct absolute path
                $fileName = basename($_FILES['profileImage']['name']);
                $fileTmpName = $_FILES['profileImage']['tmp_name'];
                $fileSize = $_FILES['profileImage']['size'];
                
                $maxFileSize = 5 * 1024 * 1024;
                
                if ($fileSize > $maxFileSize) {
                    http_response_code(413);
                    echo json_encode(['error' => "File is too large. Maximum size is 5MB."]);
                    return;
                }
                
                $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
                $allowed = array("jpg", "jpeg", "png");

                if (!in_array($fileExt, $allowed)) {
                    http_response_code(400);
                    echo json_encode(['error' => "Only jpg, jpeg and png files are allowed!"]);
                    return;
                }
                
                $newFileName = uniqid("", true) . "." . $fileExt;
                $uploadFileDestination = $uploadDir . $newFileName;
                
                if (!move_uploaded_file($fileTmpName, $uploadFileDestination)) {
                    http_response_code(500);
                    echo json_encode(['error' => "Error moving the file!"]);
                    return;
                }
                $profileImage = 'uploads/profiles/' . $newFileName;
            }
            
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $userId = $this->user->insertUser($name, $email, $hashedPassword, $profileImage);
            
            if ($userId > 0) {
                $_SESSION['userId'] = $userId;
                echo json_encode([
                    'success' => true,
                    'message' => "Registration Success!",
                    'userId' => $userId
                ]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => "Database insertion failed."]);
            }
            
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(['error' => "An unexpected error occurred: " . $e->getMessage()]);
        }
    }
}
