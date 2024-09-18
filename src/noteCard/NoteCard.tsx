import { useState } from "react";
import Card from "@mui/material/Card";
import QRCode from "react-qr-code";
import EditIcon from "@mui/icons-material/Edit";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { MockDataItem } from "src/types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useUpdateBox } from "src/services/mutations/updateBox";
import { useQueryClient } from "@tanstack/react-query";
import { GET_BOXES } from "src/services/queries/tags";
import { useDeleteBox } from "src/services/mutations/deleteOneBox";

interface Props {
  item: MockDataItem;
}

const NoteCard = ({ item }: Props) => {
  const { amount, name, usage, _id } = item;
  const { control, handleSubmit } = useForm<MockDataItem>({
    defaultValues: item,
  });
  const [isEditing, setIsEditing] = useState(true);
  const queryClient = useQueryClient();

  const { mutate: updateBox } = useUpdateBox({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_BOXES] });
      console.log("Box updated successfully");
    },
    onError: (error) => {
      console.error("Error updating box:", error);
    },
  });

  const { mutate: deleteBox } = useDeleteBox({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_BOXES] });
      console.log("Box deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting box:", error);
    },
  });

  const toggleEdit = () => {
    setIsEditing((isEditing) => !isEditing);
  };

  const deleteItemHandler = (id: string | undefined) => (): void => {
    if (!id) return;
    deleteBox(id);
  };

  const onSubmit: SubmitHandler<MockDataItem> = (item) => {
    updateBox(item);

    setIsEditing((isEditing) => !isEditing);
  };

  return (
    <div>
      {isEditing ? (
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
                value={name}
                viewBox={`0 0 256 256`}
              />
            </div>
            <Typography variant="body2" color="textSecondary">
              {/* {modifedDimension} */}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {usage}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {amount}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <>
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
              <Typography variant="body2" color="textSecondary">
                {/* {modifedDimension} */}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {usage}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {amount}
              </Typography>
            </CardContent>
          </Card>
          <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 20 }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
            >
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} label="Item Name" />
                )}
              />
              <Controller
                name="amount"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <TextField {...field} label="Item Amount" type="number" />
                )}
              />
              <Controller
                name="dimension"
                control={control}
                defaultValue={[0, 0, 0]}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Dimensions (comma separated)"
                    placeholder="e.g. 10,20,30"
                  />
                )}
              />
              <Controller
                name="usage"
                control={control}
                defaultValue={["", "", ""]}
                render={({ field }) => (
                  <TextField {...field} label="Item Usage" />
                )}
              />
              <Controller
                name="picture"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} label="Item Picture" />
                )}
              />
              <Button type="submit" variant="contained" size="medium">
                Edit
              </Button>
            </Stack>
          </form>
        </>
      )}
    </div>
  );
};

export default NoteCard;
