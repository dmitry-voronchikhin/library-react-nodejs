import jwt from "jsonwebtoken";

import {
  ACCESS_TOKEN_EXPIRIES_IN,
  REFRESH_TOKEN_EXPIRIES_IN,
  SAVE_TOKEN_ERROR,
} from "./constants";
import { Token } from ".prisma/client";
import { prisma } from "../prisma";
import { EMPTY_STRING } from "../common/constants";

class TokenService {
  JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || EMPTY_STRING;
  JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || EMPTY_STRING;

  generateTokens(payload: object) {
    const accessToken = jwt.sign(
      payload,
      this.JWT_ACCESS_SECRET as jwt.Secret,
      {
        expiresIn: ACCESS_TOKEN_EXPIRIES_IN,
      }
    );
    const refreshToken = jwt.sign(
      payload,
      this.JWT_ACCESS_SECRET as jwt.Secret,
      {
        expiresIn: REFRESH_TOKEN_EXPIRIES_IN,
      }
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId: string, refreshToken: string): Promise<Token> {
    const currentUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        token: true,
        id: true,
      },
    });

    if (!currentUser) {
      throw new Error(SAVE_TOKEN_ERROR);
    }

    let token: Token;

    if (currentUser.token) {
      token = await prisma.token.update({
        where: {
          id: currentUser.token.id,
        },
        data: {
          refreshToken,
        },
      });
    } else {
      token = await prisma.token.create({
        data: {
          refreshToken,
          userId: currentUser.id,
        },
      });
    }

    return token;
  }

  async removeToken(refreshToken: string) {
    await prisma.token.deleteMany({
      where: {
        refreshToken,
      },
    });
  }

  async validateAccessToken(token: string) {
    try {
      const isTokenValid = jwt.verify(token, this.JWT_ACCESS_SECRET);
      return isTokenValid;
    } catch {
      return null;
    }
  }

  async validateRefreshToken(token: string) {
    try {
      const isTokenValid = jwt.verify(token, this.JWT_REFRESH_SECRET);
      return isTokenValid;
    } catch {
      return null;
    }
  }

  async checkToken(refreshToken: string) {
    return await prisma.token.findFirst({
      where: {
        refreshToken,
      },
    });
  }
}

export const tokenService = new TokenService();
