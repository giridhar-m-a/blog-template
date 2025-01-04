"use server";

import db from "@/db";
import { isAuthorised } from "@/lib/getAuthUser";
import { revalidatePath } from "next/cache";
import { returnError } from "../utils/return-error";
import { eq } from "drizzle-orm";
import { blogPost } from "@/db/schemas/blog-post";

export const publishUnPublishPost = async (
  id: number
): Promise<{ ok: boolean; message: string }> => {
  try {
    const { message, user: AuthUser } = await isAuthorised([
      "admin",
      "seo",
      "manager",
    ]);

    if (!AuthUser) {
      throw new Error(message);
    }

    const existingPost = await db.query.blogPost.findFirst({
      where: eq(blogPost.id, id),
    });

    if (!existingPost) {
      throw new Error("Post not found");
    }

    const [post] = await db
      .update(blogPost)
      .set({
        isPublished: !existingPost.isPublished,
      })
      .where(eq(blogPost.id, id))
      .returning();
    revalidatePath("/", "layout");
    if (post) {
      return {
        ok: true,
        message: `Post ${
          post.isPublished ? "published" : "unpublished"
        } successfully`,
      };
    }

    return {
      ok: false,
      message: "Something went wrong",
    };
  } catch (err) {
    return returnError(err);
  }
};
