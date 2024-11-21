"use server";
import { PostSchema, type PostFormType } from "@/app/__schema/post/PostSchema";
import { db } from "@/lib/db";
import { getAuthUser } from "@/lib/getAuthUser";
import { returnError } from "../utils/return-error";

export const updatePost = async (id: number, FormData: PostFormType) => {
  // console.log(data,"update post")
  try {
    const AuthUser = await getAuthUser();

    if (!AuthUser) {
      throw new Error("You are not logged in");
    }

    if (!["admin", "seo", "manager"].includes(AuthUser.role)) {
      throw new Error("You are not authorized");
    }

    const parsedData = PostSchema.safeParse(FormData);

    if (!parsedData.success) {
      throw new Error("Invalid Data");
    }

    const { data } = parsedData;

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

    const removedCategories = await db.blogPost.update({
      where: {
        id,
      },
      data: {
        category: {
          set: [],
        },
      },
    });

    const post = await db.blogPost.update({
      where: {
        id,
      },
      data: {
        content: data.content || existingPost.content,
        title: data.title || existingPost.title,
        keywords: data.keywords || existingPost.keywords,
        description: data.description || existingPost.description,
        slug: data.slug || existingPost.slug,
        category: {
          connect: data.category && data.category.map((id) => ({ id })),
        },
        featuredImage: {
          connect: data.featureImage ? { id: data.featureImage } : undefined,
        },
      },
    });

    if (post) {
      return {
        ok: true,
        message: "Post updated successfully",
      };
    }

    return {
      ok: false,
      message: "Something went wrong",
    };
  } catch (err) {
    console.error(err);
    return returnError(err);
  }
};
