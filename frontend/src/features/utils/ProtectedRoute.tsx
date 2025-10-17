import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "@/app/store";

const ProtectedRoute = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
