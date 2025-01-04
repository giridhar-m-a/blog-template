"use server";

import {
  ChangePasswordSchema,
  ChangePasswordType,
} from "@/app/__schema/account/ChangePasswordSchema";
import { BcryptProvider } from "@/lib/Bcrypt.provider";
import db from "@/db";
import { getAuthUser } from "@/lib/getAuthUser";
import { returnError } from "../utils/return-error";
import { getUserById } from "../utils/users";
import { user } from "@/db/schemas/user";
import { eq } from "drizzle-orm";

const hash = new BcryptProvider();

/**
 *
 * @param data : @type {ChangePasswordType}
 * @returns {
 * ok: boolean
 * message: string}
 */

export const updatePassword = async (data: ChangePasswordType) => {
  try {
    const authUser = await getAuthUser();

    if (!authUser || !authUser?.id) {
      throw new Error("You are Not Loggedin");
    }

    const parsedData = ChangePasswordSchema.safeParse(data);

    if (!parsedData.success) {
      throw new Error("Validation failed");
    }

    const { oldPassword, newPassword } = parsedData.data;

    const existingUser = await getUserById(authUser.id);

    if (!existingUser) {
      throw new Error("User not found");
    }

    if (!existingUser.password) {
      throw new Error("User does not have a password");
    }

    const isPasswordValid = await hash.comparePassword(
      oldPassword,
      existingUser.password
    );

    if (!isPasswordValid) {
      throw new Error("Old password is incorrect");
    }

    const hashedPassword = await hash.hash(newPassword);

    await db
      .update(user)
      .set({ password: hashedPassword })
      .where(eq(user.id, authUser.id));

    return { ok: true, message: "Password changed successfully" };
  } catch (err) {
    return returnError(err);
  }
};
