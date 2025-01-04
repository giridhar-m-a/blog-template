"use server";

import db from "@/db";
import { token as tokenSchema } from "@/db/schemas/token";
import { user } from "@/db/schemas/user";
import { eq } from "drizzle-orm";
import { JWTExpired } from "jose/errors";
import { veryfyToken } from "../utils/jwt-token";
import { returnError } from "../utils/return-error";
import { sendRenewedVerificationToken } from "./renew-verification-token";

type verifiedPayload = {
  id: "string";
  email: "string";
  name: "string";
  aud: "string";
  exp: "number";
};

export const verifyEmail = async (token: string) => {
  try {
    const verifiedPayload = await veryfyToken(token);

    const existingToken = await db.query.token.findFirst({
      where: eq(tokenSchema.token, token),
    });

    if (!existingToken) {
      throw new Error("Invalid token");
    }

    if (existingToken.purpose !== "verification") {
      throw new Error("Invalid token purpose");
    }

    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, existingToken.email),
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    if (existingUser.isVerified) {
      throw new Error("User already verified");
    }
    if (verifiedPayload instanceof JWTExpired) {
      return sendRenewedVerificationToken(existingUser);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (verifiedPayload.payload) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const { id, email, name } = verifiedPayload.payload as verifiedPayload;

      if (
        id !== existingUser.id ||
        email !== existingUser.email ||
        name !== existingUser.name
      ) {
        throw new Error("Invalid token");
      }

      await db.transaction(async (tx) => {
        const deletedToken = await tx
          .delete(tokenSchema)
          .where(eq(tokenSchema.token, token));

        await tx
          .update(user)
          .set({
            isVerified: true,
            verifiedAt: new Date(),
          })
          .where(eq(user.email, existingUser.email));
      });
    }

    return {
      ok: true,
      message: "User verified successfully",
    };
  } catch (err) {
    return returnError(err);
  }
};
