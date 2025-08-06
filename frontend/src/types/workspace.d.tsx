export interface Workspace {
  id: number;
  name: string;
  created_at: string;
  description: string | null;
}

export interface GetWorkspacesResponse {
  success: boolean;
  message: string;
  data: Workspace[];
}

export interface NewWorkspace {
  name: string;
  description: string | null;
}

export interface AddWorkspaceResponse {
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
    description: string,
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