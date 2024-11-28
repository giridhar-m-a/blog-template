import { auth, ExtendedUser } from "@/auth";
import { Role } from "@prisma/client";
import { db } from "./db";
import { returnError } from "@/app/__actions/utils/return-error";

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
  role: Role[]
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
    const user = await getAuthUser();

    if (!user) {
      throw new Error("You are not logged in");
    }

    const existingUser = await db.user.findUnique({
      where: {
        id: user?.id,
      },
    });
    if (!existingUser) {
      throw new Error("User not found");
    }
    if (![...role, Role.Super_Admin].includes(existingUser.role)) {
      throw new Error("You are not authorized");
    }
    return { ok: true, message: "You are authorized", user };
  } catch (err) {
    return returnError(err);
  }
};
