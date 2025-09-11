import { X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { PopoverContent } from "@radix-ui/react-popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

import { SuccessToast } from "@/features/utils/SuccessToast";
import { ErrorToast } from "@/features/utils/ErrorToast";
import { useGetNotificationsQuery } from "@/api/apiSlice";
import { useAcceptInviationMutation } from "@/api/apiSlice";
import { useDeclineInvitationMutation } from "@/api/apiSlice";
import { useDeleteNotificationMutation } from "@/api/apiSlice";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { parseISO, formatDistanceToNow } from 'date-fns';

const Notifications = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const userId = user?.id || "";
  const {
    data: response,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotificationsQuery(userId);
  console.log("Notification response: ", response);

  const [acceptInviation] = useAcceptInviationMutation();
  const [declineInvitation] = useDeclineInvitationMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  const handleAccept = async (notificationId: string) => {
    try {
      const res = await acceptInviation(notificationId).unwrap();
      console.log("Success", res);
      SuccessToast("Invitation Accepted!", "You have joined to a workspace!");
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        const typedErr = err as { data?: { error?: string } };
        ErrorToast("Something went wrong!", typedErr.data?.error);
      } else {
        ErrorToast("Something went wrong!");
      }
      console.log("failed", err);
    }
  };

  const handleDecline = async (notificationId: string) => {
    try {
      await declineInvitation(notificationId).unwrap();
      SuccessToast(
        "Invitation Declined!",
        "You have declined to join the workspace."
      );
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        const typedErr = err as { data?: { error?: string } };
        ErrorToast("Something went wrong!", typedErr.data?.error);
      } else {
        ErrorToast("Something went wrong!");
      }
      console.log("failed", err);
    }
  };

  const handleDelete = async (notificationId: string) => {
    try {
      await deleteNotification(notificationId).unwrap();
      SuccessToast("Notification Deleted!");
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        const typedErr = err as { data?: { error?: string } };
        ErrorToast("Something went wrong! ", typedErr.data?.error);
      } else {
        ErrorToast("Something went wrong");
      }
      console.log("failed", err);
    }
  };

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
    const notifications = response?.notifications || [];

    if (notifications.length > 0) {
      content = notifications.map((notification) => {
        const notificationColors = {
          Invitation: "bg-chart-3 text-foreground",
          "Invitation Reply": "bg-chart-3 text-foreground",
          "Task Assign": "bg-chart-2 text-background",
          "Task Update": "bg-chart-2 text-background",
          "Deadline Warning": "bg-chart-5 text-background",
          "Deadline Missed": "bg-destructive text-foreground",
          "Role Change": "bg-chart-3 text-foreground",
        };

        let timeAgo = ''
        const date = parseISO(notification.created_at)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
        return (
          <div
            key={notification.id}
            className={`relative p-4 rounded-md border shadow-sm mb-3 ${
              notificationColors[
                notification.type as keyof typeof notificationColors
              ]
            }`}
          >
            <div className="flex items-center">
              <h4 className="text-sm font-medium text-background">
                {notification.type}
              </h4>
            </div>
            <p className="text-sm text-background my-2">
              {notification.message}
            </p>

            <div className="flex items-baseline justify-between">
              {notification.type === "Invitation" && (
                <div className="flex gap-3">
                  <Button
                    className="bg-chart-2 text-primary-foreground hover:bg-chart-2/90 cursor-pointer"
                    size="sm"
                    onClick={() => handleAccept(notification.id)}
                  >
                    Accept
                  </Button>
                  <Button
                    className="bg-destructive hover:bg-destructive/90 cursor-pointer"
                    size="sm"
                    onClick={() => handleDecline(notification.id)}
                  >
                    Decline
                  </Button>
                </div>
              )}
              <div className="flex justify-end">
                <p className="text-xs text-background/80">{timeAgo}</p>
              </div>
            </div>

            <button
              className="absolute top-2 right-2 p-1 rounded-md text-[var(--color-foreground)] hover:bg-[var(--color-muted)]"
              onClick={() => handleDelete(notification.id)}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      });
    } else {
      content = (
        <p className="text-center text-xs text-muted-foreground">
          No new notifications.
        </p>
      );
    }
  } else if (isError) {
    if ("status" in error) {
      content = <p>Error: {error.status}</p>;
    } else {
      content = <p>An unexpected error occured.</p>;
    }
    console.log(error);
  }
  return (
    <PopoverContent className="z-50 absolute top-0 right-0 w-[50rem] rounded-lg border bg-popover p-4 text-popover-foreground shadow-lg outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Notifications</h3>
        <ScrollArea className="h-[400px] p-2">{content}</ScrollArea>
      </div>
    </PopoverContent>
  );
};

export default Notifications;
