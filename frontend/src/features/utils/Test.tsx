import { X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { PopoverContent } from "@radix-ui/react-popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useGetNotificationsQuery } from "@/api/apiSlice";
import { Bell } from "lucide-react";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";

const Test = () => {
  const {
    data: response,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotificationsQuery();

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
          "Task Assign": "bg-chart-2 text-background",
          "Deadline Warning": "bg-chart-5 text-background",
          "Deadline Missed": "bg-destructive text-foreground",
        };
        return (
          <div
            key={notification.id}
            className={`relative p-4 rounded-md border shadow-sm ${
              notificationColors[
                notification.type as keyof typeof notificationColors
              ]
            }`}
          >
            <h4 className="text-sm font-medium text-background">
              {notification.type}
            </h4>
            <p className="text-sm text-background my-2">
              {notification.message}
            </p>
            {notification.type === "Invitation" && (
              <div className="flex gap-3">
                <Button
                  className="bg-chart-2 text-primary-foreground hover:bg-chart-2/90 cursor-pointer"
                  size="sm"
                >
                  Accept
                </Button>
                <Button
                  className="bg-destructive hover:bg-destructive/90 cursor-pointer"
                  size="sm"
                >
                  Decline
                </Button>
              </div>
            )}
            <button className="absolute top-2 right-2 p-1 rounded-md text-[var(--color-foreground)] hover:bg-[var(--color-muted)]">
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
  }
  return (
    <Popover>
      <PopoverTrigger>
        <Bell className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="z-50 absolute w-150 rounded-lg border bg-popover p-4 text-popover-foreground shadow-lg outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Notifications</h3>
        <ScrollArea className="max-h-90">
          {content} 

        </ScrollArea>
      </div>
    </PopoverContent>
    </Popover>
  );
};

export default Test;
