import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField, Button, Stack, Box } from "@mui/material";

interface BoxFormProps {
  onSubmit: SubmitHandler<MockDataItem>;
}

interface MockDataItem {
  id?: string;
  name: string;
  amount: number;
  dimension: string;
  usage: string;
  picture?: string; // Add the 'picture' property
}

const BoxForm: React.FC<BoxFormProps> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MockDataItem>();

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Controller
            name="name"
            control={control}
            defaultValue=""
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
            defaultValue={0}
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
            defaultValue="0,0,0"
            rules={{
              required: "Dimensions are required",
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
            defaultValue=""
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
            defaultValue=""
            rules={{ required: false }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Item Picture"
                helperText={errors.picture ? errors.picture.message : ""}
              />
            )}
          />
          <Button type="submit" variant="contained" size="medium">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default BoxForm;
