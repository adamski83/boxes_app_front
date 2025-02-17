import { useForm, FormProvider } from "react-hook-form";
import { Button, Stack, Box } from "@mui/material";
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";
import { useTranslation } from "react-i18next";
import { MockDataItem } from "src/types";
import { useAddNewBox } from "src/services/mutations/addNewBox";
import { useQueryClient } from "@tanstack/react-query";
import { GET_BOXES } from "src/services/queries/tags";

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
      methods.reset();
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
            <FormInput
              name="name"
              label={t("form.Name")}
              rules={{ required: t("form.nameRequired") }}
            />

            <FormInput
              name="amount"
              label={t("form.Amount")}
              type="number"
              rules={{
                required: t("form.amountRequired"),
                min: { value: 1, message: t("form.amountMin") },
              }}
            />

            <FormInput
              name="dimension"
              label={t("form.dimensions")}
              placeholder="e.g. 10,20,30"
              rules={{
                pattern: {
                  value: /^\d+,\d+,\d+$/,
                  message: t("form.dimensionsFormat"),
                },
              }}
            />

            <FormInput
              name="usage"
              label={t("form.usage")}
              rules={{ required: t("form.usageRequired") }}
            />

            <FormInput name="picture" label={t("form.picture")} />

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
