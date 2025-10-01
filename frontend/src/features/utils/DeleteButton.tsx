import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { Trash2 } from "lucide-react";

import type { DeleteButtonProps } from "@/types/utils.d";
import { useDeleteWorkspaceMutation } from "@/api/apiSlice";
import { useDeleteTaskMutation } from "@/api/apiSlice";
import { useNavigate } from "react-router-dom";

import { ErrorToast } from "@/features/utils/ErrorToast";
import { SuccessToast } from "@/features/utils/SuccessToast";

const DeleteButton = ({ label, id }: DeleteButtonProps) => {
  const navigate = useNavigate();
  const [deleteWorksapce] = useDeleteWorkspaceMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const handleDelete = async () => {
    if (label === "Workspace") {
      try {
        const result = await deleteWorksapce(id).unwrap();
        if (result.success) {
          SuccessToast("Workspace Deleted!", "Workspace Deleted Successfully!")
          navigate("/workspace")
        }
      } catch (err) {
        ErrorToast("Failed to Delete Workpace!")
        console.error("Failed to delete workspace:", err);
      }
    } else if (label === "Task") {
      try {
        const result = await deleteTask(String(id)).unwrap();
        if (result.success) {
          SuccessToast("Task Deleted!", "Task Deleted Successfully!")
          navigate(-1)
        }
        console.log("Delete result", result)
      } catch (err) {
        console.error("Failed to delete task:", err);
      }

      // console.log("Task delete", id)
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="justify-start gap-2 text-destructive cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          Delete {label}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            {label} and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
