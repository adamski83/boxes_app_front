import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosInstance } from "../services/apiClient";

interface PdfFile {
  name: string;
  path: string;
  size: number;
  sizeFormatted: string;
  createdAt: string;
  modifiedAt: string;
}

interface PdfSearchParams {
  name?: string;
  sortBy: "name" | "size" | "createdAt";
  order: "asc" | "desc";
}

interface PdfSearchResponse {
  success: boolean;
  count: number;
  data: PdfFile[];
}

export const usePdfSearch = (params: PdfSearchParams) => {
  return useQuery({
    queryKey: ["pdfs", params],
    queryFn: async (): Promise<PdfFile[]> => {
      const response = await axiosInstance.get<PdfSearchResponse>(
        "/api/pdf/search", //TODO: zmienić endpoint na /api/pdfs
        {
          params: {
            name: params.name || undefined,
            sortBy: params.sortBy,
            order: params.order,
          },
        },
      );

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error("Błąd podczas pobierania plików PDF");
      }
    },
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: (failureCount, error: AxiosError) => {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        return false;
      }
      return failureCount < 3;
    },
    enabled: true,
  });
};

export const usePdfFile = (filename: string) => {
  return useQuery({
    queryKey: ["pdf", filename],
    queryFn: async (): Promise<Blob> => {
      const response = await axiosInstance.get(`/api/pdf/${filename}`, {
        responseType: "blob",
      });
      return response.data;
    },
    enabled: !!filename,
    staleTime: 60 * 60 * 1000,
  });
};

export const useDeletePdf = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (filename: string): Promise<void> => {
      await axiosInstance.delete(`/api/pdf/${filename}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pdfs"] });
    },
    onError: (error: AxiosError) => {
      console.error("Błąd podczas usuwania PDF:", error);
    },
  });
};

export const useUploadPdf = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File): Promise<PdfFile> => {
      const formData = new FormData();
      formData.append("pdf", file);

      const response = await axiosInstance.post<{
        success: boolean;
        data: PdfFile;
      }>("/api/pdf/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error("Błąd podczas uploadowania pliku");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pdfs"] });
    },
  });
};
