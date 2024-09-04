import { FormFields } from "src/components/register/Register";
import { axiosInstance } from "../apiClient";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

const registerUserApi = async (data: FormFields): Promise<FormFields> => {
  const response = await axiosInstance.post("/user/register", data);
  return response.data;
};

export function useRegisterUser(
  options?: UseMutationOptions<FormFields, Error, FormFields>,
): UseMutationResult<FormFields, Error, FormFields> {
  return useMutation({
    mutationFn: registerUserApi,
    ...options,
  });
}
