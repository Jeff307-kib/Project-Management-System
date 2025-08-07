import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

const Filter = () => {
  return (
    <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Filter</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Date <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Favourite</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Task</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
  )
}

export default Filter
