import {
  Card,
  CardContent,
  CardDescription,
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { useState } from "react";

import AddButton from "@/features/utils/AddButton";
import InviteMemberModal from "@/features/users/InviteMemberModal";
import { SuccessToast } from "@/features/utils/SuccessToast";
import { ErrorToast } from "@/features/utils/ErrorToast";
import { useGetMembersQuery } from "@/api/apiSlice";
import { useChangeMemberRoleMutation } from "@/api/apiSlice";
import { useRemoveMemberMutation } from "@/api/apiSlice";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

type OutletContextType = { role: string };

const MembersTab = () => {
  const { workspaceId = "" } = useParams();
  const { role } = useOutletContext<OutletContextType>();
  const backendURL = "http://localhost/projectManagementSystem/backend/public";
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: members,
    isSuccess,
    isError,
    error,
  } = useGetMembersQuery(workspaceId);

  const handleOpen = () => setIsOpen(!isOpen);

  // Handle change member role
  const [changeMemberRole] = useChangeMemberRoleMutation();
  const handleChangeRole = async (
    memberId: string,
    newRole: string,
    username: string
  ) => {
    try {
      await changeMemberRole({
        workspaceId: workspaceId,
        memberId: memberId,
        role: newRole,
      }).unwrap();
      SuccessToast(
        "Member Role Changed!",
        `${username} is now ${newRole} of this workspace.`
      );
    } catch (err) {
      console.error(err);
      ErrorToast("Failed to Change Member Role!");
    }
  };

  // Handle Remove member
  const [removeMember] = useRemoveMemberMutation();
  const handleRemoveMember = async (memberId: string) => {
    try {
      await removeMember({
        workspaceId: workspaceId,
        memberId: memberId,
      }).unwrap();
      SuccessToast("Member Removed Successfully!");
    } catch (err) {
      console.error(err);
      ErrorToast("Failed to Remove Member!");
    }
  };

  const renderMembers = () => {
    if (isError) {
      return (
        <TableRow>
          <TableCell colSpan={4} className="text-center text-destructive py-6">
            {("status" in error && error.status) ||
              "An unexpected error occurred."}
          </TableCell>
        </TableRow>
      );
    }

    if (!isSuccess || members.data.length === 0) {
      return (
        <TableRow>
          <TableCell
            colSpan={4}
            className="text-center text-muted-foreground py-6"
          >
            No members found. Invite some teammates 🎉
          </TableCell>
        </TableRow>
      );
    }

    return members.data.map((member) => (
      <TableRow key={member.id} className="hover:bg-muted/50 transition-colors">
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
        <TableCell className="text-center">
          <Badge
            variant="outline"
            className="text-green-600 border-green-600 select-none"
          >
            {member.role || "Member"}
          </Badge>
        </TableCell>
        <TableCell className="text-center text-sm text-muted-foreground">
          {member.joined_at
            ? new Date(member.joined_at).toLocaleDateString()
            : "—"}
        </TableCell>
        {role === "admin" && (
          <TableCell className="text-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-foreground"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Change Role</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem
                      onClick={() =>
                        handleChangeRole(member.id, "admin", member.username)
                      }
                    >
                      Admin
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        handleChangeRole(member.id, "member", member.username)
                      }
                    >
                      Member
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => handleRemoveMember(member.id)}
                >
                  Remove From Workspace
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        )}
      </TableRow>
    ));
  };

  return (
    <>
      <InviteMemberModal isOpen={isOpen} setOpen={handleOpen} />
      <Card className="border-0 rounded-none shadow-none">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Members</CardTitle>
            <CardDescription>Collaborate with your team</CardDescription>
          </div>
          {role === "admin" && (
            <AddButton label="Member" onClick={handleOpen} />
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead className="text-center">Role</TableHead>
                <TableHead className="text-center">Joined</TableHead>
                {role === "admin" && (
                  <TableHead className="text-center">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>{renderMembers()}</TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default MembersTab;
