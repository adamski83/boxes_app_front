import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../apiClient";
import { ProductCategory } from "src/types";

interface SearchParams {
  name?: string;
  categories?: ProductCategory[];
}

const getAllBoxes = async () => {
  const response = await axiosInstance.get("/api/box/search");
  return response.data;
};

const searchBoxes = async (params: SearchParams) => {
  const queryParams = new URLSearchParams();

  if (params.name) {
    queryParams.append("name", params.name);
  }

  if (params.categories && params.categories.length > 0) {
    params.categories.forEach((cat) => {
      queryParams.append("category", cat);
    });
  }

  const response = await axiosInstance.get(`/api/box/search?${queryParams}`);
  return response.data;
};

export function useBoxes() {
  return useQuery({
    queryKey: ["boxes"],
    queryFn: getAllBoxes,
  });
}

export function useSearchBoxes(params: SearchParams) {
  return useQuery({
    queryKey: ["boxes", params],
    queryFn: () => searchBoxes(params),
    enabled: !!(
      params.name ||
      (params.categories && params.categories.length > 0)
    ),
  });
}
