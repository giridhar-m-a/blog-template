"use server";

import db from "@/db";
import { user } from "@/db/schemas/user";
import { User } from "@/Types/db-types";
import { eq } from "drizzle-orm";

export const getUserById = async (id: User["id"]) => {
  try {
    const existingUser = await db.query.user.findFirst({
      where: eq(user.id, id),
      with: { avatar: true },
    });
    return existingUser;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, email),
    });
    return existingUser;
  } catch (err) {
    console.log(err);
    return null;
  }
};
