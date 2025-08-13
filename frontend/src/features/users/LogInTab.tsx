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
import { SuccessToast } from "../utils/SuccessToast";

import { useState } from "react";
import { useLoginUserMutation } from "@/api/apiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/users/authSlice";

const LogInTab = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [credential, setCredential] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState('')

  const [login, { isLoading }] = useLoginUserMutation();

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await login({
      credential: credential,
      password: password,
    }).unwrap()

    dispatch(setCredentials(response.user))

    SuccessToast("Login Success", "Welcome Back!");
    navigate("/workspace");
    } catch (err) {
      console.log("Login Failed", err)
      if (err && typeof err === "object" && "data" in err) {
        const typedErr = err as { data?: { error?: string } };
        setFormError(typedErr.data?.error || "Something went wrong!");
      } else {
        setFormError("Something went wrong!");
      }
    }
  }
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
              <Label htmlFor="credential">Username or Email</Label>
              <Input type="text" id="credential" name="credential" value={credential} onChange={(e) => setCredential(e.target.value)} required/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <Button type="submit" disabled = {isLoading}>Log In</Button>
          </CardContent>
          <CardFooter className="flext justify-center">
            <p>Log In with Google</p>
          </CardFooter>
        </form>
      </Card>
    </TabsContent>
  );
};

export default LogInTab;
