import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface Props {
  onClick: () => void;
}

const EditButton = ({ onClick }: Props) => {
  return (
    // <Button className="flex items-center mr-6 text-sm bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer" onClick={onClick}>
    //   <PenLine className="h-4 w-4" />
    // </Button>
    <Button
      variant="ghost"
      className="justify-start gap-2"
      onClick={onClick}
    >
      <Pencil className="w-4 h-4" />
      Edit Workspace
    </Button>
  );
};

export default EditButton;
