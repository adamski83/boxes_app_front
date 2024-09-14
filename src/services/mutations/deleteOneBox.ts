import { axiosInstance } from "../apiClient";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

const deleteBoxApi = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/box/${id}`);
  } catch (error: any) {
    throw new Error(`Failed to delete box: ${error.message}`);
  }
};

export function useDeleteBox(
  options?: UseMutationOptions<void, Error, string>,
): UseMutationResult<void, Error, string> {
  return useMutation({
    mutationFn: deleteBoxApi,
    ...options,
  });
}
