import { NextFunction, Request, Response } from "express";

export const setHeaders =
  () => (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  };
