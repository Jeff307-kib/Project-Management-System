import { useState, useMemo } from "react";

import { useGetWorkspacesQuery } from "@/api/apiSlice";
import WorkspaceExcerpt from "./WorkspaceExcerpt";
import AddButton from "@/features/utils/AddButton";
import Filter from "@/features/utils/Filter";
import WorkspaceModal from "@/features/workspaces/WorkspaceModal";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

const WorkspaceList = () => {
  const [filterType, setFilterType] = useState("date");
  const [searchTerm, setSearchTerm] = useState("");

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

  // Apply search filtering
  const searchedWorkspaces = useMemo(() => {
    if (!searchTerm) {
      return workspaces;
    }
    return workspaces.filter((workspace) =>
      workspace.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [workspaces, searchTerm]);

  // Apply sorting to the searched list
  const filteredWorkspaces = useMemo(() => {
    switch (filterType) {
      case "Alphabet":
        return [...searchedWorkspaces].sort((a, b) => a.name.localeCompare(b.name));
      case "Date":
      default:
        return [...searchedWorkspaces].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }
  }, [searchedWorkspaces, filterType]);

  // Handle add workspace
  const [isAddOpen, setIsAddOpen] = useState(false);
  const handleAdd = () => {
    setIsAddOpen(!isAddOpen);
  };

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
    if (filteredWorkspaces.length > 0) {
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

  return (
    <>
      <div className="flex items-center justify-between gap-4 border-b border-border/40 bg-background/95 px-6 py-3 mb-4 shadow-sm">
        <AddButton label="Workspace" onClick={handleAdd} />
        <WorkspaceModal isOpen={isAddOpen} setOpen={handleAdd} label="Create" />
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search workspaces..."
              className="w-full pl-9 bg-background focus:bg-card"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Filter onFilterChange={setFilterType} filterType={filterType} />
      </div>
      <div className="flex justify-center">
        <div className="grid gap-6 max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
          {content}
        </div>
      </div>
    </>
  );
};

export default WorkspaceList;