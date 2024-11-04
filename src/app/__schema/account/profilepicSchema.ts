import * as z from "zod";

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = ["image/png", "image/webp"];

export const ProfileImageSchema = z.object({
  image: z
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
    ),
});

export type ProfileImageType = z.infer<typeof ProfileImageSchema>;
