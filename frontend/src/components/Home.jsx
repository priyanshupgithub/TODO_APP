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
        console.log(response.data.todos);
        setTodos(response.data.todos);
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
      setTodos([...todos, response.data.newTodo]);
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
      setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
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

  const remainingTodo = todos.filter((todo)=> !todo.completed).length;

  return (
    <>
      <div className="my-10 bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-6 sm:mx-auto p-6">
        <h1 className="text-2xl mb-5 font-semibold text-center">Todo App</h1>
        <div className="flex mb-4 ">
          <input
            className="flex-growpy-1 px-2 rounded-md flex-grow focus:outline-none"
            type="text"
            placeholder="Add a new todo"
            // value={newTodo}
            onKeyPress={(e) => e.key === "Enter" && todoCreate()}
            onChange={(e)=>setNewTodo(e.target.value)}
          />
          <button onClick={todoCreate} className="border rounded-r-md bg-blue-600 text-white px-4 py-2 hover:bg-blue-900 duration-300">
            Add
          </button>
        </div>
        {loading?(<div><span>Loading....</span></div>):error?(<div>{error}</div>):(
          <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li
              key={todo._id || index}
              className="flex items-center justify-between p-3 bg-gray-100 rounded-md"
            >
              <div className="flex items-center">
                <input type="checkbox" checked={todo.completed} onChange={()=>todoStatus(todo._id)} className="mr-2" />
                <span className={`${todo.completed ? "line-through text-gray-800 font-semibold": ""} `} >{todo.text}</span>
              </div>
              <button onClick={()=>todoDelete(todo._id)} className="text-red-500 hover:text-red-800 duration-300">
                Delete
              </button>
            </li>
          ))}
        </ul>
        )}
        <p className="mt-4 text-center text-sm text-gray-700">
          {remainingTodo} Todo Remaining
        </p>
        <button className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 duration-500 mx-auto block">
          Logout
        </button>
      </div>
    </>
  );
};

export default Home;
