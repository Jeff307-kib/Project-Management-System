import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { SuccessToast } from "@/features/utils/SuccessToast";
import { ErrorToast } from "@/features/utils/ErrorToast";
import { useResetPasswordMutation } from "@/api/apiSlice";

const ResetPasswordForm = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);

  const token = searchParams.get("token");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!token) {
      setMessage("Invalid password reset link.");
      ErrorToast("Error", "Invalid password reset link.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords don't match.");
      ErrorToast("Error", "Passwords don't match.");
      return;
    }

    if (password.length < 8 || !passwordRegex.test(password)) {
      setMessage(
        "Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character!"
      );
      ErrorToast(
        "Error",
        "Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character!"
      );
      return;
    }

    try {
      const result = await resetPassword({ token, password }).unwrap();

      SuccessToast("Success", result.message);
      navigate('/registration')
    } catch (error) {
      console.error("Password reset failed:", error);
      setMessage("Password reset failed.");
      ErrorToast("Error", "Password reset failed.");
    }
  };

  if (!token) {
    return (
      <Card className="max-w-md w-full mx-auto mt-10">
        <CardHeader>
          <CardTitle>Invalid Link</CardTitle>
          <CardDescription>
            The password reset link is missing or invalid. Please request a new
            one.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="max-w-md w-full mx-auto mt-10">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Enter and confirm your new password below.
          {message && (
            <p className="text-sm font-medium text-destructive mt-2">
              {message}
            </p>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleResetPassword}>
          <div className="grid gap-4">
            <div className="grid gap-3 relative">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-1/2 -translate-y-1/2 px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
            <div className="grid gap-3 relative">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-1/2 -translate-y-1/2 px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              // Use the isLoading state from the RTK Query hook
              disabled={isLoading || !password || !confirmPassword}
            >
              {/* Change the button text based on the isLoading state */}
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResetPasswordForm;
