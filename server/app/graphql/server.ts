import { ApolloServer } from "apollo-server-express";
import { Express } from "express";

import { tokenService } from "../services/token.service";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

export class Apollo {
  expressApp: Express;

  constructor(expressApp: Express) {
    this.expressApp = expressApp;
  }

  async init() {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      csrfPrevention: true,
      cache: "bounded",
      context: async ({ req }) => {
        const refreshToken = req.cookies.refreshToken;
        const isTokenValid = await tokenService.validateRefreshToken(
          refreshToken
        );
        const checkedToken = await tokenService.checkToken(refreshToken);
        if (isTokenValid || !checkedToken) {
          throw new Error("Пользователь не авторизован");
        }

        return { token: checkedToken };
      },
    });

    await server.start();

    server.applyMiddleware({
      app: this.expressApp,
      path: "/graphql",
    });
  }
}
