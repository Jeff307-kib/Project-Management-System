import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

import type { ActionButtonProps } from "@/types/utils.d";


const EditButton = ({ label, onClick }: ActionButtonProps) => {
  return (
    <Button
      variant="ghost"
      className="justify-start gap-2 cursor-pointer"
      onClick={onClick}
    >
      <Pencil className="w-4 h-4" />
      Edit {label}
    </Button>
  );
};

export default EditButton;
