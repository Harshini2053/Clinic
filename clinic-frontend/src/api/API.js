import axios from "axios";


const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // change if backend is hosted elsewhere
});

// Add a request interceptor to include token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export function extractErrors(error) {
  if (error.response?.data) {
    if (typeof error.response.data === "string") {
      return error.response.data;
    }
    if (typeof error.response.data === "object") {
      return JSON.stringify(error.response.data, null, 2);
    }
  }
  return error.message || "Unknown error";
}

export default api;
