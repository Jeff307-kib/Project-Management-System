<?php
include_once '../models/Workspace.php';

class workspaceController
{
    private $workspace;

    function __construct()
    {
        $this->workspace = new Workspace();
    }

    function getWorkspaces()
    {
        $userId = 1; //Would use SESSION
        try {
            if ($this->workspace->fetchWorkspaces($userId)) {
                echo json_encode([
                    'isSuccess' => true,
                    'message' => "Workspaces fetched successfully!",
                    'data' => $this->workspace->fetchWorkspaces($userId),
                ]);
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'Missing or invalid userId.']);
            }
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    function addWorkspace() {
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data['name'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Please enter Workspace Name!']);
            return;
        }

        try {
            $userId = 1; //Would use SESSION Later :D
            $name = $data['name'];
            $description = empty($data['description']) ? null : $data['description'];
            $description = $data['description'] ?? null;

            if ($this->workspace->insertWorkspace($userId, $name, $description)) {
                echo json_encode([
                    'isSuccess' => true,
                    'message' => "Workspace added successfully!",
                ]);
            }
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}
