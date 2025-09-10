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
import { useUpdateTaskStatusMutation } from "@/api/apiSlice";
import { useAddCommentMutation } from "@/api/apiSlice";
import TaskModal from "@/features/tasks/TaskModal";
import DeleteButton from "@/features/utils/DeleteButton";
import EditButton from "@/features/utils/EditButton";
import AddAttachmentModal from "@/features/tasks/AddAttachmentModal";
import { SuccessToast } from "@/features/utils/SuccessToast";
import { ErrorToast } from "@/features/utils/ErrorToast";
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
  const userId = user?.id ? user.id : "";
  const { taskId = "" } = useParams()
  const { workspaceId = ""} = useParams()

  const { data, isLoading, isSuccess, isError, error } =
    useGetTaskByIdQuery(taskId);
  const [ updateTaskStatus, { isLoading: starting }] = useUpdateTaskStatusMutation();

  const [open, setOpen] = useState(false);
  const [fileOpen, setFileOpen] = useState(false);

  const attachments = data?.data.attachments; //attachments array
  const members = data?.data.members; //members array
  const comments = data?.data.comments; //comments array

  const isMember = data?.data.members.some((member) => member.id === userId);
  console.log("ismember", isMember)

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

  //handle the add attachment and post comment button (diable when the task hasn't started, when the task is pending and completed)
  const isActionDisabled = data?.data.status === 'To Do' || data?.data.status === 'Pending' || data?.data.status === 'Completed'

  const getAttachmentUploadMember = (id: string) => {
    const uploadBy = members?.find((member) => member.id === id);
    return uploadBy?.username || "Workspace Admin";
  };

  const handleEdit = () => {
    setOpen(!open);
  };

  const handleStatus = (status: string) => {
    updateTaskStatus({taskId, status, workspaceId})
  };

  const handleFile = () => {
    setFileOpen(!fileOpen);
  };

  //handle comments
  const [commentText, setCommentText] = useState("");
  const [addComment, { isLoading: isCommenting }] = useAddCommentMutation();

  const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addComment({
        commentText: commentText,
        userId: userId,
        taskId: taskId,
        workspaceId: workspaceId,
      }).unwrap();
      setCommentText("");
      SuccessToast("Comment Added");
    } catch (err) {
      console.error(err);
      if (err && typeof err === "object" && "data" in err) {
        const typedErr = err as { data?: { error?: string } };
        ErrorToast("Comment Failed!", `${typedErr.data?.error}`);
      } else {
        ErrorToast("Commnet Failed!", "An Unexpected Error Occured!");
      }
    }
  };

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
        <AddAttachmentModal
          open={fileOpen}
          setOpen={handleFile}
          taskId={taskId}
          userId={userId}
          workspaceId={workspaceId}
        />
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
          {(isMember || role === 'admin') && (
            <div className="flex flex-wrap gap-2">
              {data.data.status === "To Do" ? (
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleStatus('In Progress')}
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
                  <Button variant="default" onClick={() => handleStatus('Pending')} disabled = {data.data.status === 'To Do' || data.data.status === 'Pending'}>Mark Complete</Button>
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
                {(isMember || role === 'admin') && (
                  <Button size="sm" variant="outline" onClick={handleFile} disabled={isActionDisabled}>
                    Add Attachment
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <ul className="list-disc ml-5 space-y-4">
                  {attachments?.length === 0 ? (
                    <li className="text-gray-500">No attachments found.</li>
                  ) : (
                    attachments?.map((attachment) => (
                      <li key={attachment.id} className="relative">
                        <div className="flex items-center space-x-2">
                          <a
                            href={`${backendURL}/${attachment.file_path}`}
                            download
                            target="_blank"
                            className="text-blue-600 hover:underline font-medium break-all"
                          >
                            {attachment.file_name}
                          </a>{" "}
                          <span className="text-gray-500 text-sm">
                            ({attachment.file_size} MB)
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-500 text-xs mt-1">
                          <span>
                            Uploaded by{" "}
                            {getAttachmentUploadMember(attachment.uploaded_by)}
                          </span>
                          <span>•</span>
                          <span>
                            {new Date(
                              attachment.uploaded_at
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </CardContent>
            </Card>

            {/* Comments Card */}
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Comments</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow overflow-y-auto space-y-4">
                {comments?.length === 0 && <p>No comment yet!</p>}
                {comments?.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src= {`${backendURL}/${comment.user.profile_url}`}
                        alt={comment.user.username}
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-semibold">{comment.user.username}</span>
                        <span className="text-gray-400 text-xs">
                          {new Date(
                              comment.updated_at
                            ).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">
                        {comment.comment_text}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
              {(isMember || role === 'admin') && (
                <form onSubmit={handleComment}>
                  <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <Textarea
                      placeholder="Add a comment..."
                      className="flex-grow"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      required
                    />
                    <Button
                      className="w-full sm:w-auto mt-2 sm:mt-0"
                      type="submit"
                      disabled={isActionDisabled}
                    >
                      {isCommenting ? "Posting" : "Post"}
                    </Button>
                  </CardFooter>
                </form>
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
                {members?.map((member) => (
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
                {members?.length == 0 && <div>No assigned members</div>}
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
