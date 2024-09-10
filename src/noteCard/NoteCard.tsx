import { useState } from "react";
import Card from "@mui/material/Card";
import EditIcon from "@mui/icons-material/Edit";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { MockDataItem } from "src/types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useUpdateBox } from "src/services/mutations/updateBox";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  item: MockDataItem;
  useDelete: (id?: string) => void;
  useUpdate: (id?: string) => void;
}

const NoteCard = ({ item, useDelete }: Props) => {
  const queryClient = useQueryClient();
  const { mutate: updateBox } = useUpdateBox({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boxes"] });
      console.log("Box updated successfully");
    },
    onError: (error) => {
      console.error("Error updating box:", error);
    },
  });

  const { control, handleSubmit } = useForm<MockDataItem>({
    defaultValues: item,
  });
  const [isEditing, setIsEditing] = useState<boolean>(true);

  const onSubmit: SubmitHandler<MockDataItem> = (item) => {
    updateBox(item);

    setIsEditing((isEditing) => !isEditing);
  };

  // const modifedDimension = item.dimension
  //   .map((dim) => dim + " x ")
  //   .join("")
  //   .slice(0, -2);

  return (
    <div>
      {isEditing ? (
        <Card key={item._id}>
          <CardHeader
            action={
              <>
                <IconButton onClick={() => useDelete(item._id)}>
                  <DeleteOutlineIcon />
                </IconButton>
                <IconButton
                  onClick={() => setIsEditing((isEditing) => !isEditing)}
                >
                  <EditIcon />
                </IconButton>
              </>
            }
            title={item.name}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              {/* {modifedDimension} */}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {item.usage}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {item.amount}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card key={item._id}>
            <CardHeader
              action={
                <>
                  <IconButton onClick={() => useDelete(item._id)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => setIsEditing((isEditing) => !isEditing)}
                  >
                    <EditIcon />
                  </IconButton>
                </>
              }
              title={item.name}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                {/* {modifedDimension} */}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {item.usage}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {item.amount}
              </Typography>
            </CardContent>
          </Card>
          <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 20 }}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} label="Item Name" />}
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
              defaultValue="0,0,0"
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
              defaultValue=""
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
            <Button type="submit" variant="contained">
              Edit
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default NoteCard;
