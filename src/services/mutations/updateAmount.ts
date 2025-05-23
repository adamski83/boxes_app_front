import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../apiClient";
import { GET_BOXES } from "../queries/tags";

export const useUpdateAmount = (_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      return axiosInstance.put(`/api/box/${_id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([GET_BOXES]);
    },
  });
};
