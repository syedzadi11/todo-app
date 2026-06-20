import db from "../models/index.js";
const Todo = db.Todo;

// CREATE
export const createTask = async (data) => {
  return await Todo.create(data);
};

// GET ALL
export const getAllTasks = async (userId) => {
  return await Todo.findAll({
    where: { userId }
  });
};

// GET BY ID
export const getTaskById = async (id, userId) => {
  const task = await Todo.findOne({
    where: { id, userId }
  });

  return task;
};


// UPDATE
export const updateTask = async (id, userId, data) => {
  const task = await Todo.findOne({
    where: { id, userId }
  });

  if (!task) return null;

  await task.update(data);
  return task;
};

// DELETE
export const deleteTask = async (id, userId) => {
  const task = await Todo.findOne({
    where: { id, userId }
  });

  if (!task) return null;

  await task.destroy();
  return true;
};