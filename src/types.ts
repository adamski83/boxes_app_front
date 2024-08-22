type MockDataItem = {
  name: string;
  amount: number;
  dimension: [number, number, number];
  usage: [string, string, string];
  picture: string;
  createdAt: Date;
  _id?: string;
};
type MockData = MockDataItem[];

export type { MockData, MockDataItem };
