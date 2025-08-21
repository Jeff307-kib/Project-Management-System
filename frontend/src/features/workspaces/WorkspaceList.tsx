import { useState, useMemo } from "react";

import { useGetWorkspacesQuery } from "@/api/apiSlice";
import WorkspaceExcerpt from "./WorkspaceExcerpt";
import TopBar from "@/features/workspaces/TopBar";

import { Skeleton } from "@/components/ui/skeleton";

const WorkspaceList = () => {
  const [filterType, setFilterType] = useState("date");

  const {
    data: response,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetWorkspacesQuery();

  const workspaces = useMemo(() => {
    return response?.data ?? [];
  }, [response]);

  // console.log(workspaces);
  // console.log(response?.data);

  const filteredWorkspaces = useMemo(() => {
    switch (filterType) {
      case "alphabet":
        return [...workspaces].sort((a, b) => a.name.localeCompare(b.name));
      case "date":
      default:
        return [...workspaces].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }
  }, [workspaces, filterType]);

  let content;
  if (isLoading) {
    content = (
      <div className="grid gap-6 max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        <Skeleton className="w-full h-32" />
        <Skeleton className="w-full h-32" />
        <Skeleton className="w-full h-32" />
      </div>
    );
  } else if (isSuccess) {
    if (workspaces.length > 0) {
      content = filteredWorkspaces.map((workspace) => {
        return <WorkspaceExcerpt key={workspace.id} workspace={workspace} />;
      });
    } else {
      content = <p>No Workspace Available! Create one to get Started!</p>;
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
