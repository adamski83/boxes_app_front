import Card from "@mui/material/Card";
import QRCode from "react-qr-code";
import EditIcon from "@mui/icons-material/Edit";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Box, IconButton, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { FormControllerProps } from "src/types";

export const FormController = ({
  item,
  deleteItemHandler,
  toggleEdit,
}: FormControllerProps) => {
  const { amount, name, usage, _id, storage, category } = item;

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
            gap: 4,
          }}
        >
          <Typography variant="body2" color="textSecondary">
            {/* {modifedDimension} */}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {usage}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {amount}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {storage}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {category}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
