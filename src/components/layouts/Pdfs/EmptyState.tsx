import { PictureAsPdf as PictureAsPdfIcon } from "@mui/icons-material";
import { Paper, Typography } from "@mui/material";
import React from "react";

interface EmptyStateProps {
  hasSearchTerm: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ hasSearchTerm }) => {
  return (
    <Paper sx={{ p: 4, textAlign: "center" }} elevation={1}>
      <PictureAsPdfIcon sx={{ fontSize: 60, color: "grey.400", mb: 2 }} />
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {hasSearchTerm ? "Nie znaleziono plików PDF" : "Brak plików PDF"}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {hasSearchTerm
          ? "Zmień kryteria wyszukiwania"
          : "Dodaj nowe pliki lub skontaktuj się z administratorem"}
      </Typography>
    </Paper>
  );
};
