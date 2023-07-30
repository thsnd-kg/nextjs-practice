import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

// Create an Axios instance with default configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL, // Replace with your API base URL
  timeout: 10000, // Adjust the timeout value as needed
});

// Interceptors for request and response
axiosInstance.interceptors.request.use(
  (config) => {
    // Perform any necessary request transformations or logic here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Perform any necessary response transformations or logic here
    return response.data;
  },
  (error: AxiosError) => {
    // Handle error responses
    // if (error.response) {
    // The request was made and the server responded with a status code that falls out of the range of 2xx
    // You can handle specific error status codes here
    // } else if (error.request) {
    // The request was made but no response was received, `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in Node.js
    // Handle request errors (e.g., network issues)
    // } else {
    // Something happened in setting up the request that triggered an Error
    // Handle other errors
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
