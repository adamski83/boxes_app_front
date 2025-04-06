import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { FormControllerProps } from "../../types/formControllerPropsType";
import { MockDataItem } from "../../types/mockData";
import { FormInput } from "./FormInput";
import { CardHeader } from "../common/CardHeader/CardHeader";
import { FormSelect } from "./FormSelect";
import { useTranslation } from "react-i18next";
import React from "react";
export const STORAGE_OPTIONS = [
  "Warehouse A",
  "Warehouse B",
  "Storage Room 1",
  "Storage Room 2",
  "External Storage",
] as const;
const EditBoxController: React.FC<FormControllerProps> = ({
  onSubmit = () => {},
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

  const onSubmitWithId = (data: MockDataItem) => {
    onSubmit({ ...data, _id: item._id });
  };

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
          onSubmit={methods.handleSubmit(onSubmitWithId)}
          style={{ marginTop: 20 }}
        >
          <Stack
            direction={{ xs: "column", sm: "column", md: "column" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <FormInput
              autoComplete="on"
              name="name"
              label={t("form.name")}
              rules={{ required: t("form.nameRequired") }}
            />

            <FormInput
              autoComplete="on"
              name="amount"
              label={t("form.amount")}
              type="number"
              rules={{
                required: t("form.amountRequired"),
                min: { value: 1, message: t("form.amountMin") },
              }}
            />
            <FormInput
              autoComplete="on"
              name="usage"
              label={t("form.usage")}
              rules={{ required: t("form.usageRequired") }}
            />
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

export default EditBoxController;
