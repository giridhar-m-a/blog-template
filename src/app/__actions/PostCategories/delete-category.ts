"use server";

import db from "@/db";
import { blogPostCategory } from "@/db/schemas/blog-post-category";
import { eq } from "drizzle-orm";

export const deleteCategory = async (id: number) => {
  try {
    await db.delete(blogPostCategory).where(eq(blogPostCategory.id, id));
    return { ok: true, message: "Category deleted successfully" };
  } catch (err) {
    console.log(err);
    return { ok: false, message: "Something went wrong" };
  }
};
