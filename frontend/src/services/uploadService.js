import { getToken } from "./authService";

// Profile image upload 
export async function uploadAvatar(file) {
  const token = getToken();

  const formData = new FormData();
  formData.append("avatar", file);

  const response = await fetch("http://localhost:3000/api/upload-avatar", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "Upload failed");

  // Avatar save in localStorage 
  localStorage.setItem("avatar", data.imageUrl);

  return data.imageUrl;
}


export function getAvatar() {
  return localStorage.getItem("avatar");
}

//  Remove Avatar 
export function removeAvatar() {
  localStorage.removeItem("avatar");
}