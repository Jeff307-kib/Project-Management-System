import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Props = {
    isOpen: boolean,
    setOpen: () => void,
}

const InviteMemberModal = ({isOpen, setOpen} : Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
            <DialogTitle>Invite Member</DialogTitle>
            <DialogDescription>
                Invite Member to Contribute to your workspace!
            </DialogDescription>
            <form className="grid gap-3">
                <div className="grid gap-3">
                    <Label>Email</Label>
                    <Input type="email" placeholder="Enter email of the user you want to invite."/>
                </div>
                <Button type="submit">Send Invite</Button>
            </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default InviteMemberModal
