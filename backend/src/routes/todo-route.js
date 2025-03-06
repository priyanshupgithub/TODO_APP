import express from "express";
import {
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} from "../controller/todo-controller.js";

const router = express.Router();

router.post("/create-todo", createTodo);
router.get("/get-todo", getTodo);
router.put("/update-todo/:id", updateTodo);
router.delete("/delete-todo/:id", deleteTodo);

export default router;
