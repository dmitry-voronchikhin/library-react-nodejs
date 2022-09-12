import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { rootRouter } from "./router";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", rootRouter);

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
