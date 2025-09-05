import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SuccessToast } from "@/features/utils/SuccessToast";

import { useState } from "react";
import { useAddAttachmentMutation } from "@/api/apiSlice";

type Props = {
  open: boolean,
  setOpen: () => void,
  taskId: string,
  userId: string,
  workspaceId: string,
};

const AddAttachmentModal = ({ open, setOpen, taskId, userId, workspaceId }: Props) => {
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
  const [addAttachment, { isLoading }] = useAddAttachmentMutation();
  const [formError, setFormError] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAttachmentFile(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!attachmentFile) {
        setFormError('Please insert a file!')
        return
    }

    const formData = new FormData();
    formData.append("fileAttachment", attachmentFile)
    formData.append("taskId", taskId)
    formData.append('userId', userId)
    formData.append('workspaceId', workspaceId)

    try {
      await addAttachment(formData).unwrap();
      console.log("File Submitted!");
      setFormError('')
      setAttachmentFile(null)
      SuccessToast('Attachment Added Successfully')
      setOpen()
    } catch (err) {
      console.error("Add Attachment Failed!", err)
      if (err && typeof err === "object" && "data" in err) {
        const typedErr = err as { data?: { error?: string } };
        setFormError(typedErr.data?.error || "Something went wrong!");
      } else {
        setFormError("Something went wrong!");
      }
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Attachment</DialogTitle>
        </DialogHeader>
        <DialogDescription>Attachment is for bla bla ......</DialogDescription>
        { formError && <p className="text-destructive">{formError}</p>}
        <form onSubmit={handleSubmit}>
          <div className="grid gap-3">
            <Input
              type="file"
              id="attachmentFile"
              onChange={handleFileChange}
              required
            />

            <Button type="submit">{isLoading ? 'Addding...' : 'Add Attachment'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAttachmentModal;
