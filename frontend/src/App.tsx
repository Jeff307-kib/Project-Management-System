import Layout from "./components/Layout";
import WorkspaceList from "./features/workspaces/WorkspaceList";
import WorkspaceDashboard from "./features/workspaces/WorkspaceDashboard";
import Welcome from "./Welcome";
import Registration from "@/pages/Registration";
import ProtectedRoute from "./features/utils/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <Routes>
        {/* Public Routes - No authentication required */}
        <Route path="registration" element={<Registration />} />
        <Route path="/" element={<Welcome />} />

        {/* Protected Routes - All routes inside this require authentication */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="workspace">
              <Route index element={<WorkspaceList />} />
              <Route path=":workspaceId" element={<WorkspaceDashboard />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      <Toaster richColors closeButton className="[&>div]:w-[var(--width)]" />
    </>
  );
};

export default App;
