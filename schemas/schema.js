"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
exports.default = graphql_1.buildSchema("\n  type Query {\n    showTodos: [Todo]\n  }\n\n  type Todo {\n    id: Int!\n    task: String!\n    complete: Boolean!\n  }\n");
