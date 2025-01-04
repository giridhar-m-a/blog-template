"use server";
import db from "@/db";
import { returnError } from "../utils/return-error";
import { userVerificationMail } from "../utils/node-mailer";
import { generateToken } from "../utils/jwt-token";
import { User } from "@/Types/db-types";
import { eq } from "drizzle-orm";
import { token } from "@/db/schemas/token";

export const sendRenewedVerificationToken = async (user: User) => {
  try {
    const renewedToken = await generateToken(user);

    const existingToken = await db.query.token.findFirst({
      where: eq(token.email, user.email),
    });

    if (!existingToken) {
      throw new Error("No Token Found");
    }

    const newToken = await db
      .update(token)
      .set({ token: renewedToken })
      .returning()
      .where(eq(token.email, user.email));

    if (newToken[0].token !== renewedToken) {
      throw new Error("Token Not Updated");
    }

    const isMailSend = await userVerificationMail(user, renewedToken);
    if (!isMailSend) {
      throw new Error("Mail Not Sent");
    }

    return { ok: true, message: "New Verification url is sent to your email" };
  } catch (err) {
    console.log(err);
    return returnError(err);
  }
};
