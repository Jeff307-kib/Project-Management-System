import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

import AddButton from "@/features/utils/AddButton";
import InviteMemberModal from "@/features/users/InviteMemberModal";
import { useGetMembersQuery } from "@/api/apiSlice";
import { useParams } from "react-router-dom";

type Props = {
  role:string
}

const MembersTab = ({role}: Props) => {
  const { workspaceId = "" } = useParams();
  const backendURL = "http://localhost/projectManagementSystem/backend/public";
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: members,
    isSuccess,
    isError,
    error,
  } = useGetMembersQuery(workspaceId);

  const handleOpen = () => setIsOpen(!isOpen);

  let membersList;
  if (isSuccess) {
    if (members.data.length > 0) {
      membersList = members.data.map((member) => (
        <TableRow key={member.id} className="hover:bg-muted/50 transition">
          <TableCell>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={`${backendURL}/${member.profile_url}`}
                  alt={member.username}
                />
                <AvatarFallback>
                  {member.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{member.username}</p>
                <p className="text-sm text-muted-foreground">{member.email}</p>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <Badge
              variant="outline"
              className="text-green-600 border-green-600 select-none"
            >
              {member.role || "Member"}
            </Badge>
          </TableCell>
          <TableCell className="text-sm text-muted-foreground">
            {member.joined_at
              ? new Date(member.joined_at).toLocaleDateString()
              : "—"}
          </TableCell>
          <TableCell>
            <button className="text-sm text-blue-600 hover:underline">
              Manage
            </button>
          </TableCell>
        </TableRow>
      ));
    } else {
      membersList = (
        <TableRow>
          <TableCell
            colSpan={5}
            className="text-center text-muted-foreground py-6"
          >
            No members found. Invite some teammates 🎉
          </TableCell>
        </TableRow>
      );
    }
  } else if (isError) {
    console.log(error);
    membersList = (
      <TableRow>
        <TableCell colSpan={5} className="text-center text-destructive py-6">
          {("status" in error && error.status) ||
            "An unexpected error occurred."}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <InviteMemberModal isOpen={isOpen} setOpen={handleOpen} />
      <Card className="border-0 rounded-none shadow-none">
        <CardHeader className="flex flex-row justify-between items-center h-0">
          <div>
            <CardTitle>Members</CardTitle>
            <CardDescription>
              Collaborate with your team
            </CardDescription>
          </div>
          {
            role === 'admin' && (
              <AddButton label="Invite Member" onClick={handleOpen} />
            )
          }
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{membersList}</TableBody>
          </Table>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
};

export default MembersTab;
