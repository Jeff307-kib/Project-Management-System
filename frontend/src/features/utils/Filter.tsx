import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  // MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

import type { FilterProps } from "@/types/utils.d";

const Filter = ({onFilterChange}: FilterProps) => {
  return (
    <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Filter</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => onFilterChange("date")}>
              Date
              {/* Date <MenubarShortcut>⌘T</MenubarShortcut> */}
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => onFilterChange("alphabet")}>Alphabet</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Favourite</MenubarItem> {/* Would handle this later */}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
  )
}

export default Filter
