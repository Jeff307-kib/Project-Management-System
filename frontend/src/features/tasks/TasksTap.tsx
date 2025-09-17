import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import TaskExcerpt from "@/features/tasks/TaskExcerpt";
import type { Task } from "@/types/tasks.d";

interface Props {
  tasks: Task[],
  isLoading: boolean,
  isError: boolean,
}

const TasksTap = ({tasks, isLoading, isError}: Props) => {
  const navigate = useNavigate();
  const { workspaceId = ''} = useParams();

  if (!workspaceId) {
    navigate("/workspace");
  }

  let content;
  if (isLoading) {
    content = (
      <div className="grid gap-6 max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        <Skeleton className="w-full h-32" />
        <Skeleton className="w-full h-32" />
        <Skeleton className="w-full h-32" />
      </div>
    );
  } else if (isError) {
      content = <p>An Unexpected error occured.</p>;
  } else {
    if (tasks.length > 0) {
      content = tasks.map((task) => {
        return <TaskExcerpt key={task.id} taskData={task} />;
      });
    } else {
      content = <p>No Task Available! Create one to get Started!</p>;
    }
  }
  return (
    // <TabsContent value="tasks">
      <div className="flex flex-wrap justify-center gap-6 p-8 bg-gray-50">
        {content}
      </div>
    // </TabsContent>
  );
};

export default TasksTap;
