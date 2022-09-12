import { userService } from "../services/user.service";

const COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000;

class UserController {
  async registration(req: any, res: any) {
    try {
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: COOKIE_MAX_AGE,
        httpOnly: true,
      });

      return res.status(200).json(userData);
    } catch (e) {
      console.log(e);
      res.status(400).json({
        error: e,
      });
    }
  }
}

export const userController = new UserController();
