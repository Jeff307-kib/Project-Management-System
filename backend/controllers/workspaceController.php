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
        try {
            if (isset($_GET['userId']) && is_numeric($_GET['userId'])) {
                echo json_encode([
                    'isSuccess' => true,
                    'message' => "Workspaces fetched successfully!",
                    'data' => $this->workspace->fetchWorkspaces(intval($_GET['userId'])),
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
}
