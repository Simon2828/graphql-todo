// createItem
// getItem
// listItems
// updateItem
// deleteItem
// resetDB

import { assert } from 'chai';
import { toUnicode } from 'node:punycode';
import {Todo} from '../../src/types';

// stubs

// making a request to database, instead of actually doing it
// implementing the Redis db functionality
// create item adds it to DB, what would i want to return?

// input is content as a string

// todo builder to create number of todos
type TodoBuilder = (num: number) => Todo[];

export default class StubDB {
  todos: Todo[];
  constructor(numberOfTodos: number) {
    this.todos = this.createTodos(numberOfTodos);
  }

  private createTodos: TodoBuilder = (num) => {
    const trueOrFalse = Math.random() > 0.5;
    const todos = [];
    for (let i = 1; i < num; i++) {
      todos.push({
        id: i,
        task: `${i}: get this done`,
        complete: trueOrFalse
      })
    }
    return todos;
  }

  getAllTodos() {
    return this.todos;
  }

  // where to create id for todo? in db

  createTodo(task: string, complete: boolean) {
    const id = this.todos.length + 1;
    return [...this.todos, {id, task, complete}]
  }

  getTodo(id: number): Todo | string {
    const todos = this.todos.filter(todo => todo.id === id);
    return todos.length > 0 ? todos[0] : 'Sorry this todo does not exist';
  }

  updateTodo(id: number, updatedTask: string): Todo[] {
    if (typeof this.getTodo(id) === 'string') {
      return this.todos;
    }
    return this.todos.map(todo => {
      return todo.id === id ? { ...todo, task: updatedTask } : todo
    })
  }
}

// describe('getTodo', () => {
//   const stubDB = new StubDB(3);
//   it('gets Todo that exists', () => {
//     const actual = stubDB.getTodo(2);
//     assert.propertyVal(actual, 'id', 2)
//     assert.propertyVal(actual, 'task', '2: get this done')
//   })

//   it('when Todo does not exist then return message', () => {
//     const nonExistantTodo = stubDB.getTodo(4);
//     assert.strictEqual(nonExistantTodo, 'Sorry this todo does not exist')
//   })
// })

describe('updateTodo', () => {
  const stubDB = new StubDB(3);
  it('updates a todo', () => {
    const updatedTodo = stubDB.updateTodo(2, '2: really get this done now');
    assert.propertyVal(updatedTodo[1], 'task', '2: really get this done now');
  })
})










