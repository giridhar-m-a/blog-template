"use server";

import db from "@/db";
import { returnError } from "../utils/return-error";
import { eq } from "drizzle-orm";
import { blogPostCategory } from "@/db/schemas/blog-post-category";

export const verifyCategorySlug = async (
  slug: string
): Promise<{ ok: boolean; message: string }> => {
  try {
    const post = await db.query.blogPostCategory.findFirst({
      where: eq(blogPostCategory.slug, slug),
    });

    if (post) {
      throw new Error("Slug is not available");
    }
    return { ok: true, message: "Slug is available" };
  } catch (err) {
    return returnError(err);
  }
};
