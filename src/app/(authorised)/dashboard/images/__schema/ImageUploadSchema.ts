import * as z from "zod";

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/webp",
  "image/jpeg",
  "image/jpg",
];

export const imageSchema = z
  .any()
  .optional()
  .refine(
    (files) => {
      if (!files || files.length !== 1) return false;
      const file = files[0];
      return ACCEPTED_IMAGE_TYPES.includes(file.type);
    },
    { message: "Invalid file. Choose either PNG or WEBP image." }
  )
  .refine(
    (files) => {
      if (!files || files.length !== 1) return false;
      const file = files[0];
      return file.size <= MAX_FILE_SIZE;
    },
    { message: "Max file size allowed is 2MB." }
  );

export const ImageUploadSchema = z.object({
  image: imageSchema,
  altText: z
    .string({ required_error: "Alt text is required" })
    .min(1, { message: "Alt text is required" }),
});

export type ImageUploadType = z.infer<typeof ImageUploadSchema>;
