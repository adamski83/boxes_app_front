import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { FormControllerProps, MockDataItem } from "src/types";
import { FormInput } from "./AddFormInput";
import { CardHeader } from "./CardHeader";
import { FormSelect } from "./FormSelect";

import { useTranslation } from "react-i18next";
export const STORAGE_OPTIONS = [
  "Warehouse A",
  "Warehouse B",
  "Storage Room 1",
  "Storage Room 2",
  "External Storage",
] as const;
const EditFormController: React.FC<FormControllerProps> = ({
  onSubmit,
  deleteItemHandler,
  item,
  toggleEdit,
}) => {
  const { t } = useTranslation();
  const methods = useForm<MockDataItem>({
    defaultValues: {
      _id: item._id,
      name: item.name,
      amount: item.amount,
      dimension: item.dimension,
      usage: item.usage,
      storage: item.storage,
    },
  });

  return (
    <>
      <Card>
        <CardHeader
          id={item._id}
          name={item.name}
          onDelete={deleteItemHandler}
          onEdit={toggleEdit}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {item.usage}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {item.amount}
          </Typography>
        </CardContent>
      </Card>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{ marginTop: 20 }}
        >
          <Stack
            direction={{ xs: "column", sm: "column", md: "column" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <FormInput
              name="name"
              label={t("form.name")}
              rules={{ required: t("form.nameRequired") }}
            />

            <FormInput
              name="amount"
              label={t("form.amount")}
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
              options={STORAGE_OPTIONS}
            />

            <Button type="submit" variant="contained" size="medium">
              {t("form.edit")}
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </>
  );
};

export default EditFormController;
