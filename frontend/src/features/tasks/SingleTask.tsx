import { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { MoreVertical } from "lucide-react";

import { useGetTaskByIdQuery } from "@/api/apiSlice";
import { useStartTaskMutation } from "@/api/apiSlice";
import TaskModal from "@/features/tasks/TaskModal";
import DeleteButton from "@/features/utils/DeleteButton";
import EditButton from "@/features/utils/EditButton";
import AddAttachmentModal from "@/features/tasks/AddAttachmentModal";
import type { RootState } from "@/app/store";
import { useSelector } from "react-redux";

type OutletContextType = {
  role: string;
};

const SingleTask = () => {
  const navigate = useNavigate();
  const backendURL = "http://localhost/projectManagementSystem/backend/public";
  const { role } = useOutletContext<OutletContextType>();
  const { user } = useSelector((state: RootState) => state.auth);
  const userId = user?.id ? user.id : ''
  const { taskId = "" } = useParams();

  const { data, isLoading, isSuccess, isError, error } =
    useGetTaskByIdQuery(taskId);
  const [startTask, { isLoading: starting }] = useStartTaskMutation();

  const [open, setOpen] = useState(false);
  const [fileOpen, setFileOpen] = useState(false)

  const isMember = data?.data.members.some((member) => member.id === userId);

  const getStatusClasses = (status: string | undefined) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleEdit = () => {
    setOpen(!open);
  };

  const handleStart = () => {
    startTask(taskId);
  };

  const handleFile = () => {
    setFileOpen(!fileOpen)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-gray-50 p-6 gap-6">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 bg-white shadow rounded-lg animate-pulse">
          <div className="flex flex-row items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-64 rounded" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-10 w-32 rounded" />
            <Skeleton className="h-10 w-10 rounded" />
          </div>
        </div>

        {/* Main Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column Skeletons */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <Card className="animate-pulse">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-24" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Separator />
                <div className="flex flex-wrap gap-4">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </CardContent>
            </Card>

            <Card className="animate-pulse">
              <CardHeader className="flex items-center justify-between">
                <CardTitle>
                  <Skeleton className="h-6 w-28" />
                </CardTitle>
                <Skeleton className="h-8 w-32" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>

            <Card className="flex flex-col h-full animate-pulse">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-28" />
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow overflow-y-auto space-y-4">
                <div className="flex gap-3 items-center">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <Skeleton className="flex-grow h-10 w-full" />
                <Skeleton className="w-full sm:w-20 h-10" />
              </CardFooter>
            </Card>
          </div>

          {/* Right Column Skeletons */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <Card className="animate-pulse">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-32" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>

            <Card className="animate-pulse">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-32" />
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  } else if (isSuccess) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-gray-50">
        <TaskModal
          label="Edit"
          taskOpen={open}
          setTaskOpen={handleEdit}
          task={data?.data}
        />
        <AddAttachmentModal open={fileOpen} setOpen={handleFile} taskId={taskId} userId={userId}/>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 bg-white shadow">
          <div className="flex flex-row items-center gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-sm text-gray-500 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Go Back</span>
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.data.title}
            </h1>
            <Badge
              className={`px-3 py-1 ${getStatusClasses(data?.data.status)}`}
            >
              {data?.data.status}
            </Badge>
            <Badge className="px-3 py-1 bg-red-100 text-red-800">
              {data?.data.priority_level}
            </Badge>
          </div>
          {isMember && (
            <div className="flex flex-wrap gap-2">
              {data.data.status === "To Do" ? (
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleStart}
                >
                  {starting ? "Starting" : "Start Task"}
                </Button>
              ) : (
                <></>
              )}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-2 flex flex-col gap-2">
                  {role === "admin" && (
                    <>
                      <EditButton label="Task" onClick={handleEdit} />
                      <DeleteButton label="Task" id={Number(taskId)} />
                    </>
                  )}
                  <Button variant="default">Mark Complete</Button>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Left Column */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {/* Details Card */}
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{data?.data.description}</p>
                <Separator />
                <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Due:</span>
                    <span>
                      {new Date(data?.data.due_date ?? "").toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Priority:</span>
                    <span>{data?.data.priority_level}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attachments Card */}
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Attachments</CardTitle>
                {isMember && (
                  <Button size="sm" variant="outline" onClick={handleFile}>
                    Add Attachment
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <ul className="list-disc ml-5 space-y-2">
                  <li key="1">
                    <a
                      href="#"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Attachment File
                    </a>{" "}
                    <span className="text-gray-500 text-sm">1.2 MB</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Comments Card */}
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Comments</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow overflow-y-auto space-y-4">
                <div key="1" className="flex gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold">Shad Cn</span>
                      <span className="text-gray-400 text-xs">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">
                      "Looking good! Let’s sync up on the due date."
                    </p>
                  </div>
                </div>
                <div key="2" className="flex gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold">Shad Cn</span>
                      <span className="text-gray-400 text-xs">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">
                      "Looking good! Let’s sync up on the due date."
                    </p>
                  </div>
                </div>
              </CardContent>
              {isMember && (
                <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <Textarea
                    placeholder="Add a comment..."
                    className="flex-grow"
                  />
                  <Button className="w-full sm:w-auto mt-2 sm:mt-0">
                    Post
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>

          {/* Right Column */}
          <div className="md:col-span-1 flex flex-col gap-6">
            {/* Calendar Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Task Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" className="w-full" />
              </CardContent>
            </Card>

            {/* Assignees */}
            <Card>
              <CardHeader>
                <CardTitle>Assigned Members</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {data?.data.members.map((member) => (
                  <div key={member.id} className="flex items-center gap-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={`${backendURL}/${member.profile_url}`}
                        alt={member.username}
                      />
                      <AvatarFallback>
                        {member.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{member.username}</span>
                      <span className="text-gray-500 text-sm">
                        {member.email}
                      </span>
                    </div>
                  </div>
                ))}
                {data?.data.members.length == 0 && (
                  <div>No assigned members</div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  } else if (isError) {
    if ("status" in error) {
      if (error.status == "CUSTOM_ERROR") {
        navigate("/registration");
      }
      return <p>Error: {error.status}</p>;
    } else {
      return <p>An unexpected error occurred.</p>;
    }
  }
};

export default SingleTask;
