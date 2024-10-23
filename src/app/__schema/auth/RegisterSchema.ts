
import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string({ message: "Email is required" }).email({
    message: "Invalid email address",
  }),
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name is required" }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long") // Minimum length
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter") // Uppercase letter
    .regex(/[0-9]/, "Password must contain at least one number") // Number
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ), // Special character
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
