import Layout from "./components/Layout";
import WorkspaceList from "./features/workspaces/WorkspaceList";
import WorkspaceDashboard from "./features/workspaces/WorkspaceDashboard";
import Registration from "@/features/utils/Registration";
import ProtectedRoute from "@/features/utils/ProtectedRoute";
import UserProfile from "@/features/users/UserProfile";
import ResetPasswordForm from "@/features/users/ResetPasswordForm";
import SingleTask from "@/features/tasks/SingleTask";
import UserDashboard from "@/features/users/UserDashboard";
import MembersTab from "@/features/users/MembersTab";
import ReportTab from "@/features/workspaces/ReportTab";
import TasksTab from "@/features/tasks/TasksTab";
import NotFoundPage from "@/features/utils/NotFoundPage";
import Loading from "./features/utils/Loading";

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
    return <Loading />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="reset-password" element={<ResetPasswordForm />} />
        <Route path="test" element={<Loading />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="workspace">
              <Route index element={<WorkspaceList />} />
              <Route path=":workspaceId" element={<WorkspaceDashboard />}>
                <Route path="tasks">
                  <Route index element={<TasksTab />} />
                  <Route path=":taskId" element={<SingleTask />} />
                </Route>
                <Route path="members" element={<MembersTab />} />
                <Route path="report" element={<ReportTab />} />
              </Route>
            </Route>
            <Route path="user">
              <Route index element={<UserProfile />} />
              <Route path="dashboard" element={<UserDashboard />} />
            </Route>
          </Route>
        </Route>

        {/* Catch-all 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster richColors closeButton className="[&>div]:w-[var(--width)]" />
    </>
  );
};

export default App;
