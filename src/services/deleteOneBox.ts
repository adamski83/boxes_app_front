import { axiosInstance } from "./apiClient";

export const deleteBoxApi = async (id: string) => {
  const response = await axiosInstance.delete(`/api/box/${id}`);
  return response;
};
