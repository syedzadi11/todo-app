
import { loginUser, registerUser } from "../api/auth";

// Login
export async function login(username, password) {
  const data = await loginUser(username, password);
  localStorage.setItem("token", data.token);
  return data;
}

// Register
export async function register(username, password) {
  return await registerUser(username, password);
}

// Logout
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("avatar");
}

// Get Token 
export function getToken() {
  return localStorage.getItem("token");
}

// Logged in check
export function isLoggedIn() {
  return !!localStorage.getItem("token");
}