
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
} from "../api/tasks";
import { getTaskExtras, saveTaskExtras, deleteTaskExtras } from "../utils/helpers";

// Get all tasks with extras
export async function fetchAllTasks() {
  try {
    const data = await getTasks();
    const tasks = Array.isArray(data) ? data : data.tasks || [];
    return tasks.map((t) => ({
      ...t,
      ...getTaskExtras(t.id),
    }));
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to load tasks.");
  }
}

// Get single task
export async function fetchTaskById(id) {
  try {
    const data = await getTaskById(id);
    return data.task || data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to load task.");
  }
}

// Add task
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

// Edit task
export async function editTask(id, updates) {
  try {
    const data = await updateTask(id, updates);
    return data.task || data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to update task.");
  }
}

// Toggle task
export async function toggleTask(task) {
  try {
    const data = await updateTask(task.id, { is_completed: !task.is_completed });
    return data.task || data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to update task.");
  }
}

// Delete task
export async function removeTask(id) {
  try {
    await deleteTask(id);
    deleteTaskExtras(id);
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to delete task.");
  }
}

// Filter tasks
export function filterTasks(tasks, { filter, categoryFilter, searchQuery }) {
  return tasks
    .filter((t) =>
      filter === "all" ? true : filter === "done" ? t.is_completed : !t.is_completed
    )
    .filter((t) =>
      categoryFilter === "all" ? true : t.category === categoryFilter
    )
    .filter((t) =>
      searchQuery
        ? t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()))
        : true
    );
}