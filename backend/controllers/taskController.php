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
}
