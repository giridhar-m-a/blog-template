"use server";
import { PostFormType, PostSchema } from "@/app/__schema/post/PostSchema";
import db from "@/db";
import { blogPost, blogsToCategory } from "@/db/schemas/blog-post";
import { image } from "@/db/schemas/image";
import { isAuthorised } from "@/lib/getAuthUser";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { returnError } from "../utils/return-error";

/**
 *
 * @param data : @type {PostFormType}
 * @returns {
 * ok: boolean
 * message: string
 * data?: BlogPost
 * }
 *
 * this function is used to create a post
 *
 */

export const createPost = async (data: PostFormType) => {
  try {
    const { message, user: AuthUser } = await isAuthorised([
      "admin",
      "seo",
      "manager",
    ]);

    console.log("AuthUser", AuthUser);

    if (!AuthUser?.id) {
      throw new Error(message);
    }

    const parsedData = PostSchema.safeParse(data);

    if (!parsedData.success) {
      throw new Error("Invalid Data");
    }

    const {
      title,
      content,
      keywords,
      description,
      featureImage,
      slug,
      category,
    } = parsedData.data;

    let existingFeatureImage: typeof image.$inferSelect | undefined;

    if (featureImage) {
      existingFeatureImage = await db.query.image.findFirst({
        where: eq(image.id, featureImage),
      });
      if (!existingFeatureImage) {
        throw new Error("Feature image not found");
      }
    }

    const newPost = await db.transaction(async (trx) => {
      // Insert the blog post
      const [newPost] = await trx
        .insert(blogPost)
        .values({
          title: title,
          content: content,
          keywords: keywords,
          description: description,
          imageId: featureImage || null,
          slug: slug,
          userId: AuthUser.id as string,
        })
        .returning();

      if (!newPost) {
        throw new Error("Failed to insert blog post");
      }

      // Insert the categories
      if (category?.length) {
        await trx.insert(blogsToCategory).values(
          category.map((catId) => ({
            postId: newPost.id, // Use the ID of the inserted post
            categoryId: catId,
          }))
        );
      }
      return newPost;
    });

    revalidatePath("/", "layout");

    return {
      ok: true,
      message: "Post created successfully",
      data: newPost,
    };
  } catch (err) {
    console.log(err);
    return returnError(err);
  }
};
