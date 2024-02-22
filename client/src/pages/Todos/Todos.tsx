import axios from "axios";
import React, { useEffect, useState } from "react";
import { ITodo, ITodoResponse } from "./TodosTypes";
import { API_URL } from "../../utils/constants/constants";

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<ITodoResponse[]>(API_URL);

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
      const response = await axios.post<ITodoResponse>(API_URL, {
        title: "Todo Title",
        description: "Todo Description",
      });

      const newTodo: ITodo = {
        id: response.data._id,
        title: response.data.title,
        description: response.data.description,
        completed: response.data.completed,
      };

      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);

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
      <button onClick={addTodo}>Add Todo</button>
      {isLoading && <>LOADING.....</>}
      {todos.length === 0 && !isLoading && <>No todos sorry</>}
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
