import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    Accept: "application/json",
  },
});
export const getAllBoxes = async () => {
  return await axiosInstance.get("/box/search").then((res) => res.data);
};
