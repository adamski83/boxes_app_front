import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { FormFields } from "src/components/Register/Register";
import { axiosInstance } from "../apiClient";

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
