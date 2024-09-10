import { MockDataItem } from "src/types";
import { axiosInstance } from "../apiClient";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

const UpdateBox = async (data: MockDataItem) => {
  const response = await axiosInstance.put(`/api/box/${data._id}`, data);
  return response.data;
};

export function useUpdateBox(
  options?: UseMutationOptions<MockDataItem, Error, MockDataItem>,
): UseMutationResult<MockDataItem, Error, MockDataItem> {
  return useMutation({
    mutationFn: UpdateBox,
    ...options,
  });
}
