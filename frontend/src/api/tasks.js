
import axiosInstance from "./axiosInstance";

// Get All Tasks
export async function getTasks() {
  const { data } = await axiosInstance.get("/tasks");
  return data;
}

// Get Task By ID
export async function getTaskById(id) {
  const { data } = await axiosInstance.get(`/tasks/${id}`);
  return data;
}

// Create Task
export async function createTask(title, description) {
  const { data } = await axiosInstance.post("/tasks", { title, description });
  return data;
}

// Update Task
export async function updateTask(id, updatedData) {
  const { data } = await axiosInstance.put(`/tasks/${id}`, updatedData);
  return data;
}

// Delete Task
export async function deleteTask(id) {
  const { data } = await axiosInstance.delete(`/tasks/${id}`);
  return data;
}