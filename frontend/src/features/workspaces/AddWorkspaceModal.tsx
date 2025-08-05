import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAddWorkspaceMutation } from "@/api/apiSlice";
import { useState } from "react";

interface AddWorkspaceModalProps {
  isOpen: boolean;
  setOpen: () => void;
}

const AddWorkspaceModal = ({ isOpen, setOpen }: AddWorkspaceModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState("");

  const [addWorkspace, { isLoading }] = useAddWorkspaceMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.trim().length < 3) {
      setFormError("Workspace name must be at least 3 characters.");
      return;
    }

    try {
      const res = await addWorkspace({
        name: name.trim(),
        description: description.trim(),
      }).unwrap();
      console.log("Workspace added Successfully.", res);
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
          <DialogTitle>Create a new workspace</DialogTitle>
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
            // required
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
            disabled={isLoading}
          >
            Create
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddWorkspaceModal;
