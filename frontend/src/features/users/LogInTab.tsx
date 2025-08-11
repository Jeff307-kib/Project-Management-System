import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const LogInTab = () => {
  return (
    <TabsContent value="login">
      <Card>
        <CardHeader>
          <CardTitle>Log In</CardTitle>
          <CardDescription>
            Make changes to your account here. Click save when you&apos;re done.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email">Username or Email</Label>
            <Input id="email" defaultValue="peduarte@gmail.com" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="password">Password</Label>
            <Input id="password"/>
          </div>
          <Button>Log In</Button>
        </CardContent>
        <CardFooter className="flext justify-center">
          <p>Log In with Google</p>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

export default LogInTab;
