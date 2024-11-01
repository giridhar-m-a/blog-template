import * as z from "zod";

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long") // Minimum length
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter") // Uppercase letter
      .regex(/[0-9]/, "Password must contain at least one number") // Number
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
    token: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;
