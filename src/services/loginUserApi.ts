import { FormFields } from "src/components/register/Register";
import { axiosInstance } from "./apiClient";

export const loginUserApi = async (data: FormFields) => {
  const response = await axiosInstance.post("/user/login", data);

  return response.data;
};
