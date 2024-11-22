import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

export const returnError = async (
  error: unknown
): Promise<{ message: string; ok: boolean }> => {
  if (error instanceof Error) {
    return { message: error.message, ok: false };
  }
  if (
    error instanceof PrismaClientInitializationError ||
    error instanceof PrismaClientKnownRequestError ||
    error instanceof PrismaClientUnknownRequestError ||
    error instanceof PrismaClientValidationError ||
    error instanceof PrismaClientRustPanicError
  ) {
    return { message: "something went wrong", ok: false };
  }

  return { message: "something went wrong", ok: false };
};
