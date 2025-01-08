"use server";

import db from "@/db";
import { user } from "@/db/schemas/user";
import { eq } from "drizzle-orm";
import { veryfyToken } from "../utils/jwt-token";
import { token } from "@/db/schemas/token";
import { returnError } from "../utils/return-error";
import {
  InviteUserRegisterSchema,
  InviteUserRegisterType,
} from "@/app/__schema/auth/InviteUserSchema";
import { JWTClaimValidationFailed, JWTExpired } from "jose/errors";
import { BcryptProvider } from "@/lib/Bcrypt.provider";

const hashingProvider = new BcryptProvider();

export const registerInvitedUser = async (formData: InviteUserRegisterType) => {
  try {
    const parsedData = InviteUserRegisterSchema.safeParse(formData);

    if (!parsedData.success) {
      throw new Error("Validation failed");
    }

    const { data } = parsedData;

    const payload = await veryfyToken(data.token);

    if (
      payload instanceof JWTExpired ||
      payload instanceof JWTClaimValidationFailed
    ) {
      throw new Error("Invalid Token");
    }

    const existingToken = await db.query.token.findFirst({
      where: eq(token.token, data.token),
    });

    if (!existingToken) {
      throw new Error("Invalid Token");
    }

    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, data.email),
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const password = await hashingProvider.hash(data.password);

    await db.transaction(async (tx) => {
      await tx.insert(user).values({
        ...data,
        password: password,
        isVerified: true,
        verifiedAt: new Date(),
      });

      await tx.delete(token).where(eq(token.token, data.token));
    });

    return { ok: true, message: "User registered successfully" };
  } catch (error) {
    return returnError(error);
  }
};
