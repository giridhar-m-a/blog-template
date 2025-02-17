"use client";
import Link from "next/link";

import {
  RegisterSchema,
  RegisterSchemaType,
} from "@/app/__schema/auth/RegisterSchema";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Register } from "@/app/__actions/auth/signup";
import { useToast } from "@/hooks/use-toast";

type data = {
  email: string;
  name: string;
};

export default function RegisterForm({ data }: { data?: data }) {
  const { toast } = useToast();
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: data?.email || "",
      password: "",
      name: data?.name || "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const submitForm = async (data: RegisterSchemaType) => {
    const res = await Register(data);
    if (!res.ok) {
      toast({
        variant: "destructive",
        title: res.message,
      });
      reset();
    } else {
      toast({
        title: res.message,
      });
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Signup</CardTitle>
        <CardDescription>
          Enter your email below to create your account
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input type="password" id="password" {...field} />
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
              {isSubmitting ? "loading..." : "Sign Up"}
            </Button>
          </form>
        </Form>
        <Button variant={"outline"} className="w-full text-center">
          Signup with Google
        </Button>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            login here
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
