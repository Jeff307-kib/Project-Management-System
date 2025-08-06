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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddButton from "../utils/AddButton";
import SearchBox from "../utils/SearchBox";
import EditButton from "./EditButton";
import WorkspaceModal from "@/features/workspaces/WorkspaceModal";
import { useGetWorkspaceByIdQuery } from "@/api/apiSlice";
import { useParams } from "react-router-dom";

const WorkspaceDashboard = () => {
  const {   workspaceId } = useParams();
  const workspaceIdNumber = Number(workspaceId)

  console.log(workspaceId)
  const { data, isLoading, isError, error, isSuccess } =
    useGetWorkspaceByIdQuery(workspaceIdNumber);

  const [isOpen, setIsOpen] = useState(false);
  const label = "Update"

  const setOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleAdd = () => {
    setIsOpen(true);
  };
  const handle = () => {
    console.log("hal");
  };

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <Tabs defaultValue="tasks">
        <div className=" w-full flex justify-end p-2">
          <h1 className="text-2xl text-center font-semibold mr-4">
            {data.data.name}
          </h1>
          <EditButton onClick={handleAdd} />
          <AddButton label="Task" onClick={handle}/>
          <WorkspaceModal isOpen={isOpen} setOpen={setOpen} workspace={data.data} label={label}/>
          <SearchBox />
          <TabsList className="">
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="report">Report</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="tasks">
          <Card className="border-0 rounded-none shadow-none">
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Name</Label>
                <Input id="tabs-demo-name" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Username</Label>
                <Input id="tabs-demo-username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="members">
          <Card>
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
          <Card>
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
  return <div className="flex w-full flex-col gap-6"> { content }</div>;
};

export default WorkspaceDashboard;
