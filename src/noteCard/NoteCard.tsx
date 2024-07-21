import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { IconButton, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { MockDataItem } from "src/types";
interface Props {
  item: MockDataItem;
}

const NoteCard = ({ item }: Props) => {
  return (
    <div>
      <Card key={item._id}>
        <CardHeader
          action={
            <IconButton onClick={() => console.log("deleted", item._id)}>
              <DeleteOutlineIcon />
            </IconButton>
          }
          title={item.name}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {item.dimension.map((val) => val + "  ")}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {item.usage}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default NoteCard;
