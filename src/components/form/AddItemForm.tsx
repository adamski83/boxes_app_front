import { Box, Button, Stack } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useAddNewBox } from "src/services/mutations/addNewBox";
import { GET_BOXES } from "src/services/queries/tags";
import { MockDataItem } from "src/types";
import { FormInput } from "./AddFormInput";
import { FormSelect } from "./FormSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBoxSchema } from "./BoxValidation";

const storageOptions = [
  "Warehouse A",
  "Warehouse B",
  "Storage Room 1",
  "Storage Room 2",
  "External Storage",
] as const;

const BoxForm: React.FC = () => {
  const { t } = useTranslation();
  const methods = useForm<MockDataItem>({
    resolver: zodResolver(createBoxSchema()),
    defaultValues: {
      name: "",
      amount: 0,
      usage: "",
      storage: "Warehouse A",
      status: "TODO",
    },
  });

  const queryClient = useQueryClient();
  const { mutate: addNewBox } = useAddNewBox({
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [GET_BOXES] });
      methods.reset({
        name: "",
        amount: 0,
        usage: "",
        storage: "Warehouse A", // Ważne! Ustaw ponownie wartość domyślną
        status: "TODO",
      });
    },
    onError: (error) => {
      console.error("Error adding box:", error);
    },
  });

  const onSubmitHandler = (data: MockDataItem): void => {
    addNewBox(data);
  };

  return (
    <FormProvider {...methods}>
      <Box>
        <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
          <Stack
            direction={{ xs: "column", sm: "column", md: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <FormInput autoComplete="on" name="name" label={t("form.name")} />
            <FormInput
              autoComplete="on"
              name="amount"
              label={t("form.amount")}
              type="number"
            />
            <FormInput autoComplete="on" name="usage" label={t("form.usage")} />
            <FormSelect
              name="storage"
              label={t("form.storage")}
              options={storageOptions}
            />
            <Button type="submit" variant="contained" size="medium">
              {t("form.add")}
            </Button>
          </Stack>
        </form>
      </Box>
    </FormProvider>
  );
};

export default BoxForm;
