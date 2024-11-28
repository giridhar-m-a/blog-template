"use server";
import {
  PostCategoryFormType,
  PostCategorySchema,
} from "@/app/__schema/post/PostCategorySchema";
import { returnError } from "../utils/return-error";
import { PostCategory } from "@prisma/client";
import { db } from "@/lib/db";

export const updatePostCategory = async ({
  formData,
  id,
}: {
  formData: PostCategoryFormType;
  id: number;
}): Promise<{ ok: boolean; message: string; data?: PostCategory }> => {
  try {
    const ParsedData = PostCategorySchema.safeParse(formData);

    if (!ParsedData.success) {
      throw new Error("Validation failed");
    }

    const { data } = ParsedData;

    const existingCategory = await db.postCategory.findUnique({
      where: {
        id,
      },
    });

    if (!existingCategory) {
      throw new Error("Category does not exists");
    }

    const newCategory = await db.postCategory.update({ where: { id }, data });

    return {
      ok: true,
      message: "Category created successfully",
      data: newCategory,
    };
  } catch (error) {
    return returnError(error);
  }
};
