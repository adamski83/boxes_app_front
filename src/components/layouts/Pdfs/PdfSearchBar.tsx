import { Search as SearchIcon } from "@mui/icons-material";
import { Box, InputAdornment, Paper, TextField } from "@mui/material";
import React from "react";
import { SelectField, SelectOption } from "../../forms/SelectedFile";

interface PdfSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: "name" | "size" | "createdAt";
  onSortByChange: (value: "name" | "size" | "createdAt") => void;
  order: "asc" | "desc";
  onOrderChange: (value: "asc" | "desc") => void;
}

const sortByOptions: SelectOption<"name" | "size" | "createdAt">[] = [
  { value: "name", label: "Nazwa" },
  { value: "size", label: "Rozmiar" },
  { value: "createdAt", label: "Data utworzenia" },
];

const orderOptions: SelectOption<"asc" | "desc">[] = [
  { value: "asc", label: "Rosnąco" },
  { value: "desc", label: "Malejąco" },
];

export const PdfSearchBar: React.FC<PdfSearchBarProps> = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortByChange,
  order,
  onOrderChange,
}) => {
  return (
    <Paper sx={{ p: 2, mb: 3 }} elevation={1}>
      <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
        <TextField
          fullWidth
          placeholder="Wyszukaj PDF po nazwie..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 200 }}
        />

        <SelectField
          label="Sortuj po"
          value={sortBy}
          onChange={onSortByChange}
          options={sortByOptions}
          minWidth={150}
        />

        <SelectField
          label="Kolejność"
          value={order}
          onChange={onOrderChange}
          options={orderOptions}
          minWidth={150}
        />
      </Box>
    </Paper>
  );
};
