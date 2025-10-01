import { useState } from "react";
import { isPast, isToday, isTomorrow, differenceInDays } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@radix-ui/react-tooltip";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, Flame, Calendar } from "lucide-react";

// For demonstration, these mock tasks have different statuses and deadlines.
const MOCK_TASKS = [
  {
    id: "1",
    name: "Finalize Project Proposal",
    description: "Prepare the final document and presentation for review.",
    status: "In Progress",
    deadline: "2025-08-27T10:00:00Z",
    members: [
      { name: "John Doe", avatar: "https://github.com/shadcn.png", initials: "JD" },
      { name: "Jane Smith", avatar: "https://github.com/lead-dev.png", initials: "JS" },
    ],
  },
  {
    id: "2",
    name: "Review Q3 Marketing Strategy",
    description: "Analyze campaign performance and suggest improvements.",
    status: "To Do",
    deadline: "2025-08-28T17:00:00Z",
    members: [
      { name: "Emily White", avatar: "https://github.com/designer.png", initials: "EW" },
    ],
  },
  {
    id: "3",
    name: "Bug Fixes for Production Release",
    description: "Address critical issues found in testing before deployment.",
    status: "Completed",
    deadline: "2025-08-20T09:00:00Z", // A past date to show "Completed" state
    members: [
      { name: "John Doe", avatar: "https://github.com/shadcn.png", initials: "JD" },
      { name: "Jane Smith", avatar: "https://github.com/lead-dev.png", initials: "JS" },
      { name: "Emily White", avatar: "https://github.com/designer.png", initials: "EW" },
    ],
  },
  {
    id: "4",
    name: "Organize Team Social Event",
    description: "Book a venue and send out invitations to the team.",
    status: "To Do",
    deadline: "2025-10-15T18:00:00Z", // A long-term task
    members: [
      { name: "Jane Smith", avatar: "https://github.com/lead-dev.png", initials: "JS" },
    ],
  },
  {
    id: "5",
    name: "Organize Team Social Event",
    description: "Book a venue and send out invitations to the team.",
    status: "To Do",
    deadline: "2025-08-15T18:00:00Z", 
    members: [
      { name: "Jane Smith", avatar: "https://github.com/lead-dev.png", initials: "JS" },
    ],
  },
];

const getStatusBadgeVariant = (status) => {
  switch (status) {
    case "To Do":
      return "outline";
    case "In Progress":
      return "default";
    case "Completed":
      return "outline";
    default:
      return "outline";
  }
};

// This is the reusable component for a single task card.
function TaskCard({ task }) {
  const deadlineDate = new Date(task.deadline);
  const now = new Date();
  const daysUntilDeadline = differenceInDays(deadlineDate, now);
  const isApproaching = daysUntilDeadline < 3 && daysUntilDeadline >= 0;
  const isOverdue = isPast(deadlineDate) && task.status !== "Completed";

  const getDeadlineText = () => {
    if (isOverdue) {
      return "Overdue";
    }
    if (isToday(deadlineDate)) {
      return "Today";
    }
    if (isTomorrow(deadlineDate)) {
      return "Tomorrow";
    }
    if (task.status === "Completed") {
      return "Completed";
    }
    return `Due in ${daysUntilDeadline} days`;
  };

  const getDeadlineIcon = () => {
    if (isOverdue) {
      return <Flame className="w-3.5 h-3.5 text-red-500" />;
    }
    if (task.status === "Completed") {
      return <CheckCircle className="w-3.5 h-3.5 text-green-500" />;
    }
    if (isApproaching) {
      return <Clock className="w-3.5 h-3.5 text-orange-500" />;
    }
    return <Calendar className="w-3.5 h-3.5 text-muted-foreground" />;
  };

  return (
    <div className="group flex flex-col justify-between rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md w-72 cursor-pointer">
      <div className="flex items-start justify-between p-4">
        <div className="space-y-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <h3 className="text-lg font-semibold leading-6 tracking-tight group-hover:text-primary transition-colors">
                {task.name}
              </h3>
            </TooltipTrigger>
            <TooltipContent>
              <p>{task.description}</p>
            </TooltipContent>
          </Tooltip>
          <p className="text-sm text-muted-foreground">{task.description}</p>
        </div>
        <Badge variant={getStatusBadgeVariant(task.status)}>{task.status}</Badge>
      </div>

      <div className="flex flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
            {getDeadlineIcon()}
            <p className={`${isOverdue ? "text-red-500" : isApproaching ? "text-orange-500" : ""}`}>
              {getDeadlineText()}
            </p>
          </div>
          <div className="flex -space-x-2">
            {task.members.map((member, index) => (
              <Avatar
                key={index}
                className="h-8 w-8 border-2 border-card transition-transform group-hover:scale-110"
              >
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.initials}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App component to render the list of cards
export default function TasksTap() {  
  return (
    <TooltipProvider>
      <div className="flex flex-wrap justify-center gap-6 p-8 bg-gray-50">
        {MOCK_TASKS.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </TooltipProvider>
  );
}
