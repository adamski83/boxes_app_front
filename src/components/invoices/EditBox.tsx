import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export const EditBox = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Box>
      <Typography variant="h4">Tu edytujemy</Typography>
      <Typography variant="body1">Zeskanowany kod QR: {id}</Typography>
    </Box>
  );
};
