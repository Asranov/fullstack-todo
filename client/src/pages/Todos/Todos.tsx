import axios from "axios";
import React, { useEffect, useState } from "react";
import { ITodo, ITodoResponse } from "./TodosTypes";

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [newTodoDescription, setNewTodoDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<ITodoResponse[]>(
        "http://localhost:8080/api/todos"
      );

      const data: ITodo[] = response.data.map((todo: ITodoResponse) => ({
        id: todo._id,
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
      }));

      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axios.post<ITodoResponse>(
        "http://localhost:8080/api/todos",
        {
          title: newTodoTitle,
          description: newTodoDescription,
        }
      );

      const newTodo: ITodo = {
        id: response.data._id,
        title: response.data.title,
        description: response.data.description,
        completed: response.data.completed,
      };

      setTodos([...todos, newTodo]);
      setNewTodoTitle("");
      setNewTodoDescription("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/todos/${id}`);

      console.log("Todo deleted successfully");
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log("Error deleting todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodoDescription}
          onChange={(e) => setNewTodoDescription(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      {isLoading && <>LOADING.....</>}
      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            <p>
              ID: {todo.id}.{todo.title} - {todo.description}
            </p>
            <button
              onClick={() => {
                deleteTodo(todo.id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Todos;
