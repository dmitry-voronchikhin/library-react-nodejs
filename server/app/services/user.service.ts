import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import { tokenService } from "./token.service";
import { mailService } from "./mail.service";
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
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(newUser.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink: string) {
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
      throw new Error("Ссылка на активацию недействительна");
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
}

export const userService = new UserService();
