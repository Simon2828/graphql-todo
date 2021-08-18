import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from '../schemas/schema';
import { resolvers } from './resolvers/index';

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  }),
);

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');