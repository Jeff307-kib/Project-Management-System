import { Button } from "@/components/ui/button";
import { SquarePlus } from "lucide-react";

interface AddButtonProps {
  label: string;
  onClick: () => void;
}

const AddButton = ({ label, onClick }: AddButtonProps) => {
  return (
    // <Button className="flex items-center gap-2 mr-2 text-sm bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer" onClick={onClick}>
    //   <SquarePlus className="h-4 w-4" />
    //   Add {label}
    // </Button>
    <Button variant="ghost" className="justify-start gap-2" onClick={onClick}>
      <SquarePlus className="w-4 h-4" />
      Add {label}
    </Button>
  );
};

export default AddButton;
