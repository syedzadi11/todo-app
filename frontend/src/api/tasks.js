const BASE_URL = "http://localhost:3000/api";

// Get All Tasks
export async function getTasks(token) {
  const response = await fetch(`${BASE_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to get tasks");
  return data;
}

// Get Task By ID
export async function getTaskById(token, id) {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to get task");
  return data;
}

// Create Task
export async function createTask(token, title, description) {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to create task");
  return data;
}

// Update Task
export async function updateTask(token, id, updatedData) {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to update task");
  return data;
}

// Delete Task
export async function deleteTask(token, id) {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to delete task");
  return data;
}