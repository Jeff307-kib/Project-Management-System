import AddButton from "@/features/utils/AddButton";
import SearchBox from "@/features/utils/SearchBox";
import Filter from '@/features/workspaces/Filter'
import { useState } from "react";
import AddWorkspaceModal from "@/features/workspaces/AddWorkspaceModal";

const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const setOpen = () => {
    setIsOpen(!isOpen);
  }

  const handleAdd = () => {
    setIsOpen(true);
  }
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/40 bg-background/95 px-6 py-3 mb-4 shadow-sm">
      <AddButton label="Workspace" onClick={handleAdd} />
      <AddWorkspaceModal isOpen={isOpen} setOpen={setOpen} />
      <SearchBox />
      <Filter />
    </div>
  );
};

export default TopBar;
