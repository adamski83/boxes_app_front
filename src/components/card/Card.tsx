import { Container, Grid } from "@mui/material";
import "./card.css";
import NoteCard from "src/noteCard/NoteCard";
import { MockDataItem } from "src/types";

type CardData = {
  data: MockDataItem[];
};
const Card = ({ data }: CardData) => {
  return (
    <Container style={{ marginTop: 40 }}>
      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item key={item._id} xs={12} sm={12} md={12}>
            <NoteCard item={item} key={item._id} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Card;
