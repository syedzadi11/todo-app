import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
} from "../services/todo.service.js";

import { createTodoSchema } from "../validations/todo.validation.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// CREATE TASK
export const createTodo = asyncHandler(async (req, res) => {

  const { error } = createTodoSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }

  const task = await createTask({
    ...req.body,
    userId: req.user.id   
  });

  res.status(201).json(task);
});


//  GET ALL TASKS 
export const getTodos = asyncHandler(async (req, res) => {

  const tasks = await getAllTasks(req.user.id); 

  res.status(200).json(tasks);
});


// GET TASK BY ID 
export const getTodoById = asyncHandler(async (req, res) => {

  const task = await getTaskById(req.params.id);

  if (!task || task.userId !== req.user.id) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json(task);
});


// UPDATE TASK 
export const updateTodo = asyncHandler(async (req, res) => {

  const task = await updateTask(req.params.id, req.user.id, req.body);

  if (!task) {
    return res.status(404).json({ message: "Task not found or unauthorized" });
  }

  res.status(200).json(task);
});


// DELETE TASK 
export const deleteTodo = asyncHandler(async (req, res) => {

  const task = await deleteTask(req.params.id, req.user.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found or unauthorized" });
  }

  res.status(200).json({ message: "Task deleted successfully" });
});