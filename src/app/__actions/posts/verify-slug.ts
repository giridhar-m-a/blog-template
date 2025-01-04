"use server";

import db from "@/db";
import { returnError } from "../utils/return-error";
import { eq } from "drizzle-orm";
import { blogPost } from "@/db/schemas/blog-post";

export const verifySlug = async (slug: string) => {
  try {
    const post = await db.query.blogPost.findFirst({
      where: eq(blogPost.slug, slug),
    });

    if (post) {
      throw new Error("Slug is not available");
    }
    return { ok: true, message: "Slug is available" };
  } catch (err) {
    return returnError(err);
  }
};
