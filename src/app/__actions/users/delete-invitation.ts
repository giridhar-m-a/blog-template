"use server";

import db from "@/db";
import { token } from "@/db/schemas/token";
import { eq } from "drizzle-orm";

export const deleteInvitation = async (id: number) => {
  try {
    const existingToken = await db.query.token.findFirst({
      where: eq(token.id, id),
    });

    if (!existingToken) {
      return { ok: false, message: "Token not found" };
    }

    if (existingToken.purpose !== "newUser") {
      return { ok: false, message: "Invalid token purpose" };
    }

    const deletedToken = await db.delete(token).where(eq(token.id, id));

    if (!deletedToken) {
      return { ok: false, message: "Token deletion failed" };
    }

    return { ok: true, message: "Token deleted successfully" };
  } catch (e) {
    return { ok: false, message: "Token deletion failed" };
  }
};
