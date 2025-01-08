"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShortUser } from "@/Types/db-types";
import { Ellipsis, PenBox, Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { deleteUser } from "@/app/__actions/users/delete-user";
import { useState } from "react";
import UserRoleUpdate from "./UserRoleUpdate";

export default function UserAction({ user }: { user: ShortUser }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: deleteAnUser, isPending } = useMutation({
    mutationKey: ["invite-user"],
    mutationFn: deleteUser,
    onSuccess: (data: { ok: boolean; message: string }) => {
      if (data) {
        if (data.ok) {
          toast({
            title: data.message,
          });
          queryClient.invalidateQueries({
            queryKey: ["getAllUsers"],
          });
        } else {
          toast({
            variant: "destructive",
            title: data.message,
          });
        }
      }
    },
  });

  const onClick = async () => {
    await deleteAnUser(user.id);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              setOpen(!open);
            }}
          >
            <PenBox /> Edit User
          </DropdownMenuItem>
          <DropdownMenuItem
            className="bg-red-500 focus:bg-red-600"
            disabled={isPending}
            onClick={onClick}
          >
            <Trash /> Delete User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {open && <UserRoleUpdate setOpen={setOpen} open={open} user={user} />}
    </div>
  );
}
