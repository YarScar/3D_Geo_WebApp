import { create } from 'zustand'

export interface NeighborhoodData {
  name: string
  score2015: number
  [key: `score${number}`]: number
}

export interface AppState {
  selectedYear: number
  selectedNeighborhood: string | null
  viewMode: 'absolute' | 'velocity'
  neighborhoods: NeighborhoodData[]
  isLoading: boolean
  
  setSelectedYear: (year: number) => void
  setSelectedNeighborhood: (neighborhood: string | null) => void
  setViewMode: (mode: 'absolute' | 'velocity') => void
  setNeighborhoods: (neighborhoods: NeighborhoodData[]) => void
  setIsLoading: (loading: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  selectedYear: 2024,
  selectedNeighborhood: null,
  viewMode: 'absolute',
  neighborhoods: [],
  isLoading: true,
  
  setSelectedYear: (year) => set({ selectedYear: year }),
  setSelectedNeighborhood: (neighborhood) => set({ selectedNeighborhood: neighborhood }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setNeighborhoods: (neighborhoods) => set({ neighborhoods }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}))
