import { create } from "zustand";
import { MockDataItem } from "src/types";
import { ProductCategory } from "../types/productCategoryType";

export interface BoxState {
  boxes: MockDataItem[];
  filteredBoxes: MockDataItem[];
  searchTerm: string;
  selectedCategories: ProductCategory[];
  page: number;
  itemsPerPage: number;

  setBoxes: (boxes: MockDataItem[]) => void;
  setPage: (page: number) => void;
  setSearchTerm: (term: string) => void;
  setSelectedCategories: (categories: ProductCategory[]) => void;
  filterBoxes: () => void;
  getCurrentPageBoxes: () => MockDataItem[];
  getTotalPages: () => number;
}

export const useBoxStore = create<BoxState>((set, get) => ({
  boxes: [],
  filteredBoxes: [],
  searchTerm: "",
  selectedCategories: [],
  page: 1,
  itemsPerPage: 5,

  setBoxes: (boxes) => {
    set({ boxes });
    get().filterBoxes();
  },

  setPage: (page) => set({ page }),

  setSearchTerm: (term) => {
    set({ searchTerm: term, page: 1 });
    get().filterBoxes();
  },

  setSelectedCategories: (categories) => {
    set({ selectedCategories: categories, page: 1 });
    get().filterBoxes();
  },

  filterBoxes: () => {
    const { boxes, searchTerm, selectedCategories } = get();

    let filtered = [...boxes];

    // Filtrowanie po tekście
    if (searchTerm) {
      filtered = filtered.filter((box) =>
        box.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filtrowanie po kategoriach
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((box) =>
        selectedCategories.includes(box.category),
      );
    }

    set({ filteredBoxes: filtered });
  },

  getCurrentPageBoxes: () => {
    const { filteredBoxes, page, itemsPerPage } = get();
    const startIndex = (page - 1) * itemsPerPage;
    return filteredBoxes.slice(startIndex, startIndex + itemsPerPage);
  },

  getTotalPages: () => {
    const { filteredBoxes, itemsPerPage } = get();
    return Math.max(1, Math.ceil(filteredBoxes.length / itemsPerPage));
  },
}));
