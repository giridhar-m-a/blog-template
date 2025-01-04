"use server";

import db from "@/db";
import { deleteImageByPublicId } from "../utils/imageDeleter";
import { revalidatePath } from "next/cache";
import { image } from "@/db/schemas/image";
import { eq } from "drizzle-orm";

export const deleteImageById = async (id: number) => {
  try {
    const existingImage = await db.query.image.findFirst({
      where: eq(image.id, id),
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
    await db.delete(image).where(eq(image.id, id));
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
