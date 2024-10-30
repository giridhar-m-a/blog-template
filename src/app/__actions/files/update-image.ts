"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const updateImage = async (id: number, altText: string) => {
  try {
    const exinstigImage = await db.image.findUnique({
      where: {
        id,
      },
    });
    if (exinstigImage) {
      await db.image.update({
        where: {
          id,
        },
        data: {
          altText,
        },
      });
    }

    revalidatePath("/", "layout");

    return {
      ok: true,
      message: "Image updated successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      ok: false,
      message: "Something went wrong",
    };
  }
};
