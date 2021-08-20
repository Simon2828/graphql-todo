import {Todo} from '../../src/types';

// implementing the Redis db functionality in memory

// todo builder to create number of todos
type TodoBuilder = (num: number) => Todo[];

export default class DB {
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