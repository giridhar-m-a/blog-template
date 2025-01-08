import * as z from "zod";

export const InviteUserSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  name: z
    .string({ required_error: "Name is required" })
    .min(3, { message: "Name is required" }),
  role: z.enum(["Super_Admin", "admin", "manager", "seo", "user"], {
    required_error: "Role is required",
  }),
});

export type InviteUserSchemaType = z.infer<typeof InviteUserSchema>;

export const InviteUserRegisterSchema = z.object({
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
  token: z.string().min(20, { message: "Token is required" }),
});

export type InviteUserRegisterType = z.infer<typeof InviteUserRegisterSchema>;
