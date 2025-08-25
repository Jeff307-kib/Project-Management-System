import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { SuccessToast } from '@/features/utils/SuccessToast';
import ForgotPassword from "@/features/users/ForgotPassword";

import { useState } from "react";
import { useLoginUserMutation, useCheckSessionQuery } from "@/api/apiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/users/authSlice";

const LogInTab = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false) //handle forgetPassword Modal

  const { refetch: refetchSession } = useCheckSessionQuery();
  const [login, { isLoading }] = useLoginUserMutation();

  //handle forgetPassword Modal
  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await login({
        credential: credential,
        password: password,
      }).unwrap();

      dispatch(setCredentials(response.user));
      refetchSession();

      SuccessToast("Login Success", "Welcome Back!");
      navigate("/workspace");
    } catch (err) {
      console.log("Login Failed", err);
      if (err && typeof err === "object" && "data" in err) {
        const typedErr = err as { data?: { error?: string } };
        setFormError(typedErr.data?.error || "Something went wrong!");
      } else {
        setFormError("Something went wrong!");
      }
    }
  };
  return (
    <TabsContent value="login">
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Log In</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you&apos;re
              done.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            {formError && <p className="text-destructive">{formError}</p>}
            <div className="grid gap-3">
              <Label htmlFor="credential">Enter Email</Label>
              <Input
                type="text"
                id="credential"
                name="credential"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3 relative">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Please enter your password."
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
                type="button"
                className="w-full justify-start p-0"
                variant="link"
                onClick={handleModal}
              >
                Forgot Password?
              </Button>
            <Button type="submit" disabled={isLoading}>
              Log In
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col mt-3">
            <p>Log In with Google</p>
          </CardFooter>
        </form>
      </Card>
      <ForgotPassword isOpen={isOpen} setOpen={handleModal}/>
    </TabsContent>
  );
};

export default LogInTab;
