const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Todo = require("./src/models/todo");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DB)
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log("Error connecting to DB: ", error));

app.get("/api/todos", (req, res) => {
  Todo.find()
    .then((todos) => res.json(todos))
    .catch((error) =>
      res.status(500).json({ error: `Error fetching todos ${error}` })
    );
});

app.get("/api/todos/:id", (req, res) => {
  const id = req.params.id;

  Todo.findById(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).json({ error: "todo not found" });
      }

      res.json(todo);
    })
    .catch((error) =>
      res.status(500).json({ error: `Error fetching todo ${error}` })
    );
});

app.post("/api/todos", (req, res) => {
  const { title, description, completed } = req.body;

  const todo = new Todo({ title, description, completed });

  todo
    .save()
    .then((result) => res.status(201).json(result))
    .catch((error) => {
      console.log("Error saving todo: ", error);
    });
});

app.delete("/api/todos/:id", (req, res) => {
  const id = req.params.id;

  Todo.findByIdAndDelete(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).json({ error: "todo not found" });
      }
      res.json({ message: "todo deleted successfully" });
    })
    .catch((error) => {
      console.log("Error deleting todo: ", error);
      res.status(500).json({ error: "Error deleting todo" });
    });
});

app.listen(8080, () =>
  console.log("Server listening on http://localhost:8080")
);
