"use server";
import {
  InviteUserSchema,
  InviteUserSchemaType,
} from "@/app/__schema/auth/InviteUserSchema";
import db from "@/db";
import { token as tokenSchema } from "@/db/schemas/token";
import { user } from "@/db/schemas/user";
import { eq } from "drizzle-orm";
import { generateInviteToken } from "../utils/jwt-token";
import { userInviteMail } from "../utils/node-mailer";
import { returnError } from "../utils/return-error";
import { getUserByEmail } from "../utils/users";
import { isAuthorised } from "@/lib/getAuthUser";

export const inviteUsers = async (formData: InviteUserSchemaType) => {
  try {
    const { ok, message } = await isAuthorised(["admin", "manager", "seo"]);
    console.log("data");
    console.dir(formData, { depth: null });

    if (!ok) {
      throw new Error(message);
    }

    const parsedData = InviteUserSchema.safeParse(formData);

    if (!parsedData.success) {
      throw new Error("Invalid form data");
    }
    const { data } = parsedData;

    const token = await generateInviteToken(data);

    if (!token) {
      throw new Error("Token generation failed");
    }
    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, data.email),
    });

    if (existingUser) {
      console.dir(existingUser, { depth: null });
      throw new Error("User already exists");
    }

    const existingToken = await db.query.token.findFirst({
      where: eq(tokenSchema.email, data.email) || eq(tokenSchema.token, token),
    });

    if (
      existingToken?.email === data.email &&
      existingToken.purpose === "newUser"
    ) {
      await db
        .update(tokenSchema)
        .set({ token: token })
        .where(eq(tokenSchema.email, data.email));
    } else if (
      existingToken?.email === data.email &&
      existingToken.purpose !== "newUser"
    ) {
      const user = await getUserByEmail(data.email);
      if (!user) {
        await db
          .update(tokenSchema)
          .set({ token: token, purpose: "newUser", name: data.name })
          .where(eq(tokenSchema.email, data.email));
      } else {
        console.dir(user, { depth: null });
        throw new Error("User already exists");
      }
    } else {
      await db.insert(tokenSchema).values({
        ...data,
        purpose: "newUser",
        token: token,
      });
    }

    const res = await userInviteMail(data, token);

    if (!res.ok) {
      throw new Error(res.message);
    }

    return { ok: true, message: "Invitation sent successfully" };
  } catch (err) {
    return returnError(err);
  }
};
