import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useGetTasksQuery } from "@/api/apiSlice";
import type { Task } from "@/types/tasks.d";

const COLORS = ["#ff4d4f", "#faad14", "#52c41a"]; // High: red, Medium: orange, Low: green

interface PriorityPieChartProps {
  workspaceId: string;
}

const PriorityPieChart = ({ workspaceId }: PriorityPieChartProps) => {
  const { data: tasksRes, isLoading, isError } = useGetTasksQuery(workspaceId);

  const tasks: Task[] = tasksRes?.data || [];

  const processPriorityData = (tasks: Task[] = []) => {
    const counts: Record<string, number> = {};
    tasks.forEach((task) => {
      const priority = task.priority_level || "Normal";
      counts[priority] = (counts[priority] || 0) + 1;
    });
    return Object.keys(counts).map((key) => ({
      name: key,
      value: counts[key],
    }));
  };

  const chartData = processPriorityData(tasks);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading tasks.</p>;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Priority Distribution</CardTitle>
        <CardDescription>Number of tasks by priority level.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => [`${value} tasks`, "Tasks"]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PriorityPieChart;
