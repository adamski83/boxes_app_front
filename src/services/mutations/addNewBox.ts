import { MockData } from "src/types";
import { axiosInstance } from "../apiClient.ts";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

const addNewBoxApi = async (box: MockData): Promise<MockData> => {
  const response = await axiosInstance.post("/api/box", box);
  return response.data;
};
//return response.data !!!!!!!!!!!!!!!

export function useAddNewBox(
  options?: UseMutationOptions<MockData, Error, MockData>,
): UseMutationResult<MockData, Error, MockData> {
  return useMutation({
    mutationFn: addNewBoxApi,
    ...options,
  });
}
