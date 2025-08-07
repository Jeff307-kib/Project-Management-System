import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { GripVertical } from "lucide-react";
import type { Workspace } from "@/types/workspace.d";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

interface Props {
  workspace: Workspace;
}

const WorkspaceExcerpt = ({ workspace }: Props) => {
  const navigate = useNavigate();
  const completedTasks = 2;
  const totalTasks = 8;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  const formattedDate = format(new Date(workspace.created_at), "MMM d yyyy");

  let description;
  if (workspace.description != null) {
    description = workspace.description;
  } else {
    description = null;
  }

  let workspaceName;
  if (workspace.name.length > 45) {
    workspaceName = workspace.name.substring(0, 45) + "...";
  } else {
    workspaceName = workspace.name;
  }
  const workspaceId = workspace.id;
  const clickWorkspace = () => {
    navigate(`${workspaceId}`);
  };

  return (
    <div className="group flex flex-col justify-between rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md w-72" onClick={clickWorkspace}>
      <div className="flex items-start justify-between p-4">
        <div className="space-y-1.5">
          <h3 className="text-lg font-semibold leading-6 tracking-tight ">
            {workspaceName}
          </h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <button className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100">
          <GripVertical className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-col gap-4 p-4 pt-0">
        <div>
          <div className="mb-1 flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">
              Progress
            </p>
            <p className="text-xs font-semibold text-foreground">
              {completedTasks}/{totalTasks} tasks
            </p>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground font-medium">
            {formattedDate}
          </p>
          <div className="flex -space-x-2 ">
            <Avatar className="h-8 w-8 border-2 border-card">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="h-8 w-8 border-2 border-card">
              <AvatarImage
                src="https://github.com/lead-dev.png"
                alt="Lead Dev"
              />
              <AvatarFallback>LD</AvatarFallback>
            </Avatar>
            <Avatar className="h-8 w-8 border-2 border-card">
              <AvatarImage
                src="https://github.com/designer.png"
                alt="Designer"
              />
              <AvatarFallback>DS</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceExcerpt;
