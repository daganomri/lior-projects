const cors = require("cors");
const crypto = require("crypto");
const express = require("express");

const app = express(); // Here we're creating the express app instance.
const PORT = 3001;

// This will serve as our database. It lives in memory, so it will be reset every time we restart the server.
const todos = [
  // We use the crypto module to generate random ids for our todos.
  { id: crypto.randomUUID(), title: "create todo server", completed: true },
  { id: crypto.randomUUID(), title: "create todo client", completed: true },
];

const findTodo = (id) => todos.find((todo) => todo.id === id);

// This allows the client to make requests to the server.
app.use(cors());

app.get("/todos", (req, res) => {
  console.log("get todos");
  res.json(todos);
});

app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  const todo = findTodo(id);
  res.json(todo);
});

app.post("/todos", (req, res) => {
  const { title } = req.query;
  const newTodo = { id: crypto.randomUUID(), title, completed: false };
  todos.push(newTodo);
  console.log("add todo", newTodo);
  res.status(201).json(newTodo);
});

app.patch("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.query;

  const todo = findTodo(id);
  todo.completed = completed === "true" ? true : false;

  console.log("patch todo", todo);

  res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  // delete from todos array the element in todoIndex
  todos.splice(todoIndex, 1);
  console.log("delete todo", id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
