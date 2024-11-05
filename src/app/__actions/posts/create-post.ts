"use server";
import { PostFormType, PostSchema } from "@/app/__schema/post/PostSchema";
import { db } from "@/lib/db";
import { getAuthUser } from "@/lib/getAuthUser";
import { returnError } from "../utils/return-error";
import { revalidatePath } from "next/cache";

export const createPost = async (data: PostFormType) => {
  try {
    const AuthUser = await getAuthUser();
    // console.log("user : ",AuthUser)

    if (!AuthUser) {
      throw new Error("You are not logged in");
    }

    if (!["admin", "seo", "manager"].includes(AuthUser.role)) {
      throw new Error("You are not authorized");
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

    const newPost = await db.blogPost.create({
      data: {
        title,
        content,
        keywords,
        description,
        slug,
        featuredImage: featureImage
          ? {
              connect: {
                id: featureImage || undefined,
              },
            }
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

    console.log(newPost);

    revalidatePath("/", "layout");

    return {
      ok: true,
      message: "Post created successfully",
    };
  } catch (err) {
    console.log(err);
    return returnError(err);
  }
};
