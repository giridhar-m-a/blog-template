"use server";

import type { LoginFormType } from "@/app/__schema/auth/LoginSchema";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

type props = {
  data: LoginFormType;
  redirectUrl?: string;
};
const login = async ({ data, redirectUrl }: props) => {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      redirectTo: redirectUrl || "/dashboard",
    });

    return { ok: true, message: "success" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { ok: false, message: "Invalid credentials" };
        case "CallbackRouteError":
          return {
            ok: false,
            message: error.cause?.err?.message || "Please try again later",
          };
        case "OAuthAccountNotLinked":
          return {
            ok: false,
            message: error.cause?.err?.message || "Please try again later",
          };
        default:
          return { ok: false, message: "Something went wrong" };
      }
    }
    // if (isRedirectError(error)) {
    //   redirect(redirectUrl || "/dashboard");
    //   throw error;
    // }

    throw error;
  }
};

export { login };
