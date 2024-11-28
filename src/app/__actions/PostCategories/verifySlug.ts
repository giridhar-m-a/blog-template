"use server";

import { db } from "@/lib/db";
import { returnError } from "../utils/return-error";

export const verifyCategorySlug = async (
  slug: string
): Promise<{ ok: boolean; message: string }> => {
  try {
    const post = await db.postCategory.findFirst({
      where: {
        slug,
      },
    });

    if (post) {
      throw new Error("Slug is not available");
    }
    return { ok: true, message: "Slug is available" };
  } catch (err) {
    return returnError(err);
  }
};
