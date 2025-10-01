<?php
require_once '../config/authCheck.php';
include_once '../models/Workspace.php';
include_once '../models/User.php';
include_once '../models/Notification.php';
include_once '../models/Task.php';

class workspaceController
{
    private $workspace;
    private $user;
    private $noti;
    private $task;

    function __construct()
    {
        $this->workspace = new Workspace();
        $this->user = new User();
        $this->noti = new Notification();
        $this->task = new Task();
    }

    function getWorkspaces()
    {
        $userId = $_SESSION['userId'];
        try {
            $workspaces = $this->workspace->fetchWorkspaces($userId);

            foreach ($workspaces as $key => $workspace) {
                $tasks = $this->task->fetchTasks($workspace['id']);
                $taskCount = count($tasks);

                $completedTasks = 0;
                foreach ($tasks as $task) {
                    if ($task['status'] === 'Completed') $completedTasks++;
                }

                $members = $this->workspace->fetchMembers($workspace['id']);

                $workspaces[$key]['taskCount'] = $taskCount;
                $workspaces[$key]['completedTasks'] = $completedTasks;
                $workspaces[$key]['members'] = $members;
            }

            if (empty($workspaces)) {
                echo json_encode([
                    'isSuccess' => true,
                    'message' => "No workspace found for this user",
                    'data' => [],
                ]);
            } else {
                echo json_encode([
                    'isSuccess' => true,
                    'message' => "Workspaces fetched successfully!",
                    'data' => $workspaces,
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
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
            $userId = $_SESSION['userId'];
            $name = $data['name'];
            $description = empty($data['description']) ? null : $data['description'];
            $description = $data['description'] ?? null;

            if ($this->workspace->checkDuplicate($name, $userId)) {
                http_response_code(409);
                echo json_encode(['error' => "A workspace with this name already exists!"]);
                return;
            }

            if ($this->workspace->insertWorkspace($userId, $name, $description)) {
                echo json_encode([
                    'isSuccess' => true,
                    'message' => "Workspace added successfully!",
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => "Unexpected error occured: " . $e->getMessage()]);
        }
    }

    function getWorkspaceById()
    {
        $userId = $_SESSION['userId']; //Would use SESSION
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

        if (empty($data['name']) || empty($data['workspaceId'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing name or description or workspaceId']);
            return;
        }

        $name = trim($data['name']);
        $description = isset($data['description']) ? trim($data['description']) : null;
        $workspaceId = $data['workspaceId'];
        $userId = $_SESSION['userId'];
        try {
            if ($this->workspace->checkDuplicate($name, $userId, $workspaceId)) {
                http_response_code(409);
                echo json_encode(['error' => "A workspace with this name already exists!"]);
                return;
            }

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
            http_response_code(500);
            echo json_encode(['error' => "An unexpected error occured: " . $e->getMessage()]);
        }
    }

    function deleteWorkspace()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data['workspaceId'])) {
            http_response_code(400);
            echo json_encode(['error' => 'No worksapce Id found']);
            return;
        }

        try {
            $workspaceId = $data['workspaceId'];
            $this->workspace->dropWorkspace($workspaceId);
            echo json_encode([
                'success' => true,
                'message' => "Delete Success!",
            ]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    function inviteMember()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        try {
            if (!isset($data['email'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Please enter email address!']);
                return;
            }

            if (!isset($data['workspaceId'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing Workspace Id.']);
                return;
            }
            $email = trim($data['email']);
            $workspaceId = $data['workspaceId'];

            $invitee = $this->user->fetchUserByEmail($email);
            if (!$invitee) {
                http_response_code(404);
                echo json_encode(['error' => 'User with that email not found!']);
                return;
            }

            $inviteeId = $invitee['id'];
            $inviterId = $_SESSION['userId'];
            $inviter = $this->user->fetchUserById($inviterId);
            $workspace = $this->workspace->fetchWorkspaceById($workspaceId, $inviterId);

            if (!$this->workspace->isNotMember($workspaceId, $inviteeId)) {
                http_response_code(409);
                echo json_encode(['error' => 'User is already a member of this workspace.']);
                return;
            }

            $this->noti->createNotification([
                'recipient_id' => $inviteeId,
                'sender_id' => $inviterId,
                'type' => 'Invitation',
                'related_id' => $workspaceId,
                'invitation_status' => 'Pending',
                'message' => 'You have been invited to a new workspace! ' . $inviter['email'] . ' invited you to join ' . $workspace['name'] . '.',
            ]);

            echo json_encode([
                'success' => true,
                'message' => 'Invitation sent successfully!',
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'An unexpected error occured: ' . $e->getMessage()]);
        }
    }

    function getMembers()
    {
        try {
            if (empty($_GET['workspaceId'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing Workspace ID!']);
                return;
            }

            $workspaceId = $_GET['workspaceId'];

            $members = $this->workspace->fetchMembers($workspaceId);
            if (empty($members)) {
                echo json_encode([
                    'success' => true,
                    'message' => 'Members fetched successfully',
                    'data' => [],
                ]);
            } else {
                echo json_encode([
                    'success' => true,
                    'message' => 'Members fetched successfully',
                    'data' => $members,
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Unexpected error occured: ' . $e->getMessage()]);
        }
    }

    function changeMemberRole()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data['workspaceId'])  || empty($data['memberId']) || empty($data['role'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing Required Data!']);
            return;
        }

        try {
            $workspaceId = $data['workspaceId'];
            $memberId = $data['memberId'];
            $role = $data['role'];

            $this->workspace->updateMemberRole($workspaceId, $memberId, $role);

            $workspace = $this->workspace->fetchWorkspaceById($workspaceId, $memberId);
            $message = "You are now a $role of Workspace: " . $workspace['name'] . ".";

            $this->noti->createNotification([
                'recipient_id' => $memberId,
                'sender_id' => '17',
                'type' => 'Role Change',
                'related_id' => $workspaceId,
                'message' => $message,
            ]);
            echo json_encode([
                'success' => true,
                'message' => "Role Changes Successfully!",
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Unexpected Error Occured.' . $e->getMessage()]);
        }
    }

    function removeMember()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data['workspaceId'])  || empty($data['memberId'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing Required Data!']);
            return;
        }

        try {
            $workspaceId = $data['workspaceId'];
            $memberId = $data['memberId'];

            $workspace = $this->workspace->fetchWorkspaceById($workspaceId, $memberId);
            $message = "You have been remove from the Workspace: " . $workspace['name'] . ".";

            $this->noti->createNotification([
                'recipient_id' => $memberId,
                'sender_id' => '17',
                'type' => 'Role Change',
                'related_id' => $workspaceId,
                'message' => $message,
            ]);
            $this->workspace->dropMember($workspaceId, $memberId);
            echo json_encode([
                'success' => true,
                'message' => "Member Removed Successfully!",
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Unexpected Error Occured.' . $e->getMessage()]);
        }
    }

    function getMemberPerformance()
    {
        if (!isset($_GET['workspaceId'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing Workspace ID!']);
            return;
        }

        try {
            $workspaceId = $_GET['workspaceId'];

            $performance = $this->workspace->getMemberPerformance($workspaceId);

            echo json_encode([
                'success' => true,
                'message' => 'Peformance Data Fetched Successfully!',
                'data' => $performance,
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Unexpected Error Occured.' . $e->getMessage()]);
        }
    }
}
