import Todo from "../models/todo-model.js";

export const createTodo = async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json({ message: "Todo created successfully.", newTodo });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Error occuring in Todo creation", error });
  }
};

export const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(201).json({ message: "Todo fetched successfully.", todos });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Error occuring in Todo fetching", error });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({ message: "Todo Updated successfully.", todo });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Error occuring in Todo Updating", error });
  }
};


export const deleteTodo = async (req, res) => {
    try {
      const todo = await Todo.findByIdAndDelete(req.params.id);
      res.status(201).json({ message: "Todo Deleted successfully.", todo });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: "Error occuring in Todo Deletion", error });
    }
  };
  