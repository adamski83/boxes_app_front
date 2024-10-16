import { useState } from "react";
import QrScanner from "./QrScanner";
import "./invoices.css";
import { Box, Container, Typography } from "@mui/material";

export const Invoices = ({}) => {
  const [data, setData] = useState("No result");

  const handleScan = (scannedData: string) => {
    setData(scannedData);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <QrScanner onScan={handleScan} />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Typography variant="h2"> Scanned Data: {data}</Typography>
      </Box>
    </Container>
  );
};
