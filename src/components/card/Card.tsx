import { Container, Grid } from "@mui/material";
import "./card.css";
import NoteCard from "src/noteCard/NoteCard";
import { MockDataItem } from "src/types";

type CardData = {
  data: MockDataItem[];
  useDelete: () => void;
};
const Card = ({ data, useDelete }: CardData) => {
  return (
    <Container style={{ marginTop: 40 }}>
      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item key={item._id} xs={12} sm={12} md={12}>
            <NoteCard item={item} key={item._id} useDelete={useDelete} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Card;
