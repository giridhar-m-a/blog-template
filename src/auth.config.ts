import { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./app/__actions/utils/users";
import { LoginSchema } from "./app/__schema/auth/LoginSchema";
import { BcryptProvider } from "./lib/Bcrypt.provider";

const hashingProvider = new BcryptProvider();

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const validatedCredentials = LoginSchema.safeParse(credentials);

        if (!validatedCredentials.success) {
          throw new Error("Validation failed");
        }

        const { email, password } = validatedCredentials.data;

        const user = await getUserByEmail(email);
        if (!user) {
          throw new Error("user not found");
        }

        if (!user.isVerified) {
          throw new Error("user not verified");
        }

        if (!user.password) {
          throw new Error(
            "you are not authorised to login with credentials try login with google"
          );
        }

        const passwordsMatch = await hashingProvider.comparePassword(
          password as string,
          user.password
        );

        if (!passwordsMatch) {
          throw new Error("invalid credentials");
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
