import DB from '../db/db';
const inMemoryDb = new DB(4)
class Resolvers {
  db: DB;
  constructor(db: DB) {
    this.db = db;
  }

  async showTodos() {
    return await this.db.getAllTodos();
  }
}

export const resolvers = new Resolvers(inMemoryDb);

// todo - have a model layer