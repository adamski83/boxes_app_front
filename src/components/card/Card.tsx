import { Box, Button, Grid } from "@mui/material";
import "./card.css";
import NoteCard from "src/noteCard/NoteCard";
import { MockDataItem } from "src/types";
import { generatePDF } from "src/helpers/generatePdf";
import { useBoxStore } from "src/state/store";

type CardData = {
  data: MockDataItem[];
};
const Card = ({ data }: CardData) => {
  const { boxes, filteredBoxes }: any = useBoxStore();
  const generateSummaryPDF = () => {
    generatePDF(data);
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={generateSummaryPDF}>
        Generate PDF
      </Button>
      <Grid container spacing={1}>
        {filteredBoxes.map((item) => (
          <Grid item key={item._id} xs={12} sm={12} md={12}>
            <NoteCard item={item} key={item._id} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Card;
