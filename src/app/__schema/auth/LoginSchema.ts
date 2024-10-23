import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is required" })
    .min(1, { message: "Password is required" }),
});

export type LoginFormType = z.infer<typeof LoginSchema>;
