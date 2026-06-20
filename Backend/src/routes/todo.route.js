import { authenticateToken } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import express from "express";
import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo
} from "../controllers/todo.controller.js";
import { createTodoSchema, updateTodoSchema } from "../validations/todo.validation.js";

const router = express.Router();

// Create Task
router.post("/", authenticateToken, validate(createTodoSchema), createTodo);

// Get All Tasks
router.get("/", authenticateToken, getTodos);

// Get Task By ID
router.get("/:id", authenticateToken, getTodoById);

// Update Task
router.put("/:id", authenticateToken, validate(updateTodoSchema), updateTodo);

// Delete Task
router.delete("/:id", authenticateToken, deleteTodo);

export default router;

