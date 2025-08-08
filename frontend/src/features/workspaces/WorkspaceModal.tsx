import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAddWorkspaceMutation, useEditWorkspaceMutation } from "@/api/apiSlice";
import { useState, useEffect } from "react";
import type { WorkspaceModalProps } from "@/types/workspace.d";

import { SuccessToast } from "../utils/SuccessToast";


const WorkspaceModal = ({ label, isOpen, setOpen, workspace }: WorkspaceModalProps) => {
  const isEdit = !!workspace
  console.log(isEdit)

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (workspace) {
      console.log("Opening modal with workspace:", workspace);
      setName(workspace.name || "")
      setDescription(workspace.description || "")
    } else {
      setName("")
      setDescription("")
    }
    setFormError("")
  }, [workspace, isOpen])

  const [addWorkspace, { isLoading: isAdding }] = useAddWorkspaceMutation();
  const [editWorkspace, {isLoading: isEditting }] = useEditWorkspaceMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.trim().length < 3) {
      setFormError("Workspace name must be at least 3 characters.");
      return;
    }

    try {
      if (isEdit) {
        await editWorkspace({
          workspaceId: workspace.id,
          name: name.trim(),
          description: description.trim(),
        }).unwrap();
        SuccessToast("Workspace Updated", "Your workspace was updated successfully.")
        console.log("Workspace updated successfully.");
      } else {
        await addWorkspace({
          name: name.trim(),
          description: description.trim(),
        }).unwrap();
        SuccessToast("Workspace Created", "Your workspace was added successfully.")
        console.log("Workspace added successfully.");
      }

      setName("");
      setDescription("");
      setOpen();
    } catch (err) {
      console.log("Workspace add Failed", err);
      if (err && typeof err === "object" && "data" in err) {
        const typedErr = err as { data?: { error?: string } };
        setFormError(typedErr.data?.error || "Something went wrong!");
      } else {
        setFormError("Something went wrong!");
      }
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{label} workspace</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Workspaces help you organize your tasks and projects.
        </DialogDescription>  
        {formError && <p className="text-destructive">{formError}</p>}

        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Workspace Name"
            value={name}
            className="border rounded px-3 py-2"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={description}
            className="border rounded px-3 py-2"
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded cursor-pointer"
            disabled={isAdding || isEditting}
          >
            {label}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WorkspaceModal;
