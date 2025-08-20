import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { useDispatch } from "react-redux";
import { logout } from "@/features/users/authSlice";
import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/api/apiSlice";

interface LogoutButtonProps {
  isDropdownItem?: boolean;
}

const LogoutButton = ({ isDropdownItem = false }: LogoutButtonProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutUser, { isLoading }] = useLogoutUserMutation();

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

  // We conditionally render based on the isDropdownItem prop
  if (isDropdownItem) {
    return (
      <DropdownMenuItem
        onClick={handleLogout}
        disabled={isLoading}
        className="cursor-pointer text-red-500 hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white"
      >
        Log Out
      </DropdownMenuItem>
    );
  }

  return (
    <Button 
      onClick={handleLogout} 
      disabled={isLoading} 
      variant="destructive" 
      className="w-full"
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;