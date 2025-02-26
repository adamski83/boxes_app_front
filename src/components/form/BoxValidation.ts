import { z } from "zod";
import i18next from "i18next";

export const createBoxSchema = () => {
  const t = i18next.t;

  return z.object({
    name: z
      .string()
      .min(1, t("form.validation.nameRequired"))
      .max(50, t("form.validation.nameMaxLength")),

    amount: z
      .string()
      .min(1, t("form.validation.amountMin"))
      .max(1000, t("form.amountMax")),

    dimension: z
      .string()
      .regex(/^\d+,\d+,\d+$/, t("form.validation.dimensionsFormat")),

    usage: z
      .string()
      .min(1, t("form.validation.usageRequired"))
      .max(200, t("form.usageMaxLength")),

    picture: z.string().optional(),

    storage: z.enum([
      "Warehouse A",
      "Warehouse B",
      "Storage Room 1",
      "Storage Room 2",
      "External Storage",
    ]),

    status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).default("TODO"),
  });
};

export type BoxFormData = z.infer<ReturnType<typeof createBoxSchema>>;
