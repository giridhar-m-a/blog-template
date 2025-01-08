"use server";

import db from "@/db";
import { token } from "@/db/schemas/token";
import { generateInviteToken } from "../utils/jwt-token";
import { userInviteMail } from "../utils/node-mailer";
import { returnError } from "../utils/return-error";
import { eq } from "drizzle-orm";

export const resendInvitation = async (id: number) => {
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

    const generatedToken = await generateInviteToken({
      email: existingToken.email,
      name: existingToken.name || "",
      role: existingToken.role || "user",
    });

    if (!generatedToken) {
      return { ok: false, message: "Token generation failed" };
    }

    await db
      .update(token)
      .set({ token: generatedToken })
      .where(eq(token.id, id));

    const isMailSend = await userInviteMail(
      {
        email: existingToken.email,
        name: existingToken.name || "",
        role: existingToken.role || "user",
      },
      generatedToken
    );

    if (!isMailSend) {
      return { message: "Mail Not Sent", ok: false };
    }
    return { ok: true, message: "Re-invited successfully" };
  } catch (err) {
    return { ok: false, message: "Error Re-inviting" };
  }
};
