"use server";

import { db } from "@/lib/db";
import { returnError } from "../utils/return-error";
import { getAuthUser } from "@/lib/getAuthUser";
import { revalidatePath } from "next/cache";

export const publishUnPublishPost = async (
  id: number
): Promise<{ ok: boolean; message: string }> => {
  try {
    const AuthUser = await getAuthUser();

    if (!AuthUser) {
      throw new Error("You are not logged in");
    }

    if (!["admin", "seo", "manager"].includes(AuthUser.role)) {
      throw new Error("You are not authorized");
    }

    const existingPost = await db.blogPost.findUnique({
      where: {
        id,
      },
      include: {
        featuredImage: true,
      },
    });

    if (!existingPost) {
      throw new Error("Post not found");
    }

    const post = await db.blogPost.update({
      where: {
        id,
      },
      data: {
        isPublished: !existingPost.isPublished,
      },
    });

    if (post) {
      return {
        ok: true,
        message: `Post ${
          post.isPublished ? "published" : "unpublished"
        } successfully`,
      };
      revalidatePath("/", "layout");
    }

    return {
      ok: false,
      message: "Something went wrong",
    };
  } catch (err) {
    return returnError(err);
  }
};
