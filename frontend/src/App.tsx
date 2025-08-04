import Layout from "./components/Layout";
import WorkspaceList from "./features/workspaces/WorkspaceList";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<WorkspaceList />} />
      </Route>
    </Routes>
  )
}

export default App
