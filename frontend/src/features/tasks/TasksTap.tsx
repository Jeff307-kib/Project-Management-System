import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetTasksQuery } from "@/api/apiSlice";
import TaskExcerpt from "@/features/tasks/TaskExcerpt";

const TasksTap = () => {
  const navigate = useNavigate();
  const { workspaceId } = useParams();

  if (!workspaceId) {
    navigate("/workspace");
  }

  console.log("Workspace Id: ", workspaceId);
  const {
    data: tasks,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTasksQuery(workspaceId ?? "");

  let content;
  if (isLoading) {
    content = (
      <div className="grid gap-6 max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        <Skeleton className="w-full h-32" />
        <Skeleton className="w-full h-32" />
        <Skeleton className="w-full h-32" />
      </div>
    );
  } else if (isSuccess) {
    if (tasks.data.length > 0) {
      content = tasks.data.map((task) => {
        return <TaskExcerpt key={task.id} taskData={task}/>
      })
    } else {
      content = <p>No Task Available! Create one to get Started!</p>
    }
  } else if (isError) {
    if ("status" in error) {
      content = <p>Error: {error.status}</p>
    } else {
      content = <p>An Unexpected error occured.</p>
    }
  }
  return (
    <div className="flex flex-wrap justify-center gap-6 p-8 bg-gray-50">{content}</div>
  );
};

export default TasksTap;
