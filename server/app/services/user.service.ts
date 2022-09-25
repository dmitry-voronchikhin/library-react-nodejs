import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import {
  ACTIVATION_LINK_ERROR,
  PASSWORD_ERROR,
  UNAUTHORIZED_ERROR,
  USER_ALREADY_EXIST_ERROR,
  USER_NOT_FOUND_ERROR,
} from "./constants";
import { GenerateTokensResult, LoginResult, RegistrationResult } from "./types";
import { tokenService } from "./token.service";
import { mailService } from "./mail.service";
import { prisma } from "../prisma";
import { UserDto } from "../dto/user.dto";

class UserService {
  private async generateAndSaveTokens(
    userData: UserDto
  ): Promise<GenerateTokensResult> {
    const tokens = tokenService.generateTokens({ ...userData });
    await tokenService.saveToken(userData.id, tokens.refreshToken);

    return tokens;
  }

  async registration(
    email: string,
    password: string
  ): Promise<RegistrationResult> {
    const currentUser = await prisma?.user.findUnique({
      where: {
        email,
      },
    });

    if (currentUser) {
      throw new Error(USER_ALREADY_EXIST_ERROR);
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const activationLink = uuid();

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
        activation: {
          create: {
            activationLink,
            isActivate: false,
          },
        },
      },
    });

    const accountActivationLink = `${process.env.API_HOST}/user/activate/${activationLink}`;
    await mailService.sendActivationMail(email, accountActivationLink);

    const userDto = new UserDto(newUser);
    const tokens = await this.generateAndSaveTokens(userDto);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink: string): Promise<void> {
    const currentUser = await prisma.user.findFirst({
      where: {
        activation: {
          activationLink,
        },
      },
      select: {
        activation: true,
        id: true,
      },
    });

    if (!currentUser) {
      throw new Error(ACTIVATION_LINK_ERROR);
    }

    await prisma.activation.update({
      where: {
        id: currentUser?.activation?.id,
      },
      data: {
        isActivate: true,
      },
    });
  }

  async login(email: string, password: string): Promise<LoginResult> {
    const user = await prisma?.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error(USER_NOT_FOUND_ERROR);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error(PASSWORD_ERROR);
    }

    const userDto = new UserDto(user);
    const tokens = await this.generateAndSaveTokens(userDto);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken: string): Promise<void> {
    await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new Error(UNAUTHORIZED_ERROR);
    }

    const isRefreshTokenValid = await tokenService.validateRefreshToken(
      refreshToken
    );
    const existedRefreshToken = await tokenService.checkToken(refreshToken);

    if (!isRefreshTokenValid || !existedRefreshToken) {
      throw new Error(UNAUTHORIZED_ERROR);
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        id: existedRefreshToken.userId,
      },
    });

    if (!currentUser) {
      throw new Error(UNAUTHORIZED_ERROR);
    }

    const userDto = new UserDto(currentUser);
    const tokens = this.generateAndSaveTokens(userDto);

    return {
      ...tokens,
      user: userDto,
    };
  }
}

export const userService = new UserService();
