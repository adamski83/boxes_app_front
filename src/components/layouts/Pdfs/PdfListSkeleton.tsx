import { Box, Paper, Skeleton } from "@mui/material";
import React from "react";

interface PdfListSkeletonProps {
  count?: number;
}

export const PdfListSkeleton: React.FC<PdfListSkeletonProps> = ({
  count = 3,
}) => {
  return (
    <Box>
      {[...Array(count)].map((_, index) => (
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
};
