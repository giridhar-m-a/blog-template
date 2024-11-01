import { envVariables } from "@/app/__constants/env-variables";
import { User } from "@prisma/client";
import { SignJWT, jwtVerify } from "jose";

const key = new TextEncoder().encode(envVariables.authSecret);

type jwtPayload = {
  email: string;
  name: string;
  id: string;
  isVerified: boolean;
  createdAt: Date;
};
export const generateToken = async (user: jwtPayload | User) => {
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

export const veryfyToken = async (token: string) => {
  try {
    const payload = await jwtVerify(token, key);
    return payload;
  } catch (err) {
    return err;
  }
};
