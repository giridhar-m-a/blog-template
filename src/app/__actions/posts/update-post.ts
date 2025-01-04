"use server";
import { PostSchema, type PostFormType } from "@/app/__schema/post/PostSchema";
import db from "@/db";
import { blogPost, blogsToCategory } from "@/db/schemas/blog-post";
import { isAuthorised } from "@/lib/getAuthUser";
import { eq } from "drizzle-orm";
import { returnError } from "../utils/return-error";

export const updatePost = async (id: number, FormData: PostFormType) => {
  try {
    const { message, user: AuthUser } = await isAuthorised([
      "admin",
      "seo",
      "manager",
    ]);

    if (!AuthUser) {
      throw new Error(message);
    }

    const parsedData = PostSchema.safeParse(FormData);

    if (!parsedData.success) {
      throw new Error("Invalid Data");
    }

    const { data } = parsedData;

    const existingPost = await db.query.blogPost.findFirst({
      where: eq(blogPost.id, id),
      with: {
        image: true,
      },
    });

    if (!existingPost) {
      throw new Error("Post not found");
    }

    const updatedPost = await db.transaction(async (tx) => {
      const removedCategories = await tx
        .delete(blogsToCategory)
        .where(eq(blogsToCategory.postId, id));

      const [post] = await tx
        .update(blogPost)
        .set({
          content: data.content || existingPost.content,
          title: data.title || existingPost.title,
          keywords: data.keywords || existingPost.keywords,
          description: data.description || existingPost.description,
          slug: data.slug || existingPost.slug,
          imageId: data.featureImage || existingPost.imageId,
          userId: AuthUser.id,
        })
        .where(eq(blogPost.id, id))
        .returning();

      if (data.category?.length) {
        await tx.insert(blogsToCategory).values(
          data.category.map((catId) => ({
            postId: post.id, // Use the ID of the inserted post
            categoryId: catId,
          }))
        );
      }
      return post;
    });

    if (updatedPost) {
      return {
        ok: true,
        message: "Post updated successfully",
        data: updatedPost,
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
