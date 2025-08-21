import AddButton from "@/features/utils/AddButton";
import SearchBox from "@/features/utils/SearchBox";
import Filter from '@/features/utils/Filter'
import { useState } from "react";
import WorkspaceModal from "@/features/workspaces/WorkspaceModal";

type Props = {
  filter: React.Dispatch<React.SetStateAction<string>>
}

const TopBar = ({filter}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const label = "Create"

  const setOpen = () => {
    setIsOpen(!isOpen);
  }

  const handleAdd = () => {
    setIsOpen(true);
  }
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/40 bg-background/95 px-6 py-3 mb-4 shadow-sm">
      <AddButton label="Workspace" onClick={handleAdd} />
      <WorkspaceModal isOpen={isOpen} setOpen={setOpen} label={label}/>
      <SearchBox />
      <Filter onFilterChange={filter}/>
    </div>
  );
};

export default TopBar;
