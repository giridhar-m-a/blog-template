"use server";

import { getAuthUser } from "@/lib/getAuthUser";
import { returnError } from "../utils/return-error";
import { ProfileImageSchema } from "@/app/__schema/account/profilepicSchema";
import db from "@/db";
import { deleteImageByPublicId } from "../utils/imageDeleter";
import imageUploader from "../utils/imageUploader";
import { revalidatePath } from "next/cache";
import { profile } from "@/db/schemas/profile";
import { eq } from "drizzle-orm";

export const updateProfilePic = async (file: FormData) => {
  try {
    const authUser = await getAuthUser();

    if (!authUser) {
      throw new Error("You are Not Loggedin");
    }

    const formData = {
      image: file.getAll("image"),
    };

    const parsedData = ProfileImageSchema.safeParse(formData);

    if (!parsedData.success) {
      throw new Error(parsedData.error.message);
    }

    const { image } = parsedData.data;

    const isExistingProfile = await db.query.profile.findFirst({
      where: eq(profile.userId, authUser.id as string),
    });

    if (isExistingProfile) {
      const isDeleted = await deleteImageByPublicId(isExistingProfile.publicId);
      if (isDeleted.message) {
        if (isDeleted.message === "Image not found") {
          return { ok: false, message: "Image not found" };
        }
      }

      if (isDeleted.result !== "ok") {
        throw new Error("error deleting image");
      }

      const newProfileImage = await imageUploader(image);
      if (!newProfileImage) {
        throw new Error("Image upload failed");
      }

      if (!newProfileImage?.url) {
        throw new Error("Image upload failed");
      }

      const updatedProfile = await db
        .update(profile)
        .set({
          publicId: newProfileImage.public_id,
          url: newProfileImage.secure_url,
          fileName: newProfileImage.original_filename,
        })
        .returning()
        .where(eq(profile.id, isExistingProfile.id));

      if (updatedProfile.length > 0) {
        revalidatePath("/", "layout");
        return { ok: true, message: "Profile image updated successfully" };
      }
    } else {
      const newProfileImage = await imageUploader(image);
      if (!newProfileImage) {
        throw new Error("Image upload failed");
      }

      if (!newProfileImage?.url) {
        throw new Error("Image upload failed");
      }

      const newProfile = await db
        .insert(profile)
        .values({
          publicId: newProfileImage.public_id,
          url: newProfileImage.secure_url,
          fileName: newProfileImage.original_filename,
          userId: authUser.id as string,
        })
        .returning();

      if (newProfile.length > 0) {
        revalidatePath("/", "layout");
        return { ok: true, message: "Profile image created successfully" };
      }

      return { ok: false, message: "Something went wrong" };
    }
  } catch (err) {
    return returnError(err);
  }
};
