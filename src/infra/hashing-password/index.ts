import * as bcrypt from "bcrypt";

export const hashPassword = async (saltRounds: number, password: string) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  return `${hashedPassword}`;
};

export const comparePassword = async (password: string, hash: string) =>
  await bcrypt.compare(password, hash);
