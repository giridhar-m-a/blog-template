import { getUserById } from "@/app/__actions/utils/users";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import db from "./db";
import { Role, User } from "./Types/db-types";

export type ExtendedUser = DefaultSession["user"] & {
  role: Role;
  avatar: string | null;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   console.log("url: ", url, "baseUrl: ", baseUrl);
    //   // Handle redirect URLs
    //   if (url.startsWith("/")) {
    //     return `${baseUrl}${url}`;
    //   } else if (new URL(url).origin === baseUrl) {
    //     return url;
    //   }
    //   return baseUrl;
    // },

    // async signIn({ user, account }) {
    //   // console.log(user, account);

    //   if (account?.provider !== "credentials") return true;

    //   const existingUser = await getUserById(user.id as string);

    //   if (!existingUser?.isVerified) return false;

    //   return true;
    // },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      // assign user role
      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }

      if (token.avatar && session.user) {
        session.user.avatar = token.avatar as string;
      }

      return session;
    },
    async jwt({ token }) {
      // if there is loggedin user, return token

      if (!token?.sub) return token;

      const existingUser = await getUserById(token.sub as User["id"]);

      if (!existingUser) return token;

      token.role = existingUser.role;
      token.avatar = existingUser.avatar?.url || null;

      return token;
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  pages: {
    signIn: "/login",
    error: "/error",
  },
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
});
