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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useRegisterUserMutation } from "@/api/apiSlice";
import { SuccessToast } from "@/features/utils/SuccessToast";
import { setCredentials } from "@/features/users/authSlice";

const SignUpTab = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [formError, setFormError] = useState("");

  const [register, { isLoading }] = useRegisterUserMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setProfileImage(file)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim()

    if (trimmedName.length < 2 || trimmedName.length > 50) {
      setFormError("Name must be between 2 and 50 characters long.")
      return
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setFormError("Please enter a valid email address!")
      return
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setFormError("Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character!")
      return
    }

    try {
      const result = await register({
        name: name,
        email: email,
        password: password,
        profileImage: profileImage
      }).unwrap();

      dispatch(setCredentials(result.user))

      SuccessToast("Registration Success!", "Thank you for joining us!")
      navigate("/workspace");
      
      console.log("Registration Success!", result);
    } catch (err) {
      console.log("Registration Failed", err);
      if (err && typeof err === "object" && "data" in err) {
        const typedErr = err as { data?: { error?: string } };
        setFormError(typedErr.data?.error || "Something went wrong!");
      } else {
        setFormError("Something went wrong!");
      }
    }
  };
  return (
    <TabsContent value="signup">
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you&apos;re
              done.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            {formError && <p className="text-destructive">{formError}</p>}
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Pedro Duarte"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="peduarte@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="profile">Set a Profile Image</Label>
              <Input type="file" id="profile" onChange={handleFileChange}/>
              <p className="text-muted-foreground text-xs">
                You can always add this later.
              </p>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              Sign Up
            </Button>
          </CardContent>
          <CardFooter className="flext justify-center mt-6">
            <p className="text-center">Log In with Google</p>
          </CardFooter>
        </form>
      </Card>
    </TabsContent>
  );
};

export default SignUpTab;
