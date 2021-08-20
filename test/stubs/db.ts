import { assert } from 'chai';
import {Todo} from '../../src/types';

// implementing the Redis db functionality in memory

// todo builder to create number of todos
type TodoBuilder = (num: number) => Todo[];

export default class StubDB {
  todos: Todo[];
  constructor(numberOfTodos: number) {
    this.todos = this.createTodos(numberOfTodos);
  }

  private createTodos: TodoBuilder = (num) => {
    // const trueOrFalse = Math.random() > 0.5;
    const todos = [];
    for (let i = 1; i < num; i++) {
      todos.push({
        id: i,
        task: `${i}: get this done`,
        complete: false
      })
    }
    return todos;
  }

  getAllTodos() {
    return this.todos;
  }

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

  deleteTodo(id: number): Todo[] {
    return this.todos.filter(todo => todo.id !== id);
  }
}

describe('DB in memory Stub', () => {
  // beforeEach(function() {
  // });

  const stubDB = new StubDB(3);

  it('updateTodo updates a todo', () => {
    const updatedTodo = stubDB.updateTodo(2, '2: really get this done now');
    assert.propertyVal(updatedTodo[1], 'task', '2: really get this done now');
  });

  it('getTodo gets the todo', () => {
    const todo = stubDB.getTodo(1) as Todo;
    assert.equal(todo.id, 1)
  });

  it('getTodo returns a message when todo does not exist', () => {
    const todo = stubDB.getTodo(10) as string;
    assert.equal(todo, 'Sorry this todo does not exist');
  });

  it('createTodo', () => {
    const todosWithCreated = stubDB.createTodo('Do new thing', false);
    assert.deepStrictEqual(todosWithCreated[2], {id: 3, task: 'Do new thing', complete: false});
  });

  it('deleteTodo removes the todo', () => {
    const todosWithOneDeleted = stubDB.deleteTodo(1);
    assert.equal(todosWithOneDeleted.length, 1);
  })
});










