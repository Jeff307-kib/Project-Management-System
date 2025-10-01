import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useGetTasksQuery } from "@/api/apiSlice";
import { useGetmemberPeformanceQuery } from "@/api/apiSlice";
import { useParams } from "react-router-dom";
import type { Task } from "@/types/tasks.d";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const MemberPerformanceTable = () => {
  const { workspaceId } = useParams();

  const { data: tasksRes } = useGetTasksQuery(workspaceId!);

  const { data: performanceData } = useGetmemberPeformanceQuery(workspaceId!);
  console.log("Member Performance", performanceData?.data);
  return (
      <Table  className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/7">#</TableHead>
            <TableHead className="w-1/7">Member</TableHead>
            <TableHead className="w-1/7">Assigned</TableHead>
            <TableHead className="w-1/7">Completed</TableHead>
            <TableHead className="w-1/7">Rejections</TableHead>
            <TableHead className="w-1/7">Completion Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {performanceData?.data.map((data, index) => {
            const assignedTasks =
              tasksRes?.data?.filter((task: Task) =>
                task.members.some((m) => m.id === data.id)
              ) || [];

            return (
              <TableRow key={data.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data.MemberName}</TableCell>

                {/* Assigned column with popover */}
                <TableCell>
                  <Popover>
                    <PopoverTrigger className="flex items-center gap-1 text-blue-500 hover:underline cursor-pointer">
                      <span>{data.TasksAssigned}</span>
                      <ChevronDown size={16} className="text-blue-500" />
                    </PopoverTrigger>
                    {assignedTasks.length > 0 && (
                      <PopoverContent className="w-64">
                        <ul className="list-disc list-inside space-y-1">
                          {assignedTasks.map((task) => (
                            <li key={task.id} className="truncate">
                              <Link
                                to={`/workspace/${workspaceId}/tasks/${task.id}`}
                                className="text-blue-500 hover:underline"
                              >
                                {task.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </PopoverContent>
                    )}
                  </Popover>
                </TableCell>

                <TableCell>{data.TasksCompleted}</TableCell>
                <TableCell>{data.TasksRejected}</TableCell>
                <TableCell>{data.CompletionRate}%</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
  );
};

export default MemberPerformanceTable;
