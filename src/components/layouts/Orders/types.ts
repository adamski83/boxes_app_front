export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type Task = {
  _id: string;
  status: TaskStatus;
  name: string;
  amount: number;
  description?: string;
  dimension?: {
    width: number;
    height: number;
    depth: number;
  };
  usage?: string | undefined;
  picture: string;
  createdAt?: Date;
  storage: string;
};

export type Column = {
  id: TaskStatus;
  title: string;
};
