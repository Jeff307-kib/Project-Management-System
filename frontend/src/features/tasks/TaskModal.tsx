import React from "react";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import type { RootState } from "@/app/store";
import type { TaskModalProps } from "@/types/tasks.d";
import { useAddTaskMutation } from "@/api/apiSlice";
import { SuccessToast } from "@/features/utils/SuccessToast";

const TaskModal = ({ label, taskOpen, setTaskOpen }: TaskModalProps) => {
  const navigate = useNavigate();
  const { workspaceId = '' } = useParams();

  if (!workspaceId) {
    navigate("/workspace"); 
  }

  const userId = useSelector((state: RootState) => state.auth.user?.id) ?? "";

  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [formError, setFormError] = useState("");

  const [addTask, { isLoading }] = useAddTaskMutation();

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim().length < 3) {
      setFormError("Task title must have at least 3 characters!");
      return;
    }

    if (!priority) {
      setFormError("Please set a priority level!")
      return
    }

    if (!dueDate) {
      setFormError("Please set a due date!")
      return
    }

    const formattedDate = dueDate?.toISOString().slice(0, 10);

    try {
      await addTask({
        title: title,
        description: description,
        dueDate: formattedDate,
        priorityLevel: priority,
        userId: userId,
        workspaceId: workspaceId,
      }).unwrap()
      SuccessToast("New Task Added")
      setTitle('')
      setDescription('')
      setPriority('')
      setFormError('')
      setTaskOpen()
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        const typedErr = err as { data?: { error?: string } };
        setFormError(typedErr.data?.error || "Something went wrong!");
      } else {
        setFormError("Something went wrong!");
      }
    }
  };
  return (
    <Dialog open={taskOpen} onOpenChange={setTaskOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{label} Task</DialogTitle>
        </DialogHeader>
        <DialogDescription>Tasks is for bla bla.....</DialogDescription>

        {formError && <p className="text-destructive">{formError}</p>}
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Task Title"
            className="border rounded-md px-3 py-2"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description (Optional)"
            className="border rounded-md px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex justify-between">
            <Select value={priority} onValueChange={setPriority} required>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select Priority Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="h-4 w-6" />
                  {dueDate ? format(dueDate, "PPP") : "Set a Due Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                />
              </PopoverContent>
            </Popover>
          </div>

          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? 'Adding' : 'Add Task'}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
