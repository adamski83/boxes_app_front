import {
  Download as DownloadIcon,
  PictureAsPdf as PictureAsPdfIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { useDebounce } from "../../../Helpers/useDebounce";
import { usePdfSearch } from "../../../hooks/usePdfs";

interface PdfFile {
  name: string;
  path: string;
  size: number;
  sizeFormatted: string;
  createdAt: string;
  modifiedAt: string;
}

const Pdfs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "size" | "createdAt">("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const searchParams = useMemo(
    () => ({
      name: debouncedSearchTerm,
      sortBy,
      order,
    }),
    [debouncedSearchTerm, sortBy, order],
  );

  const {
    data: pdfFiles = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = usePdfSearch(searchParams);

  const handleViewPdf = (file: PdfFile) => {
    const url = `${import.meta.env.VITE_API_URL || "http://localhost:5001"}${
      file.path
    }`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleDownloadPdf = async (file: PdfFile) => {
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

  const LoadingSkeleton = () => (
    <Box>
      {[...Array(3)].map((_, index) => (
        <Paper key={index} sx={{ mb: 2, p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Skeleton variant="rectangular" width={40} height={40} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="60%" height={24} />
              <Skeleton variant="text" width="40%" height={20} />
              <Skeleton variant="text" width="30%" height={20} />
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="circular" width={40} height={40} />
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
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
        >
          <RefreshIcon />
        </IconButton>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }} elevation={1}>
        <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
          <TextField
            fullWidth
            placeholder="Wyszukaj PDF po nazwie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 200 }}
          />

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Sortuj po</InputLabel>
            <Select
              value={sortBy}
              label="Sortuj po"
              onChange={(e) =>
                setSortBy(e.target.value as "name" | "size" | "createdAt")
              }
            >
              <MenuItem value="name">Nazwa</MenuItem>
              <MenuItem value="size">Rozmiar</MenuItem>
              <MenuItem value="createdAt">Data utworzenia</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Kolejność</InputLabel>
            <Select
              value={order}
              label="Kolejność"
              onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
            >
              <MenuItem value="asc">Rosnąco</MenuItem>
              <MenuItem value="desc">Malejąco</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Znaleziono: {pdfFiles.length} plików
          </Typography>
          {isFetching && <CircularProgress size={16} />}
        </Box>
      </Paper>

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

      {isLoading ? (
        <LoadingSkeleton />
      ) : pdfFiles.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }} elevation={1}>
          <PictureAsPdfIcon sx={{ fontSize: 60, color: "grey.400", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {searchTerm ? "Nie znaleziono plików PDF" : "Brak plików PDF"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {searchTerm
              ? "Zmień kryteria wyszukiwania"
              : "Dodaj nowe pliki lub skontaktuj się z administratorem"}
          </Typography>
        </Paper>
      ) : (
        <List disablePadding>
          {pdfFiles.map((file, index) => (
            <Paper key={`${file.name}-${index}`} sx={{ mb: 2 }} elevation={1}>
              <ListItem
                disablePadding
                secondaryAction={
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      edge="end"
                      onClick={() => handleViewPdf(file)}
                      title="Podgląd"
                      color="primary"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => handleDownloadPdf(file)}
                      title="Pobierz"
                      color="secondary"
                    >
                      <DownloadIcon />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemButton
                  onClick={() => handleViewPdf(file)}
                  sx={{ pr: 10 }}
                >
                  <PictureAsPdfIcon
                    sx={{
                      mr: 2,
                      color: "error.main",
                      fontSize: 40,
                      flexShrink: 0,
                    }}
                  />

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        flexWrap: "wrap",
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="span"
                        sx={{
                          wordBreak: "break-word",
                          color: "text.primary",
                        }}
                      >
                        {file.name}
                      </Typography>
                      <Chip
                        label={file.sizeFormatted}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                    </Box>

                    <Box>
                      <Typography
                        variant="body2"
                        component="span"
                        color="text.secondary"
                        sx={{ display: "block", mb: 0.25 }}
                      >
                        Utworzono:{" "}
                        {new Date(file.createdAt).toLocaleDateString("pl-PL", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="span"
                        color="text.secondary"
                        sx={{ display: "block" }}
                      >
                        Zmodyfikowano:{" "}
                        {new Date(file.modifiedAt).toLocaleDateString("pl-PL", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                    </Box>
                  </Box>
                </ListItemButton>
              </ListItem>
            </Paper>
          ))}
        </List>
      )}

      {isFetching && !isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}
    </Box>
  );
};

export default Pdfs;
