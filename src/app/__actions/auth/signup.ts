import { RegisterSchemaType } from "@/app/__schema/auth/RegisterSchema";
import { db } from "@/lib/db";

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

    const user = await db.user.create({
      data: {
        ...data,
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
    console.error(err);
    return{
      ok: false,
      message: "User not created",
    }
  }
};
