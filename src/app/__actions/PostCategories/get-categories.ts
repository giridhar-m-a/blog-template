"use server";
import db from "@/db";

export const getPostCategories = async () => {
  try {
    return await db.query.blogPostCategory.findMany();
  } catch (err) {
    console.log(err);
  }
};
