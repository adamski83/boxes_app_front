import Card from "@mui/material/Card";
import EditIcon from "@mui/icons-material/Edit";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { Controller, useForm } from "react-hook-form";
import { MockDataItem } from "src/types";

import { FormControllerProps } from "src/types";

const EditFormController = ({
  onSubmit,
  deleteItemHandler,
  item,
  toggleEdit,
}: FormControllerProps) => {
  const { control, handleSubmit } = useForm<MockDataItem>({
    defaultValues: {
      _id: item._id,
      name: item.name,
      amount: item.amount,
      dimension: item.dimension,
      usage: item.usage,
      storage: item.storage,
    },
  });
  const storageOptions = [
    "",
    "Warehouse A",
    "Warehouse B",
    "Storage Room 1",
    "Storage Room 2",
    "External Storage",
  ];
  const { _id = "", amount, name, usage, storage } = item;

  return (
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
          direction={{ xs: "column", sm: "column", md: "column" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => <TextField {...field} label="Item Name" />}
          />
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Item Amount"
                type="number"
                inputProps={{ min: 0 }}
              />
            )}
          />
          <Controller
            name="dimension"
            control={control}
            rules={{ min: 0 }}
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
            render={({ field }) => <TextField {...field} label="Item Usage" />}
          />
          <Controller
            name="picture"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Item Picture" />
            )}
          />
          <Controller
            name="storage"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Storage Place</InputLabel>
                <Select {...field} label="Storage Place">
                  {storageOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          <Button type="submit" variant="contained" size="medium">
            Edit
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default EditFormController;
