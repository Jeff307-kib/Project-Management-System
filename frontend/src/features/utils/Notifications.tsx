import { Skeleton } from "@/components/ui/skeleton";
import { PopoverContent } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { useGetNotificationsQuery } from "@/api/apiSlice";

const Notifications = () => {
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
        return (
          <div
            key={notification.created_at}
            className="p-4 rounded-md border bg-card text-card-foreground shadow-sm"
          >
            <h4 className="text-sm font-medium">Invitation</h4>
            <p className="text-sm text-muted-foreground my-2">
              {notification.message}
            </p>
            <div className="flex gap-3">
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                size="sm"
              >
                Accept
              </Button>
              <Button variant="secondary" size="sm">
                Decline
              </Button>
            </div>
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
    <PopoverContent className="z-50 absolute top-0 right-0 w-150 rounded-lg border bg-popover p-4 text-popover-foreground shadow-lg outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Notifications</h3>
        {content}
      </div>
    </PopoverContent>
  );
};

export default Notifications;
