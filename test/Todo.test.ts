import sinon from 'sinon';
import {assert} from 'chai';
import Todo from '../src/Todo';
// import request from 'supertest';

const postData = {
  query: `query getTodos() {
          getTodos(){
            id
            task
            complete
            }
          }`
        };

describe('Todo', () => {
  const todo1 = {
    id: 1,
    task: 'get it done',
    complete: false
  }
  const todo2 = {
    id: 2,
    task: 'finish him',
    complete: true
  }
  describe('fetches todos', () => {
    const expectedTodos = [todo1, todo2];
    it('returns all the todos', async () => {
      // arrange
      const todo = new Todo() as any; // TODO - update
      sinon.stub(todo, 'fetch').resolves(expectedTodos);
      // act
      const todos = await todo.fetchAll();
      // assert
      assert.deepStrictEqual(todos, expectedTodos)

    })
  });
});


// Given the user has written at least one todo
// When the user requests todos
// Then the todos are fetched and returned

// endpoint