import {
  UserRepositoryInterface,
  UserWithId,
} from "@domain/user/user.repository";
import { env } from "@infra/env";
import { comparePassword } from "@infra/hashing-password";
import { sign } from "@infra/jwt";

type AuthUserOutput = {
  accessToken: string;
  refreshToken: string;
};

const validateCredentials = async (user: UserWithId, password: string) => {
  const isValid = await comparePassword(password, user.password);
  if (!isValid) throw new Error("Credentials invalid.");

  const accessToken = sign({
    options: { id: user.id },
    expiresIn: "60s",
  });
  const refreshToken = sign({
    options: { id: user.id },
    expiresIn: "600s",
  });

  return { accessToken, refreshToken };
};

export class AuthUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async authByUsername(
    username: string,
    password: string
  ): Promise<AuthUserOutput> {
    const user = await this.userRepository.getByUsername(username);
    return validateCredentials(user, password);
  }

  async authByEmail(email: string, password: string): Promise<AuthUserOutput> {
    const user = await this.userRepository.getByEmail(email);
    return validateCredentials(user, password);
  }

  // async authByToken(refreshToken: string): Promise<AuthUserOutput> {

  //   const user = await this.userRepository.getByUsername(username);
  //   return validateCredentials(user, password);
  // }
}
