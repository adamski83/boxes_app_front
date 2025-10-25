import {
  Download as DownloadIcon,
  PictureAsPdf as PictureAsPdfIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import {
  Box,
  Chip,
  IconButton,
  ListItem,
  ListItemButton,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

interface PdfFile {
  name: string;
  path: string;
  size: number;
  sizeFormatted: string;
  createdAt: string;
  modifiedAt: string;
}

interface PdfListItemProps {
  file: PdfFile;
  onView: (file: PdfFile) => void;
  onDownload: (file: PdfFile) => void;
}

export const PdfListItem: React.FC<PdfListItemProps> = ({
  file,
  onView,
  onDownload,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Paper sx={{ mb: 2 }} elevation={1}>
      <ListItem
        disablePadding
        secondaryAction={
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              edge="end"
              onClick={() => onView(file)}
              title="Podgląd"
              color="primary"
              aria-label={`Podgląd ${file.name}`}
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton
              edge="end"
              onClick={() => onDownload(file)}
              title="Pobierz"
              color="secondary"
              aria-label={`Pobierz ${file.name}`}
            >
              <DownloadIcon />
            </IconButton>
          </Box>
        }
      >
        <ListItemButton onClick={() => onView(file)} sx={{ pr: 10 }}>
          <PictureAsPdfIcon
            sx={{
              mr: 2,
              color: "error.main",
              fontSize: 40,
              flexShrink: 0,
            }}
          />

          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Primary content */}
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

            {/* Secondary content */}
            <Box>
              <Typography
                variant="body2"
                component="span"
                color="text.secondary"
                sx={{ display: "block", mb: 0.25 }}
              >
                Utworzono: {formatDate(file.createdAt)}
              </Typography>
              <Typography
                variant="body2"
                component="span"
                color="text.secondary"
                sx={{ display: "block" }}
              >
                Zmodyfikowano: {formatDate(file.modifiedAt)}
              </Typography>
            </Box>
          </Box>
        </ListItemButton>
      </ListItem>
    </Paper>
  );
};
