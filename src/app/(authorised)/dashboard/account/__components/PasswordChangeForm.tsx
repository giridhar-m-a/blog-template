"use client";

import { updatePassword } from "@/app/__actions/account/change-password";
import {
  ChangePasswordSchema,
  ChangePasswordType,
} from "@/app/__schema/account/ChangePasswordSchema";
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
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const PasswordChangeForm: React.FC = () => {
  const form = useForm<ChangePasswordType>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { toast } = useToast();

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const submitForm = async (data: ChangePasswordType) => {
    console.log(data);
    const res = await updatePassword(data);

    if (res) {
      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Error",
          description: res.message,
        });
      } else {
        toast({
          title: "Password changed successfully",
          duration: 3000,
        });
        reset();
      }
    }
  };

  return (
    <>
      <Form {...form}>
        <form className="space-y-8" onSubmit={handleSubmit(submitForm)}>
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="oldPassword">Old Password</FormLabel>
                <FormControl>
                  <Input
                    id="oldPassword"
                    type="password"
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
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="newPassword">New Password</FormLabel>
                <FormControl>
                  <Input
                    id="newPassword"
                    type="password"
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
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default PasswordChangeForm;
