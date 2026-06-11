import axiosInstance from "./axiosInstance";

// Update user profile
export async function updateUserProfile({ username, password }) {
  const { data } = await axiosInstance.put("/user/update", {
    username,
    password,
  });
  return data;
}