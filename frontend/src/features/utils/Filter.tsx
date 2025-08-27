import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";

import type { FilterProps } from "@/types/utils.d";
import { Button } from "@/components/ui/button";

const Filter = ({ onFilterChange }: FilterProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"><ListFilter /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onFilterChange("date")}>
          Date
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onFilterChange("alphabet")}>
          Alphabet
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Favourite</DropdownMenuItem> {/* Would handle this later */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Filter;
