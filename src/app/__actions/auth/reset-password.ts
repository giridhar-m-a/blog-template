/* eslint-disable @typescript-eslint/ban-ts-comment */
"use server";

import { JWTExpired } from "jose/errors";
import { veryfyToken } from "../utils/jwt-token";
import { returnError } from "../utils/return-error";
import { getUserByEmail } from "../utils/users";
import db from "@/db";
import { BcryptProvider } from "@/lib/Bcrypt.provider";
import { ResetPasswordType } from "@/app/__schema/auth/ResetPasswordSchema";
import { eq } from "drizzle-orm";
import { token as tokenSchema } from "@/db/schemas/token";
import { user } from "@/db/schemas/user";

const hash = new BcryptProvider();

export const resetPassword = async ({
  token,
  password,
  confirmPassword,
}: ResetPasswordType) => {
  try {
    const verifiedPayload = await veryfyToken(token);

    if (verifiedPayload instanceof JWTExpired) {
      throw new Error("Invalid Token");
    }

    //@ts-ignore
    const { email } = verifiedPayload.payload;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      throw new Error("User not found");
    }

    const existingToken = await db.query.token.findFirst({
      where: eq(tokenSchema.email, email) && eq(tokenSchema.token, token),
    });

    if (!existingToken) {
      throw new Error("Invalid Token");
    }

    if (existingToken.purpose !== "forgetPassword") {
      throw new Error("Invalid Token");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const hashedPassword = await hash.hash(password);

    await db.transaction(async (tx) => {
      await tx
        .update(user)
        .set({ password: hashedPassword, isVerified: true })
        .where(eq(user.id, existingUser.id));
      await tx.delete(tokenSchema).where(eq(tokenSchema.email, email));
    });

    return {
      ok: true,
      message: "Password Reset Successful",
    };
  } catch (err) {
    return returnError(err);
  }
};
