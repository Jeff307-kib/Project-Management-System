export interface Task {
  id: string,
  title: string,
  description: string,
  status: string,
  due_date: string,
  priority_level: string,
  rejection_reason?: string,
  members: TaskAssignee[] | []
  attachments?: Attachments[] | []
  comments: Comment[] | []
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

export interface TaskAssignee {
  id: string,
  username: string,
  email: string,
  profile_url: string | null, 
}

export interface getTaskByIdResponse {
  success: boolean,
  message: string,
  data: Task,
}

export interface EditTask {
  taskId: string,
  title: string, 
  description: string,
  priorityLevel: string,
  dueDate: string,
  members: string[],
}

export interface Attachments {
  id: string,
  task_id: string,
  uploaded_by: string,
  file_name: string,
  file_type: string,
  file_size: number,
  file_path: string,
  uploaded_at: string,
}

export interface AddComment {
  commentText: string,
  userId: string,
  taskId: string,
  workspaceId: string,
}

export interface Comment {
  id: string,
  task_id: string,
  comment_text: string,
  updated_at: string,
  user: TaskAssignee
}

export interface UpdateStatus {
  taskId: string,
  status: string,
  workspaceId: string,
  rejectionReason?: string,
}