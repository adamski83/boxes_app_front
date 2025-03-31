import React from "react";
import { Box, Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { generatePDF } from "src/Helpers/generatePdf";
import NoteCard from "../NoteCard/NoteCard";
import { MockDataItem } from "../../../types/mockData";
import "./card.css";

type CardData = {
  data: MockDataItem[];
};
const Card = ({ data }: CardData) => {
  const { t } = useTranslation();
  const generateSummaryPDF = () => {
    generatePDF(data); //TODO: przekazać dane któe zawierają wszystkie dane a nie tylko wybraną stronę paginacji
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Button variant="contained" color="primary" onClick={generateSummaryPDF}>
        {t("form.generate")}
      </Button>
      <Grid container spacing={1}>
        {data.map((item) => (
          <Grid item key={item._id} xs={12} sm={12} md={12}>
            <NoteCard item={item} key={item._id} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Card;
