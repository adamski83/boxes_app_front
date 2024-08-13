import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 5000,
  headers: {
    Accept: "application/json",
  },
});
