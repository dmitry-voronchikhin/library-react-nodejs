import { UserDto } from "app/dto/user.dto";

export type GenerateTokensResult = {
  refreshToken: string;
  accessToken: string;
};

export type RegistrationResult = GenerateTokensResult & {
  user: UserDto;
};

export type LoginResult = RegistrationResult;
