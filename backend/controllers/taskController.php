<?php
require_once '../config/authCheck.php';
include_once '../models/Task.php';

class taskController
{
    private $task;

    public function __construct()
    {
        $this->task = new Task();
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

    function addTask() {
        $data = json_decode(file_get_contents("php://input"),true);

        try {
            if(empty($data['title']) || empty($data['dueDate']) || empty($data['priorityLevel'])) {
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

            if ($this->task->checkDuplicate($title,$workspaceId)) {
                http_response_code(409);
                echo json_encode(['error' => "A Task with this name is already exists!"]);
                return;
            }

            $this->task->insertTask($title, $description, $status, $dueDate, $priorityLevel, $creatorId, $workspaceId);
            echo json_encode([
                'success' => true,
                'message' => "Task Added Successfully!",
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Unexpected error occured: ' . $e->getMessage()]);
        }
    }
}
