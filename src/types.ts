type MockDataItem = {
  name: string;
  amount: number;
  dimension: [number, number, number];
  usage: [string, string, string];
  picture: string;
  createdAt: string;
  _id: string;
};
type MockData = MockDataItem[];

export type { MockData, MockDataItem };
