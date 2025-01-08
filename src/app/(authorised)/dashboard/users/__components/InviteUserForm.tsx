import { inviteUsers } from "@/app/__actions/users/invite-users";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import React from "react";
import { useForm } from "react-hook-form";

type Props = {
  setOpen: (open: boolean) => void;
  open: boolean;
};

const InviteUserForm: React.FC<Props> = ({ setOpen, open }) => {
  const queryClient = useQueryClient();

  const form = useForm<InviteUserSchemaType>({
    resolver: zodResolver(InviteUserSchema),
    defaultValues: {
      email: "",
      name: "",
      role: "user",
    },
  });

  const { reset } = form;

  const { mutate: inviteUser, isPending: createPending } = useMutation({
    mutationKey: ["invite-user"],
    mutationFn: inviteUsers,
    onSuccess: (data: {
      ok: boolean;
      message: string;
      data?: typeof blogPostCategory.$inferSelect;
    }) => {
      if (data) {
        if (data.ok) {
          toast({
            title: data.message,
          });
          queryClient.invalidateQueries({
            queryKey: ["getInvitedUsers"],
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

  const onSubmit = async (formData: InviteUserSchemaType) => {
    inviteUser(formData);
  };

  return (
    <div className="w-96">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            disabled={isSubmitting}
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="email"
                  className="font-semi-bold text-lg flex gap-2 items-center"
                >
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    id="email"
                    placeholder="email"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
  );
};

export default InviteUserForm;
