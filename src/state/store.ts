import { create } from "zustand";
import { MockDataItem } from "src/types";

export interface BoxState {
  boxes: MockDataItem[];
  searchTerm: string;
  page: number;
  itemsPerPage: number;
  filteredBoxes: MockDataItem[];
  setBoxes: (boxes: MockDataItem[]) => void;
  setSearchTerm: (term: string) => void;
  setPage: (page: number) => void;
  filterBoxes: (term: string) => void;
}

export const useBoxStore = create<BoxState>((set, get) => ({
  boxes: [],
  searchTerm: "",
  page: 1,
  itemsPerPage: 20,
  filteredBoxes: [],

  setBoxes: (boxes) => set({ boxes }),

  setSearchTerm: (term) => {
    set({ searchTerm: term, page: 1 });

    get().filterBoxes(term);
  },

  setPage: (page) => set({ page }),

  filterBoxes: (term) =>
    set((state) => ({
      filteredBoxes: state.boxes.filter((box) =>
        box.name.toLowerCase().includes(term.toLowerCase()),
      ),
    })),
}));
