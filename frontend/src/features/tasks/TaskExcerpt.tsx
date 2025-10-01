import {
  isPast,
  isToday,
  isTomorrow,
  differenceInDays,
  parseISO,
} from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  CheckCircle,
  Flame,
  Calendar,
  ChevronsUp,
  ChevronsDown,
  Star,
} from "lucide-react";

import type { Task } from "@/types/tasks.d";
import { useNavigate } from "react-router-dom";

type Props = {
  taskData: Task;
};

const TaskExcerpt = ({ taskData }: Props) => {
  const navigate = useNavigate();
  const backendURL = "http://localhost/projectManagementSystem/backend/public";

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "To Do":
        return "secondary";
      case "In Progress":
        return "default";
      case "Completed":
        return "outline";
      case "Over Due":
      case "Needs Revision":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getPriorityInfo = (priority: string) => {
    switch (priority) {
      case "high":
        return {
          icon: <ChevronsUp className="w-3.5 h-3.5 text-red-500" />,
          text: "High Priority",
          bg: "bg-destructive",
        };
      case "moderate":
        return {
          icon: <Star className="w-3.5 h-3.5 text-yellow-500" />,
          text: "Medium Priority",
          bg: "bg-yellow-500",
        };
      case "low":
        return {
          icon: <ChevronsDown className="w-3.5 h-3.5 text-green-500" />,
          text: "Low Priority",
          bg: "bg-green-500",
        };
      default:
        return {
          icon: null,
          text: "",
        };
    }
  };

  const priorityInfo = getPriorityInfo(taskData.priority_level);

  const currentDate = new Date();
  const deadlineDate = parseISO(taskData.due_date);
  const daysUntilDeadline = differenceInDays(deadlineDate, currentDate);
  const isApproaching = daysUntilDeadline < 3 && daysUntilDeadline >= 0;
  const isOverdue = isPast(deadlineDate) && taskData.status !== "Completed";

  let deadlineText;
  if (isOverdue) {
    deadlineText = "Overdue";
  } else if (isToday(deadlineDate)) {
    deadlineText = "Today";
  } else if (isTomorrow(deadlineDate)) {
    deadlineText = "Tomorrow";
  } else if (taskData.status === "Completed") {
    deadlineText = "Completed";
  } else {
    deadlineText = `Due in ${daysUntilDeadline} days`;
  }

  let deadlineIcon;
  if (isOverdue) {
    deadlineIcon = <Flame className="w-3.5 h-3.5 text-red-500" />;
  } else if (taskData.status === "Completed") {
    deadlineIcon = <CheckCircle className="w-3.5 h-3.5 text-green-500" />;
  } else if (isApproaching) {
    deadlineIcon = <Clock className="w-3.5 h-3.5 text-orange-500" />;
  } else {
    deadlineIcon = <Calendar className="w-3.5 h-3.5 text-muted-foreground" />;
  }

  return (
    <div
      className="group flex flex-col justify-between rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md w-72 cursor-pointer overflow-hidden"
      onClick={() => navigate(`${taskData.id}`)}
    >
      <div className="flex items-start justify-between p-4">
        <div className="space-y-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <h3 className="text-lg font-semibold leading-6 tracking-tight group-hover:text-primary transition-colors">
                {taskData.title}
              </h3>
            </TooltipTrigger>
            <TooltipContent>
              <p>{taskData.title}</p>
            </TooltipContent>
          </Tooltip>
          <p className="text-sm text-muted-foreground">
            {taskData.description}
          </p>
        </div>
        <Badge variant={getStatusBadgeVariant(taskData.status)}>
          {taskData.status}
        </Badge>
      </div>

      <div className="flex flex-col gap-4 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
            {deadlineIcon}
            <p
              className={`${
                isOverdue
                  ? "text-red-500"
                  : isApproaching
                  ? "text-orange-500"
                  : ""
              }`}
            >
              {deadlineText}
            </p>
          </div>
          {priorityInfo.text && (
            <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              {priorityInfo.icon}
              <p>{priorityInfo.text}</p>
            </div>
          )}
        </div>
        <div className="flex -space-x-2">
          {taskData.members &&
            taskData.members.map((member) => {
              return (
                <Avatar
                  key={member.id}
                  className="h-8 w-8 border-2 border-card transition-transform group-hover:scale-110"
                >
                  <AvatarImage
                    src={`${backendURL}/${member.profile_url}`}
                    alt={member.username}
                  />
                  <AvatarFallback>{member.username.slice(0, 2)}</AvatarFallback>
                </Avatar>
              );
            })}
        </div>
      </div>
      <span className={cn("h-1", priorityInfo && priorityInfo.bg)}></span>
    </div>
  );
};

export default TaskExcerpt;
