import { auth, ExtendedUser } from "@/auth";

export const getAuthUser = async (): Promise<ExtendedUser | null> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { user }: { user: ExtendedUser } = await auth();
  return user;
};
