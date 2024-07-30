import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./apiClient";
import { FormFields } from "src/components/login/Login";

export const getAllBoxes = async () => {
  const response = await axiosInstance.get("/api/box/search");
  return response.data;
};

export function useBoxes() {
  return useQuery({
    queryKey: ["boxes"],
    queryFn: getAllBoxes,
  });
}

export const registerUserApi = async (data: FormFields) => {
  const response = axiosInstance.post("/user/register", data);
  return response;
};
