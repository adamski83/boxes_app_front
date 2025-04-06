import { z } from "zod";

export const addFormSchema = z.object({
  name: z
    .string()
    .min(1, "Nazwa jest wymagana")
    .max(50, "Nazwa nie może być dłuższa niż 50 znaków"),

  amount: z
    .number()
    .min(1, "Ilość musi być większa niż 0")
    .max(1000, "Ilość nie może przekraczać 1000"),

  dimension: z
    .string()
    .regex(
      /^\d+,\d+,\d+$/,
      "Wymiary muszą być w formacie: szerokość,wysokość,głębokość",
    ),

  usage: z
    .string()
    .min(1, "Zastosowanie jest wymagane")
    .max(200, "Opis zastosowania jest za długi"),

  picture: z.string().optional(),

  storage: z.enum([
    "Warehouse A",
    "Warehouse B",
    "Storage Room 1",
    "Storage Room 2",
    "External Storage",
  ]),

  status: z.enum(["TODO", "IN_PROGRESS"]).default("TODO"),
});

export type FormFields = z.infer<typeof addFormSchema>;
