import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetMembersQuery } from "@/api/apiSlice";
import { useGetTasksQuery } from "@/api/apiSlice";
import type { Task } from "@/types/tasks.d";
import type { Member } from "@/types/workspace.d";

type Props = {
    workspaceId: string,
}

const TasksByAssignee = ({workspaceId}: Props) => {
  const { data: membersRes } = useGetMembersQuery(workspaceId);
  const { data: tasksRes } = useGetTasksQuery(workspaceId);

  const processDataForMembers = (
    members: Member[] = [],
    tasks: Task[] = []
  ) => {
    const counts: Record<string, number> = {};
    members.forEach((m) => {
      counts[m.id] = 0;
    });

    tasks.forEach((task) => {
      task.members.forEach((assignee) => {
        if (counts[assignee.id] !== undefined) {
          counts[assignee.id] += 1;
        }
      });
    });

    return members.map((m) => ({
      name: m.username,
      taskCount: counts[m.id] || 0,
    }));
  };

  const chartData = processDataForMembers(membersRes?.data || [], tasksRes?.data || []);

  const [page, setPage] = useState(0);
  const membersPerPage = 5;

  const startIndex = page * membersPerPage;
  const endIndex = Math.min(startIndex + membersPerPage, chartData.length);
  const displayedData = chartData.slice(startIndex, endIndex);

  const handleNext = () => {
    if (endIndex < chartData.length) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  const currentStartName = displayedData[0]?.name || "N/A";
  const currentEndName = displayedData[displayedData.length - 1]?.name || "N/A";

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Tasks by Assignee</CardTitle>
          <CardDescription>
            Number of tasks assigned to each member.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            disabled={page === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium text-gray-700 w-32 text-center">
            {`${currentStartName} – ${currentEndName}`}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={endIndex >= chartData.length}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={displayedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip />
            <Bar dataKey="taskCount" fill="#8884d8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TasksByAssignee;
