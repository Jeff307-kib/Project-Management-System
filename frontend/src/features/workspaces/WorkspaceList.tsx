import { useGetWorkspacesQuery } from "@/api/apiSlice";
import WorkspaceExcerpt from "./WorkspaceExcerpt";
import TopBar from "@/features/workspaces/TopBar";
const WorkspaceList = () => {
  const userId = 1;
  const {
    data: workspaces,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetWorkspacesQuery(userId);
  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    if (workspaces) {
      content = workspaces.data.map((workspace) => {
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
  return (
    <>
      <TopBar />
      <div className="flex justify-center">
        <div className="grid gap-6 max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
          {content}
        </div>
      </div>
    </>
  );
};

export default WorkspaceList;
