"use server";

import { db } from "@/lib/db";
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

    // console.log("verifiedPayload: ", verifiedPayload);

    const existingToken = await db.token.findUnique({
      where: {
        token: token,
      },
    });

    console.log("existingToken: ", existingToken);

    if (!existingToken) {
      throw new Error("Invalid token");
    }

    const user = await db.user.findUnique({
      where: {
        email: existingToken.email,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.isVerified) {
      throw new Error("User already verified");
    }
    if (verifiedPayload instanceof JWTExpired) {
      return sendRenewedVerificationToken(user);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (verifiedPayload.payload) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const { id, email, name } = verifiedPayload.payload as verifiedPayload;

      if (id !== user.id || email !== user.email || name !== user.name) {
        throw new Error("Invalid token");
      }

      await db.token.delete({
        where: {
          email: user.email,
        },
      });
    }

    const updatedUser = await db.user.update({
      where: {
        email: user.email,
      },
      data: {
        isVerified: true,
        verifiedAt: new Date(),
      },
    });

    if (!updatedUser) {
      throw new Error("User not updated");
    }

    return {
      ok: true,
      message: "User verified successfully",
    };
  } catch (err) {
    return returnError(err);
  }
};
