import { FormFields } from "src/components/register/Register";
import { axiosInstance } from "../apiClient";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

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
