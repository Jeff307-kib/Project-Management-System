import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Filter, ListTodo } from "lucide-react"

export default function RightSidebarTaskPanel() {
  return (
    <aside className="sticky top-0 w-64 shrink-0 border-l bg-muted p-4 flex flex-col min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Tasks</h2>
        <Button size="icon" variant="ghost">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <Separator className="mb-4" />

      <ScrollArea className="flex-1">
        <div className="space-y-3">
          <Button variant="ghost" className="w-full justify-start">
            <ListTodo className="mr-2 h-4 w-4" />
            My Tasks
          </Button>

          <Button variant="ghost" className="w-full justify-start">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>

          {/* Add more as needed */}
        </div>
      </ScrollArea>
    </aside>
  )
}
