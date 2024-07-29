import axios from "axios";
import { FormFields } from "src/components/login/Login";

const BASE_URL = "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    Accept: "application/json",
  },
});
export const getAllBoxes = async () => {
  return await axiosInstance.get("/api/box/search").then((res) => res.data);
};

export const registerUserApi = async (data: FormFields) => {
  return await axiosInstance.post("/user/register", data);
};
