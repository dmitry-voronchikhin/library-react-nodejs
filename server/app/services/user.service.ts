import bcrypt from "bcrypt";

import { tokenService } from "./token.service";
import { prisma } from "../prisma";
import { UserDto } from "../dto/user.dto";

class UserService {
  async registration(email: string, password: string) {
    const currentUser = await prisma?.user.findUnique({
      where: {
        email,
      },
    });

    if (currentUser) {
      throw new Error(`Пользователь с email ${email} уже существует`);
    }

    const hashPassword = await bcrypt.hash(password, 5);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
      },
    });

    const userDto = new UserDto(newUser);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(newUser.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
}

export const userService = new UserService();
