import { ApolloServer } from "apollo-server-express";
import { Express } from "express";

import { EMPTY_STRING } from "../common/constants";
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
        const token = req.headers.authorization?.split(" ")[1] || EMPTY_STRING;
        const isTokenValid = await tokenService.validateAccessToken(token);
        if (!isTokenValid) {
          throw new Error("Пользователь не авторизован");
        }

        return { token };
      },
    });

    await server.start();

    server.applyMiddleware({
      app: this.expressApp,
      path: "/graphql",
    });
  }
}
