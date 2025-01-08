"use server";
import db from "@/db";
import { user } from "@/db/schemas/user";
import { Role } from "@/Types/db-types";
import { eq } from "drizzle-orm";

export const updateUserRole = async ({
  userId,
  role,
}: {
  userId: string;
  role: Role;
}) => {
  try {
    const existingUser = await db.query.user.findFirst({
      where: eq(user.id, userId),
    });

    if (!existingUser) {
      return { ok: false, message: "User not found" };
    }

    const updatedUser = await db
      .update(user)
      .set({ role })
      .where(eq(user.id, userId));

    if (!updatedUser) {
      return { ok: false, message: "Error updating user role" };
    }

    return { ok: true, message: "User role updated successfully" };
  } catch (err) {
    return { ok: false, message: "Error updating user role" };
  }
};
