export interface Workspace {
  id: number;
  name: string;
  created_at: string;
  description: string | null;
}

export interface GetWorkspacesResponse {
  success: boolean;
  message: string;
  data: Workspace[] | [];
}

export interface NewWorkspace {
  name: string;
  description: string | null;
}

export interface WorkspaceMutationResponse {
  success: boolean;
  message: string;
}

export interface WorkspaceModalProps {
  label: string,
  isOpen: boolean,
  setOpen: () => void,
  workspace?: Workspace | WorkspaceById
}

export interface EditWorkspace {
    name: string,
    description: string | null,
    workspaceId: number,
}

export interface WorkspaceById {
  id: number,
  name: string,
  description: string, 
  role: string,
  joined_at: string,
}

export interface GetWorkspaceByIdResponse {
  success: boolean;
  message: string;
  data: WorkspaceById
}

export interface Invitation {
  email: string,
  workspaceId: string,
}

export interface Notification {
  id: string,
  type: string,
  status: string,
  message: string,
  created_at: string,
  is_read: boolean,
}

export interface getNotificationResponse {
  success: boolean,
  message: string,
  notifications: Notification[] | [],
}

export interface Member {
  id: string,
  username: string,
  email: string,
  profile_url: string,
  role: string,
  joined_at: string,
}

export interface GetMembersResponse {
  success: boolean,
  message: string,
  data: Member[] | []
}