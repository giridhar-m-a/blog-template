"use server";
import db from "@/db";
import { veryfyToken } from "../utils/jwt-token";
import { returnError } from "../utils/return-error";
import { token as tokenSchema } from "@/db/schemas/token";
import { eq } from "drizzle-orm";
import { JWTClaimValidationFailed, JWTExpired } from "jose/errors";

export const getInvitedUserToken = async (
  token: string
): Promise<{
  ok: boolean;
  message: string;
  data?: {
    name: string;
    email: string;
    role: string;
  };
}> => {
  try {
    // console.log("token", token);
    const payload = await veryfyToken(token);

    if (
      payload instanceof JWTExpired ||
      payload instanceof JWTClaimValidationFailed ||
      payload instanceof JWTClaimValidationFailed
    ) {
      throw new Error("Invalid Token");
    }

    const existingToken = await db.query.token.findFirst({
      where: eq(tokenSchema.token, token),
      columns: {
        name: true,
        email: true,
        role: true,
        purpose: true,
      },
    });

    if (!existingToken) {
      throw new Error("Invalid Token");
    }

    if (existingToken.purpose !== "newUser") {
      throw new Error("Invalid Token");
    }

    return {
      ok: true,
      message: "Token Found",
      data: {
        name: existingToken.name || "",
        email: existingToken.email,
        role: existingToken.role || "",
      },
    };
  } catch (err) {
    console.log(err);
    return returnError(err);
  }
};
