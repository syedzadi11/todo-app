

import axiosInstance from "../api/axiosInstance";

// Profile image upload
export async function uploadAvatar(file) {
  const formData = new FormData();
  formData.append("avatar", file);

  const { data } = await axiosInstance.post("/upload-avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  localStorage.setItem("avatar", data.imageUrl);
  return data.imageUrl;
}

// Get Avatar 
export function getAvatar() {
  return localStorage.getItem("avatar");
}

// Remove Avatar 
export function removeAvatar() {
  localStorage.removeItem("avatar");
}