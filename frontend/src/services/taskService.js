
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
  const data = await getTasks();
  const tasks = Array.isArray(data) ? data : data.tasks || [];
  return tasks.map((t) => ({
    ...t,
    ...getTaskExtras(t.id),
  }));
}

// Get single task
export async function fetchTaskById(id) {
  const data = await getTaskById(id);
  return data.task || data;
}

// Add task
export async function addTask({ title, description, category, priority, dueDate, dueTime, reminder }) {
  const data = await createTask(title, description);
  const newTask = data.task || data;
  saveTaskExtras(newTask.id, { category, priority, dueDate, dueTime, reminder });
  return { ...newTask, category, priority, dueDate, dueTime, reminder };
}

// Edit task
export async function editTask(id, updates) {
  const data = await updateTask(id, updates);
  return data.task || data;
}

// Toggle task
export async function toggleTask(task) {
  const data = await updateTask(task.id, { is_completed: !task.is_completed });
  return data.task || data;
}

// Delete task
export async function removeTask(id) {
  await deleteTask(id);
  deleteTaskExtras(id);
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