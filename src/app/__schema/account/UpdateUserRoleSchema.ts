import * as z from "zod";

export const UpdateUserRoleSchema = z.object({
  role: z.enum(["Super_Admin", "admin", "manager", "seo", "user"], {
    required_error: "Role is required",
    message: "Role is required",
  }),
});

export type UpdateUserRoleSchemaType = z.infer<typeof UpdateUserRoleSchema>;
