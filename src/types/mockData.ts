import { ProductCategory } from "./productCategoryType";

export type MockDataItem = {
  name: string;
  amount: number;
  dimension: [number, number, number];
  usage: [string, string, string];
  picture: string;
  createdAt: Date;
  _id?: string;
  storage?: string;
  category: ProductCategory;
  type?: string;
  uploaded_file?: string;
};
export type MockData = MockDataItem[];
