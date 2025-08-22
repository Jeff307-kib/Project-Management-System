import ProfileButton from "@/features/utils/ProfileButton";
import Notifications from "@/features/utils/Notifications";
import { Bell } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";

const Header = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const login = useSelector((state: RootState) => state.auth.isLoggedIn);
  useEffect(() => {
    if (user) {
      console.log("Logged in user state:", user);
      console.log("Logged in user isLoggedIn state:", login);
    } else {
      console.log("No user is currently logged in.");
    }
  }, [user, login]);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            <span className="hidden font-bold sm:inline-block">
              ProjectFlow
            </span>
          </a>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Bell className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground cursor-pointer" />
              </PopoverTrigger>
              <Notifications />
            </Popover>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
            </span>
          </div>
          <ProfileButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
