"use server";
import {
  PostCategoryFormType,
  PostCategorySchema,
} from "@/app/__schema/post/PostCategorySchema";
import db from "@/db";
import { blogPostCategory } from "@/db/schemas/blog-post-category";
import { eq } from "drizzle-orm";
import { returnError } from "../utils/return-error";

export const updatePostCategory = async ({
  formData,
  id,
}: {
  formData: PostCategoryFormType;
  id: number;
}): Promise<{
  ok: boolean;
  message: string;
  data?: typeof blogPostCategory.$inferSelect;
}> => {
  try {
    const ParsedData = PostCategorySchema.safeParse(formData);

    if (!ParsedData.success) {
      throw new Error("Validation failed");
    }

    const { data } = ParsedData;

    const existingCategory = await db.query.blogPostCategory.findFirst({
      where: eq(blogPostCategory.id, id),
    });

    if (!existingCategory) {
      throw new Error("Category does not exists");
    }

    const newCategory = await db
      .update(blogPostCategory)
      .set(data)
      .where(eq(blogPostCategory.id, id))
      .returning();

    return {
      ok: true,
      message: "Category updated successfully",
      data: newCategory[0],
    };
  } catch (error) {
    return returnError(error);
  }
};
