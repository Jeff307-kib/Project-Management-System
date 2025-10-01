import type { RootState } from "@/app/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import LogoutButton from "@/features/utils/LogoutButton";

const ProfileButton = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const backendURL = "http://localhost/projectManagementSystem/backend/public";

  const profileURL = user?.profileImage
    ? `${backendURL}/${user?.profileImage}`
    : "";

  return (
    <>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src={profileURL} alt={user.name} />
              <AvatarFallback>
                {user?.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link to={"/user"}>
              <DropdownMenuItem className="cursor-pointer">
                View Profile
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link to={"/user/dashboard"}>
              <DropdownMenuItem className="cursor-pointer">
                Your Dashboard
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <LogoutButton isDropdownItem={true} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default ProfileButton;
