<?php
session_start();
include_once '../models/User.php';

include_once '../phpmailer/PHPMailer.php';
include_once '../phpmailer/SMTP.php';
include_once '../phpmailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

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
                $uploadDir = __DIR__ . '/../public/uploads/profiles/';
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

            $_SESSION['userId'] = $userId;
            $user = [
                'id' => $userId,
                'username' => $name,
                'email' => $email,
                'profileImage' => $profileImage,
            ];
            echo json_encode([
                'success' => true,
                'message' => "Registration Success!",
                'user' => $user,
            ]);
        } catch (Exception $e) {
            if ($e->getMessage() === "This email is already in use. Please try Logging In!") {
                http_response_code(409); 
                echo json_encode(['error' => $e->getMessage()]);
            } else {
                http_response_code(400); // Bad Request for other errors
                echo json_encode(['error' => $e->getMessage()]);
            }
        }
    }

    function loginUser()
    {
        try {
            $data = json_decode(file_get_contents("php://input"), true);

            if (empty($data['credential']) || empty($data['password'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Please enter all fields!']);
                return;
            }

            $credential = $data['credential'];
            $password = $data['password'];

            $row = $this->user->fetchUser($credential, $password);
            $user = [
                'id' => $row['id'],
                'username' => $row['username'],
                'email' => $row['email'],
                'profileImage' => $row['profile_url'],
            ];
            $_SESSION['userId'] = $row['id'];
            echo json_encode([
                'success' => true,
                'message' => "Login Success!",
                'user' => $user,
            ]);
        } catch (Exception $e) {
            if ($e->getMessage() === "Incorrect email or password.") {
                http_response_code(409);
                echo json_encode(['error' => 'Incorrect email or password.']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => "An unexpected error occured!"]);
            }
        }
    }

    function logoutUser()
    {
        $_SESSION = array();

        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(
                session_name(),
                '',
                time() - 42000,
                $params["path"],
                $params["domain"],
                $params["secure"],
                $params["httponly"]
            );
        }

        session_destroy();

        echo json_encode(['isSuccess' => true, 'message' => 'Logged out successfully!']);
    }


    function checkSession()
    {
        if (isset($_SESSION['userId'])) {
            $userId = $_SESSION['userId'];

            $userData = $this->user->fetchUserById($userId);

            if ($userData) {
                echo json_encode([
                    'success' => true,
                    'user' => [
                        'id' => $userData['id'],
                        'name' => $userData['username'],
                        'email' => $userData['email'],
                        'profileImage' => $userData['profile_url'],
                    ],
                ]);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'User not found.']);
            }
        } else {
            http_response_code(401);
            echo json_encode(['error' => 'Not authenticated!']);
        }
    }

    function editProfile()
    {
        try {

            $userId = $_SESSION['userId'];
            $currentUser = $this->user->fetchUserById($userId);

            $name = trim($_POST['name'] ?? $currentUser['username']);
            $email = trim($_POST['email'] ?? $currentUser['email']);


            $currentPassword = $_POST['currentPassword'] ?? null;
            $newPassword = $_POST['newPassword'] ?? null;

            $profileImage = $currentUser['profile_url'] ?? null;

            if (isset($_FILES['profileImage']) && $_FILES['profileImage']['error'] === 0) {
                $uploadDir = __DIR__ . '/../public/uploads/profiles/';
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

            if ($this->user->updateProfile($name, $email, $profileImage, $userId, $currentPassword, $newPassword)) {
                if (isset($_FILES['profileImage']) && $_FILES['profileImage']['error'] === 0) {
                    $oldProfileImage = $currentUser['profile_url'];

                    if (!empty($oldProfileImage)) {
                        $oldFilePath = __DIR__ . '/../public/' . $oldProfileImage;
                        if (file_exists($oldFilePath)) {
                            unlink($oldFilePath);
                        }
                    }
                }

                $updatedUser = $this->user->fetchUserById($userId);
                $updatedUser = [
                    'id' => $updatedUser['id'],
                    'name' => $updatedUser['username'],
                    'email' => $updatedUser['email'],
                    'profileImage' => $updatedUser['profile_url'],
                ];
                echo json_encode([
                    'success' => true,
                    'message' => "Profile Updated Successfully!",
                    'user' => $updatedUser,
                ]);
            }
        } catch (Exception $e) {
            $errorMessage = $e->getMessage();
            if ($errorMessage === "This email is already in use." || $errorMessage === "Incorrect current password.") {
                http_response_code(409);
                echo json_encode(['error' => $errorMessage]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => "An unexpected error occured!"]);
            }
        }
    }

    function forgotPassword()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data['email'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing Email Address!']);
        }

        $email = $data['email'];

        try {
            $user = $this->user->fetchUserByEmail($email);
            $userId = $user['id'];

            if ($user) {
                $token = bin2hex(random_bytes(32)); // Creates a 64-character hex string
                $expires = date('Y-m-d H:i:s', strtotime('+1 hour')); // Token expires in 1 hour

                if ($this->user->saveResetToken($userId, $token, $expires)) {
                    $resetLink = 'http://localhost:5173/reset-password?token=' . $token;
                    $mail = new PHPMailer(true);
                    try {
                        $mail->SMTPDebug = 0;
                        $mail->isSMTP();
                        $mail->Host = 'smtp.gmail.com';
                        $mail->SMTPAuth = true;
                        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                        $mail->Port = 587;

                        $mail->Username = 'wunnatunsai940@gmail.com'; // YOUR gmail email
                        $mail->Password = 'xalb lxqr tzgi lxln'; // YOUR gmail password

                        // Sender and recipient settings
                        $mail->setFrom('no-reply@example.com', 'Admin');
                        $mail->addAddress($email, $user['username']);
                        // $mail->addReplyTo('example@gmail.com', 'Sender Name'); 


                        // Setting the email content
                        $mail->IsHTML(true);
                        $mail->Subject = "Password Reset Request";
                        $mail->Body = "
                                        <p>Hello <b>{$user['username']}</b>,</p>
                                        <p>You requested to reset your password. Click the link below to reset it:</p>
                                        <p><a href='$resetLink'>$resetLink</a></p>
                                        <p><i>This link will expire in 1 hour.</i></p>
                                        <p>If you didn’t request this, you can safely ignore this email.</p>
                        ";
                        $mail->AltBody = "Password reset link: $resetLink (valid for 1 hour)";

                        $mail->send();
                    } catch (PHPMailerException $e) {
                        http_response_code(500);
                        $response = [
                            'status' => 'error',
                            'message' => 'Mailer failed to send email.',
                            'details' => $mail->ErrorInfo // safe because json_encode will escape it
                        ];
                        echo json_encode($response);
                        exit;
                    }

                    echo json_encode(['success' => 'If an account exists, a password reset email has been sent.']);
                } else {
                    echo json_encode(['error' => 'Something went wrong. Please Try Again!']);
                    return;
                }
            } else {
                echo json_encode(['message' => 'If an account exists, a password reset email has been sent.']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database Error: ' . $e->getMessage()]);
        }
    }

    function resetPassword()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data['token']) || empty($data['password'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing token or password']);
            exit;
        }
        $token = $data['token'];
        $newPassword = $data['password'];

        try {
            $resetData = $this->user->fetchRestTokenData($token);

            if (!$resetData) {
                http_response_code(401);
                echo json_encode(['error' => 'Invalid or expired password reset link!']);
                exit;
            }

            $now = new DateTime();
            $expiresAt = new DateTime($resetData['expires_at']);
            if ($now > $expiresAt) {
                $this->user->deleteResetTokens($resetData['user_id']);
                http_response_code(401);
                echo json_encode(['error' => 'Password reset link has expired. Please request for a new one.']);
                exit;
            }

            $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
            $this->user->updatePassword($hashedPassword, $resetData['user_id']);

            $this->user->deleteResetTokens($resetData['user_id']);

            echo json_encode(['message' => 'Your Password has been set successfully.']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
    }
}
