import { useQuery } from "@tanstack/react-query";
import { getAllBoxes } from "./apiClient";

export function useBoxes() {
  return useQuery({
    queryKey: ["boxes"],
    queryFn: getAllBoxes,
  });
}
