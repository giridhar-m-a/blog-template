import { DrizzleError } from "drizzle-orm";

export const returnError = async (
  error: unknown
): Promise<{ message: string; ok: boolean }> => {
  if (error instanceof DrizzleError) {
    return { message: "something went wrong", ok: false };
  }
  if (error instanceof Error) {
    return { message: error.message, ok: false };
  }

  return { message: "something went wrong", ok: false };
};
