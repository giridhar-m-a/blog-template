import { PrismaClient } from "@prisma/client";
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
  if (
    error instanceof PrismaClientInitializationError ||
    error instanceof PrismaClientKnownRequestError ||
    error instanceof PrismaClientUnknownRequestError ||
    error instanceof PrismaClientValidationError ||
    error instanceof PrismaClientRustPanicError ||
    error instanceof PrismaClient
  ) {
    return { message: "something went wrong", ok: false };
  }
  if (error instanceof Error) {
    return { message: error.message, ok: false };
  }

  return { message: "something went wrong", ok: false };
};
