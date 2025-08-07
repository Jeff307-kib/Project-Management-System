// import { AppWindowIcon, CodeIcon } from "lucide-react";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddButton from "../utils/AddButton";
import SearchBox from "../utils/SearchBox";
import EditButton from "./EditButton";
import WorkspaceModal from "@/features/workspaces/WorkspaceModal";
import { useGetWorkspaceByIdQuery } from "@/api/apiSlice";
import { useParams } from "react-router-dom";
import TasksTap from "../tasks/TasksTap";
import { MoreVertical } from "lucide-react";
import DeleteButton from "@/features/utils/DeleteButton";

const WorkspaceDashboard = () => {
  const { workspaceId } = useParams();
  const workspaceIdNumber = Number(workspaceId);

  console.log(workspaceId);
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

  let workspaceName;
  if (data?.data.name) {
    workspaceName = data?.data.name.substring(0, 45) + "...";
  } else {
    workspaceName = data?.data.name;
  }
  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <Tabs defaultValue="tasks">
        <div className=" w-full flex justify-end p-2">
          <h1 className="text-2xl text-center font-semibold mr-4">
            {workspaceName}
          </h1>
          {/* <EditButton onClick={handleAdd} />
          <AddButton label="Task" onClick={handle}/> */}

          <WorkspaceModal
            isOpen={isOpen}
            setOpen={setOpen}
            workspace={data.data}
            label={label}
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
              <AddButton label="Task" onClick={handleAdd} />
              <EditButton onClick={handleAdd} />
              {/* <Button
                variant="ghost"
                className="justify-start gap-2 text-destructive"
              >
                <Trash2 className="w-4 h-4" />
                Delete Workspace
              </Button> */}
              <DeleteButton label="Workspace" id={workspaceIdNumber}/>
            </PopoverContent>
          </Popover>
        </div>
        <TasksTap />
        <TabsContent value="members">
          <Card className="border-0 rounded-none shadow-none">
            <CardHeader>
              <CardTitle>Members</CardTitle>
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
      content = <p>Error: {error.status}</p>;
    } else {
      content = <p>An unexpected error occurred.</p>;
    }
  }
  return <div className="flex w-full flex-col gap-6"> {content}</div>;
};

export default WorkspaceDashboard;
