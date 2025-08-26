import { useState } from "react";
import { MoreVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AddButton from "@/features/utils/AddButton";
import SearchBox from "@/features/utils/SearchBox";
import EditButton from "@/features/utils/EditButton";
import WorkspaceModal from "@/features/workspaces/WorkspaceModal";
import DeleteButton from "@/features/utils/DeleteButton";
import TasksTap from "@/features/tasks/TasksTap";
import MembersTab from "@/features/users/MembersTab";
import TaskModal from "@/features/tasks/TaskModal";

import { useGetWorkspaceByIdQuery } from "@/api/apiSlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const WorkspaceDashboard = () => {
  const navigate = useNavigate();
  const { workspaceId } = useParams();
  const workspaceIdNumber = Number(workspaceId);

  // console.log(workspaceId);
  const { data, isLoading, isError, error, isSuccess } =
    useGetWorkspaceByIdQuery(workspaceIdNumber);

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
    setIsTaskOpen(true)
  }

  const setTaskOpen = () => {
    setIsTaskOpen(!isTaskOpen)
  }

  let workspaceName;
  const name = data?.data?.name;
  if (name && name.length > 45) {
    workspaceName = name.substring(0, 45) + "...";
  } else {
    workspaceName = name;
  }

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <Tabs defaultValue="tasks">
        <div className=" w-full flex justify-end p-2">
          <Tooltip>
            <TooltipTrigger>
              <Link to='/workspace'>
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
            <TabsTrigger value="report">Report</TabsTrigger>
          </TabsList>
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
        </div>
        <TasksTap />
        <MembersTab />
        <TabsContent value="report">
          <Card className="border-0 rounded-none shadow-none">
            <CardHeader>
              <CardTitle>Report</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    );
  } else if (isError) {
    if ("status" in error) {
      if (error.status == 'CUSTOM_ERROR') {
        navigate('/registration')
      }
      content = <p>Error: {error.status}</p>;
    } else {
      content = <p>An unexpected error occurred.</p>;
    }
  }
  return <div className="flex w-full flex-col gap-6"> {content}</div>;
};

export default WorkspaceDashboard;
