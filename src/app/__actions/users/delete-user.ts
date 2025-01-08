"use server";
import db from "@/db";
import { user } from "@/db/schemas/user";
import { eq } from "drizzle-orm";

export const deleteUser = async (id: string) => {
  try {
    await db.delete(user).where(eq(user.id, id));
    return { ok: true, message: "User Deleted Successfully" };
  } catch (err) {
    console.log(err);
    return { ok: false, message: "Error Deleting User" };
  }
};
