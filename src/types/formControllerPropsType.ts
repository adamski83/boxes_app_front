import { MockDataItem } from "./mockData";

export interface FormControllerProps {
  item: MockDataItem;
  deleteItemHandler: (id: string) => void;
  toggleEdit: (id: string) => void;
  onSubmit?: (data: MockDataItem) => void;
}
