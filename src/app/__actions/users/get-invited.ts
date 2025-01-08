"use server";

import db from "@/db";
import { token } from "@/db/schemas/token";
import { isAuthorised } from "@/lib/getAuthUser";
import { eq } from "drizzle-orm";

export const getInvitedUsers = async () => {
  try {
    const { message, ok } = await isAuthorised(["admin"]);

    if (!ok) {
      throw new Error(message);
    }

    return await db.query.token.findMany({
      where: eq(token.purpose, "newUser"),
      columns: {
        id: true,
        email: true,
        role: true,
        name: true,
      },
    });
  } catch (err) {
    console.log(err);
    return [];
  }
};
