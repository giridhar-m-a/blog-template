"use server";
import {
  PostCategoryFormType,
  PostCategorySchema,
} from "@/app/__schema/post/PostCategorySchema";
import { returnError } from "../utils/return-error";
import db from "@/db";
import { eq } from "drizzle-orm";
import { blogPostCategory } from "@/db/schemas/blog-post-category";

export const NewPostCategory = async (
  formData: PostCategoryFormType
): Promise<{
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
      where: eq(blogPostCategory.slug, data.slug),
    });

    if (existingCategory) {
      throw new Error("Category already exists");
    }

    const newCategory = await db
      .insert(blogPostCategory)
      .values(data)
      .returning();

    return {
      ok: true,
      message: "Category created successfully",
      data: newCategory[0],
    };
  } catch (error) {
    return returnError(error);
  }
};
