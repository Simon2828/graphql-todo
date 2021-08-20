import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "../schemas/schema";
import { resolvers } from "./resolvers/index";

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

export default app;