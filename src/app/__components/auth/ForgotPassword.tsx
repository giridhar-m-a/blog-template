"use client";

import { sendForgetToken } from "@/app/__actions/auth/forgot-password";
import {
  ForgotPasswordSchema,
  ForgotPasswordType,
} from "@/app/__schema/auth/ForgetPassword";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export function ForgotPassword() {
  const { toast } = useToast();

  const form = useForm<ForgotPasswordType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const submitForm = async (data: ForgotPasswordType) => {
    const res = await sendForgetToken(data);
    console.log(res);
    if (!res?.ok) {
      toast({
        variant: "destructive",
        title: res?.message,
      });
      reset();
    } else {
      toast({
        title: res?.message,
      });
      reset();
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email below to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  {/* <FormDescription /> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-center"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
