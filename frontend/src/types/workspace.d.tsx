export interface Workspace {
    id: number, 
    name: string,
    created_at: string,
    description: string | null,
}

export interface GetWorkspacesResponse {
    success: boolean,
    message: string,
    data: Workspace[],
}

export interface NewWorkspace {
    name:string,
    description: string | null,
}

export interface AddWorkspaceResponse {
    success: boolean,
    message: string,
}