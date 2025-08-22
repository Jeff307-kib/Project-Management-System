import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

import AddButton from "@/features/utils/AddButton";
import InviteMemberModal from "@/features/users/InviteMemberModal";

const MembersTab = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <TabsContent value="members">
      <InviteMemberModal isOpen={isOpen} setOpen={handleOpen} />
      <Card className="border-0 rounded-none shadow-none">
        <CardHeader className="relative">
          <CardTitle>Members</CardTitle>
          <CardDescription>
            Members of workspace!
          </CardDescription>
          <div className="absolute top-0 right-5">
            <AddButton label="Member" onClick={handleOpen} />
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
        </CardContent>
        <CardFooter>
          
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

export default MembersTab;
