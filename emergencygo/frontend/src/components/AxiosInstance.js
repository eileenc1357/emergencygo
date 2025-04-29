import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/';

const AxiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000, 
    headers: {
        "Content-Type": "application/json",
        accept: "application/json",
    },
    withCredentials: true 
});

// Request Interceptor to attach the Authorization header
AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('Token');
        if (token) {
            // Use Bearer token format
            config.headers.Authorization = `Token ${token}`;
        } else {
            config.headers.Authorization = '';
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor to handle 401 (Unauthorized) errors
AxiosInstance.interceptors.response.use(
    (response) => {
        return response;
    }, 
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('Token'); // Remove invalid token
        }
        return Promise.reject(error);
    }
);

export default AxiosInstance;
