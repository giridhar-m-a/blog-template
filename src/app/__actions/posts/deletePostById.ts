"use server";

import { db } from "@/lib/db";
import { getAuthUser, isAuthorised } from "@/lib/getAuthUser";

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

    const existingPost = await db.blogPost.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingPost) {
      throw new Error("Post not found");
    }

    await db.blogPost.delete({
      where: {
        id: id,
      },
    });
    return { ok: true, message: "Post deleted successfully" };
  } catch (err) {
    console.log(err);
    return { ok: false, message: "Something went wrong" };
  }
};
