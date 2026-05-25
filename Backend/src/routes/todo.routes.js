import { authenticateToken } from "../middlewares/auth.middleware.js";
import express from "express";
import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo
} from "../controllers/todo.controller.js";

const router = express.Router();

// Create Task
router.post("/tasks", authenticateToken, createTodo);

// Get All Tasks
router.get("/tasks", authenticateToken, getTodos);

// Get Task By ID
router.get("/tasks/:id", authenticateToken, getTodoById);

// Update Task
router.put("/tasks/:id", authenticateToken, updateTodo);
// Delete Task
router.delete("/tasks/:id", authenticateToken, deleteTodo);

export default router;