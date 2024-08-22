import { MockData } from "src/types";
import { axiosInstance } from "./apiClient";

export const addNewBoxApi = async (box: MockData) => {
  const response = await axiosInstance.post("/api/box", box);
  return response.data;
};
//return response.data !!!!!!!!!!!!!!!
