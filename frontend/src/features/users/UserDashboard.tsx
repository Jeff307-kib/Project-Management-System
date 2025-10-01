import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ListFilter } from "lucide-react";
import { useNavigate } from "react-router-dom";

import SummaryCard from "@/features/tasks/SummaryCard";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { useGetUserTasksQuery } from "@/api/apiSlice";
import { useState } from "react";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const userId = user?.id ?? "";

  const {
    data: tasks,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetUserTasksQuery(userId);

  //summary card count
  const totalAssignedTasks = Number(tasks?.data.length);
  const completedTasks = Number(
    tasks?.data.filter((task) => task.status === "Completed").length
  );
  const tasksNearDeadline = Number(
    tasks?.data.filter((task) => {
      const due = new Date(task.due_date).getTime();
      return due >= Date.now() || due <= Date.now() + 3 * 24 * 60 * 60 * 1000;
    }).length
  );
  const tasksNeedRevision = Number(
    tasks?.data.filter((task) => task.status === "Needs Revision").length
  );

  //handle filter
  const [filterType, setFilterType] = useState("All");

  const filteredTasks = tasks?.data.filter((task) => {
    const today = new Date();
    const dueDate = new Date(task.due_date);

    switch (filterType) {
      case "Due Today": {
        return dueDate.toDateString() === today.toDateString();
      }
      case "Due Tomorrow": {
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return dueDate.toDateString() === tomorrow.toDateString();
      }
      case "Due in 3 Days": {
        const threeDaysLater = new Date(today);
        threeDaysLater.setDate(today.getDate() + 3);
        return dueDate >= today || dueDate <= threeDaysLater;
      }
      case "High Priority": {
        return task.priority_level === "High";
      }
      case "Needs Revision": {
        return task.status === "Needs Revision";
      }
      case "Completed": {
        return task.status === "Completed";
      }
      default: {
        return true;
      }
    }
  });

  let content;
  if (isLoading) {
    content = (
      <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        <TableCell colSpan={7} className="text-center py-4">
          Loading....
        </TableCell>
      </TableRow>
    );
  } else if (isSuccess) {
    if (tasks.data.length > 0) {
      content = filteredTasks?.map((task, index) => {
        return (
          <TableRow
            key={task.id}
            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <TableCell>{index + 1}</TableCell>
            <TableCell className="font-medium">{task.title}</TableCell>
            <TableCell>{task.priority_level}</TableCell>
            <TableCell>{task.status}</TableCell>
            <TableCell>
              {new Date(task.due_date).toLocaleDateString() ?? "—"}
            </TableCell>
            <TableCell>{task.workspace_name}</TableCell>
            <TableCell>
              <Button
                size="sm"
                variant="outline"
                className="cursor-pointer"
                onClick={() =>
                  navigate(
                    `/workspace/${task.workspace_id}/tasks/${task.task_id}`
                  )
                }
              >
                View
              </Button>
            </TableCell>
          </TableRow>
        );
      });
    } else {
      content = (
        <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <TableCell colSpan={7} className="text-center py-4">
            You have no task Assigned!
          </TableCell>
        </TableRow>
      );
    }
  } else if (isError) {
    console.error("Unepxted Error Occured!", error);
    content = (
      <TableRow>
        <TableCell colSpan={7} className="text-center py-4">
          Unepxted Error Occured!
        </TableCell>
      </TableRow>
    );
  }
  return (
    <div className="p-4">
      <Button
        type="button"
        variant="ghost"
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-sm text-gray-500 transition-colors cursor-pointer mb-2"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Go Back</span>
      </Button>
      <div className="grid grid-cols-4 sm:grid-cols-2 gap-4 md:grid-cols-4 md:gap-4 mb-6">
        <SummaryCard
          title="Total Assigned Tasks"
          count={totalAssignedTasks}
          color="blue"
        />
        <SummaryCard
          title="Tasks Completed"
          count={completedTasks}
          color="green"
        />
        <SummaryCard
          title="Tasks Near Deadline"
          count={tasksNearDeadline}
          color="red"
        />
        <SummaryCard
          title="Tasks Needs Revision"
          count={tasksNeedRevision}
          color="gray"
        />
      </div>
      <div className="flex items-center justify-between mb-2 gap-2">
        <h2 className="font-bold text-2xl">Your Assign Tasks</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <ListFilter />
              <span>{filterType}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterType("All")}>
              All
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setFilterType("Due Today")}>
              Due Today
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setFilterType("Due Tomorrow")}>
              Due Tomorrow
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setFilterType("Due in 3 Days")}>
              Due in 3 Days
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setFilterType("High Priority")}>
              High Priority
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setFilterType("Needs Revision")}>
              Needs Revision
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setFilterType("Completed")}>
              Completed
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-800">
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Task Name</TableHead>
              <TableHead>Pririty</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Workspace Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{content}</TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserDashboard;
