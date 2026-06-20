
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../services/todo.service.js";
// import { createTodoSchema } from "../validations/todo.validation.js";
import { asyncHandler } from "../middlewares/async.middleware.js";
import { HTTP_STATUS } from "../constants/http-status.constant.js";

// CREATE TASK
export const createTodo = asyncHandler(async (req, res) => {
  const task = await createTask({
    ...req.body,
    userId: req.user.id,
  });

  res.status(HTTP_STATUS.CREATED).json(task);
});


// GET ALL TASKS
export const getTodos = asyncHandler(async (req, res) => {
  const tasks = await getAllTasks(req.user.id);
  res.status(HTTP_STATUS.OK).json(tasks);
});


// GET TASK BY ID
export const getTodoById = asyncHandler(async (req, res) => {
  const task = await getTaskById(req.params.id, req.user.id);

  if (!task) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Task not found",
    });
  }

  res.status(HTTP_STATUS.OK).json(task);
});


// UPDATE TASK
export const updateTodo = asyncHandler(async (req, res) => {
  const task = await updateTask(req.params.id, req.user.id, req.body);

  if (!task) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Task not found or unauthorized",
    });
  }

  res.status(HTTP_STATUS.OK).json(task);
});

// DELETE TASK
export const deleteTodo = asyncHandler(async (req, res) => {
  const task = await deleteTask(req.params.id, req.user.id);

  if (!task) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Task not found or unauthorized",
    });
  }

  res.status(HTTP_STATUS.OK).json({
    message: "Task deleted successfully",
  });
});