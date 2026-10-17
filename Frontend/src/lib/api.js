import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Single shared axios instance — interceptor registered exactly once
const api = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true
});

api.interceptors.request.use((config) => {
    const raw = localStorage.getItem("token");
    if (raw) {
        const token = raw.trim();
        // A valid JWT has no spaces; if it does, it's corrupted — clear it
        if (token && !token.includes(" ")) {
            config.headers["Authorization"] = `Bearer ${token}`;
        } else {
            console.warn("Corrupted token detected in localStorage — clearing it.");
            localStorage.removeItem("token");
        }
    }
    return config;
});

export default api;
