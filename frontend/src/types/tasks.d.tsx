export interface Task {
  id: string,
  title: string,
  description: string,
  status: string,
  due_date: string,
  priority_level: string,
}

export interface Member {
  id: string,
  name: string,
  email: string,
  profileImage: string,
}

export interface GetTasksResponse {
  succsss: boolean,
  message: string,
  data: Task[],
}

export interface TaskModalProps {
  label: string,
  taskOpen: boolean,
  setTaskOpen: () => void,
  task?: Task,
}

export interface TaskMutationResponse {
  success: boolean,
  message: string,
}

export interface AddTask {
  title: string,
  description: string,
  dueDate: string,
  priorityLevel: string,
  userId: string,
  workspaceId: string,
}
