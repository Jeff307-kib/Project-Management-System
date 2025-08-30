import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { MoreVertical } from "lucide-react";

import { useGetTaskByIdQuery } from "@/api/apiSlice";
import TaskModal from "@/features/tasks/TaskModal";
import DeleteButton from "@/features/utils/DeleteButton";
import EditButton from "@/features/utils/EditButton";


const SingleTask = () => {
  const navigate = useNavigate();
  const backendURL = "http://localhost/projectManagementSystem/backend/public";

  const { taskId = '' } = useParams()
  const {
    data, 
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTaskByIdQuery(taskId)
  console.log("Single Task Data: ", data?.data)
  const [open, setOpen] = useState(false)

  const [task, setTask] = useState({
    id: "task-001",
    title: "Design and Implement Single Task Page",
    description:
      "Create a comprehensive layout for the single task page including task details, attachments, comments, and a 'Start Task' button.",
    status: "Not Started",
    priority: "High",
    dueDate: "2025-09-10T12:00:00Z",
    assignees: [
      {
        username: "Jane Doe",
        email: "jane@example.com",
        profile_url: "avatar.jpg",
      },
      {
        username: "John Smith",
        email: "john@example.com",
        profile_url: "avatar2.jpg",
      },
      {
        username: "Alice Lee",
        email: "alice@example.com",
        profile_url: "avatar3.jpg",
      },
    ],
    attachments: [
      { name: "task-specs.pdf", size: "1.2 MB", url: "#" },
      { name: "wireframes.zip", size: "5.5 MB", url: "#" },
    ],
    comments: [
      {
        author: "John Doe",
        comment: "Looking good! Let’s sync up on the due date.",
        timestamp: "2025-08-28T10:00:00Z",
        username: "John Doe",
        profile_url: "avatar2.jpg",
      },
    ],
  });

  const [newComment, setNewComment] = useState("");

  const handleStartTask = () => setTask({ ...task, status: "In Progress" });

  const getStatusClasses = (status: string) => {
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
    setOpen(!open)
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <TaskModal label="Edit" taskOpen={open} setTaskOpen={handleEdit} task={data?.data}/>
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
          <h1 className="text-3xl font-bold text-gray-900">{task.title}</h1>
          <Badge className={`px-3 py-1 ${getStatusClasses(task.status)}`}>
            {task.status}
          </Badge>
          <Badge className="px-3 py-1 bg-red-100 text-red-800">
            {task.priority}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={handleStartTask}
            className="bg-green-600 hover:bg-green-700"
          >
            Start Task
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2 flex flex-col gap-2">
              <EditButton label="Task" onClick={handleEdit}/>
              <DeleteButton label="Task" id={Number(taskId)}/>
              <Button variant="default">Mark Complete</Button>
            </PopoverContent>
          </Popover>
        </div>
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
              <p className="text-gray-700">{task.description}</p>
              <Separator />
              <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Due:</span>
                  <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Priority:</span>
                  <span>{task.priority}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attachments Card */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Attachments</CardTitle>
              <Button size="sm" variant="outline">
                Add Attachment
              </Button>
            </CardHeader>
            <CardContent>
              <ul className="list-disc ml-5 space-y-2">
                {task.attachments.map((file, i) => (
                  <li key={i}>
                    <a
                      href={file.url}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {file.name}
                    </a>{" "}
                    <span className="text-gray-500 text-sm">({file.size})</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Comments Card */}
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>Comments</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto space-y-4">
              {task.comments.map((c, i) => (
                <div key={i} className="flex gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={`${backendURL}/${c.profile_url}`}
                      alt={c.username}
                    />
                    <AvatarFallback>
                      {c.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold">{c.author}</span>
                      <span className="text-gray-400 text-xs">
                        {new Date(c.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">{c.comment}</p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-grow"
              />
              <Button className="w-full sm:w-auto mt-2 sm:mt-0">Post</Button>
            </CardFooter>
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
              <Calendar
                mode="single"
                selected={new Date(task.dueDate)}
                className="w-full"
              />
            </CardContent>
          </Card>

          {/* Assignees */}
          <Card>
            <CardHeader>
              <CardTitle>Assigned Members</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {task.assignees.map((member, idx) => (
                <div key={idx} className="flex items-center gap-2">
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SingleTask;
