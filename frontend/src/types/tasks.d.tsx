import type { Member } from "@/types/workspace.d";

export interface Task {
  id: string,
  title: string,
  description: string,
  status: string,
  due_date: string,
  priority_level: string,
  members: Member[] | []
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
  members: string[]
}
