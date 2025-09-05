import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { SuccessToast } from "@/features/utils/SuccessToast";
import { useSendInvitationMutation } from "@/api/apiSlice";
import { useState } from "react";
import { useParams } from "react-router-dom";

type Props = {
  isOpen: boolean;
  setOpen: () => void;
};

const InviteMemberModal = ({ isOpen, setOpen }: Props) => {
  const { workspaceId } = useParams() as { workspaceId: string}

  const [email, setEmail] = useState('')
  const [formError, setFormError] = useState('')

  const [sendInvitation, { isLoading }] = useSendInvitationMutation();

  const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault()

    try {
      await sendInvitation({email, workspaceId}).unwrap()
      SuccessToast("Inviation Sent Successfully!", "You will recieve a notification when the invitation is accept or decline.")
      setFormError('')
      setOpen()
    } catch (err) {
      console.log("Invitation failed: ", err)
      if (err && typeof err === "object" && "data" in err) {
        const typedErr = err as { data?: { error?: string } };
        setFormError(typedErr.data?.error || "Something went wrong!");
      } else {
        setFormError("Something went wrong!");
      }
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Member</DialogTitle>
          <DialogDescription>
            Invite Member to Contribute to your workspace!
          </DialogDescription>
          <form className="grid gap-3" onSubmit={handleSubmit}>
            {formError && (<p className="text-destructive">{formError}</p>)}
            <div className="grid gap-3">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter email of the user you want to invite."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled = {isLoading}>
              {isLoading ? 'Sending...' : 'Send Invite'}
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMemberModal;
