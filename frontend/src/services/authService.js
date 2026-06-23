

import axiosInstance from "./axiosInstance";

// Login
export async function login(username, password) {
  try {
    const { data } = await axiosInstance.post("/auth/login", { username, password });
    localStorage.setItem("token", data.token);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Login failed. Please try again.");
  }
}

// Register
export async function register(username, password) {
  try {
    const { data } = await axiosInstance.post("/auth/register", { username, password });
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Registration failed. Please try again.");
  }
}

// Update Profile
export async function updateUserProfile({ username, password }) {
  try {
    const { data } = await axiosInstance.put("/user/update", { username, password });
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Update failed. Please try again.");
  }
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