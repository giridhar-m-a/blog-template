"use client";
import { deleteInvitation } from "@/app/__actions/users/delete-invitation";
import { resendInvitation } from "@/app/__actions/users/resend-invitation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Ellipsis, RotateCcw, Trash } from "lucide-react";

export default function InviteAction({id}:{id:number}) {
  const queryClient = useQueryClient();
  const { mutate: deleteAnInvite, isPending } = useMutation({
    mutationKey: ["invite-user"],
    mutationFn: deleteInvitation,
    onSuccess: (data: { ok: boolean; message: string }) => {
      if (data) {
        if (data.ok) {
          toast({
            title: data.message,
          });
          queryClient.invalidateQueries({
            queryKey: ["getInvitedUsers"],
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
  const { mutate: resendingInvitation, isPending: resendPending } = useMutation(
    {
      mutationKey: ["invite-user"],
      mutationFn: resendInvitation,
      onSuccess: (data: { ok: boolean; message: string }) => {
        if (data) {
          if (data.ok) {
            toast({
              title: data.message,
            });
            queryClient.invalidateQueries({
              queryKey: ["getInvitedUsers"],
            });
          } else {
            toast({
              variant: "destructive",
              title: data.message,
            });
          }
        }
      },
    }
  );

  const deleteInvite = async () => {
    await deleteAnInvite(id);
  };

  const reInvite = () => {
    resendInvitation(id);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={reInvite}>
            <RotateCcw /> Re-Invite
          </DropdownMenuItem>
          <DropdownMenuItem
            className="bg-red-500 focus:bg-red-600"
            disabled={isPending}
            onClick={deleteInvite}
          >
            <Trash /> Delete User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
