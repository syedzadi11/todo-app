

import axiosInstance from "./axiosInstance";
import { getTaskExtras, saveTaskExtras, deleteTaskExtras } from "../utils/helpers";

// Raw API calls
async function getTasks() {
  const { data } = await axiosInstance.get("/tasks");
  return data;
}

async function getTaskById(id) {
  const { data } = await axiosInstance.get(`/tasks/${id}`);
  return data;
}

async function createTask(title, description) {
  const { data } = await axiosInstance.post("/tasks", { title, description });
  return data;
}

async function updateTask(id, updatedData) {
  const { data } = await axiosInstance.put(`/tasks/${id}`, updatedData);
  return data;
}

async function deleteTask(id) {
  const { data } = await axiosInstance.delete(`/tasks/${id}`);
  return data;
}

// Service functions
export async function fetchAllTasks() {
  try {
    const data = await getTasks();
    const tasks = Array.isArray(data) ? data : data.tasks || [];
    return tasks.map((t) => ({ ...t, ...getTaskExtras(t.id) }));
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to load tasks.");
  }
}

export async function fetchTaskById(id) {
  try {
    const data = await getTaskById(id);
    return data.task || data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to load task.");
  }
}

export async function addTask({ title, description, category, priority, dueDate, dueTime, reminder }) {
  try {
    const data = await createTask(title, description);
    const newTask = data.task || data;
    saveTaskExtras(newTask.id, { category, priority, dueDate, dueTime, reminder });
    return { ...newTask, category, priority, dueDate, dueTime, reminder };
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to add task.");
  }
}

export async function editTask(id, updates) {
  try {
    const data = await updateTask(id, updates);
    return data.task || data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to update task.");
  }
}

export async function toggleTask(task) {
  try {
    const data = await updateTask(task.id, { is_completed: !task.is_completed });
    return data.task || data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to update task.");
  }
}

export async function removeTask(id) {
  try {
    await deleteTask(id);
    deleteTaskExtras(id);
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to delete task.");
  }
}

export function filterTasks(tasks, { filter, categoryFilter, searchQuery }) {
  return tasks
    .filter((t) => filter === "all" ? true : filter === "done" ? t.is_completed : !t.is_completed)
    .filter((t) => categoryFilter === "all" ? true : t.category === categoryFilter)
    .filter((t) => searchQuery
      ? t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()))
      : true
    );
}