import { useState } from "react";
import { MoreVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

import AddButton from "@/features/utils/AddButton";
import SearchBox from "@/features/utils/SearchBox";
import EditButton from "@/features/utils/EditButton";
import WorkspaceModal from "@/features/workspaces/WorkspaceModal";
import DeleteButton from "@/features/utils/DeleteButton";
import TasksTap from "@/features/tasks/TasksTap";
import MembersTab from "@/features/users/MembersTab";
import TaskModal from "@/features/tasks/TaskModal";
import ReportTab from "@/features/workspaces/ReportTab";

import { useGetWorkspaceByIdQuery } from "@/api/apiSlice";
import { Outlet, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const WorkspaceDashboard = () => {
  const navigate = useNavigate();
  const { workspaceId = "", taskId = "" } = useParams();
  const workspaceIdNumber = Number(workspaceId);

  const { data, isLoading, isError, error, isSuccess } =
    useGetWorkspaceByIdQuery(workspaceIdNumber);

  const role = data?.data.role ? data?.data.role : "";

  const [isOpen, setIsOpen] = useState(false);
  const label = "Update";

  const setOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleAdd = () => {
    setIsOpen(true);
  };

  const [isTaskOpen, setIsTaskOpen] = useState(false);

  const handleAddTask = () => {
    setIsTaskOpen(true);
  };

  const setTaskOpen = () => {
    setIsTaskOpen(!isTaskOpen);
  };

  const name = data?.data?.name;
  const workspaceName =
    name && name.length > 45 ? name.substring(0, 45) + "..." : name;

  let content;
  if (isLoading) {
    content = (
      <div className="grid gap-6 max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        <Skeleton className="w-full h-32" />
        <Skeleton className="w-full h-32" />
        <Skeleton className="w-full h-32" />
      </div>
    );
  } else if (isSuccess) {
    content = (
      <Tabs defaultValue="tasks">
        {!taskId && (
          <div className=" w-full flex justify-end p-6 shadow">
            <Tooltip>
              <TooltipTrigger>
                <Link to="/workspace">
                  <h1 className="text-xl text-center font-semibold mr-4">
                    {workspaceName}
                  </h1>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{data.data.name}</p>
              </TooltipContent>
            </Tooltip>
            <WorkspaceModal
              isOpen={isOpen}
              setOpen={setOpen}
              workspace={data.data}
              label={label}
            />
            <TaskModal
              label="Add"
              taskOpen={isTaskOpen}
              setTaskOpen={setTaskOpen}
            />
            <SearchBox />
            <TabsList className="mr-4">
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              { role === 'admin' && <TabsTrigger value="report">Report</TabsTrigger>}
            </TabsList>
            {role === "admin" && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-2 flex flex-col gap-2">
                  <AddButton label="Task" onClick={handleAddTask} />
                  <EditButton label="Workspace" onClick={handleAdd} />
                  <DeleteButton label="Workspace" id={workspaceIdNumber} />
                </PopoverContent>
              </Popover>
            )}
          </div>
        )}
        <TabsContent value="tasks">
          {taskId ? <Outlet context={{role}}/> : <TasksTap />}
        </TabsContent>
        <TabsContent value="members">
          <MembersTab role={role} />
        </TabsContent>

        <TabsContent value="report">
          <ReportTab />
        </TabsContent>
      </Tabs>
    );
  } else if (isError) {
    if ("status" in error) {
      if (error.status == "CUSTOM_ERROR") {
        navigate("/registration");
      }
      content = <p>Error: {error.status}</p>;
    } else {
      content = <p>An unexpected error occurred.</p>;
    }
  }
  return <div className="flex w-full flex-col gap-6"> {content}</div>;
};

export default WorkspaceDashboard;
