import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./apiClient";

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
