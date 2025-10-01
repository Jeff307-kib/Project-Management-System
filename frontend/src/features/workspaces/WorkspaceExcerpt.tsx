import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

import type { Workspace } from "@/types/workspace.d";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

interface Props {
  workspace: Workspace;
}

const WorkspaceExcerpt = ({ workspace }: Props) => {
  const navigate = useNavigate();
  const completedTasks = workspace.completedTasks;
  const totalTasks = workspace.taskCount;
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
    navigate(`${workspaceId}/tasks`);
  };

  //hanlde member icon
  const backendURL = "http://localhost/projectManagementSystem/backend/public/";
  const visibleMembers = workspace.members.slice(0, 3);
  const extraCount = workspace.members.length - 3;
  

  return (
    <div
      className="group flex flex-col justify-between rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md w-72 cursor-pointer"
      onClick={clickWorkspace}
    >
      <div className="flex items-start justify-between p-4">
        <div className="space-y-1.5">
          <Tooltip>
            <TooltipTrigger>
              <h3 className="text-lg font-semibold leading-6 tracking-tight ">
                {workspaceName}
              </h3>
            </TooltipTrigger>
            <TooltipContent>
              <p>{workspace.name}</p>
            </TooltipContent>
          </Tooltip>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {/* <button className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100 cursor-pointer">
          <Pin className="h-5 w-5" />
        </button> */}
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
          <div className="flex items-center">
            {visibleMembers.map((member, idx) => (
              <Avatar
                key={member.id}
                className={`h-8 w-8 border-2 border-card ${
                  idx !== 0 ? "-ml-2" : ""
                }`}
              >
                <AvatarImage src={backendURL + member.profile_url} alt={member.username} />
                <AvatarFallback>
                  {member.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}

            {extraCount > 0 && (
              <div className="flex items-center justify-center h-8 w-8 border-2 border-card rounded-full bg-gray-200 text-xs font-medium text-gray-700 -ml-2">
                +{extraCount}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceExcerpt;
