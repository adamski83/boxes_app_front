import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { FormFields } from "src/components/Register/Register";
import { axiosInstance } from "../apiClient";

const loginUserApi = async (data: FormFields) => {
  const response = await axiosInstance.post("/user/login", data);
  return response.data;
};

export function useUserLogin(
  options?: UseMutationOptions<FormFields, Error, FormFields>,
): UseMutationResult<FormFields, Error, FormFields> {
  return useMutation({
    mutationFn: loginUserApi,
    ...options,
  });
}
