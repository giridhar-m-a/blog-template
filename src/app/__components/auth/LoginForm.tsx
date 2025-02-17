"use client";
import Link from "next/link";

import { login } from "@/app/__actions/auth/signin";
import { LoginFormType, LoginSchema } from "@/app/__schema/auth/LoginSchema";
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

export function LoginForm() {
  const { toast } = useToast();

  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const submitForm = async (data: LoginFormType) => {
    const res = await login({ data });
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
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Link
                      href="/forgot-password"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input
                      type="password"
                      id="password"
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
              {isSubmitting ? "logging in ..." : "Login"}
            </Button>
          </form>
        </Form>
        {/* <Button
          variant={"outline"}
          className="w-full text-center"
          onClick={() =>
            signOut({
              redirectTo: "/",
            })
          }
        >
          Login with Google
        </Button> */}
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
