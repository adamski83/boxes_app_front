import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useAddNewBox = (options?: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axios.post("/api/box", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
};
