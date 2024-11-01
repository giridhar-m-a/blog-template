"use server";

import { RegisterSchemaType } from "@/app/__schema/auth/RegisterSchema";
import { BcryptProvider } from "@/lib/Bcrypt.provider";
import { db } from "@/lib/db";
import { generateToken } from "../utils/jwt-token";
import { userVerificationMail } from "../utils/node-mailer";
import { returnError } from "../utils/return-error";

const hashingProvider = new BcryptProvider();

export const Register = async (data: RegisterSchemaType) => {
  try {
    const existingUser = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const password = await hashingProvider.hash(data.password);

    // console.log("password:", password);

    const user = await db.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          ...data,
          password: password,
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: false,
          createdAt: true,
          isVerified: true,
        },
      });

      const token = await generateToken(newUser);
      await tx.token.create({
        data: {
          email: newUser.email,
          token: token,
        },
      });

      return { newUser, token };
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
