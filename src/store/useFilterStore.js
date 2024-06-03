import { create } from 'zustand';

const useFilterStore = create((set) => ({
  sortBy: '',
  brands: [],
  selectedBrands: [],
  models: [],
  selectedModels: [],
  searchQuery: '',
  products: [],

  setSortBy: (sortBy) => set({ sortBy }),
  setBrands: (brands) => set({ brands }),
  setSelectedBrands: (selectedBrands) => set({ selectedBrands }),
  setModels: (models) => set({ models }),
  setSelectedModels: (selectedModels) => set({ selectedModels }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setProducts: (products) => set({ products }),
}));

export default useFilterStore;