"use server";

import { db } from "@/lib/db";
import { isAuthorised } from "@/lib/getAuthUser";
import { revalidatePath } from "next/cache";
import { returnError } from "../utils/return-error";

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
