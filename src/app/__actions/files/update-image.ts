"use server";

import db from "@/db";
import { image } from "@/db/schemas/image";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { returnError } from "../utils/return-error";

export const updateImage = async (id: number, altText: string) => {
  try {
    const exinstigImage = await db.query.image.findFirst({
      where: eq(image.id, id),
    });
    if (!exinstigImage) {
      throw new Error("Image not found");
    }

    await db
      .update(image)
      .set({
        altText: altText,
      })
      .where(eq(image.id, id));

    revalidatePath("/", "layout");

    return {
      ok: true,
      message: "Image updated successfully",
    };
  } catch (err) {
    console.log(err);
    return returnError(err);
  }
};
