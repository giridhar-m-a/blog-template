import { envVariables } from "@/app/__constants/env-variables";
import { InviteUserSchemaType } from "@/app/__schema/auth/InviteUserSchema";
import { user as User } from "@/db/schemas/user";
import { SignJWT, jwtVerify } from "jose";

const key = new TextEncoder().encode(envVariables.authSecret);

type jwtPayload = {
  email: string;
  name: string;
  id: string;
  isVerified: boolean;
  createdAt: Date;
};
export const generateToken = async (
  user: jwtPayload | typeof User.$inferSelect
) => {
  return await new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setAudience(envVariables.appUrl || "")
    .setExpirationTime("10m")
    .sign(key);
};
export const generateInviteToken = async (user: InviteUserSchemaType) => {
  return await new SignJWT({
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setAudience(envVariables.appUrl || "")
    .setExpirationTime("1440m")
    .sign(key);
};

export const veryfyToken = async (token: string) => {
  try {
    const payload = await jwtVerify(token, key);
    return payload;
  } catch (err) {
    return err;
  }
};
