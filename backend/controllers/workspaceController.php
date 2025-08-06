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

    function addWorkspace()
    {
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

    function getWorkspaceById()
    {
        $userId = 1; //Would use SESSION
        if (!isset($_GET['workspaceId'])) {
            http_response_code(400);
            echo json_encode(['error' => 'No worksapce Id found']);
            return;
        }
        $workspaceId = $_GET['workspaceId'];
        try {
            if ($this->workspace->fetchWorkspaceById($workspaceId, $userId)) {
                echo json_encode([
                    'success' => true,
                    'message' => "Fetched Success!",
                    'data' => $this->workspace->fetchWorkspaceById($workspaceId, $userId),
                ]);
            } else {
                http_response_code(401);
                echo json_encode(['error' => 'Invalid workspace Id or User id']);
            }
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    function editWorkspace()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data['name']) && empty($data['description'] && empty($data['workspaceId']))) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing name or description or workspaceId']);
        }

        try {
            $name = $data['name'];
            $description = $data['description'];
            $workspaceId = $data['workspaceId'];

            if ($this->workspace->updateWorkspace($name, $description, $workspaceId)) {
                echo json_encode([
                    'success' => true,
                    'message' => "Workspace updated successfully!",
                ]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to update workspace']);
            }
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}
