import type { RootState } from "@/app/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/features/users/authSlice";
import { useNavigate } from "react-router-dom";

import { useLogoutUserMutation } from "@/api/apiSlice";

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  // Handle the logout process
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();

      dispatch(logout());
      navigate("/registration");
    } catch (err) {
      console.error("Failed to log out:", err);
      dispatch(logout());
      navigate("/registration");
    }
  };

  return (
    <>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage
                src={
                  user.profileImage
                    ? user.profileImage
                    : "https://github.com/shadcn.png"
                }
                alt={user.username}
              />
              <AvatarFallback>
                {user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} disabled={isLoading}>Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default Profile;
