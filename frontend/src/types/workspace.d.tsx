export interface Workspace {
    id: number, 
    name: string,
    created_at: string,
}

export interface GetWorkspacesResponse {
    success: boolean,
    message: string,
    data: Workspace[],
}