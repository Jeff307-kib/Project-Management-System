import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SuccessToast } from "@/features/utils/SuccessToast";
import { ErrorToast } from "@/features/utils/ErrorToast";
import { useState } from "react";
import { DialogClose } from "@/components/ui/dialog";

// Import the RTK Query mutation hook
import { useForgotPasswordMutation } from "@/api/apiSlice";

type Props = {
  isOpen: boolean,
  setOpen: () => void,
}

const ForgotPassword = ({isOpen, setOpen}:Props) => {
  // Use the mutation hook from apiSlice
  const [setRequest, { isLoading }] = useForgotPasswordMutation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const result = await setRequest(email).unwrap();
      
      setMessage(result.message);
      SuccessToast("Email Sent", result.message);
      setEmail("")
      setOpen()
      
    } catch (error) {
      console.error("Password reset failed:", error);
      setMessage("Something went wrong. Please try again later.");
      ErrorToast("Error","Failed to send reset link. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Forgot Password</DialogTitle>
          <DialogDescription>
            Enter your email below and we'll send a link to reset your password.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleForgotPassword}>
          <div className="grid gap-6 p-6">
            {/* Email input field */}
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Message display for success or error */}
            {message && (
              <p className="text-center text-sm text-gray-700 dark:text-gray-300">{message}</p>
            )}
          </div>

          <div className="space-y-3 p-6 pt-0">
            {/* Submit button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
            
            {/* Close button for the modal */}
            <DialogClose asChild>
              <Button variant="outline" type="button" className="w-full">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPassword;
