"use server";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { returnError } from "../utils/return-error";
import { userVerificationMail } from "../utils/node-mailer";
import { generateToken } from "../utils/jwt-token";

export const sendRenewedVerificationToken = async (user: User) => {
  try {
    const renewedToken = await generateToken(user);

    const existingToken = await db.token.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!existingToken) {
      throw new Error("No Token Found");
    }

    const newToken = await db.token.update({
      where: {
        email: user.email,
      },
      data: {
        token: renewedToken,
      },
    });

    if (newToken.token !== renewedToken) {
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
