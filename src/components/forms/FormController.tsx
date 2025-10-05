import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import ImageIcon from "@mui/icons-material/Image";
import { Box, IconButton, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import QRCode from "react-qr-code";
import { FormControllerProps } from "../../types/formControllerPropsType";
import { ProductImage } from "../common/ProductImage/ProductImage";

export const FormController = ({
  item,
  deleteItemHandler,
  toggleEdit,
}: FormControllerProps) => {
  const { amount, name, usage, _id, storage, category, picture } = item;

  const getImageUrl = (picturePath: string | undefined) => {
    if (!picturePath) return null;

    if (picturePath.startsWith("http")) {
      return picturePath;
    }

    return `http://localhost:5001${picturePath}`;
  };

  const imageUrl = getImageUrl(picture);

  return (
    <Card key={_id}>
      <CardHeader
        action={
          <>
            <IconButton onClick={deleteItemHandler(_id)}>
              <DeleteOutlineIcon />
            </IconButton>
            <IconButton onClick={toggleEdit}>
              <EditIcon />
            </IconButton>
          </>
        }
        title={name}
      />
      <CardContent>
        <div
          style={{
            height: "auto",
            margin: "0 auto",
            maxWidth: 64,
            width: "100%",
            marginBottom: 16,
          }}
        >
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={_id || ""}
            viewBox={`0 0 256 256`}
          />
        </div>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography variant="body2" color="textSecondary">
            Usage: {usage}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Amount: {amount}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Storage: {storage}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Category: {category}
          </Typography>
        </Box>

        <Box sx={{ mt: 1 }}>
          {imageUrl ? (
            <ProductImage src={imageUrl} alt={name} width={200} height={150} />
          ) : (
            <div>
              <ImageIcon fontSize="large" color="disabled" />
              <p>Brak obrazu</p>
            </div>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
