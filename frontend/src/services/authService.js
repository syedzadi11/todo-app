import { loginUser, registerUser } from "../api/auth";

// Login — token save 
export async function login(username, password) {
  const data = await loginUser(username, password);
  localStorage.setItem("token", data.token);
  return data;
}

// Register
export async function register(username, password) {
  return await registerUser(username, password);
}

// Logout —  Remove token 
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("avatar");
}

// Token 
export function getToken() {
  return localStorage.getItem("token");
}

// Logged in 
export function isLoggedIn() {
  return !!localStorage.getItem("token");
}