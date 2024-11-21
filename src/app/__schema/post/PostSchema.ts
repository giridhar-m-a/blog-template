import * as z from "zod";

export const PostSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, { message: "Title is required" }),
  content: z
    .string({ required_error: "Content is required" })
    .min(50, { message: "Content is required" }),
  slug: z.string().min(3, { message: "Slug is required" }).regex(/^\S*$/, {
    message: "slug must not contain any whitespace",
  }),
  description: z
    .string()
    .min(50, { message: "Description should not be less than 50 characters" })
    .max(300, { message: "Description should not exceed 300 characters" }),
  featureImage: z.number().optional(),
  category: z.array(z.coerce.number()),
  keywords: z
    .string()
    .min(3, { message: "Key words should not be less than 3 characters" })
    .max(30, { message: "Key words should not exceed 30 characters" }),
});

export type PostFormType = z.infer<typeof PostSchema>;
