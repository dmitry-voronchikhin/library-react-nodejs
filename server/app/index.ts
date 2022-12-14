import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { Apollo } from "./graphql";
import { rootRouter } from "./router";
import { setHeaders } from "./middlewares";

dotenv.config();

const PORT = process.env.PORT || 5000;

const CORS_CONFIG = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(cors(CORS_CONFIG));
  app.use(setHeaders());

  const apolloServer = new Apollo(app);
  apolloServer.init();

  app.use("/api", rootRouter);

  app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
  });
};

startServer();
