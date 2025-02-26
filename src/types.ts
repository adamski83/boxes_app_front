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
  toggleEdit: () => void;
  onSubmit?: (data: MockDataItem) => void;
}

interface ErrorResponse {
  type: string;
  response?: string;
}
export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

export type { MockData, MockDataItem, ErrorResponse, FormControllerProps };
