import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import AddButton from "@/features/utils/AddButton"

const Setting = () => {
    const handleAdd = () => {
        console.log("Add")
    }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2 flex flex-col gap-2">
        <AddButton label="Task" onClick={handleAdd} />
        <Button variant="ghost" className="justify-start gap-2">
          <Pencil className="w-4 h-4" />
          Edit Workspace
        </Button>
        <Button
          variant="ghost"
          className="justify-start gap-2 text-destructive"
        >
          <Trash2 className="w-4 h-4" />
          Delete Workspace
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default Setting;
