import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

export const returnError = async (error: unknown) => {
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
    return { massage: "something went wrong", ok: false };
  }

  return { massage: "something went wrong", ok: false };
};
