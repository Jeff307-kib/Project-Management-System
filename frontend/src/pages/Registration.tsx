import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import SignUpTab from "@/features/users/SignUpTab"
import LogInTab from "@/features/users/LogInTab"

const Registration = () => {
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
  )
}

export default Registration
