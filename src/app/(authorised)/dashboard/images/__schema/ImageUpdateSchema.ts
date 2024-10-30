import * as z from "zod";

const imageSchema = z.any().optional();

export const ImageUpdateSchema = z.object({
  image: imageSchema,
  altText: z
    .string({ required_error: "Alt text is required" })
    .min(1, { message: "Alt text is required" }),
});

export type ImageUpdateType = z.infer<typeof ImageUpdateSchema>;
