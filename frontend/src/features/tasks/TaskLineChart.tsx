import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
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
import { useGetTasksQuery } from "@/api/apiSlice";
import type { Task } from "@/types/tasks.d";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type Props = {
    workspaceId: string,
}

const TaskLineChart = ({workspaceId}:Props) => {
  const { data: tasks } = useGetTasksQuery(workspaceId);
  const [page, setPage] = useState(0);
  const tasksPerPage = 6;

  const processDataForChart = (data: Task[] = []) => {
    if (!Array.isArray(data)) return [];

    const monthlyData: Record<string, any> = {};
    const minYear = Math.min(
      ...data.map((t) => new Date(t.due_date).getFullYear())
    );
    const maxYear = Math.max(
      ...data.map((t) => new Date(t.due_date).getFullYear())
    );
    console.log("min  year", minYear)
    console.log("max  year", maxYear)

    // Initialize months
    for (let year = minYear; year <= maxYear; year++) {
      for (let month = 0; month < 12; month++) {
        const key = `${MONTHS[month]} ${year}`;
        monthlyData[key] = {
          totalTasks: 0,
          completedTasks: 0,
          completionRate: 0,
          name: MONTHS[month],
        };
      }
    }

    // Count tasks
    data.forEach((task) => {
      const date = new Date(task.due_date);
      const year = date.getFullYear();
      const monthIndex = date.getMonth();
      const key = `${MONTHS[monthIndex]} ${year}`;
      if (monthlyData[key]) {
        monthlyData[key].totalTasks += 1;
        if (task.status === "Completed") monthlyData[key].completedTasks += 1;
      }
    });

    // Convert to chart array and filter months with tasks
    return Object.keys(monthlyData)
      .filter((key) => monthlyData[key].totalTasks > 0)
      .map((key) => {
        const monthData = monthlyData[key];
        return {
          ...monthData,
          completionRate: Math.round(
            (monthData.completedTasks / monthData.totalTasks) * 100
          ),
          fullLabel: key,
        };
      });
  };

  // Use tasks if loaded, otherwise fallback to mockTasks
  const allChartData = processDataForChart(tasks?.data);

  const startIndex = page * tasksPerPage;
  const endIndex = Math.min(startIndex + tasksPerPage, allChartData.length);
  const displayedData = allChartData.slice(startIndex, endIndex);

  const handleNext = () => {
    if (endIndex < allChartData.length) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  const currentStartDate = displayedData[0]?.fullLabel || "N/A";
  const currentEndDate = displayedData[displayedData.length - 1]?.fullLabel || "N/A";

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Monthly Completion Rate</CardTitle>
          <CardDescription>
            Percentage of tasks completed each month.
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
            {`${currentStartDate} - ${currentEndDate}`}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={endIndex >= allChartData.length}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={displayedData}>
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
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              formatter={(value) => [`${value}%`, "Completion Rate"]}
            />
            <Line
              type="monotone"
              dataKey="completionRate"
              stroke="#8884d8"
              name="Completion Rate"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TaskLineChart;
