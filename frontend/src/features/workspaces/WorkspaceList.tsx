import { useGetWorkspacesQuery } from "@/api/apiSlice"
import WorkspaceExcerpt from "./WorkspaceExcerpt";
const WorkspaceList = () => {
  const userId = 1;
  const { data:workspaces, isLoading, isError, error, isSuccess} = useGetWorkspacesQuery(userId);
  let content;

  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isSuccess) {
    if (workspaces) {
      content = workspaces.data.map((workspace) => {
        return <WorkspaceExcerpt key={workspace.id} workspace={workspace}/>
      })
    } else {
      content = <p>No Workspace!!</p>
    }
  } else if (isError) {
    if ('status' in error) {
    content = <p>Error: {error.status}</p>;
  } else {
    content = <p>An unexpected error occurred.</p>;
  }
  }
  return (
    <div>
      {content}
    </div>
  )
}

export default WorkspaceList
