import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Single shared axios instance — interceptor registered exactly once
const api = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

export default api;
