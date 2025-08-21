import type { RootState } from "@/app/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

// Importing the new ArrowLeft icon for the back button
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "@/features/users/authSlice";
import { useUpdateProfileMutation } from "@/api/apiSlice";
import { SuccessToast } from "@/features/utils/SuccessToast";

import LogoutButton from "@/features/utils/LogoutButton";
import ForgotPassword from "@/features/users/ForgotPassword";

const UserProfile = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);

  const [updateUser, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [userId, setUserId] = useState(user?.id || "");
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | File | null>(
    user?.profileImage || null
  );
  const [profileFormError, setProfileFormError] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFormError, setPasswordFormError] = useState("");

  const [isOpen, setIsOpen] = useState(false); // handle forget password

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (user) {
      setUserId(user.id);
      setName(user.name);
      setEmail(user.email);
      setProfileImage(user.profileImage);
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfileImage(file);
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      setProfileFormError("No user logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", userId.toString());
    formData.append("name", name);
    formData.append("email", email);
    if (profileImage instanceof File) {
      formData.append("profileImage", profileImage);
    }

    try {
      const updatedUser = await updateUser(formData).unwrap();
      dispatch(setCredentials(updatedUser.user));
      setProfileFormError("");
      setIsEditing(false);
      SuccessToast("Update Success!", "Profile Updated Successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      if (err && typeof err === "object" && "data" in err) {
        const typedErr = err as { data?: { error?: string } };
        setProfileFormError(typedErr.data?.error || "Something went wrong!");
      } else {
        setProfileFormError("Something went wrong!");
      }
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      setPasswordFormError("No user logged in.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordFormError("New password and confirm password do not match!");
      return;
    }

    const formData = new FormData();
    formData.append("userId", userId.toString());
    formData.append("currentPassword", currentPassword);
    formData.append("newPassword", newPassword);

    try {
      const updatedUser = await updateUser(formData).unwrap();
      dispatch(setCredentials(updatedUser.user));
      setPasswordFormError("");
      SuccessToast(
        "Password Updated!",
        "Your password has been changed successfully!"
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      console.error("Password update failed:", err);
      if (err && typeof err === "object" && "data" in err) {
        const typedErr = err as { data?: { error?: string } };
        setPasswordFormError(typedErr.data?.error || "Something went wrong!");
      } else {
        setPasswordFormError("Something went wrong!");
      }
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No user data available. Please log in.</p>
      </div>
    );
  }

  const backendURL = "http://localhost/projectManagementSystem/backend/public"
  const profileURL = user?.profileImage ? `${backendURL}/${user?.profileImage}` : ''

  const getProfileImageSrc = () => {
    if (profileImage instanceof File) {
      return URL.createObjectURL(profileImage);
    }
    return profileURL || "";
  };

  return (
    <div className="flex flex-col items-center space-y-8 p-4 relative">
      {/* Back button now correctly placed at the top-left of the main container */}
      <div className="absolute top-4 left-4">
        <Button
          type="button"
          variant="ghost"
          onClick={() => (window.location.href = "/workspace")}
          className="flex items-center space-x-2 text-sm text-gray-500 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Workspace</span>
        </Button>
      </div>

      <Card className="w-full max-w-lg">
        <form onSubmit={handleUpdateProfile}>
          <CardHeader className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              {getProfileImageSrc && (
                <AvatarImage src={getProfileImageSrc()} alt={name || "User"} />
              )}
              <AvatarFallback>{name?.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            {profileFormError && (
              <p className="text-destructive text-center">{profileFormError}</p>
            )}

            {isEditing ? (
              <>
                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="profile-image">Change Profile Image</Label>
                  <Input
                    type="file"
                    id="profile-image"
                    name="profileImage"
                    onChange={handleFileChange}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="grid gap-3">
                  <Label>Name</Label>
                  <p className="text-muted-foreground p-2 border rounded-md">
                    {user.name}
                  </p>
                </div>
                <div className="grid gap-3">
                  <Label>Email</Label>
                  <p className="text-muted-foreground p-2 border rounded-md">
                    {user.email}
                  </p>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            {isEditing ? (
              <div className="w-full space-x-2">
                <Button
                  type="submit"
                  className="w-full my-4"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    if (user) {
                      setName(user.name);
                      setEmail(user.email);
                      setProfileImage(user.profileImage);
                      setProfileFormError("");
                    }
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                className="w-full mt-4"
                variant="secondary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>

      <Card className="w-full max-w-lg">
        <form onSubmit={handleUpdatePassword}>
          <CardHeader>
            <CardTitle className="text-xl">Change Password</CardTitle>
            <CardDescription>
              Update your password with a strong, new one.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            {passwordFormError && (
              <p className="text-destructive text-center">
                {passwordFormError}
              </p>
            )}
            <div className="grid gap-3 relative mt-3">
              <Label htmlFor="current-password">Current Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
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
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
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
            <div className="grid gap-3 relative mb-4">
              <Label htmlFor="confirm-new-password">Confirm New Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="confirm-new-password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Confirm new password"
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
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update Password"}
            </Button>
            <Button
              type="button"
              className="w-full"
              variant="link"
              onClick={handleModal}
            >
              Forgot Password?
            </Button>
          </CardFooter>
        </form>
      </Card>

      <LogoutButton />
      <ForgotPassword isOpen={isOpen} setOpen={handleModal} />
    </div>
  );
};

export default UserProfile;
