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
import { useTranslation } from "react-i18next";
interface MockDataItem {
  id?: string;
  name: string;
  amount: number;
  dimension: string;
  usage: string;
  picture?: string;
  storage?: string;
  status?: string;
}

const BoxForm: React.FC = () => {
  const { t } = useTranslation();
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
      storage: "Warehouse A",
      status: "TODO",
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

  const onSubmitHandler = (box: MockDataItem): void => {
    addNewBox(box);
  };
  const storageOptions = [
    "Warehouse A",
    "Warehouse B",
    "Storage Room 1",
    "Storage Room 2",
    "External Storage",
  ] as const;

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Stack
          direction={{ xs: "column", sm: "column", md: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: t("form.nameRequired") }}
            render={({ field }) => (
              <TextField
                {...field}
                label={t("form.Name")}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
              />
            )}
          />
          <Controller
            name="amount"
            control={control}
            rules={{
              required: { value: true, message: t("form.amountRequired") },
              min: { value: 1, message: t("form.amountMin") },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label={t("form.Amount")}
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
                label={t("form.dimensions")}
                placeholder="e.g. 10,20,30"
                error={!!errors.dimension}
                helperText={errors.dimension ? errors.dimension.message : ""}
              />
            )}
          />
          <Controller
            name="usage"
            control={control}
            rules={{ required: t("form.usageRequired") }}
            render={({ field }) => (
              <TextField
                {...field}
                label={t("form.usage")}
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
                label={t("form.picture")}
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
                <InputLabel>{t("form.storage")}</InputLabel>
                <Select
                  {...field}
                  label={t("form.storage")}
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
            {t("form.add")}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default BoxForm;
