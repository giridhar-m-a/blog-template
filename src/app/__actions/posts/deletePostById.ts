"use server";

import { db } from "@/lib/db";
import { getAuthUser } from "@/lib/getAuthUser";

/**
 *
 * @param id
 * @returns {
 * ok: boolean
 * message: string}
 *
 * This function is used to delete a post by id
 *
 */

export const deletePostById = async (id: number) => {
  try {
    const user = await getAuthUser();

    if (!user) {
      throw new Error("You are not logged in");
    }

    if (!["admin", "seo", "manager"].includes(user.role)) {
      throw new Error("You are not authorized");
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
