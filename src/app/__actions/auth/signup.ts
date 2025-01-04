"use server";

import { RegisterSchemaType } from "@/app/__schema/auth/RegisterSchema";
import db from "@/db";
import { token } from "@/db/schemas/token";
import { user as users } from "@/db/schemas/user";
import { BcryptProvider } from "@/lib/Bcrypt.provider";
import { eq } from "drizzle-orm";
import { generateToken } from "../utils/jwt-token";
import { userVerificationMail } from "../utils/node-mailer";
import { returnError } from "../utils/return-error";

const hashingProvider = new BcryptProvider();

export const Register = async (data: RegisterSchemaType) => {
  try {
    const existingUser = await db.query.user.findFirst({
      where: eq(users.email, data.email),
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const password = await hashingProvider.hash(data.password);

    // console.log("password:", password);

    const user = await db.transaction(async (tx) => {
      await tx.insert(users).values({
        ...data,
        password: password,
      });

      const user = await tx.query.user.findFirst({
        where: eq(users.email, data.email),
      });

      if (!user) {
        throw new Error("User not created");
      }

      const generatedToken = await generateToken(user);

      const tokenValues: typeof token.$inferInsert = {
        email: user.email,
        token: generatedToken,
      };

      await tx.insert(token).values(tokenValues);

      return { newUser: user, token: generatedToken };
    });

    if (!user) {
      throw new Error("User not created");
    }

    // console.log("user:", user);
    const mailSend = await userVerificationMail(user.newUser, user.token);

    if (!mailSend?.ok) {
      throw new Error(mailSend?.message);
    }

    return {
      ok: true,
      message:
        "User created successfully & verification mail has been sent if not received try logging in",
    };
  } catch (err) {
    return await returnError(err);
  }
};
