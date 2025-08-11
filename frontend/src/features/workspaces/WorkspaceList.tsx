import { useState, useMemo } from "react";

import { useGetWorkspacesQuery } from "@/api/apiSlice";
import WorkspaceExcerpt from "./WorkspaceExcerpt";
import TopBar from "@/features/workspaces/TopBar";


const WorkspaceList = () => {
  const userId = 1;

  const [filterType, setFilterType] = useState("date");

  const {
    data: response,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetWorkspacesQuery(userId);

  const workspaces = useMemo(() => {
    return response?.data ?? [];
  }, [response]);

  console.log(workspaces)
  console.log(response?.data)

  const filteredWorkspaces = useMemo(() => {
    switch (filterType) {
      case "alphabet":
        return [...workspaces].sort((a, b) => a.name.localeCompare(b.name));
      case "date":
      default:
        return [...workspaces].sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }
  }, [workspaces, filterType]);
  
  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    if (workspaces) {
      content = filteredWorkspaces.map((workspace) => {
        return <WorkspaceExcerpt key={workspace.id} workspace={workspace} />;
      });
    } else {
      content = <p>No Workspace!!</p>;
    }
  } else if (isError) {
    if ("status" in error) {
      content = <p>Error: {error.status}</p>;
    } else {
      content = <p>An unexpected error occurred.</p>;
    }
  }

  // const profileImage = "uploads/profiles/test.png"
  return (
    <>
      <TopBar filter={setFilterType} />
      {/* <img src={`http://localhost/projectManagementSystem/backend/public/${profileImage}`} alt="where" /> */}
      <div className="flex justify-center">
        <div className="grid gap-6 max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
          {content}
        </div>
      </div>
    </>
  );
};

export default WorkspaceList;
