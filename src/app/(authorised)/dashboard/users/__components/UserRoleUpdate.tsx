import PopOver from "@/app/(authorised)/__components/PopOver";
import { inviteUsers } from "@/app/__actions/users/invite-users";
import { updateUserRole } from "@/app/__actions/users/update-user-role";
import {
  UpdateUserRoleSchema,
  UpdateUserRoleSchemaType,
} from "@/app/__schema/account/UpdateUserRoleSchema";
import {
  InviteUserSchema,
  InviteUserSchemaType,
} from "@/app/__schema/auth/InviteUserSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { blogPostCategory } from "@/db/schemas/blog-post-category";
import { toast } from "@/hooks/use-toast";
import { Role, ShortUser } from "@/Types/db-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import React, { use } from "react";
import { useForm } from "react-hook-form";

type Props = {
  setOpen: (open: boolean) => void;
  open: boolean;
  user: ShortUser;
};

const UserRoleUpdate: React.FC<Props> = ({ setOpen, open, user }) => {
  const queryClient = useQueryClient();

  const form = useForm<UpdateUserRoleSchemaType>({
    resolver: zodResolver(UpdateUserRoleSchema),
    defaultValues: {
      role: user.role,
    },
  });

  const { reset } = form;

  const { mutate: updateUser, isPending: createPending } = useMutation({
    mutationKey: ["invite-user"],
    mutationFn: updateUserRole,
    onSuccess: (data: { ok: boolean; message: string }) => {
      if (data) {
        if (data.ok) {
          toast({
            title: data.message,
          });
          queryClient.invalidateQueries({
            queryKey: ["getAllUsers"],
          });
          reset();
          setInterval(() => setOpen(!open), 3000);
        } else {
          toast({
            variant: "destructive",
            title: data.message,
          });
        }
      }
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (formData: UpdateUserRoleSchemaType) => {
    updateUser({ userId: user.id, role: formData.role });
  };

  return (
    <PopOver
      trigger={<p>edit</p>}
      open={open}
      setOpen={setOpen}
      title={`Update ${user.name}'s role`}
    >
      <div className="w-96">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description">Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="seo">SEO</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting || createPending}>
              submit
            </Button>
          </form>
        </Form>
      </div>
    </PopOver>
  );
};

export default UserRoleUpdate;
