"use server";

import db from "@/db";
import { blogPost } from "@/db/schemas/blog-post";
import { isAuthorised } from "@/lib/getAuthUser";
import { eq } from "drizzle-orm";

/**
 *
 * @param id : @type {number} id of the post to be deleted
 * @returns {
 * ok: boolean
 * message: string}
 *
 * This function is used to delete a post by id
 *
 */

export const deletePostById = async (id: number) => {
  try {
    const { message, user } = await isAuthorised(["admin", "seo", "manager"]);

    if (!user) {
      throw new Error(message);
    }

    const existingPost = await db.query.blogPost.findFirst({
      where: eq(blogPost.id, id),
    });

    if (!existingPost) {
      throw new Error("Post not found");
    }

    await db.delete(blogPost).where(eq(blogPost.id, id));
    return { ok: true, message: "Post deleted successfully" };
  } catch (err) {
    console.log(err);
    return { ok: false, message: "Something went wrong" };
  }
};
