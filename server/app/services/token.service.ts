import jwt from "jsonwebtoken";

import { Token } from ".prisma/client";
import { prisma } from "../prisma";

class TokenService {
  generateTokens(payload: object) {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET as jwt.Secret,
      {
        expiresIn: "15m",
      }
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET as jwt.Secret,
      {
        expiresIn: "30d",
      }
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId: string, refreshToken: string) {
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
      throw new Error(
        "При сохранении токена произошла ошибка. Пользователь не найден"
      );
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
}

export const tokenService = new TokenService();
