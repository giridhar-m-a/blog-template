import * as z from "zod";

export const ForgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
});

export type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>;
