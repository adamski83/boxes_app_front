type MockDataItem = {
  name: string;
  amount: number;
  dimension: [number, number, number];
  usage: [string, string, string];
  picture: string;
  createdAt: Date;
  _id?: string;
  storage?: string;
};
type MockData = MockDataItem[];

interface FormControllerProps {
  item: MockDataItem;
  deleteItemHandler: (id: string) => void;
  toggleEdit: (id: string) => void;
  onSubmit?: (data: MockDataItem) => void;
}

interface ErrorResponse {
  type: string;
  response?: string;
}
export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}
export enum Flex {
  ROW = "row",
  COLUMN = "column",
  CENTER = "center",
  SPACE_BETWEEN = "space-between",
}

export type { MockData, MockDataItem, ErrorResponse, FormControllerProps };
