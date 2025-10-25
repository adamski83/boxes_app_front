import { Refresh as RefreshIcon } from "@mui/icons-material";
import {
  Alert,
  Box,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { useDebounce } from "../../../Helpers/useDebounce";
import { usePdfSearch } from "../../../hooks/usePdfs";
import { EmptyState } from "./EmptyState";
import { PdfList } from "./PdfList";
import { PdfListSkeleton } from "./PdfListSkeleton";
import { PdfSearchBar } from "./PdfSearchBar";

interface PdfFile {
  name: string;
  path: string;
  size: number;
  sizeFormatted: string;
  createdAt: string;
  modifiedAt: string;
}

export const Pdfs: React.FC = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "size" | "createdAt">("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  // Debounced search
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Query params
  const searchParams = useMemo(
    () => ({
      name: debouncedSearchTerm,
      sortBy,
      order,
    }),
    [debouncedSearchTerm, sortBy, order],
  );

  // React Query hook
  const {
    data: pdfFiles = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = usePdfSearch(searchParams);

  // Handlers
  const handleViewPdf = (file: PdfFile) => {
    const url = `${import.meta.env.VITE_API_URL || "http://localhost:5001"}${
      file.path
    }`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleDownloadPdf = (file: PdfFile) => {
    try {
      const url = `${import.meta.env.VITE_API_URL || "http://localhost:5001"}${
        file.path
      }`;
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Błąd podczas pobierania PDF:", error);
    }
  };

  // Render conditions
  const isEmpty = pdfFiles.length === 0;
  const hasSearchTerm = searchTerm.length > 0;
  const showEmptyState = !isLoading && isEmpty;
  const showList = !isLoading && !isEmpty;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1">
          Wyszukiwarka plików PDF
        </Typography>

        <IconButton
          onClick={() => refetch()}
          disabled={isFetching}
          title="Odśwież"
          color="primary"
          aria-label="Odśwież listę plików PDF"
        >
          <RefreshIcon />
        </IconButton>
      </Box>

      {/* Search Bar */}
      <PdfSearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        order={order}
        onOrderChange={setOrder}
      />

      {/* Results Count */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Znaleziono: {pdfFiles.length} plików
        </Typography>
        {isFetching && <CircularProgress size={16} />}
      </Box>

      {/* Error Alert */}
      {isError && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          action={
            <IconButton color="inherit" size="small" onClick={() => refetch()}>
              <RefreshIcon />
            </IconButton>
          }
        >
          Błąd podczas ładowania plików PDF: {error?.message || "Nieznany błąd"}
        </Alert>
      )}

      {/* Content */}
      {isLoading && <PdfListSkeleton count={3} />}

      {showEmptyState && <EmptyState hasSearchTerm={hasSearchTerm} />}

      {showList && (
        <PdfList
          files={pdfFiles}
          onView={handleViewPdf}
          onDownload={handleDownloadPdf}
        />
      )}

      {/* Loading indicator during refetch */}
      {isFetching && !isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}
    </Box>
  );
};
