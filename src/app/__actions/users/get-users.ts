"use server";

import db from "@/db";
import { user } from "@/db/schemas/user";
import { isAuthorised } from "@/lib/getAuthUser";
import { ShortUser } from "@/Types/db-types";
import { ne } from "drizzle-orm";

export const getAllUsers = async (): Promise<ShortUser[]> => {
  try {
    const { message, ok } = await isAuthorised(["admin"]);

    if (!ok) {
      throw new Error(message);
    }

    const users = await db.query.user.findMany({
      where: ne(user.role, "Super_Admin"),
      columns: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        isVerified: true,
        role: true,
      },
    });
    return users;
  } catch (err) {
    console.log(err);
    return [];
  }
};
