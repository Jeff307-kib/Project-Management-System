import Layout from "./components/Layout";
import WorkspaceList from "./features/workspaces/WorkspaceList";
import WorkspaceDashboard from "./features/workspaces/WorkspaceDashboard";
import Welcome from "./Welcome";
import Registration from "@/pages/Registration";
import ProtectedRoute from "@/features/utils/ProtectedRoute";
import LoadingScreen from "@/features/utils/LoadingScreen";
import UserProfile from "@/features/users/UserProfile";
import ResetPasswordForm from "@/features/users/ResetPasswordForm";
import SingleTask from "@/features/tasks/SingleTask";
import Test from "./features/utils/Test";

import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { useCheckSessionQuery } from "@/api/apiSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/users/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const { data: sessionData, isLoading, isSuccess } = useCheckSessionQuery();

  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    if (isSuccess && sessionData?.user) {
      dispatch(setCredentials(sessionData.user));
    }
    if (isSuccess || !isLoading) {
      setIsAuthReady(true);
    }
  }, [isSuccess, sessionData, dispatch, isLoading]);

  if (isLoading || !isAuthReady) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Routes>
        <Route path="registration" element={<Registration />} />
        <Route path="/" element={<Welcome />} />
        <Route path="reset-password" element={<ResetPasswordForm />} />
        <Route path="test" element={<Test />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="workspace">
              <Route index element={<WorkspaceList />} />
              <Route path=":workspaceId" element={<WorkspaceDashboard />}>
                <Route path="tasks">
                  <Route path=":taskId" element={<SingleTask />} />
                </Route>
              </Route>  
            </Route>
            <Route path="user">
              <Route index element={<UserProfile />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      <Toaster richColors closeButton className="[&>div]:w-[var(--width)]" />
    </>
  );
};

export default App;
