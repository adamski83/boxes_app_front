import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../apiClient";

const getElementByID = async (id: string) => {
  const response = await axiosInstance.get(`/api/box/${id}`);
  return response.data;
};

export function useBoxesByID(id: string) {
  return useQuery({
    queryKey: ["boxes", id],
    queryFn: () => getElementByID(id),
  });
}
