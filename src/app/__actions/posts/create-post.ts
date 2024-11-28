"use server";
import { PostFormType, PostSchema } from "@/app/__schema/post/PostSchema";
import { db } from "@/lib/db";
import { getAuthUser, isAuthorised } from "@/lib/getAuthUser";
import { returnError } from "../utils/return-error";
import { revalidatePath } from "next/cache";
import { image } from "@prisma/client";

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

    if (!AuthUser) {
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

    let existingFeatureImage: image | null = null;

    if (featureImage) {
      existingFeatureImage = await db.image.findUnique({
        where: {
          id: featureImage,
        },
      });
      if (!existingFeatureImage) {
        throw new Error("Feature image not found");
      }
    }

    console.log("featureImage : ", featureImage);

    const newPost = await db.blogPost.create({
      data: {
        title,
        content,
        keywords,
        description,
        slug,
        featuredImage: featureImage
          ? { connect: { id: featureImage } }
          : undefined,
        author: {
          connect: {
            id: AuthUser.id,
          },
        },
        category: category && {
          connect: category ? category?.map((cat) => ({ id: cat })) : undefined,
        },
      },
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
