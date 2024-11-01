/* eslint-disable @typescript-eslint/ban-ts-comment */
"use server";

import { JWTExpired } from "jose/errors";
import { veryfyToken } from "../utils/jwt-token";
import { returnError } from "../utils/return-error";
import { getUserByEmail } from "../utils/users";
import { db } from "@/lib/db";
import { BcryptProvider } from "@/lib/Bcrypt.provider";
import { ResetPasswordType } from "@/app/__schema/auth/schema";

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

    const existingToken = await db.token.findUnique({
      where: {
        token: token,
        email: email,
      },
    });

    if (!existingToken) {
      throw new Error("Invalid Token");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const hashedPassword = await hash.hash(password);

    const user = await db.user.update({
      where: {
        email: email,
      },
      data: {
        password: hashedPassword,
        isVerified: true,
      },
    });

    if (!user) {
      throw new Error("User Not Updated");
    }

    await db.token.delete({
      where: {
        email: email,
      },
    });

    return {
      ok: true,
      message: "Password Reset Successful",
    };
  } catch (err) {
    return returnError(err);
  }
};
