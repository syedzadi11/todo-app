


import axiosInstance from "./axiosInstance";

// Register
export async function registerUser(username, password) {
  const { data } = await axiosInstance.post("/auth/register", {
    username,
    password,
  });
  return data;
}

// Login
export async function loginUser(username, password) {
  const { data } = await axiosInstance.post("/auth/login", {
    username,
    password,
  });
  return data;
}