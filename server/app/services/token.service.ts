import jwt from "jsonwebtoken";
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
    const currentToken = await prisma.token.findFirst({
      where: {
        userId,
      },
    });

    if (currentToken) {
      prisma.token.update({
        where: {
          userId,
        },
        data: {
          refreshToken,
        },
      });
    }

    const token = prisma.token.create({
      data: {
        userId,
        refreshToken,
      },
    });

    return token;
  }
}

export const tokenService = new TokenService();
