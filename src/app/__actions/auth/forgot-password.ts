"use server";

import {
  ForgotPasswordSchema,
  ForgotPasswordType,
} from "@/app/__schema/auth/ForgetPassword";
import { returnError } from "../utils/return-error";
import { getUserByEmail } from "../utils/users";
import { generateToken } from "../utils/jwt-token";
import { passwordResetMail } from "../utils/node-mailer";
import db from "@/db";
import { token } from "@/db/schemas/token";

export const sendForgetToken = async (data: ForgotPasswordType) => {
  try {
    const validatedValue = await ForgotPasswordSchema.parseAsync(data);

    if (!validatedValue.email) {
      throw new Error("Email is required");
    }

    const existingUser = await getUserByEmail(data.email);
    if (!existingUser) {
      throw new Error("User not found");
    }

    const generatedToken = await generateToken(existingUser);

    const dbToken = await db
      .insert(token)
      .values({
        email: existingUser.email,
        token: generatedToken,
        purpose: "forgetPassword",
      })
      .returning();
    if (dbToken.length < 1) {
      throw new Error("Token Not Created");
    }
    const isMailSend = await passwordResetMail(existingUser, generatedToken);

    if (!isMailSend?.ok) {
      throw new Error("Mail Not Sent");
    }
    return { ok: true, message: "Verification Mail Sent" };
  } catch (err) {
    console.log("err:", err);
    return returnError(err);
  }
};
