import { Request, Response } from "express";

import { userService } from "../services/user.service";
import { EMPTY_STRING } from "../common/constants";

const COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000;
const CLIENT_URL = process.env.CLIENT_URL;

class UserController {
  async registration(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: COOKIE_MAX_AGE,
        httpOnly: true,
      });

      return res.status(200).json(userData);
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        error: e,
      });
    }
  }

  async activate(req: Request, res: Response) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);

      return res.redirect(CLIENT_URL || EMPTY_STRING);
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        error: e,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: COOKIE_MAX_AGE,
        httpOnly: true,
      });

      return res.status(200).json(userData);
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        error: e,
      });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies;
      await userService.logout(refreshToken);

      res.clearCookie("refreshToken");

      return res.status(200).end();
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        error: e,
      });
    }
  }
}

export const userController = new UserController();
