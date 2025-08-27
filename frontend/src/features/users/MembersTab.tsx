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
import { useGetMembersQuery } from "@/api/apiSlice";

type Props = {
  workspaceId: string;
};

const MembersTab = ({ workspaceId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: members,
    isSuccess,
    isError,
    error,
  } = useGetMembersQuery(workspaceId);

  let membersList;
  if (isSuccess) {
    if (members.data.length > 0) {
      membersList = members.data.map((member) => {
        return (
          <div key={member.id}>
            <p>{member.username}</p>
            <p>{member.email}</p>
            <p>{member.profile_url}</p>
          </div>
        )
      })
    } else {
      membersList = <p>No Members</p>;
    }
  } else if (isError) {
    console.log(error)
    if ("status" in error) {
      membersList = <p>Error: {error.status}</p>;
    } else {
      membersList = <p>An Unexpected error occured.</p>;
    }
  }

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <TabsContent value="members">
      <InviteMemberModal isOpen={isOpen} setOpen={handleOpen} />
      <Card className="border-0 rounded-none shadow-none">
        <CardHeader className="relative">
          <CardTitle>Members</CardTitle>
          <CardDescription>Members of workspace!</CardDescription>
          <div className="absolute top-0 right-5">
            <AddButton label="Member" onClick={handleOpen} />
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">{membersList}</CardContent>
        <CardFooter></CardFooter>
      </Card>
    </TabsContent>
  );
};

export default MembersTab;
