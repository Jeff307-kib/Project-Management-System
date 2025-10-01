import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUpdateTaskStatusMutation } from "@/api/apiSlice";
import { SuccessToast } from "@/features/utils/SuccessToast";
import { ErrorToast } from "@/features/utils/ErrorToast";

interface Props {
    rejectOpen: boolean;
    handleRejectOpen: () => void;
    taskId: string,
    workspaceId: string,
} 

const RejectionReasonModal = ({ rejectOpen, handleRejectOpen, taskId, workspaceId}:Props) => {
    const [ updateStatus ] = useUpdateTaskStatusMutation();
    const [reason, setReason] = useState('');
    const handleTaskReject = async(e:React.FormEvent) => {
        e.preventDefault();
        try {
            await updateStatus({taskId: taskId, status: 'Needs Revision', workspaceId: workspaceId, rejectionReason: reason}).unwrap()
            SuccessToast("Task Status Updated!", "Task Status is changed to 'Needs Revision'!");
            setReason('');
            handleRejectOpen();
        } catch (err) {
            console.error(err);
            ErrorToast("Failed to Update Task Status!");
        }
    }
  return (
    <Dialog open={rejectOpen} onOpenChange={handleRejectOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Please Add Reason for the Rejection</DialogTitle>
        </DialogHeader>
        <form>
          <div className="grid gap-3">
            <Input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
            <Button onClick={handleTaskReject}>
              Reject Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RejectionReasonModal;
