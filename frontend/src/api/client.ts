import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && !config.url?.endsWith('/auth/log-in') && !config.url?.endsWith('/auth/sign-up')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});