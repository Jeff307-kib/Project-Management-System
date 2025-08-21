import { Button } from "@/components/ui/button";

import { SquarePlus } from "lucide-react";

import type { ActionButtonProps } from "@/types/utils.d";

const AddButton = ({ label, onClick }: ActionButtonProps) => {
  return (
    <Button variant="ghost" className="justify-start gap-2 cursor-pointer" onClick={onClick}>
      <SquarePlus className="w-4 h-4" />
      Add {label}
    </Button>
  );
};

export default AddButton;
