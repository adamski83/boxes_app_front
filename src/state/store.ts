import { create } from "zustand";
import { MockDataItem } from "src/types";

export interface BoxState {
  boxes: MockDataItem[];
  filteredBoxes: MockDataItem[];
  searchTerm: string;
  page: number;
  itemsPerPage: number;

  setBoxes: (boxes: MockDataItem[]) => void;
  setPage: (page: number) => void;
  setSearchTerm: (term: string) => void;
  filterBoxes: () => void;
  getCurrentPageBoxes: () => MockDataItem[];
  getTotalPages: () => number;
}

export const useBoxStore = create<BoxState>((set, get) => ({
  boxes: [],
  filteredBoxes: [],
  searchTerm: "",
  page: 1,
  itemsPerPage: 5,

  setBoxes: (boxes) => {
    set({ boxes });
    get().filterBoxes();
  },

  setPage: (page) => set({ page }),

  setSearchTerm: (term) => {
    set({ searchTerm: term, page: 1 }); // Resetuj stronę przy nowym wyszukiwaniu
    get().filterBoxes();
  },

  filterBoxes: () => {
    const { boxes, searchTerm } = get();
    if (!searchTerm.trim()) {
      set({ filteredBoxes: boxes });
      return;
    }

    const filtered = boxes.filter((box) =>
      box.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    set({ filteredBoxes: filtered });
  },

  getCurrentPageBoxes: () => {
    const { filteredBoxes, page, itemsPerPage } = get();
    const startIndex = (page - 1) * itemsPerPage;
    return filteredBoxes.slice(startIndex, startIndex + itemsPerPage);
  },

  getTotalPages: () => {
    const { filteredBoxes, itemsPerPage } = get();
    return Math.ceil(filteredBoxes.length / itemsPerPage);
  },
}));
