import { assert } from 'chai';
import { resolvers } from '../src/resolvers/index';
import supertest from 'supertest';

const baseUrl = supertest('http://localhost:4000/graphql')
const fetchTodos = `{
  todos
}`


describe('Resolvers', () => {
  describe('When I open the todos', () => {
    it('fetches all the todos', async () => {
      const todos = await resolvers.getAllTodos();
    })
  })
});
