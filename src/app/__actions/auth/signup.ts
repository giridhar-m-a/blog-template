"use server";

import { RegisterSchemaType } from "@/app/__schema/auth/RegisterSchema";
import { BcryptProvider } from "@/lib/Bcrypt.provider";
import { db } from "@/lib/db";

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

    console.log("password:", password);

    const user = await db.user.create({
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

    if (!user) {
      throw new Error("User not created");
    }

    return {
      ok: true,
      message: "User created successfully",
    };
  } catch (err) {
    return {
      ok: false,
      message: err,
    };
  }
};
