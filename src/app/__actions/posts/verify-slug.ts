"use server";

import { db } from "@/lib/db";
import { returnError } from "../utils/return-error";

export const verifySlug = async (slug: string) => {
  try {
    const post = await db.blogPost.findFirst({
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
