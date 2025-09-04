<?php
require_once '../config/authCheck.php';
include_once '../models/Task.php';
include_once '../models/Workspace.php';
include_once '../models/User.php';

class taskController
{
    private $task;
    private $workspace;
    private $user;

    public function __construct()
    {
        $this->task = new Task();
        $this->workspace = new Workspace();
        $this->user = new User();
    }

    function getTasks()
    {
        try {
            if (empty($_GET['workspaceId'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing Workspace Id']);
                return;
            }
            $workspaceId = $_GET['workspaceId'];

            $tasks = $this->task->fetchTasks($workspaceId);

            if (!empty($tasks)) {
                foreach ($tasks as $key => $task) {
                    $taskId = $task['id'];
                    $memberDetails = [];
                    $memberDetails = $this->getTaskAssigneesDetails($taskId);

                    $tasks[$key]['members'] = $memberDetails;
                }
            }

            if (empty($tasks)) {
                echo json_encode([
                    'success' => true,
                    'message' => 'Tasks fetched succesfully!',
                    'data' => [],
                ]);
            } else {
                echo json_encode([
                    'success' => true,
                    'message' => 'Tasks fetched succesfully!',
                    'data' => $tasks,
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => "Unexpected error occured: " . $e->getMessage()]);
        }
    }

    function addTask()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        try {
            if (empty($data['title']) || empty($data['dueDate']) || empty($data['priorityLevel'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Please enter all required fields.']);
                return;
            }

            if (empty($data['workspaceId']) || empty($data['userId'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Workspace Id or User Id missing!']);
                return;
            }

            $creatorId = $data['userId'];
            $workspaceId = $data['workspaceId'];
            $title = $data['title'];
            $description = $data['description'];
            $status = "To Do";
            $dueDate = $data['dueDate'];
            $priorityLevel = $data['priorityLevel'];

            if ($this->task->checkDuplicate($title, $workspaceId)) {
                http_response_code(409);
                echo json_encode(['error' => "A Task with this name is already exists!"]);
                return;
            }

            $taskId = $this->task->insertTask($title, $description, $status, $dueDate, $priorityLevel, $creatorId, $workspaceId);

            if (isset($data['members'])) {
                foreach ($data['members'] as $memberId) {
                    $this->task->insertTaskAssignees($taskId, $memberId);
                }
            }
            echo json_encode([
                'success' => true,
                'message' => "Task Added Successfully!",
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Unexpected error occured: ' . $e->getMessage()]);
        }
    }

    function getTaskAssigneesDetails($taskId)
    {
        $membersDetails = array();
        $members = $this->task->fetchTaskAssignees($taskId);
        foreach ($members as $member) {
            $singleMemberDetail = $this->user->fetchUserById($member['user_id']);
            array_push($membersDetails, $singleMemberDetail);
        }
        return $membersDetails;
    }

    function getTaskById()
    {
        $taskId = $_GET['taskId'];

        if (empty($taskId)) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing Task Id!']);
            return;
        }

        try {
            $task = $this->task->fetchTaskById($taskId);

            $taskAssignees = $this->getTaskAssigneesDetails($taskId);
            $task['members'] = $taskAssignees;

            $attachments = $this->task->fetchAttachment($taskId);
            $task['attachments'] = $attachments;

            $comments = $this->getCommentDetail($taskId);
            $task['comments'] = $comments;

            if ($task) {
                echo json_encode([
                    'success' => true,
                    'message' => "Task fetched successfully!",
                    'data' => $task,
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Unexpected Error occured: ' . $e->getMessage()]);
        }
    }

    function editTask()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data['taskId']) || empty($data['title']) || empty($data['priorityLevel']) || empty($data['dueDate'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields or missing task id.']);
            return;
        }

        $taskId = $data['taskId'];
        $title = trim($data['title']);
        $description = isset($data['description']) ? trim($data['description']) : null;
        $priorityLevel = $data['priorityLevel'];
        $dueDate = $data['dueDate'];
        $members = isset($data['members']) ? $data['members'] : [];

        try {
            $this->task->updateTask($title, $description, $dueDate, $priorityLevel, $taskId);

            if (count($members) > 0) {
                foreach ($members as $member) {
                    $this->task->insertTaskAssignees($taskId, $member);
                }
            }
            echo json_encode([
                'success' => true,
                'message' => 'Task Updated Successfully',
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => "Unexpected error occured! " . $e->getMessage()]);
        }
    }

    function deleteTask()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data['taskId'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missin task Id!']);
            return;
        }

        try {
            $taskId = $data['taskId'];

            $this->task->dropTask($taskId);

            echo json_encode([
                'success' => true,
                'message' => 'Task Deleted Successfully!',
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Unexpected error occured! ' . $e->getMessage()]);
        }
    }

    function startTask()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data['taskId'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing Task Id.']);
            return;
        }

        $taskId = $data['taskId'];

        try {
            $this->task->updateStatus($taskId, "In Progress");

            echo json_encode([
                'success' => true,
                'message' => 'Task Status Updated Successfully!',
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Unexpected error occured. ' . $e->getMessage()]);
        }
    }

    function addAttachment()
    {
        try {
            if (empty($_POST['taskId']) || empty($_POST['userId'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Task Id or User Id Missing!']);
                return;
            }

            $taskId = $_POST['taskId'];
            $userId = $_POST['userId'];

            if (isset($_FILES['fileAttachment']) && $_FILES['fileAttachment']['error'] === 0) {
                $uploadDir = __DIR__ . '/../public/uploads/attachments/';
                $fileName = basename($_FILES['fileAttachment']['name']);
                $fileTmpName = $_FILES['fileAttachment']['tmp_name'];
                $fileSize = $_FILES['fileAttachment']['size'];

                $fileSizeInMB = number_format($fileSize / (1024 * 1024), 2);
                // $maxFileSize = 15 * 1024 * 1024;

                if ($fileSizeInMB > 15) {
                    http_response_code(413);
                    echo json_encode(['error' => "File is too large. Maximum size is 15MB."]);
                    return;
                }

                $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
                $allowed = array('pdf', 'docx', 'xlsx', 'pptx', 'txt', 'jpg', 'jpeg', 'png', 'gif', 'svg', 'webp');

                if (!in_array($fileExt, $allowed)) {
                    http_response_code(400);
                    echo json_encode(['error' => "Only 'pdf', 'docx', 'xlsx', 'pptx', 'txt', 'jpg', 'jpeg', 'png', 'gif', 'svg' and 'webp' files are allowed!"]);
                    return;
                }

                $newFileName = uniqid("", true) . '.' . $fileExt;
                $uploadFileDestination = $uploadDir . $newFileName;

                if (!move_uploaded_file($fileTmpName, $uploadFileDestination)) {
                    http_response_code(500);
                    echo json_encode(['error' => "Error moving the file!"]);
                    return;
                }

                $filePath = 'uploads/attachments/' . $newFileName;

                $this->task->insertAttachment($taskId, $userId, $fileName, $fileExt, $fileSizeInMB, $filePath);
                echo json_encode([
                    'success' => true,
                    'message' => 'Attachment Added Successfully',
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Unexpected error occured.' . $e->getMessage()]);
        }
    }

    function addComment()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data['userId']) || empty($data['taskId'])) {
            http_response_code(400);
            echo json_encode(['error' => "Missing Task Id or User Id."]);
            return;
        }

        if (empty($data['commentText'])) {
            http_response_code(400);
            echo json_encode(['error' => 'No comment text found.']);
            return;
        }

        try {
            $commentText = trim($data['commentText']);
            $taskId = $data['taskId'];
            $userId = $data['userId'];

            $this->task->insertComment($taskId, $userId, $commentText);

            echo json_encode([
                'success' => true,
                'message' => 'Comment Added Successfully!',
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Unexpected error occured.', $e->getMessage()]);
        }
    }

    function getCommentDetail($taskId)
    {
        $comments = $this->task->fetchComments($taskId);
        foreach($comments as $key => $comment) {
            $user = $this->user->fetchUserById($comment['created_by']);

            $comments[$key]['user'] = $user;

            unset($comments[$key]['created_by']);
        }

        return $comments;
    }
}
