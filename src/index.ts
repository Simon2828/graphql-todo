import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from '../schemas/schema';

const app = express();

const rootValue = {
  showTodos: () => 'TODO the todos list'
}

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue,
    graphiql: true,
  }),
);

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');