

import axiosInstance from "./axiosInstance";

// Profile image upload
export async function uploadAvatar(file) {
  const formData = new FormData();
  formData.append("avatar", file);

  try {
    const { data } = await axiosInstance.post("/upload-avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    localStorage.setItem("avatar", data.imageUrl);
    return data.imageUrl;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Avatar upload failed.");
  }
}

// Get Avatar
export function getAvatar() {
  return localStorage.getItem("avatar");
}

// Remove Avatar
export function removeAvatar() {
  localStorage.removeItem("avatar");
}