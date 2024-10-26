import bcrypt from "bcryptjs";

export default interface HashingProvider {
  hash: (password: string) => Promise<string>;
  comparePassword: (
    password: string | Buffer,
    encrypted: string
  ) => Promise<boolean>;
}

export class BcryptProvider implements HashingProvider {
  public async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  public async comparePassword(
    password: string | Buffer,
    encrypted: string
  ): Promise<boolean> {
    // Ensure password is a string before comparing
    const passwordString =
      typeof password === "string" ? password : password.toString();
    const result = await bcrypt.compare(passwordString, encrypted);
    return result;
  }
}
