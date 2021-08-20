import { assert } from "chai";
import request from "supertest";
import app from "./../../src/server";

const todosResponseFixture = [
  { id: 1, task: "1: get this done", complete: false },
  { id: 2, task: "2: get this done", complete: false },
  { id: 3, task: "3: get this done", complete: false },
];

describe("Resolvers", () => {
  describe("When I open the todos app", () => {
    it("fetches all the todos", async () => {
      const todosResponse = await request(app)
        .post("/graphql")
        .send({
          query: `
            { showTodos {
                complete
                id
                task
              }
            }
          `, 
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      assert.deepStrictEqual(
        todosResponse.body.data.showTodos,
        todosResponseFixture
      );
    });
  });
});
