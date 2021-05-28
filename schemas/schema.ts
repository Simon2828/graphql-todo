import { buildSchema } from 'graphql';

export default buildSchema(`
  type Query {
    showTodos: [Todo]
  }

  type Todo {
    id: Int!
    task: String!
    complete: Boolean!
  }
`)