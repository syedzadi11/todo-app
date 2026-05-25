import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
} from "../api/tasks";
import { getToken } from "./authService";
import { saveTaskExtras, deleteTaskExtras, getTaskExtras } from "../utils/helpers";


export async function fetchAllTasks() {
  const token = getToken();
  const data = await getTasks(token);
  const tasks = Array.isArray(data) ? data : data.tasks || [];

 
  return tasks.map((t) => ({
    ...t,
    ...getTaskExtras(t.id),
  }));
}

//single task 
export async function fetchTaskById(id) {
  const token = getToken();
  const data = await getTaskById(token, id);
  return data.task || data;
}

// New task create
export async function addTask({ title, description, category, priority, dueDate, dueTime, reminder }) {
  const token = getToken();
  const data = await createTask(token, title, description);
  const newTask = data.task || data;

  // Extras save 
  saveTaskExtras(newTask.id, { category, priority, dueDate, dueTime, reminder });

  return { ...newTask, category, priority, dueDate, dueTime, reminder };
}

// Task update 
export async function editTask(id, updates) {
  const token = getToken();
  const data = await updateTask(token, id, updates);
  return data.task || data;
}

// Task complete/incomplete toggle
export async function toggleTask(task) {
  const token = getToken();
  const data = await updateTask(token, task.id, { is_completed: !task.is_completed });
  return data.task || data;
}

// Task delete 
export async function removeTask(id) {
  const token = getToken();
  await deleteTask(token, id);
  deleteTaskExtras(id);
}

// Tasks filter 
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