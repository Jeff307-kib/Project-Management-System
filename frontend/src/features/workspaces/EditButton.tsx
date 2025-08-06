import { Button } from "@/components/ui/button";
import { PenLine } from 'lucide-react';

interface Props {
  onClick: () => void,
} 

const EditButton = ({onClick}: Props) => {
  return (
    <Button className="flex items-center mr-6 text-sm bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer" onClick={onClick}>
      <PenLine className="h-4 w-4" />
    </Button>
  );
};

export default EditButton;
