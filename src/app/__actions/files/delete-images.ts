"use server";

import { db } from "@/lib/db";
import { deleteImageByPublicId } from "../utils/imageDeleter";
import { revalidatePath } from "next/cache";

export const deleteImageById = async (id: number) => {
  try {
    const existingImage = await db.image.findUnique({
      where: {
        id,
      },
    });
    if (!existingImage) {
      throw new Error("Image not found");
    }

    const deleteImage = await deleteImageByPublicId(existingImage.publicId);

    if (deleteImage.message) {
      if (deleteImage.message === "Image not found") {
        return { ok: false, message: "Image not found" };
      }
    }

    if (deleteImage.result !== "ok") {
      throw new Error("error deleting image");
    }
    await db.image.delete({
      where: {
        id,
      },
    });
    revalidatePath("/", "layout");
    return { ok: true, message: "Image deleted successfully" };
  } catch (err) {
    console.log(err);
    return {
      ok: false,
      message: "Error Deleting Image",
    };
  }
};
