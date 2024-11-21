"use server";
import { db } from "@/lib/db";

export const getCategories = async () => {
  try {
    return await db.postCategory.findMany();
  } catch (err) {
    console.log(err);
  }
};
