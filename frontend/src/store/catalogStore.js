import { create } from 'zustand';

export const useCatalogStore = create((set) => ({
  products: [],
  categories: [],
  filters: {},
  setProducts: (products) => set({ products }),
  setCategories: (categories) => set({ categories }),
  setFilters: (filters) => set({ filters }),
  clearFilters: () => set({ filters: {} }),
}));
