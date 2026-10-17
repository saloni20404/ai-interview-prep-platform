import axios from "axios";

// Uses VITE_API_URL env variable — set this in .env for local dev and in Vercel project settings for production
const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true
});

export async function register({ username, email, password }) {
    try {
        const response = await api.post('/api/auth/register', { username, email, password });
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function login({ email, password }) {
    try {
        const response = await api.post("/api/auth/login", { email, password });
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function logout() {
    try {
        const response = await api.get("/api/auth/logout");
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export async function getMe() {
    try {
        const response = await api.get("/api/auth/get-me");
        return response.data;
    } catch (err) {
        console.log(err);
    }
}