import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";

export interface ArduinoData {
  connected: boolean;
  port: string;
  error: string | null;
  lastUpdate: string;
  data: {
    distance: number;
    boxAmount: number;
    maxDistance: number;
    [key: string]: any;
  };
}

interface UseArduinoDataOptions {
  onSuccess?: (data: ArduinoData) => void;
  onError?: (error: unknown) => void;
  queryOptions?: Omit<
    UseQueryOptions<ArduinoData, unknown>,
    "queryKey" | "queryFn"
  >;
}

export const useArduinoData = (options?: UseArduinoDataOptions) => {
  return useQuery<ArduinoData>({
    queryKey: ["arduinoData"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5001/arduino/data");
      return response.data;
    },
    ...options?.queryOptions,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
};
