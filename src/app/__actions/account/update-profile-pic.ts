"use server";

import { getAuthUser } from "@/lib/getAuthUser";
import { returnError } from "../utils/return-error";
import { ProfileImageSchema } from "@/app/__schema/account/profilepicSchema";
import { db } from "@/lib/db";
import { deleteImageByPublicId } from "../utils/imageDeleter";
import imageUploader from "../utils/imageUploader";
import { revalidatePath } from "next/cache";

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

    const isExistingProfile = await db.profile.findUnique({
      where: {
        userId: authUser.id,
      },
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

      const updatedProfile = await db.profile.update({
        where: {
          userId: authUser.id,
        },
        data: {
          publicId: newProfileImage.public_id,
          url: newProfileImage.secure_url,
        },
      });

      if (updatedProfile) {
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

      const newProfile = await db.profile.create({
        data: {
          user: {
            connect: {
              id: authUser.id,
            },
          },
          publicId: newProfileImage.public_id,
          url: newProfileImage.secure_url,
          fileName: newProfileImage.original_filename,
        },
      });

      if (newProfile) {
        revalidatePath("/", "layout");
        return { ok: true, message: "Profile image created successfully" };
      }

      return { ok: false, message: "Something went wrong" };
    }
  } catch (err) {
    return returnError(err);
  }
};
