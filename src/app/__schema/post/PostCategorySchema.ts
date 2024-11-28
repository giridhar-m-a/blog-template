import * as z from "zod";

export const PostCategorySchema = z.object({
  name: z
    .string({ required_error: "Title is required" })
    .min(1, { message: "Title is required" }),
  slug: z.string().min(3, { message: "Slug is required" }).regex(/^\S*$/, {
    message: "slug must not contain any whitespace",
  }),
  description: z.string().optional(),
});

export type PostCategoryFormType = z.infer<typeof PostCategorySchema>;
