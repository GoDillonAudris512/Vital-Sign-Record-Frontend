import axios from "axios";

// Backend API URL
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export default api;