import axios from "axios";

const baseUrl = import.meta.env.VITE_API_PROXY || "http://localhost:8000/api/v1/rent-tracker";

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "multipart/form-data",
    },
})

export default axiosInstance