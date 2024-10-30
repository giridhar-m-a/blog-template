import * as z from "zod";

export const YouTubeVideoSchema = z.object({
  url: z
    .string({ required_error: "Video is required" })
    .min(1, { message: "Video is required" }),
  title: z
    .string({ required_error: "Title is required" })
    .min(1, { message: "Title is required" }),
});

export type YouTubeVideoType = z.infer<typeof YouTubeVideoSchema>;
