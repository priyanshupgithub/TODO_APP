import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/todo/get-todo",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setTodos(response.data);
        setError(null);
      } catch (error) {
        setError("Failed to fetch the todos.");
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const todoCreate = async () => {
    if (!newTodo) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/todo/create-todo",
        {
          text: newTodo,
          completed: false,
        },
        { withCredentials: true }
      );
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      setError("Failed to create the todo.");
    }
  };

  const todoStatus = async (id) => {
    const todo = todos.find((t) => t._id === id);
    try {
      const response = await axios.put(
        `http://localhost:3000/todo/update-todo/${id}`,
        {
          ...todo,
          completed: !todo.completed,
        },
        {
          withCredentials: true,
        }
      );
      setTodos(todos.map((t) => (t._id === id ? response.data : t)));
    } catch (error) {
      setError("Failed to find todo status.");
    }
  };

  const todoDelete = async (id) => {
    try {
      const response = axios.delete(
        `http://localhost:3000/todo/delete-todo/${id}`,
        {
          withCredentials: true,
        }
      );
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      setError("Failed to Delete todo.");
    }
  };

  return (
    <div className="border border-black">
      {loading === true ? <div> Loading fething the todos </div> : "Home"}
    </div>
  );
};

export default Home;
