import SummaryCard from "@/features/tasks/SummaryCard";
import RejectionReasonModal from "@/features/workspaces/RejectionReasonModal";
import { SuccessToast } from "@/features/utils/SuccessToast";
import { ErrorToast } from "@/features/utils/ErrorToast";
import TaskLineChart from "@/features/tasks/TaskLineChart";
import TasksByAssignee from "@/features/tasks/TasksByAssignee";
import PriorityPieChart from "@/features/tasks/PriorityPieChart";
import MemberPerformanceTable from "./MemberPerformanceTable";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { useParams, Link } from "react-router-dom";
import { useGetTasksQuery } from "@/api/apiSlice";
import { useUpdateTaskStatusMutation } from "@/api/apiSlice";
import { useState } from "react";

const ReportTab = () => {
  const { workspaceId = "" } = useParams();

  const { data: tasks } = useGetTasksQuery(workspaceId);

  const totalTasks = tasks?.data.length;
  const completedTasks = tasks?.data.filter((task) => {
    return task.status === "Completed";
  }).length;
  const pendingTasks =
    tasks?.data.filter((task) => {
      return task.status === "Pending";
    }) ?? [];
  const pendingCount = pendingTasks.length;

  //Hanle Pending Taks Table
  const [showAll, setShowAll] = useState(false);

  const visiblePendingTasks = showAll ? pendingTasks : pendingTasks.slice(0, 5);

  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  //Handle Approve Task
  const handleTaskApprove = async (taskId: string) => {
    try {
      await updateTaskStatus({
        taskId: taskId,
        status: "Completed",
        workspaceId: workspaceId,
      }).unwrap();
      SuccessToast("Task Status Updated!", "Task is Completed!");
    } catch (err) {
      console.error(err);
      ErrorToast("Failed to Update Task Status!");
    }
  };

  //Handle Reject Task
  const [rejectOpen, setRejectOpen] = useState(false);

  const handleRejectOpen = () => {
    setRejectOpen(!rejectOpen);
  };

  return (
    <div className="p-2">
      {/* Workspace Summary */}
      <div className="flex flex-col gap-4 md:flex-row md:gap-4">
        <SummaryCard
          title="Total Tasks"
          count={Number(totalTasks)}
          color="blue"
        />
        <SummaryCard
          title="Completed Tasks"
          count={Number(completedTasks)}
          color="green"
        />
        <SummaryCard
          title="Pending Tasks"
          count={Number(pendingCount)}
          color="red"
        />
      </div>

      {/* Pending Tasks Table */}
      <div className="my-6">
        <h2 className="text-lg font-semibold mb-4">Pending Tasks</h2>
        <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-gray-800">
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Task Name</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visiblePendingTasks.length > 0 ? (
                visiblePendingTasks.map((task, index) => (
                  <TableRow
                    key={task.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <TableCell>{index + 1}</TableCell>
                    <Link to={`/workspace/${workspaceId}/tasks/${task.id}`} className="text-blue-500 hover:underline cursor-pointer"><TableCell className="font-medium">{task.title}</TableCell></Link>
                    <TableCell>
                      {new Date(task.due_date).toLocaleDateString() ?? "—"}
                    </TableCell>
                    <TableCell>{task.priority_level ?? "Normal"}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleTaskApprove(task.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={handleRejectOpen}
                      >
                        Reject
                      </Button>
                    </TableCell>
                    <RejectionReasonModal
                      rejectOpen={rejectOpen}
                      handleRejectOpen={handleRejectOpen}
                      taskId={task.id}
                      workspaceId={workspaceId}
                    />
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No Pending Tasks
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Expand / Collapse button */}
          {pendingTasks.length > 5 && (
            <div className="border-t border-gray-200 dark:border-gray-700">
              <Button
                size="sm"
                variant="outline"
                className="w-full rounded-none"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll
                  ? "Collapse table"
                  : `Show all ${pendingTasks.length} pending tasks`}
              </Button>
            </div>
          )}
        </div>
      </div>
      <TaskLineChart workspaceId={workspaceId} />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <TasksByAssignee workspaceId={workspaceId} />
        <PriorityPieChart workspaceId={workspaceId} />
      </div>
      <div className="my-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <MemberPerformanceTable />
      </div>
    </div>
  );
};

export default ReportTab;
