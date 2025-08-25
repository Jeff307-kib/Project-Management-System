export interface Task {
    id: string,
    name: string,
    description: string,
    status: string,
    dueDate: string,
    members: Member[] | []
}

export interface Member {
    id:string,
    name: string,
    profileImage: string,
}

export interface GetTasksResponse {
    succsss: boolean,
    message: string,
    data: Task[]
}