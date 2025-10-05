import ErrorIcon from "@mui/icons-material/Error";
import ImageIcon from "@mui/icons-material/Image";
import { lightPalette } from "../../../styles";
import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useState } from "react";

interface ProductImageProps {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  width = 200,
  height = 150,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getImageUrl = (picturePath: string | undefined) => {
    if (!picturePath) return null;

    if (picturePath.startsWith("http")) {
      return picturePath;
    }

    return `${import.meta.env.VITE_API_URL || "http://localhost:5001"}${picturePath}`;
  };

  const imageUrl = getImageUrl(src);

  if (!imageUrl) {
    return (
      <Box
        sx={{
          width,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `1px dashed ${lightPalette?.custom?.borderColor}`,
          borderRadius: 1,
          bgcolor: `${lightPalette?.custom?.hoverBg}`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ImageIcon color="disabled" />
          <Typography variant="caption" color="textSecondary">
            Brak obrazu
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative", width, height }}>
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: `${lightPalette?.custom?.hoverBg}`,
            borderRadius: 1,
          }}
        >
          <CircularProgress size={24} />
        </Box>
      )}

      {error ? (
        <Box
          sx={{
            width,
            height,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `1px solid ${lightPalette?.custom?.error}`,
            borderRadius: 1,
            bgcolor: "error.light",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ErrorIcon color="error" />
            <Typography variant="caption" color="error">
              Błąd ładowania
            </Typography>
          </Box>
        </Box>
      ) : (
        <img
          src={imageUrl}
          alt={alt}
          style={{
            width,
            height,
            objectFit: "cover",
            borderRadius: 4,
            border: `1px solid ${lightPalette?.custom?.borderColor}`,
            display: error ? "none" : "block",
          }}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
            console.error("Błąd ładowania obrazu:", imageUrl);
          }}
        />
      )}
    </Box>
  );
};
