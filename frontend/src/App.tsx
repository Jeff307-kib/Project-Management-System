import Layout from "./components/Layout";
import WorkspaceList from "./features/workspaces/WorkspaceList";
import WorkspaceDashboard from "./features/workspaces/WorkspaceDashboard";
import Welcome from "./Welcome";
import Registration from "@/pages/Registration";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path="workspace">
            <Route index element={<WorkspaceList />} />
            <Route path=":workspaceId" element={<WorkspaceDashboard />} />
          </Route>
        </Route>
        <Route path="registration" element={<Registration />}/>
      </Routes>
      <Toaster richColors closeButton className="[&>div]:w-[var(--width)]" />
    </>
  );
};

export default App;
