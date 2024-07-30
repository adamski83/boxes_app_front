import { FormFields } from "src/components/login/Login";
import { axiosInstance } from "./apiClient";

export const registerUserApi = async (data: FormFields) => {
  const response = axiosInstance.post("/user/register", data);
  return response;
};
