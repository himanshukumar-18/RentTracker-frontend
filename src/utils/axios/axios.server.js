import axios from "axios";

const baseUrl = import.meta.env.VITE_API_PROXY

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "multipart/form-data",
    },
})

export default axiosInstance