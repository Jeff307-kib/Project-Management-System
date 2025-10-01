import { useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUpTab from "@/features/users/SignUpTab";
import LogInTab from "@/features/users/LogInTab";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      navigate('/workspace');
    }
  }, [user, navigate]);

  if (user) return null;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex w-full max-w-md flex-col gap-6">
        <Tabs defaultValue="signup">
          <TabsList>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="login">Log In</TabsTrigger>
          </TabsList>
          <SignUpTab />
          <LogInTab />
        </Tabs>
      </div>
    </div>
  );
};

export default Registration;
