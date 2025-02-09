import { create } from "zustand";
import { MockDataItem } from "src/types";

export interface BoxState {
  boxes: MockDataItem[];
  searchTerm: string;
  page: number;
  itemsPerPage: number;

  setBoxes: (boxes: MockDataItem[]) => void;
  setPage: (page: number) => void;
}

export const useBoxStore = create<BoxState>((set, get) => ({
  boxes: [],
  searchTerm: "",
  page: 1,
  itemsPerPage: 20,

  setBoxes: (boxes) => set({ boxes }),

  setPage: (page) => set({ page }),
}));
