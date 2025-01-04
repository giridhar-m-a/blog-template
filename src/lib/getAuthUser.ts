import { auth, ExtendedUser } from "@/auth";
import db from "@/db";
import { returnError } from "@/app/__actions/utils/return-error";
import { eq } from "drizzle-orm";
import { user } from "@/db/schemas/user";

export const getAuthUser = async (): Promise<ExtendedUser | null> => {
  /**
   * this function is used to get the user from the session
   *
   * if the user is not logged in it will @returns {null}
   *
   * if the user is logged in it will @returns {ExtendedUser}
   *
   */

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { user }: { user: ExtendedUser } = await auth();
  return user;
};

export const isAuthorised = async (
  role: string[]
): Promise<{ ok: boolean; message: string; user?: ExtendedUser }> => {
  /**
   * This function checks weather the user has permission to perform the action
   *
   * @param role @type {Role[]}
   *
   * @returns {ok: boolean; message: string, user?: ExtendedUser}
   *
   * if succeed @returns {{ok: true, message: "You are authorized", user: @type {ExtendedUser}}}
   *
   * if fail @returns {{ok: false, message: "You are not authorized"}}
   *
   */

  try {
    const authUser = await getAuthUser();

    if (!authUser) {
      throw new Error("You are not logged in");
    }

    const existingUser = await db.query.user.findFirst({
      where: eq(user.id, authUser.id as string),
    });
    if (!existingUser) {
      throw new Error("User not found");
    }
    if (![...role, "Super_Admin"].includes(existingUser.role)) {
      throw new Error("You are not authorized");
    }
    return { ok: true, message: "You are authorized", user: authUser };
  } catch (err) {
    return returnError(err);
  }
};
