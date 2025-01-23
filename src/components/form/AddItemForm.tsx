import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Stack,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useAddNewBox } from "src/services/mutations/addNewBox";
import { useQueryClient } from "@tanstack/react-query";
import { GET_BOXES } from "src/services/queries/tags";

interface MockDataItem {
  id?: string;
  name: string;
  amount: number;
  dimension: string;
  usage: string;
  picture?: string;
  storage?: string;
}

const BoxForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MockDataItem>({
    defaultValues: {
      name: "",
      amount: 0,
      dimension: "",
      usage: "",
      picture: "",
      storage: "DEFAULT_STORAGE",
    },
  });

  const queryClient = useQueryClient();
  const { mutate: addNewBox } = useAddNewBox({
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [GET_BOXES] });
      console.log("Box added successfully:", data);
      reset();
    },
    onError: (error) => {
      console.error("Error adding box:", error);
    },
  });

  const onSubmitHandler = (box: any): void => {
    addNewBox(box);
  };
  const storageOptions = [
    "Warehouse A",
    "Warehouse B",
    "Storage Room 1",
    "Storage Room 2",
    "External Storage",
  ];

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Stack
          direction={{ xs: "column", sm: "column", md: "column" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Item Name"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
              />
            )}
          />
          <Controller
            name="amount"
            control={control}
            rules={{
              required: "Amount is required",
              min: { value: 1, message: "Amount must be at least 1" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Item Amount"
                type="number"
                error={!!errors.amount}
                helperText={errors.amount ? errors.amount.message : ""}
              />
            )}
          />
          <Controller
            name="dimension"
            control={control}
            rules={{
              pattern: {
                value: /^\d+,\d+,\d+$/,
                message: "Dimensions must be in the format x,y,z",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Dimensions (comma separated)"
                placeholder="e.g. 10,20,30"
                error={!!errors.dimension}
                helperText={errors.dimension ? errors.dimension.message : ""}
              />
            )}
          />
          <Controller
            name="usage"
            control={control}
            rules={{ required: "Usage is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Item Usage"
                error={!!errors.usage}
                helperText={errors.usage ? errors.usage.message : ""}
              />
            )}
          />
          <Controller
            name="picture"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Item Picture"
                helperText={errors.picture ? errors.picture.message : ""}
              />
            )}
          />
          <Controller
            name="storage"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <FormControl>
                <InputLabel>Storage Place</InputLabel>
                <Select
                  {...field}
                  label="Storage Place"
                  error={!!errors.storage}
                >
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
            Add new Item
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default BoxForm;
